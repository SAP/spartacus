/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * The extension of the fixture files.
 */
const FIXTURE_FILE_EXTENSION = '.fixture';

/**
 * Loads all fixture files from the given directory into a schematic test runner `tree`.
 */
export function loadFixturesIntoTree({
  tree,
  fixturesDir,
}: {
  tree: UnitTestTree;
  fixturesDir: string;
}) {
  function addFilesToTree(dir: string) {
    const dirEntries = readdirSync(dir, { withFileTypes: true });

    for (const dirEntry of dirEntries) {
      const fullPath = join(dir, dirEntry.name);

      if (dirEntry.isDirectory()) {
        addFilesToTree(fullPath);
        continue;
      }

      if (dirEntry.isFile() && dirEntry.name.endsWith(FIXTURE_FILE_EXTENSION)) {
        const content = readFileSync(fullPath, 'utf-8');
        const relativePath = fullPath.slice(fixturesDir.length);
        const targetPath = join(
          '/',
          relativePath.replace(FIXTURE_FILE_EXTENSION, '')
        );
        tree.create(targetPath, content);
      }
    }
  }

  addFilesToTree(fixturesDir);
}
