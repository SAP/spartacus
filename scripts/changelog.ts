import { JsonObject, logging } from '@angular-devkit/core';
import chalk from 'chalk';
import program from 'commander';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import * as semver from 'semver';
import { packages } from './packages';

const changelogTemplate = ejs.compile(
  fs.readFileSync(path.join(__dirname, './templates/changelog.ejs'), 'utf-8'),
  { client: true }
);

const conventionalCommitsParser = require('conventional-commits-parser');
const gitRawCommits = require('git-raw-commits');
const ghGot = require('gh-got');
const through = require('through2');

export interface ChangelogOptions {
  from: string;
  to?: string;
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

  const githubToken = (
    args.githubToken ||
    (args.githubTokenFile && fs.readFileSync(args.githubTokenFile, 'utf-8')) ||
    ''
  ).trim();

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
      from: args.from,
      to,
      format:
        '%B%n-hash-%n%H%n-gitTags-%n%D%n-committerDate-%n%ci%n-authorName-%n%aN%n',
    }) as NodeJS.ReadStream;
  }

  function getCommitsStream(): NodeJS.ReadStream {
    getRawCommitsStream(args.to || 'HEAD')
      .on('error', (err) => {
        logger.fatal('Unexpected error occured: ' + err.message);
        return '';
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

          callback(undefined, Buffer.from(commit));
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
            if (tags && tags.find((x) => x === args.to)) {
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
  .option('--from <commit>', 'From which commit/tag')
  .option('--to <commit>', 'To which commit/tag')
  .option('--verbose', 'Print output')
  .option('--githubToken <token>', 'Github token for release generation')
  .option('--tokenFile <pathToFile>', 'File with github token')
  .option('--lib <lib>', 'Changelog for passed library')
  .parse(process.argv);

const config = {
  from: program.from,
  to: program.to,
  githubToken: program.githubToken,
  githubTokenFile: program.tokenFile,
  library: program.lib,
  stdout: program.verbose || false,
};

if (typeof config.from === 'undefined') {
  console.error(chalk.red('Missing --from option with end commit/tag'));
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
}

run(config, new logging.NullLogger());
