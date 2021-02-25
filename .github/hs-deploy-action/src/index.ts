import * as github from '@actions/github';
import * as exec from '@actions/exec';
import { build } from './functions';
import { deploy, undeploy } from './deploy';

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const UPP_ACTION = process.env.UPP_ACTION;

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
  const octoKit = github.getOctokit(GITHUB_TOKEN);

  console.log(`Starting Hosting service deployment of PR branch ${branch}.`);

  //run sh to get CLI and prep
  await exec.exec('sh', ['./.github/hs-deploy-action/upp-cli-setup.sh']);

  if (UPP_ACTION === 'deploy') {
    await build();
    await deploy(github, octoKit);
    console.log('--> Hosting service deployment done');
  } else if (UPP_ACTION === 'undeploy') {
    await undeploy(branch);
  }
}

run();
