import * as cache from '@actions/cache';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';

async function run() {
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
  const key = `dist-${github.context.sha}`;
  try {
    await cache.saveCache(paths, key);
  } catch {
    core.setFailed(`Saving cache failed`);
  }
}

run();
