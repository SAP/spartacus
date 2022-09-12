/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { JsonObject, logging } from '@angular-devkit/core';
import chalk from 'chalk';
import program from 'commander';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import * as semver from 'semver';
import { packages } from './packages';
import * as versionsHelper from './versions';

const changelogTemplate = ejs.compile(
  fs.readFileSync(path.join(__dirname, './templates/changelog.ejs'), 'utf-8'),
  { client: true }
);

const conventionalCommitsParser = require('conventional-commits-parser');
const gitRawCommits = require('git-raw-commits');
const ghGot = require('gh-got');
const through = require('through2');

export interface ChangelogOptions {
  to: string;
  githubTokenFile?: string;
  githubToken?: string;
  library?: string;
  stdout?: boolean;
}

const breakingChangesKeywords = ['BREAKING CHANGE', 'BREAKING CHANGES'];
const deprecationsKeywords = ['DEPRECATION', 'DEPRECATED', 'DEPRECATIONS'];

export default async function run(
  args: ChangelogOptions,
  logger: logging.Logger
) {
  const commits: JsonObject[] = [];
  let toSha: string | null = null;
  const breakingChanges: JsonObject[] = [];
  const deprecations: JsonObject[] = [];
  const versionFromTag = args.to
    .split('-')
    .filter((_, i) => i !== 0)
    .join('-');
  const newVersion = semver.parse(versionFromTag, {
    includePrerelease: true,
    loose: true,
  });
  let fromToken: string;
  try {
    const packageVersions = await versionsHelper.fetchPackageVersions(
      args.library!
    );
    const previousVersion = versionsHelper.extractPreviousVersionForChangelog(
      packageVersions,
      newVersion?.version!
    );
    fromToken = (previousVersion &&
      args.to.split(newVersion?.version!).join(previousVersion)) as string;
  } catch (err) {
    // package not found - assuming first release
    fromToken = '';
  }

  const githubToken = (
    args.githubToken ||
    (args.githubTokenFile && fs.readFileSync(args.githubTokenFile, 'utf-8')) ||
    ''
  ).trim();

  const libraryPaths: Record<string, string> = {
    '@commerce-storefront-toolset/storefront': 'projects/storefrontlib',
    '@commerce-storefront-toolset/core': 'projects/core',
    '@commerce-storefront-toolset/styles': 'projects/storefrontstyles',
    '@commerce-storefront-toolset/assets': 'projects/assets',
    '@commerce-storefront-toolset/schematics': 'projects/schematics',
    '@commerce-storefront-toolset/user': 'feature-libs/user',
    '@commerce-storefront-toolset/cds': 'integration-libs/cds',
    '@commerce-storefront-toolset/organization': 'feature-libs/organization',
    '@commerce-storefront-toolset/product': 'feature-libs/product',
    '@commerce-storefront-toolset/product-configurator': 'feature-libs/product-configurator',
    '@commerce-storefront-toolset/storefinder': 'feature-libs/storefinder',
    '@commerce-storefront-toolset/checkout': 'feature-libs/checkout',
    '@commerce-storefront-toolset/asm': 'feature-libs/asm',
    '@commerce-storefront-toolset/smartedit': 'feature-libs/smartedit',
    '@commerce-storefront-toolset/tracking': 'feature-libs/tracking',
    '@commerce-storefront-toolset/qualtrics': 'feature-libs/qualtrics',
    '@commerce-storefront-toolset/cdc': 'integration-libs/cdc',
    '@commerce-storefront-toolset/setup': 'core-libs/setup',
    '@commerce-storefront-toolset/cart': 'feature-libs/cart',
    '@commerce-storefront-toolset/order': 'feature-libs/order',
    '@commerce-storefront-toolset/digital-payments': 'integration-libs/digital-payments',
    '@commerce-storefront-toolset/epd-visualization': 'integration-libs/epd-visualization',
  };

  const duplexUtil = through(function (
    this: NodeJS.ReadStream,
    chunk: unknown,
    _: unknown,
    callback: () => {}
  ) {
    this.push(chunk);
    callback();
  });

  function getRawCommitsStream(to: string) {
    return gitRawCommits({
      from: fromToken,
      to,
      path: args.library
        ? path.join(__dirname, '..', libraryPaths[args.library])
        : path.join(__dirname, '..'),
      format:
        '%B%n-hash-%n%H%n-gitTags-%n%D%n-committerDate-%n%ci%n-authorName-%n%aN%n',
    }) as NodeJS.ReadStream;
  }

  function getCommitsStream(): NodeJS.ReadStream {
    getRawCommitsStream(args.to)
      .on('error', () => {
        getRawCommitsStream('HEAD')
          .on('error', (err) => {
            logger.fatal('An error happened: ' + err.message);
            return '';
          })
          .pipe(duplexUtil);
      })
      .pipe(duplexUtil);

    return duplexUtil;
  }

  return new Promise((resolve) => {
    getCommitsStream()
      .pipe(
        through((chunk: Buffer, _: string, callback: Function) => {
          // Replace github URLs with `@XYZ#123`
          const commit = chunk
            .toString('utf-8')
            .replace(/https?:\/\/github.com\/(.*?)\/issues\/(\d+)/g, '@$1#$2');

          callback(undefined, new Buffer(commit));
        })
      )
      .pipe(
        conventionalCommitsParser({
          headerPattern: /^(\w*)(?:\(([^)]*)\))?: (.*)$/,
          headerCorrespondence: ['type', 'scope', 'subject'],
          noteKeywords: [...breakingChangesKeywords, ...deprecationsKeywords],
          revertPattern: /^revert:\s([\s\S]*?)\s*This reverts commit (\w*)\./,
          revertCorrespondence: [`header`, `hash`],
          issuePrefixes: ['#', 'GH-', 'gh-'],
        })
      )
      .pipe(
        through.obj((chunk: JsonObject, _: string, cb: Function) => {
          try {
            const maybeTag =
              chunk.gitTags && (chunk.gitTags as string).match(/tag: (.*)/);
            const tags = maybeTag && maybeTag[1].split(/,/g);
            chunk['tags'] = tags;
            if (tags && tags.find((x) => x == args.to)) {
              toSha = chunk.hash as string;
            }
            const notes: any = chunk.notes;
            if (Array.isArray(notes)) {
              notes.forEach((note) => {
                if (breakingChangesKeywords.includes(note.title)) {
                  breakingChanges.push({
                    content: note.text,
                    commit: chunk,
                  });
                } else if (deprecationsKeywords.includes(note.title)) {
                  deprecations.push({
                    content: note.text,
                    commit: chunk,
                  });
                }
              });
            }
            commits.push(chunk);
            cb();
          } catch (err) {
            cb(err);
          }
        })
      )
      .on('finish', resolve);
  })
    .then(() => {
      const markdown: string = changelogTemplate({
        ...args,
        include: (x: string, v: {}) =>
          ejs.render(
            fs.readFileSync(
              path.join(__dirname, './templates', `${x}.ejs`),
              'utf-8'
            ),
            v
          ),
        commits,
        packages,
        breakingChanges,
        deprecations,
      });

      if (args.stdout || !githubToken) {
        console.log(markdown);
        process.exit(0);
      }

      // Check if we need to edit or create a new one.
      return ghGot('repos/SAP/spartacus/releases').then((x: JsonObject) => [
        x,
        markdown,
      ]);
    })
    .then(([body, markdown]) => {
      const json = body.body;
      const maybeRelease = json.find((x: JsonObject) => x.tag_name == args.to);
      const id = maybeRelease ? `/${maybeRelease.id}` : '';

      const semversion = (args.to && semver.parse(args.to)) || {
        prerelease: '',
      };

      return ghGot('repos/SAP/spartacus/releases' + id, {
        body: {
          body: markdown,
          draft: true,
          name: args.to,
          prerelease: semversion.prerelease.length > 0,
          tag_name: args.to,
          ...(toSha ? { target_commitish: toSha } : {}),
        },
        token: githubToken,
      });
    });
}

