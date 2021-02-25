import * as github from '@actions/github';
import * as exec from '@actions/exec';
import { getBundleId } from './functions';

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

  await exec.exec('sh', ['./.github/hs-deploy-action/upp-cli-setup.sh']);

  const bundleId = getBundleId(pr.head.ref);
  const command = `upp application undeploy --noprompt -b ${bundleId} -e stage`;

  const options: any = {};
  options.listeners = {
    stdout: (data: Buffer) => {
      console.log(data.toString());
    },

    stderr: (data: Buffer) => {
      console.log(`upp deploy exited with error:  ${data.toString()}`);
    },
  };

  console.log(
    `Starting Hosting Service Undeployment of PR branch ${pr.head.ref}`
  );

  //run sh to get CLI and prep
  await exec.exec(command, [], options);

  console.log('Application undeployed from Hosting service successfully');
}

run();
