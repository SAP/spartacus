import * as github from '@actions/github';
import { addCommentToPR, checkPullRequestTitle } from './functions';

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  const octoKit = github.getOctokit(GITHUB_TOKEN);
  const context = octoKit.context;

  if (!context.payload.pull_request) {
    throw new Error('Not triggered by a pull request');
  }

  if (!GITHUB_TOKEN) {
    throw new Error('Github token missing in action');
  }

  const { isTypeValid, isScopeValid } = checkPullRequestTitle(
    context.payload.pull_request.title
  );

  await addCommentToPR(
    octoKit,
    context.pull_request,
    context,
    isTypeValid,
    isScopeValid
  );
}

run();
