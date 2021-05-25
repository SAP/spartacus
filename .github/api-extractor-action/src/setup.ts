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
  await exec.exec('yarn');
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
  const cacheKey = await cache.restoreCache(paths, key, []);
  if (cacheKey) {
    // Cache restores files in the same location, so we need to move them manually
    await io.cp(BUILD_DIR, `${BASE_BRANCH_DIR}/${BUILD_DIR}`, {
      recursive: true,
      force: false,
    });
    await io.rmRF(BUILD_DIR);
  }

  // Build the libraries
  // TODO: We can parallel these builds, when schematics builds won't trigger yarn install
  const BUILD_COMMAND = 'build:libs';
  await exec.exec('yarn');
  await exec.exec('yarn', [BUILD_COMMAND]);
  // If we didn't restored builded libs, we need to also build base branch
  if (!cacheKey) {
    await exec.exec('yarn', ['--cwd', BASE_BRANCH_DIR]);
    await exec.exec('yarn', ['--cwd', BASE_BRANCH_DIR, BUILD_COMMAND]);
  }

  core.endGroup();
}
