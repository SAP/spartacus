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
    '@spartacus/storefront': 'projects/storefrontlib',
    '@spartacus/core': 'projects/core',
    '@spartacus/styles': 'projects/storefrontstyles',
    '@spartacus/assets': 'projects/assets',
    '@spartacus/schematics': 'projects/schematics',
    '@spartacus/incubator': 'projects/incubator',
    '@spartacus/user': 'feature-libs/user',
    '@spartacus/cds': 'integration-libs/cds',
    '@spartacus/organization': 'feature-libs/organization',
    '@spartacus/product': 'feature-libs/product',
    '@spartacus/product-configurator': 'feature-libs/product-configurator',
    '@spartacus/storefinder': 'feature-libs/storefinder',
    '@spartacus/checkout': 'feature-libs/checkout',
    '@spartacus/asm': 'feature-libs/asm',
    '@spartacus/smartedit': 'feature-libs/smartedit',
    '@spartacus/tracking': 'feature-libs/tracking',
    '@spartacus/qualtrics': 'feature-libs/qualtrics',
    '@spartacus/cdc': 'integration-libs/cdc',
    '@spartacus/setup': 'core-libs/setup',
    '@spartacus/cart': 'feature-libs/cart',
    '@spartacus/order': 'feature-libs/order',
    '@spartacus/digital-payments': 'integration-libs/digital-payments',
    '@spartacus/epd-visualization': 'integration-libs/epd-visualization',
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
    case '@spartacus/core':
      config.library = '@spartacus/core';
      break;
    case 'storefrontlib':
    case 'storefront':
    case '@spartacus/storefront':
    case '@spartacus/storefrontlib':
      config.library = '@spartacus/storefront';
      break;
    case 'styles':
    case '@spartacus/styles':
    case 'storefrontstyles':
      config.library = '@spartacus/styles';
      break;
    case 'assets':
    case '@spartacus/assets':
      config.library = '@spartacus/assets';
      break;
    case 'schematics':
    case '@spartacus/schematics':
      config.library = '@spartacus/schematics';
      break;
    case 'incubator':
    case '@spartacus/incubator':
      config.library = '@spartacus/incubator';
      break;
    case 'user':
    case '@spartacus/user':
      config.library = '@spartacus/user';
      break;
    case 'cds':
    case '@spartacus/cds':
      config.library = '@spartacus/cds';
      break;
    case 'organization':
    case '@spartacus/organization':
      config.library = '@spartacus/organization';
      break;
    case 'product':
    case '@spartacus/product':
    case '@spartacus/product/configurators':
    case '@spartacus/product/configurators/common':
    case '@spartacus/product/configurators/cpq':
    case '@spartacus/product/configurators/variant':
    case '@spartacus/product/configurators/textfield':
    case '@spartacus/product/variants':
      config.library = '@spartacus/product';
      break;
    case 'product-configurator':
    case '@spartacus/product-configurator':
      config.library = '@spartacus/product-configurator';
      break;
    case 'cdc':
    case '@spartacus/cdc':
      config.library = '@spartacus/cdc';
      break;
    case 'digital-payments':
    case '@spartacus/digital-payments':
      config.library = '@spartacus/digital-payments';
      break;
    case 'storefinder':
    case '@spartacus/storefinder':
      config.library = '@spartacus/storefinder';
      break;
    case 'checkout':
    case '@spartacus/checkout':
      config.library = '@spartacus/checkout';
      break;
    case 'tracking':
    case '@spartacus/tracking':
      config.library = '@spartacus/tracking';
      break;
    case 'qualtrics':
    case '@spartacus/qualtrics':
      config.library = '@spartacus/qualtrics';
      break;
    case 'smartedit':
    case '@spartacus/smartedit':
      config.library = '@spartacus/smartedit';
      break;
    case 'setup':
    case '@spartacus/setup':
      config.library = '@spartacus/setup';
      break;
    case 'cart':
    case '@spartacus/cart':
      config.library = '@spartacus/cart';
      break;
    case 'order':
    case '@spartacus/order':
      config.library = '@spartacus/order';
      break;
    case 'digital-payments':
    case '@spartacus/digital-payments':
      config.library = '@spartacus/digital-payments';
      break;
    case 'epd-visualization':
    case '@spartacus/epd-visualization':
      config.library = '@spartacus/epd-visualization';
      break;
    default:
      config.library = undefined;
  }
}

run(config, new logging.NullLogger());
