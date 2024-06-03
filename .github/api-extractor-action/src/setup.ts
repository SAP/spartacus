/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cache from '@actions/cache';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import { BASE_BRANCH_DIR, BUILD_DIR, REPORT_DIR } from './const';

/**
 * Prepare repository with base branch clone for api-extractor
 *
 * @param branch base branch
 * @param baseCommit base commit
 */
export async function prepareRepositoryForApiExtractor(
  branch: string,
  baseCommit: string
): Promise<void> {
  core.startGroup('Prepare branches for extractor');

  // Install dependencies to build libraries
  await exec.exec('npm', ['i']);
  // Create directory for reports
  await io.mkdirP(`${REPORT_DIR}`);

  await exec.exec('npm', ['i', '-g', '@microsoft/api-extractor@^7.12.0']);

  // Clone base branch
  await exec.exec('sh', [
    './.github/api-extractor-action/prepare-repo-for-api-extractor.sh',
    branch,
    BASE_BRANCH_DIR,
    baseCommit,
  ]);

  // Try to restore builded libraries for base branch
  // Builded libraries are cached by `cache-builded-libs` action
  const paths = [BUILD_DIR];
  const key = `dist-${baseCommit}`;
  const BUILD_COMMAND = 'build:libs';

  try {
    await cache.restoreCache(paths, key, []);

    // Cache restores files in the same location, so we need to move them manually
    await io.cp(BUILD_DIR, `${BASE_BRANCH_DIR}/${BUILD_DIR}`, {
      recursive: true,
      force: false,
    });
    await io.rmRF(BUILD_DIR);

    core.info('successfully restored dist from cache');
  } catch {
    core.warning(
      'dist folder not found as it failed to be restored from cache'
    );

    // If we didn't restore builded libs from cache on the BASE branch, we need to also build base branch
    await exec.exec('npm', ['--prefix', BASE_BRANCH_DIR]);
    await exec.exec('npm', ['--prefix', BASE_BRANCH_DIR, 'run', BUILD_COMMAND]);
  }

  // Build the libraries from the HEAD branch
  // TODO: We can parallel these builds, when schematics builds won't trigger npm install
  await exec.exec('npm', ['i']);
  await exec.exec('npm', ['run', BUILD_COMMAND]);

  core.endGroup();
}
