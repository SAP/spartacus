/**
 * Terminology:
 *  - head branch -> branch you are working on
 *  - base branch -> branch you want to merge to
 */

import * as cache from '@actions/cache';
import * as core from '@actions/core';
import type { ExecOptions } from '@actions/exec';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
import { Context } from '@actions/github/lib/context';
import * as glob from '@actions/glob';
import * as io from '@actions/io';
import * as fs from 'fs';

const diff = require('diff-lines');
const normalizeNewline = require('normalize-newline');

const BASE_BRANCH_DIR = 'branch-clone';
const BUILD_DIR = 'dist';
const REPORT_DIR = 'etc';
const COMMENT_HEADER = 'Public API changes';

enum Status {
  Unknown = 'unknown',
  Success = 'success',
  Failed = 'failed',
}

type UnknownStatus = {
  status: Status.Unknown;
};

type SuccessStatus = {
  status: Status.Success;
};

type FailedStatus = {
  status: Status.Failed;
  errors: string[];
};

type BranchStatus = UnknownStatus | SuccessStatus | FailedStatus;
interface EntryPointStatus {
  name: string;
  file: string;
  base: BranchStatus;
  head: BranchStatus;
}

/**
 * Prepare repository with base branch clone for api-extractor
 *
 * @param branch base branch
 * @param baseCommit base commit
 */
async function prepareRepositoryForApiExtractor(
  branch: string,
  baseCommit: string
) {
  core.startGroup('Prepare branches for extractor');

  // Install dependencies to build libraries
  await exec.exec('yarn');

  // Try to restore builded libraries for base branch
  // Builded libraries are cached by `cache-builded-libs` action
  const paths = [BUILD_DIR];
  const key = `dist-${baseCommit}`;
  const cacheKey = await cache.restoreCache(paths, key, []);
  if (cacheKey) {
    // We create `etc` directory for api-extractor files
    await io.mkdirP(`${BASE_BRANCH_DIR}/${REPORT_DIR}`);
    // Cache restores files in the same location, so we need to move them manually
    await io.cp(BUILD_DIR, `${BASE_BRANCH_DIR}/${BUILD_DIR}`, {
      recursive: true,
      force: false,
    });
    await io.rmRF(BUILD_DIR);
  } else {
    // When we don't have cache let's clone the base branch (with particular commit)
    await exec.exec('sh', [
      './.github/api-extractor-action/prepare-repo-for-api-extractor.sh',
      branch,
      BASE_BRANCH_DIR,
      baseCommit,
    ]);
  }

  // Build the libraries
  // TODO: We can parallel these builds, when schematics builds won't trigger yarn install
  const BUILD_COMMAND = 'build:libs';
  await exec.exec('yarn', [BUILD_COMMAND]);
  // If we didn't restored builded libs, we need to also build base branch
  if (!cacheKey) {
    await exec.exec('yarn', ['--cwd', BASE_BRANCH_DIR, BUILD_COMMAND]);
  }

  core.endGroup();
}

/**
 * Generates github comment for pull request with bot results
 *
 * @param analyzedComments List of comments for each analysed entry point
 * @param notAnalyzableEntryPoints List of entry points that couldn't be analyzed
 */
function generateCommentBody(
  analyzedComments: string[],
  notAnalyzableEntryPoints: string[]
): string {
  return `## ${COMMENT_HEADER}\n${generateCommentForAnalyzed(
    analyzedComments
  )}${generateCommentForNotAnalyzed(notAnalyzableEntryPoints)}`;
}

/**
 * Generates part of the pull request comment for analyzed libraries
 *
 * @param comments List of comments for each analysed entry point
 */
function generateCommentForAnalyzed(comments: string[]): string {
  const changedEntryPoints = comments.filter((comment) => !!comment);
  if (!changedEntryPoints.length) {
    return '### :heavy_check_mark: Nothing changed in analyzed entry points.';
  } else {
    return changedEntryPoints.join('\n');
  }
}

/**
 * Generates part of the pull request comment for not analyzed libraries
 *
 * @param notAnalyzableEntryPoints List of entry points that couldn't be analyzed
 */
function generateCommentForNotAnalyzed(
  notAnalyzableEntryPoints: string[]
): string {
  const listOfEntryPoints = notAnalyzableEntryPoints
    .map((entryPoint: string) => `- ${entryPoint}`)
    .join('\n');
  return `\n\n### :warning: Impossible to analyze\n${listOfEntryPoints}`;
}

