/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cache from '@actions/cache';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';

async function run() {
  core.startGroup('npm');
  let exitCode = await exec.exec('npm', ['i'], {
    ignoreReturnCode: true,
  });
  core.endGroup();
  if (exitCode !== 0) {
    core.setFailed(`NPM install failed`);
  }

  core.startGroup('npm run build:libs');
  exitCode = await exec.exec('npm', ['run', 'build:libs'], {
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
