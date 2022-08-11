import * as exec from '@actions/exec';
import { ExecOptions } from '@actions/exec';
import { addComment, getBundleId } from './functions';

/**
 * Deploys an app to the hosting service
 * @param github Github object
 * @param octoKit Octokit object
 * @param branch Name of the branch to deploy
 */
export async function deploy(github: any, octoKit: any, branch: string) {
  const context = github.context;

  console.log(`--> Deploying branch ${branch}`);

  const bundleId = getBundleId(branch);
  const command = `upp application deploy -b ${bundleId} -t spartacus --csr-dist ./dist/storefrontapp --ssr-dist ./dist/storefrontapp-server -e stage`;

  const exp = /https\:\/\/\w+\.cloudfront\.net/;
  const ERROR = 'Response code: 500';

  const options: ExecOptions = {};
  options.listeners = {
    stdout: async (data: Buffer) => {
      const line = data.toString();

      if (line.includes(ERROR)) {
        const body = `:exclamation: Spartacus deployment failed (${line}). Check job logs for details.)`;
        console.log(`--> ${body}`);
        await addComment(context, octoKit, body);

        process.exitCode = 1;
        process.exit();
      }

      const match = line.match(exp);
      if (match && match.length > 0) {
        const body = `:rocket: Spartacus deployed to [${match}](${match})`;
        console.log(`--> ${body}`);
        await addComment(context, octoKit, body);
      }
    },
    stderr: (data: Buffer) => {
      console.log(`upp deploy exited with error:  ${data.toString()}`);
    },
  };

  await exec.exec(command, [], options);
}

/**
 * Undeploys an app from the Upscale hosting service
 * @param branch Name of the branch to undeploy
 */
export async function undeploy(branch: any) {
  const bundleId = getBundleId(branch);
  const command = `upp application undeploy -b ${bundleId} -e stage`;

  const options: ExecOptions = {
    input: Buffer.from('confirm\n'),
  };
  options.listeners = {
    stdout: (data: Buffer) => {
      console.log(data.toString());
    },

    stderr: (data: Buffer) => {
      console.log(`upp deploy exited with error:  ${data.toString()}`);
    },
  };

  console.log(`Starting Hosting Service Undeployment of PR branch ${branch}`);

  //run sh to get CLI and prep
  await exec.exec(command, [], options);

  console.log('Application undeployed from Hosting service successfully');
}
