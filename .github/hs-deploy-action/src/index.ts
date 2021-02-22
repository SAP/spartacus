import * as github from '@actions/github';
import * as exec from '@actions/exec';
import { build } from './functions';

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    throw new Error('Github token missing in action');
  }

  const context = github.context;
  const pr = context.payload.pull_request;

  if (!pr) {
    throw new Error(
      'Missing pull request context! Make sure to run this action only for pull_requests.'
    );
  }

  const baseBranch = pr.head.ref;

  console.log(`All good. Base branch ${baseBranch}`);

  //run sh to get CLI and prep
  await exec.exec('sh', ['./.github/hs-deploy-action/upp-cli-setup.sh']);

  build();

  // add comment to PR
}

run();
