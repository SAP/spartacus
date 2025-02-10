/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { printErrorWithDocsForMigrated_2211_32_To_2211_35 as printErrorWithDocs } from '../fallback-advice-to-follow-docs';

/**
 * Moves the `src/assets/` folder to the root and renames it to `public/`,
 * to adapt to the new Angular v19 standards.
 */
export function moveAssetsToPublic(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    enum AssetsDirs {
      OLD = 'src/assets',
      NEW = 'public',
    }

    context.logger.info(
      `\n⏳ Moving assets folder from "${AssetsDirs.OLD}/" to "${AssetsDirs.NEW}/"...`
    );

    const sourceDir = tree.getDir(AssetsDirs.OLD);
    if (!sourceDir.subfiles.length && !sourceDir.subdirs.length) {
      printErrorWithDocs(
        `Assets folder not found or empty at ${AssetsDirs.OLD}`,
        context
      );
      return;
    }

    try {
      tree.getDir(AssetsDirs.OLD).visit((filePath) => {
        const relativeFilePath = filePath.replace(`${AssetsDirs.OLD}/`, '');
        context.logger.info(`  ↳ Moving file "${filePath}"`);

        const content = tree.read(filePath);
        if (content) {
          tree.create(`${AssetsDirs.NEW}/${relativeFilePath}`, content);
        } else {
          printErrorWithDocs(`Failed to read ${filePath} file`, context);
        }
      });
    } catch (error) {
      printErrorWithDocs(
        `Error moving assets file from "${AssetsDirs.OLD}" to "${AssetsDirs.NEW}". Error: ${error}`,
        context
      );
    }

    context.logger.info(`  ↳ Deleting old "${AssetsDirs.OLD}/" directory`);
    try {
      tree.delete(AssetsDirs.OLD);
    } catch (error) {
      printErrorWithDocs(
        `Error deleting old assets directory "${AssetsDirs.OLD}". Error: ${error}`,
        context
      );
    }

    context.logger.info(
      `✅ Moved assets folder from "${AssetsDirs.OLD}/" to "${AssetsDirs.NEW}/"`
    );
  };
}
