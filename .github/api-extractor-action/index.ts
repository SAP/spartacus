/**
 * Terminology:
 *  - head branch -> branch you are working on
 *  - base branch -> branch you want to merge to
 */

import type { ExecOptions } from '@actions/exec';
const exec = require('@actions/exec');
const github = require('@actions/github');
const core = require('@actions/core');
const glob = require('@actions/glob');
const io = require('@actions/io');
const cache = require('@actions/cache');
const fs = require('fs');
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
 * Generate github comment for pull request with bot results
 *
 * @param analyzedComments List of comments for each analysed entry point
 * @param notAnalyzableEntryPoints List of entry points that couldn't be analyzed
 */
function generateCommentBody(
  analyzedComments: string[],
  notAnalyzableEntryPoints: string[]
) {
  return `## ${COMMENT_HEADER}\n${generateCommentForAnalyzed(
    analyzedComments
  )}${generateCommentForNotAnalyzed(notAnalyzableEntryPoints)}`;
}

function generateCommentForAnalyzed(comments: string[]) {
  const changedEntryPoints = comments.filter((comment) => !!comment);
  if (!changedEntryPoints.length) {
    return '### :heavy_check_mark: Nothing changed in analyzed entry points.';
  } else {
    return changedEntryPoints.join('\n');
  }
}

function generateCommentForNotAnalyzed(notAnalyzableEntryPoints: string[]) {
  const listOfEntryPoints = notAnalyzableEntryPoints
    .map((entryPoint: string) => `- ${entryPoint}`)
    .join('\n');
  return `\n\n### :warning: Impossible to analyze\n${listOfEntryPoints}`;
}

async function printReport(
  body: string,
  gh: any,
  issueNumber: string,
  owner: string,
  repo: string
) {
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
  const gh = github.getOctokit(GITHUB_TOKEN);

  const context = github.context;

  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;

  const relatedPR = context.payload.pull_request;

  const issueNumber = relatedPR.number;
  const baseBranch = relatedPR.base.ref;
  const baseCommit = relatedPR.base.sha;

  let globber = await glob.create(
    '.github/api-extractor-action/api-extractor.json',
    {}
  );
  const apiExtractorConfigPath = (await globber.glob())[0];

  await prepareRepositoryForApiExtractor(baseBranch, baseCommit);

  let entryPoints: any = {};

  globber = await glob.create(`${BUILD_DIR}/**/package.json`, {});
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

    await io.cp(apiExtractorConfigPath, directory);
    const options: ExecOptions = {
      ignoreReturnCode: true,
      delay: 1000,
    };
    let myError: any[] = [];
    options.listeners = {
      errline: (line) => {
        myError.push(line);
      },
    };
    core.startGroup(`${name}`);
    const exitCode = await exec.exec(
      'sh',
      ['./.github/api-extractor-action/api-extractor.sh', directory],
      options
    );
    if (exitCode !== 0) {
      entryPoints[name].head.status = Status.Failed;
      entryPoints[name].head.errors = myError.filter((line) =>
        line.startsWith('ERROR: ')
      );
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

    await io.cp(apiExtractorConfigPath, directory);
    const options: ExecOptions = {
      ignoreReturnCode: true,
      delay: 1000,
    };
    let myError: any = [];
    options.listeners = {
      errline: (line) => {
        myError.push(line);
      },
    };
    core.startGroup(name);
    const exitCode = await exec.exec(
      'sh',
      ['./.github/api-extractor-action/api-extractor.sh', directory],
      options
    );
    if (exitCode !== 0) {
      entryPoints[name].base.status = Status.Failed;
      entryPoints[name].base.errors = myError.filter((line: string) =>
        line.startsWith('ERROR: ')
      );
    } else {
      entryPoints[name].base.status = Status.Success;
    }
    core.endGroup();
  }

  let notAnalyzableEntryPoints: any = [];

  const comment = Object.values(entryPoints).map((entry: any) => {
    if (
      entry.head.status === Status.Success &&
      entry.base.status === Status.Success
    ) {
      // prepare diff
      const diff = getDiff(entry.file);
      if (diff) {
        return `### :warning: ${entry.name}\n\`\`\`diff\n${diff}\n\`\`\``;
      }
      return '';
    } else if (
      entry.head.status === Status.Failed &&
      entry.base.status === Status.Success
    ) {
      return `### :boom: ${entry.name}
Library no longer can be analyzed with api-extractor. Please check the errors:\n\`\`\`
${entry.head.errors.join('\n')}\n\`\`\``;
    } else if (
      entry.head.status === Status.Success &&
      entry.base.status === Status.Failed
    ) {
      return `### :green_heart: ${entry.name}\nLibrary can now by analyzed with api-extractor.`;
    } else if (
      entry.head.status === Status.Failed &&
      entry.base.status === Status.Failed
    ) {
      notAnalyzableEntryPoints.push(entry.name);
      if (entry.head.errors[0] !== entry.base.errors[0]) {
        return `### :boom: ${entry.name}\nNew error: \`${entry.head.errors[0]}\`\nPrevious error: \`${entry.base.errors[0]}\``;
      }
    } else if (entry.head.status === Status.Unknown) {
      return `### :boom: ${entry.name}\nEntry point removed. Are you sure it was intentional?`;
    } else if (entry.base.status === Status.Unknown) {
      const publicApi = extractSnippetFromFile(`etc/${entry.file}`);
      return `### :warning: ${entry.name}\nNew entry point. Initial public api:\n\`\`\`ts\n${publicApi}\n\`\`\``;
    }
    return '';
  });

  function extractSnippetFromFile(filename: string): string {
    const regexForTSSnippetInMarkdown = /```ts([\s\S]*)```/ms;
    const result = regexForTSSnippetInMarkdown.exec(
      normalizeNewline(fs.readFileSync(filename, 'utf-8'))
    );
    if (result) {
      return result[1].trim();
    }
    return '';
  }

  function getDiff(file: string) {
    const sourceBranchReportDirectory = `${REPORT_DIR}`;
    const targetBranchReportDirectory = `${BASE_BRANCH_DIR}/${REPORT_DIR}`;
    const sourceBranchSnippet = extractSnippetFromFile(
      `${sourceBranchReportDirectory}/${file}`
    );
    const targetBranchSnippet = extractSnippetFromFile(
      `${targetBranchReportDirectory}/${file}`
    );
    return diff(targetBranchSnippet, sourceBranchSnippet, {
      n_surrounding: 3,
    });
  }

  const commentBody = generateCommentBody(comment, notAnalyzableEntryPoints);
  await printReport(commentBody, gh, issueNumber, owner, repo);
}

run();