/**
 * Copies api-extractor config to provided directory
 *
 * @param targetDir Directory to copy config to
 */
async function copyApiExtractorConfig(targetDir: string) {
  const globber = await glob.create(
    '.github/api-extractor-action/api-extractor.json',
    {}
  );
  const configs = await globber.glob();
  if (configs.length) {
    const apiExtractorConfigPath = (await globber.glob())[0];
    await io.cp(apiExtractorConfigPath, targetDir);
  } else {
    throw new Error('Could not find api-extractor.json config');
  }
}

/**
 * Run api-extractor on directory
 *
 * @param entryPointDir Directory with entry point to analyze
 *
 * @returns Array with exit code and errors array as a second element
 */
async function analyzeEntryPoint(
  entryPointDir: string
): Promise<[number, string[]]> {
  let errors: string[] = [];
  const options: ExecOptions = {
    ignoreReturnCode: true,
    delay: 1000,
  };
  options.listeners = {
    errline: (line) => {
      errors.push(line);
    },
  };
  const exitCode = await exec.exec(
    'sh',
    ['./.github/api-extractor-action/api-extractor.sh', entryPointDir],
    options
  );
  return [
    exitCode,
    errors.filter((line: string) => line.startsWith('ERROR: ')),
  ];
}

/**
 * Extract from the api-extractor report public api definition.
 *
 * @param filename report file from which to extract public api definition
 */
function extractSnippetFromFile(filename: string): string {
  // Definition is included in code snippet formatted with ts
  const regexForTSSnippetInMarkdown = /```ts([\s\S]*)```/ms;
  const result = regexForTSSnippetInMarkdown.exec(
    normalizeNewline(fs.readFileSync(filename, 'utf-8'))
  );
  if (result && result[1]) {
    return result[1].trim();
  }
  return '';
}

/**
 * Get diff between base and head branch report.
 *
 * @param report report filename
 *
 * @returns diff between head and base branch of public api for entry point
 */
function getDiff(report: string): string {
  const headBranchReportDirectory = `${REPORT_DIR}`;
  const baseBranchReportDirectory = `${BASE_BRANCH_DIR}/${REPORT_DIR}`;

  const headBranchSnippet = extractSnippetFromFile(
    `${headBranchReportDirectory}/${report}`
  );
  const baseBranchSnippet = extractSnippetFromFile(
    `${baseBranchReportDirectory}/${report}`
  );

  return diff(baseBranchSnippet, headBranchSnippet, {
    n_surrounding: 3,
  });
}

/**
 * Generate comment for entry points based on their status
 *
 * @param entry entry point status to convert into comment
 *
 * @returns comment for entry point
 */
function generateCommentForEntryPoint(entry: EntryPointStatus): string {
  // We managed to create report for both branches
  if (
    entry.head.status === Status.Success &&
    entry.base.status === Status.Success
  ) {
    const diff = getDiff(entry.file);
    if (diff.length) {
      return `### :warning: ${entry.name}\n\`\`\`diff\n${diff}\n\`\`\``;
    }
    // No changes. Don't report anything.
    return '';
  } else if (
    entry.head.status === Status.Failed &&
    entry.base.status === Status.Success
  ) {
    return `### :boom: ${entry.name}
Library no longer can be analyzed with api-extractor. Please check the errors:
\`\`\`
${entry.head.errors.join('\n')}
\`\`\``;
  } else if (
    entry.head.status === Status.Success &&
    entry.base.status === Status.Failed
  ) {
    return `### :green_heart: ${entry.name}\nLibrary can now by analyzed with api-extractor.`;
  } else if (
    entry.head.status === Status.Failed &&
    entry.base.status === Status.Failed
  ) {
    if (entry.head.errors?.[0] !== entry.base.errors?.[0]) {
      return `### :boom: ${entry.name}
New error: \`${entry.head.errors[0]}\`
Previous error: \`${entry.base.errors[0]}\``;
    }
  } else if (entry.head.status === Status.Unknown) {
    return `### :boom: ${entry.name}\nEntry point removed. Are you sure it was intentional?`;
  } else if (entry.base.status === Status.Unknown) {
    const publicApi = extractSnippetFromFile(`etc/${entry.file}`);
    return `### :warning: ${entry.name}
New entry point. Initial public api:
\`\`\`ts
${publicApi}
\`\`\``;
  }
  return '';
}

/**
 * Generate list of all entry points that could not be analyzed.
 *
 * @param entryPoints List of entry point status
 */
