import * as github from '@actions/github';
import { addCommentToPR, checkPullRequestTitle } from './functions';

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    throw new Error('Github token missing in action');
  }

  const octoKit = github.getOctokit(GITHUB_TOKEN);
  const context = github.context;

  if (!context.payload.pull_request) {
    throw new Error('Not triggered by a pull request');
  }

  const { isTypeValid, isScopeValid } = checkPullRequestTitle(
    context.payload.pull_request.title
  );

  await addCommentToPR(
    octoKit,
    context.payload.pull_request,
    context,
    isTypeValid,
    isScopeValid
  );
}

run();
