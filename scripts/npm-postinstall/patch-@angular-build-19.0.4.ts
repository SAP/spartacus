/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This script patches a DX bug in `@angular/build@19.0.4` that was fixed only in `@angular/build@19.2.11`,
 * but we couldn't upgrade to that version yet in our monorepo.
 *
 * Without this patch, the dev watch-mode build runs twice unnecessarily on first `npm run start` in our
 * `storefrontapp` project, degrading developer experience.
 *
 * This patch is not related to customer's apps. It's just a fix improving DX of Spartacus team devs to avoid
 * waiting for unnecessary build to finish.
 *
 * It's meant to be run automatically via a custom custom npm "postinstall" script - after each `npm install`,
 * so it mutates the `node_modules` directory.
 *
 * **NOTE**: This script is just a temporary workaround that should be removed in the future (likely in our
 *           2026 Framework Upgrade Release), when we'll bump Angular version in our monorepo to v21.0.0
 *           (which will already include the bugfix from v19.2.11).
 *
 * For reference, see:
 * - the original bugfix commit in Angular CLI repo in v19.2.11:
 *     https://github.com/angular/angular-cli/commit/b43da39499ca477a896f7f957debb05ceed1372a#diff-e2eea8f9fc0e55ec582f61380fe5ec9ce2376a09d13b9879835e0ac6ec12cc48R479
 * - the Angular CLI changelog:
 *     https://github.com/angular/angular-cli/blob/main/CHANGELOG.md#19211-2025-05-07
 */

import * as fs from 'fs';
import * as path from 'path';

function checkAngularBuildPackageInstalledVersion(): void {
  const EXPECTED_VERSION = '19.0.4';
  const PACKAGE_JSON_PATH = path.join(
    'node_modules',
    '@angular',
    'build',
    'package.json'
  );

  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  const version = packageJson.version;

  if (version !== EXPECTED_VERSION) {
    throw new Error(
      `Expected '@angular/build' version ${EXPECTED_VERSION}, but found ${version}`
    );
  }
}

const FILE_PATH_TO_PATCH = path.join(
  'node_modules',
  '@angular',
  'build',
  'src',
  'tools',
  'esbuild',
  'bundler-context.js'
);

function applyPatch(): void {
  const content = fs.readFileSync(FILE_PATH_TO_PATCH, 'utf8');

  const oldCode = `function isInternalAngularFile(file) {
    return file.startsWith('angular:');
}`;

  const newCode = `function isInternalAngularFile(file) {
    // SPARTACUS: It's a bugfix patch applied automatically in Spartacus repo via a custom npm "postinstall" script:
    // --- OLD CODE: ---
    // return file.startsWith('angular:')
    // --- NEW CODE: ---
    return file.startsWith('angular:') || file.startsWith('<define:');
}`;

  // Check if patch is already applied
  if (content.includes(newCode)) {
    console.log(
      `ℹ️  Spartacus npm postinstall: Patch already applied to '${FILE_PATH_TO_PATCH}'`
    );
    return;
  }

  // Check if patch can be applied
  if (!content.includes(oldCode)) {
    throw new Error(
      `The code to patch is not present:\n\`\`\`\n${oldCode}\n\`\`\``
    );
  }

  const newContent = content.replace(oldCode, newCode);
  fs.writeFileSync(FILE_PATH_TO_PATCH, newContent, 'utf8');
  console.log(
    `☑️  Spartacus npm postinstall: Successfully patched file '${FILE_PATH_TO_PATCH}'`
  );
}

try {
  checkAngularBuildPackageInstalledVersion();
  applyPatch();
} catch (error: unknown) {
  console.error(
    `❌  Spartacus npm postinstall: Error patching file '${FILE_PATH_TO_PATCH}'\n`,
    error
  );
  process.exit(1);
}
