import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  // const FROM_TAG = process.env.FROM_TAG;
  // const TO_TAG = process.env.TO_TAG;

  if (!GITHUB_TOKEN) {
    throw new Error('Github token missing in action');
  }

  // if (!FROM_TAG) {
  //   throw new Error('From tag is missing');
  // }

  // if (!TO_TAG) {
  //   throw new Error('To tag is missing');
  // }

  //   const octoKit = github.getOctokit(GITHUB_TOKEN);
  // const context = github.context;

  let myOutput = '';
  let myError = '';

  const options: any = {};
  options.listeners = {
    stdout: (data: Buffer) => {
      myOutput += data.toString();
    },
    stderr: (data: Buffer) => {
      myError += data.toString();
    },
  };

  await exec.exec('yarn');

  await exec.exec(
    'npx ts-node scripts/changelog.ts --verbose --from asm-4.0.0',
    options
  );

  console.log('vanilla');
  console.log(JSON.stringify(myOutput));
  console.log('toString');
  console.log(myOutput.toString());
  console.log('ok');
  console.log(JSON.stringify(myOutput.toString()));
  console.log('ojmerwiotmweiogioemgio');
  console.log(myError.toString());

  // if they don't exist 'tags' for to and from, then git describe for head and previous head. test for now

  core.setOutput('fromTag', '3.0.0-test');
  core.setOutput('toTag', '5.0.0-test');
  core.setOutput('changelog', JSON.stringify(myOutput.toString()));
}

run();
