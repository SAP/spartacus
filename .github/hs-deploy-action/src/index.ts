import * as github from '@actions/github';
import * as exec from '@actions/exec';
import { addComment, build, deploy } from './functions';

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

  const branch = pr.head.ref;

  console.log(`Starting Hosting service deployment of PR branch ${branch}`);

  //run sh to get CLI and prep
  // await exec.exec('sh', ['./.github/hs-deploy-action/upp-cli-setup.sh']);

  // await build();

  // await deploy(github);

  await addComment(github, 'Sample comment');
}

run();
