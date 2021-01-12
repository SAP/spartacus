/**
 * Terminology:
 *  - head branch -> branch you are working on
 *  - base branch -> branch you want to merge to
 */

import * as github from '@actions/github';
import { analyzeEntryPoints, EntryPoints } from './api-extractor';
import { addCommentToPR } from './comment';
import { prepareRepositoryForApiExtractor } from './setup';

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

  const entryPoints: EntryPoints = {};

  // Run api-extractor for entry points in the head branch
  await analyzeEntryPoints('head', entryPoints);

  // Run api-extractor for entry points in the base branch
  await analyzeEntryPoints('base', entryPoints);

  await addCommentToPR(entryPoints, gh, relatedPR, context);
}

run();
