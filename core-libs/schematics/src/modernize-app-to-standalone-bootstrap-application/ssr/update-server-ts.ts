/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Project, SourceFile, SyntaxKind } from 'ts-morph';
import { formatFile } from '../../shared';

/**
 * Updates src/server.ts:
 * - Renames import from AppServerModule to bootstrap
 * - Updates ngExpressEngine({ bootstrap: AppServerModule }) to use bootstrap
 */
export function updateServerTs(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const serverTsPath = 'src/server.ts';

    if (!tree.exists(serverTsPath)) {
      context.logger.warn(`⚠️ File ${serverTsPath} not found, skipping`);
      return tree;
    }

    context.logger.info('⏳ Updating server.ts...');

    const content = tree.read(serverTsPath)?.toString('utf-8');
    if (!content) {
      throw new Error(`Could not read ${serverTsPath}`);
    }

    const project = new Project({ useInMemoryFileSystem: true });
    const sourceFile = project.createSourceFile(serverTsPath, content, {
      overwrite: true,
    });

    renameDefaultImportFromAppServerModuleToBootstrap(sourceFile);
    renameReferencesOfAppServerModuleToBootstrap(sourceFile);

    formatFile(sourceFile);
    tree.overwrite(serverTsPath, sourceFile.getFullText());

    context.logger.info('✅ Updated server.ts');

    return tree;
  };
}

function renameDefaultImportFromAppServerModuleToBootstrap(
  sourceFile: SourceFile
) {
  // Find and update the import from main.server
  const mainServerImport = sourceFile.getImportDeclaration('./main.server');
  if (mainServerImport) {
    const defaultImport = mainServerImport.getDefaultImport();
    if (defaultImport) {
      // Rename AppServerModule to bootstrap
      const currentName = defaultImport.getText();
      if (currentName === 'AppServerModule') {
        defaultImport.rename('bootstrap');
      }
    } else {
      // If no default import exists, add it
      mainServerImport.setDefaultImport('bootstrap');
    }

    // Remove named imports if any (AppServerModule)
    const namedImports = mainServerImport.getNamedImports();
    for (const namedImport of namedImports) {
      if (namedImport.getName() === 'AppServerModule') {
        namedImport.remove();
      }
    }
  }
}

function renameReferencesOfAppServerModuleToBootstrap(sourceFile: SourceFile) {
  // Update any references to AppServerModule to bootstrap
  const identifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier);
  for (const identifier of identifiers) {
    if (identifier.getText() === 'AppServerModule') {
      identifier.replaceWithText('bootstrap');
    }
  }
}
