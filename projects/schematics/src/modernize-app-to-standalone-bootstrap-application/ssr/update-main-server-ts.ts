/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Project, SourceFile, SyntaxKind } from 'ts-morph';
import { createImports, formatFile } from '../../shared';

/**
 * Updates src/main.server.ts:
 * - Removes `export { AppServerModule as default }`
 * - Adds imports for BootstrapContext, bootstrapApplication, AppComponent, config
 * - Exports bootstrap function
 */
export function updateMainServerTs(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const mainServerPath = 'src/main.server.ts';

    if (!tree.exists(mainServerPath)) {
      context.logger.warn(`⚠️ File ${mainServerPath} not found, skipping`);
      return tree;
    }

    context.logger.info('⏳ Updating main.server.ts...');

    const content = tree.read(mainServerPath)?.toString('utf-8');
    if (!content) {
      throw new Error(`Could not read ${mainServerPath}`);
    }

    const project = new Project({ useInMemoryFileSystem: true });
    const sourceFile = project.createSourceFile(mainServerPath, content, {
      overwrite: true,
    });

    removeAppServerModuleDefaultExport(sourceFile);
    removeAppServerModuleImport(sourceFile);
    addBootstrapFunctionExport(sourceFile);

    formatFile(sourceFile);
    tree.overwrite(mainServerPath, sourceFile.getFullText());

    context.logger.info('✅ Updated main.server.ts');

    return tree;
  };
}

function removeAppServerModuleDefaultExport(sourceFile: SourceFile) {
  // Remove the export { AppServerModule as default } or export default AppServerModule
  const exportDeclarations = sourceFile.getExportDeclarations();
  for (const exportDecl of exportDeclarations) {
    const moduleSpecifier = exportDecl.getModuleSpecifier()?.getText();
    if (moduleSpecifier?.includes('app.module.server')) {
      exportDecl.remove();
    }
  }

  // Also check for export assignments
  const exportAssignments = sourceFile.getDescendantsOfKind(
    SyntaxKind.ExportAssignment
  );
  for (const exportAssignment of exportAssignments) {
    exportAssignment.remove();
  }
}

function removeAppServerModuleImport(sourceFile: SourceFile) {
  // Remove AppServerModule import
  const appServerModuleImport = sourceFile.getImportDeclaration(
    './app/app.module.server'
  );
  if (appServerModuleImport) {
    appServerModuleImport.remove();
  }
}

function addBootstrapFunctionExport(sourceFile: SourceFile) {
  createImports(sourceFile, [
    {
      moduleSpecifier: '@angular/platform-browser',
      namedImports: ['BootstrapContext', 'bootstrapApplication'],
    },
    {
      moduleSpecifier: './app/app.component',
      namedImports: ['AppComponent'],
    },
    {
      moduleSpecifier: './app/app.config.server',
      namedImports: ['config'],
    },
  ]);

  // Add bootstrap function export
  const bootstrapFunction = `
const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, config, context);

export default bootstrap;
`;

  sourceFile.addStatements(bootstrapFunction);
}
