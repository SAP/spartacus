const github = require('@actions/github');
const exec = require('@actions/exec');
const core = require('@actions/core');
const cache = require('@actions/cache');

async function run() {
  const context = github.context;
  const sha = context.sha;
  core.startGroup('yarn');
  let exitCode = await exec.exec('yarn', [], {
    ignoreReturnCode: true,
  });
  core.endGroup();
  if (exitCode !== 0) {
    core.setFailed(`Yarn install failed`);
  }
  core.startGroup('yarn build:libs');
  exitCode = await exec.exec('yarn', ['build:libs'], {
    ignoreReturnCode: true,
  });
  core.endGroup();
  if (exitCode !== 0) {
    core.setFailed(`Libraries build failed`);
  }
  const paths = ['dist'];
  const key = `dist-${sha}`;
  try {
    await cache.saveCache(paths, key);
  } catch {
    core.setFailed(`Saving cache failed`);
  }
}

run();
