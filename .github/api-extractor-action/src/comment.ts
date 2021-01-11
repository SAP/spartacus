import { Context } from '@actions/github/lib/context';
import * as fs from 'fs';
import {
  EntryPoints,
  EntryPointStatus,
  FailedStatus,
  Status,
} from './api-extractor';
import { BASE_BRANCH_DIR, REPORT_DIR } from './const';

const diff = require('diff-lines');
const normalizeNewline = require('normalize-newline');

const COMMENT_HEADER = '## Public API changes';

/**
 * Generates github comment content for pull request with bot results
 *
 * @param analyzedComments List of comments for each analysed entry point
 * @param notAnalyzableEntryPoints List of entry points that couldn't be analyzed
 */
function generateCommentBody(
  analyzedComments: string[],
  notAnalyzableEntryPoints: [string, string][]
): string {
  return `${COMMENT_HEADER}\n${generateCommentForAnalyzed(
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
 * @param notAnalyzableEntryPoints List of entry points with errors that couldn't be analyzed
 */
function generateCommentForNotAnalyzed(
  notAnalyzableEntryPoints: [string, string][]
): string {
  const listOfEntryPoints = notAnalyzableEntryPoints
    .map(([entryPoint, error]) => `- ${entryPoint} - \`${error}\``)
    .join('\n');
  return `\n\n#### :warning: Some entry points are currently impossible to analyze.
<details>
<summary>Read more</summary>
${listOfEntryPoints}
</details>`;
}

/**
 * Generate list of all entry points that could not be analyzed.
 *
 * @param entryPoints List of entry point status with errors
 */
function extractListOfNotAnalyzedEntryPoints(
  entryPoints: EntryPointStatus[]
): [string, string][] {
  const notAnalyzedEntryPoints = entryPoints
    .filter((entryPoint) => {
      return (
        entryPoint.head.status === Status.Failed &&
        entryPoint.base.status === Status.Failed
      );
    })
    .map((entryPoints) => {
      const errors = (entryPoints.head as FailedStatus).errors;
      let error = '';
      if (errors.length > 0) {
        error = errors[0];
      }
      return [entryPoints.name, error] as [string, string];
    });

  return notAnalyzedEntryPoints;
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
    const publicApi = extractSnippetFromFile(`${REPORT_DIR}/${entry.file}`);
    return `### :warning: ${entry.name}
New entry point. Initial public api:
\`\`\`ts
${publicApi}
\`\`\``;
  }
  return '';
}

/**
 * Update or create comment in the PR with API extractor result.
 *
 * @param body Content of the comment
 * @param ghClient Github client
 * @param issueNumber PR number
 * @param context Context of the github action
 */
async function printReport(
  body: string,
  ghClient: any,
  issueNumber: number,
  context: Context
) {
  if (!context.payload.repository) {
    throw new Error('Missing repository in context!');
  }
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;

  const comments = await ghClient.issues.listComments({
    issue_number: issueNumber,
    owner,
    repo,
  });

  const botComment = comments.data.filter(
    (comment: any) =>
      comment.body.includes(COMMENT_HEADER) &&
      comment.user.login === 'github-actions[bot]'
  );

  if (botComment && botComment.length) {
    await ghClient.issues.deleteComment({
      comment_id: botComment[0].id,
      owner,
      repo,
    });
  }
  await ghClient.issues.createComment({
    issue_number: issueNumber,
    owner,
    repo,
    body,
  });
}

export async function addCommentToPR(
  entryPoints: EntryPoints,
  ghClient: any,
  relatedPR: { number: number },
  context: Context
) {
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
  await printReport(commentBody, ghClient, relatedPR.number, context);
}
