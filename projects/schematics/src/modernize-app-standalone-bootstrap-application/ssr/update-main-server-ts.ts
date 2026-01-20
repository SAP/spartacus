/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Project, SyntaxKind } from 'ts-morph';

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

    // Remove AppServerModule import
    const appServerModuleImport = sourceFile.getImportDeclaration(
      './app/app.module.server'
    );
    if (appServerModuleImport) {
      appServerModuleImport.remove();
    }

    // Add necessary imports
    const platformBrowserImport = sourceFile.getImportDeclaration(
      '@angular/platform-browser'
    );
    if (!platformBrowserImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: '@angular/platform-browser',
        namedImports: ['BootstrapContext', 'bootstrapApplication'],
      });
    } else {
      const namedImports = platformBrowserImport.getNamedImports();
      const hasBootstrapApplication = namedImports.some(
        (ni) => ni.getName() === 'bootstrapApplication'
      );
      const hasBootstrapContext = namedImports.some(
        (ni) => ni.getName() === 'BootstrapContext'
      );
      if (!hasBootstrapApplication) {
        platformBrowserImport.addNamedImport('bootstrapApplication');
      }
      if (!hasBootstrapContext) {
        platformBrowserImport.addNamedImport('BootstrapContext');
      }
    }

    // Add AppComponent import
    const appComponentImport = sourceFile.getImportDeclaration(
      './app/app.component'
    );
    if (!appComponentImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: './app/app.component',
        namedImports: ['AppComponent'],
      });
    }

    // Add config import
    const configImport = sourceFile.getImportDeclaration(
      './app/app.config.server'
    );
    if (!configImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: './app/app.config.server',
        namedImports: ['config'],
      });
    }

    // Add bootstrap function export
    const bootstrapFunction = `
const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, config, context);

export default bootstrap;
`;

    sourceFile.addStatements(bootstrapFunction);

    tree.overwrite(mainServerPath, sourceFile.getFullText());

    context.logger.info('✅ Updated main.server.ts');

    return tree;
  };
}
