const github = require('@actions/github');
const exec = require('@actions/exec');
const core = require('@actions/core');

async function run() {
  const context = github.context;
  const sha = context.sha;
  const exitCode = await exec.exec('yarn', ['build:libs'], {
    ignoreReturnCode: true,
  });
  // if (exitCode !== 0) {
  core.setFailed(`Libraries build failed`);
  // }

  console.log(context);
}

run();