function extractListOfNotAnalyzedEntryPoints(
  entryPoints: EntryPointStatus[]
): string[] {
  const notAnalyzedEntryPoints = entryPoints
    .filter((entryPoint) => {
      return (
        entryPoint.head.status === Status.Failed &&
        entryPoint.base.status === Status.Failed
      );
    })
    .map((entryPoints) => entryPoints.name);

  return notAnalyzedEntryPoints;
}

// TODO: Improve this function
async function printReport(
  body: string,
  gh: any,
  issueNumber: number,
  context: Context
) {
  if (!context.payload.repository) {
    throw new Error('Missing repository in context!');
  }
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;

  const comments = await gh.issues.listComments({
    issue_number: issueNumber,
    owner,
    repo,
  });

  const botComment = comments.data.filter((comment: any) =>
    comment.body.includes(COMMENT_HEADER)
  );

  if (botComment && botComment.length) {
    await gh.issues.updateComment({
      comment_id: botComment[0].id,
      owner,
      repo,
      body,
    });
  } else {
    await gh.issues.createComment({
      issue_number: issueNumber,
      owner,
      repo,
      body,
    });
  }
}

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    throw new Error('Github token missing in action');
  }
  const gh = github.getOctokit(GITHUB_TOKEN);

  const context = github.context;
  const relatedPR = context.payload.pull_request;

  if (!relatedPR) {
    throw new Error(
      'Missing pull request context! Make sure to run this action only for pull_requests.'
    );
  }

  const baseBranch = relatedPR.base.ref;
  const baseCommit = relatedPR.base.sha;

  await prepareRepositoryForApiExtractor(baseBranch, baseCommit);

  let entryPoints: { [a: string]: EntryPointStatus } = {};

  let globber = await glob.create(`${BUILD_DIR}/**/package.json`, {});
  const files = await globber.glob();

  core.info('\u001b[35mAPI extractor for head branch');
  for (let path of files) {
    const packageContent = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const name: string = packageContent.name;
    const newName = name.replace(/\//g, '_').replace(/\_/, '/');
    fs.writeFileSync(
      path,
      JSON.stringify({ ...packageContent, name: newName }, undefined, 2)
    );

    if (!entryPoints[name]) {
      entryPoints[name] = {
        name: name,
        head: { status: Status.Unknown },
        base: { status: Status.Unknown },
        file: `${newName.split('/')[1]}.api.md`,
      };
    }

    const directory = path.substring(0, path.length - `/package.json`.length);

    await copyApiExtractorConfig(directory);
    core.startGroup(`${name}`);
    const [exitCode, errors] = await analyzeEntryPoint(directory);
    if (exitCode !== 0) {
      entryPoints[name].head = {
        status: Status.Failed,
        errors: errors,
      };
    } else {
      entryPoints[name].head.status = Status.Success;
    }
    core.endGroup();
  }

  globber = await glob.create(
    `${BASE_BRANCH_DIR}/${BUILD_DIR}/**/package.json`,
    {}
  );
  const files2 = await globber.glob();

  core.info('\u001b[35mAPI extractor for base branch');
  for (let path of files2) {
    const packageContent = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const name = packageContent.name;
    const newName = name.replace(/\//g, '_').replace(/\_/, '/');
    fs.writeFileSync(
      path,
      JSON.stringify({ ...packageContent, name: newName }, undefined, 2)
    );

    if (!entryPoints[name]) {
      entryPoints[name] = {
        name: name,
        head: { status: Status.Unknown },
        base: { status: Status.Unknown },
        file: `${newName.split('/')[1]}.api.md`,
      };
    }

    const directory = path.substring(0, path.length - `/package.json`.length);

    await copyApiExtractorConfig(directory);
    core.startGroup(name);
    const [exitCode, errors] = await analyzeEntryPoint(directory);
    if (exitCode !== 0) {
      entryPoints[name].base = {
        status: Status.Failed,
        errors: errors,
      };
    } else {
      entryPoints[name].base.status = Status.Success;
    }
    core.endGroup();
  }

  const commentsForEntryPoints = Object.values(entryPoints).map(
    generateCommentForEntryPoint
  );
  const notAnalyzedEntryPoints = extractListOfNotAnalyzedEntryPoints(
    Object.values(entryPoints)
  );

  const commentBody = generateCommentBody(
    commentsForEntryPoints,
    notAnalyzedEntryPoints
  );
  await printReport(commentBody, gh, relatedPR.number, context);
}

run();