program
  .option('--to <commit>', 'To which commit/tag')
  .option('--verbose', 'Print output')
  .option('--githubToken <token>', 'Github token for release generation')
  .option('--tokenFile <pathToFile>', 'File with github token')
  .option('--lib <lib>', 'Changelog for passed library')
  .parse(process.argv);

const config = {
  from: program.from,
  to: program.to,
  stdout: program.verbose || false,
  githubToken: program.githubToken,
  githubTokenFile: program.tokenFile,
  library: program.lib,
};

if (typeof config.to === 'undefined') {
  console.error(chalk.red('Missing --to option with end commit/tag'));
  process.exit(1);
} else if (
  config.stdout === false &&
  typeof config.githubToken === 'undefined' &&
  typeof config.githubTokenFile === 'undefined'
) {
  console.error(
    chalk.red(
      'Missing --githubToken/--tokenFile option with correct github token'
    )
  );
  process.exit(1);
} else if (typeof config.library === 'string') {
  switch (config.library) {
    case 'core':
    case '@commerce-storefront-toolset/core':
      config.library = '@commerce-storefront-toolset/core';
      break;
    case 'storefrontlib':
    case 'storefront':
    case '@commerce-storefront-toolset/storefront':
    case '@commerce-storefront-toolset/storefrontlib':
      config.library = '@commerce-storefront-toolset/storefront';
      break;
    case 'styles':
    case '@commerce-storefront-toolset/styles':
    case 'storefrontstyles':
      config.library = '@commerce-storefront-toolset/styles';
      break;
    case 'assets':
    case '@commerce-storefront-toolset/assets':
      config.library = '@commerce-storefront-toolset/assets';
      break;
    case 'schematics':
    case '@commerce-storefront-toolset/schematics':
      config.library = '@commerce-storefront-toolset/schematics';
      break;
    case 'user':
    case '@commerce-storefront-toolset/user':
      config.library = '@commerce-storefront-toolset/user';
      break;
    case 'cds':
    case '@commerce-storefront-toolset/cds':
      config.library = '@commerce-storefront-toolset/cds';
      break;
    case 'organization':
    case '@commerce-storefront-toolset/organization':
      config.library = '@commerce-storefront-toolset/organization';
      break;
    case 'product':
    case '@commerce-storefront-toolset/product':
    case '@commerce-storefront-toolset/product/configurators':
    case '@commerce-storefront-toolset/product/configurators/common':
    case '@commerce-storefront-toolset/product/configurators/cpq':
    case '@commerce-storefront-toolset/product/configurators/variant':
    case '@commerce-storefront-toolset/product/configurators/textfield':
    case '@commerce-storefront-toolset/product/variants':
      config.library = '@commerce-storefront-toolset/product';
      break;
    case 'product-configurator':
    case '@commerce-storefront-toolset/product-configurator':
      config.library = '@commerce-storefront-toolset/product-configurator';
      break;
    case 'cdc':
    case '@commerce-storefront-toolset/cdc':
      config.library = '@commerce-storefront-toolset/cdc';
      break;
    case 'digital-payments':
    case '@commerce-storefront-toolset/digital-payments':
      config.library = '@commerce-storefront-toolset/digital-payments';
      break;
    case 'storefinder':
    case '@commerce-storefront-toolset/storefinder':
      config.library = '@commerce-storefront-toolset/storefinder';
      break;
    case 'checkout':
    case '@commerce-storefront-toolset/checkout':
      config.library = '@commerce-storefront-toolset/checkout';
      break;
    case 'tracking':
    case '@commerce-storefront-toolset/tracking':
      config.library = '@commerce-storefront-toolset/tracking';
      break;
    case 'qualtrics':
    case '@commerce-storefront-toolset/qualtrics':
      config.library = '@commerce-storefront-toolset/qualtrics';
      break;
    case 'smartedit':
    case '@commerce-storefront-toolset/smartedit':
      config.library = '@commerce-storefront-toolset/smartedit';
      break;
    case 'setup':
    case '@commerce-storefront-toolset/setup':
      config.library = '@commerce-storefront-toolset/setup';
      break;
    case 'cart':
    case '@commerce-storefront-toolset/cart':
      config.library = '@commerce-storefront-toolset/cart';
      break;
    case 'order':
    case '@commerce-storefront-toolset/order':
      config.library = '@commerce-storefront-toolset/order';
      break;
    case 'digital-payments':
    case '@commerce-storefront-toolset/digital-payments':
      config.library = '@commerce-storefront-toolset/digital-payments';
      break;
    case 'epd-visualization':
    case '@commerce-storefront-toolset/epd-visualization':
      config.library = '@commerce-storefront-toolset/epd-visualization';
      break;
    default:
      config.library = undefined;
  }
}

run(config, new logging.NullLogger());
