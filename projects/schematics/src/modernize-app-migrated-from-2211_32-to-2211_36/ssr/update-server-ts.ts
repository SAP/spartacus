/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { printErrorWithDocsForMigrated_2211_32_To_2211_36 as printErrorWithDocs } from '../fallback-advice-to-follow-docs';

/**
 * Moves the `server.ts` file to the `src/` folder and updates the implementation,
 * to adapt to the new Angular v19 standards.
 *
 * 1. Moves the `server.ts` file to the `src/` folder.
 * 2. Updates the import path from `./src/main.server` to `./main.server`.
 */
export function updateServerTs(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    enum ServerTsPaths {
      OLD = 'server.ts',
      NEW = 'src/server.ts',
    }

    context.logger.info(
      `\n⏳ Moving "${ServerTsPaths.OLD}" to "${ServerTsPaths.NEW}" and relative import paths...`
    );

    if (!tree.exists(ServerTsPaths.OLD)) {
      printErrorWithDocs(`${ServerTsPaths.OLD} file not found`, context);
      return;
    }

    const content = tree.read(ServerTsPaths.OLD);
    if (!content) {
      printErrorWithDocs(`Failed to read ${ServerTsPaths.OLD} file`, context);
      return;
    }

    let serverTs = content.toString();

    context.logger.info(
      '  ↳ Updating relative import path from "./src/main.server" to "./main.server"'
    );
    serverTs = serverTs.replace(
      /from ['"]\.\/src\/main\.server['"];/,
      "from './main.server';"
    );

    context.logger.info(
      `  ↳ Moving the file "${ServerTsPaths.OLD}" to "${ServerTsPaths.NEW}" with the updated content`
    );
    tree.create(ServerTsPaths.NEW, serverTs);
    tree.delete(ServerTsPaths.OLD);

    context.logger.info(
      `✅ Moved and updated ${ServerTsPaths.OLD} to ${ServerTsPaths.NEW}`
    );
  };
}
