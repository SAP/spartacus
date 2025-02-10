/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { printErrorWithDocsForMigrated_2211_32_To_2211_35 as printErrorWithDocs } from '../fallback-advice-to-follow-docs';

/**
 * Moves the `favicon.ico` file from the `src/` folder to the `public/` folder,
 * to adapt to the new Angular v19 standards.
 */
export function moveFaviconToPublic(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const fileName = 'favicon.ico';

    const oldDir = 'src';
    const oldPath = `${oldDir}/${fileName}`;

    const newDir = 'public';
    const newPath = `${newDir}/${fileName}`;

    context.logger.info(
      `\n⏳ Moving ${fileName} from "${oldDir}/" to "${newDir}/"...`
    );

    if (!tree.exists(oldPath)) {
      printErrorWithDocs(`Favicon not found at ${oldPath}`, context);
      return;
    }

    const content = tree.read(oldPath);
    if (content) {
      tree.create(newPath, content);
      tree.delete(oldPath);
    } else {
      printErrorWithDocs(`Failed to read ${oldPath} file`, context);
      return;
    }

    context.logger.info(
      `✅ Moved ${fileName} from "${oldDir}/" to "${newDir}/"`
    );
  };
}
