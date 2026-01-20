/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Project, SyntaxKind } from 'ts-morph';

/**
 * Updates src/app/app.module.server.ts:
 * - Removes `imports: [AppModule]`
 * - Removes `bootstrap: [AppComponent]`
 */
export function updateAppModuleServer(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appModuleServerPath = 'src/app/app.module.server.ts';

    if (!tree.exists(appModuleServerPath)) {
      context.logger.warn(`⚠️ File ${appModuleServerPath} not found, skipping`);
      return tree;
    }

    context.logger.info('⏳ Updating app.module.server.ts...');

    const content = tree.read(appModuleServerPath)?.toString('utf-8');
    if (!content) {
      throw new Error(`Could not read ${appModuleServerPath}`);
    }

    const project = new Project({ useInMemoryFileSystem: true });
    const sourceFile = project.createSourceFile(appModuleServerPath, content, {
      overwrite: true,
    });

    // Find the @NgModule decorator
    const classDeclaration = sourceFile.getClass('AppServerModule');
    if (!classDeclaration) {
      throw new Error('Could not find AppServerModule class');
    }

    const decorator = classDeclaration.getDecorator('NgModule');
    if (!decorator) {
      throw new Error('Could not find @NgModule decorator');
    }

    const decoratorArgs = decorator.getArguments();
    if (decoratorArgs.length === 0) {
      throw new Error('@NgModule decorator has no arguments');
    }

    const configObject = decoratorArgs[0];
    if (!configObject.isKind(SyntaxKind.ObjectLiteralExpression)) {
      throw new Error('@NgModule decorator argument is not an object');
    }

    // Remove imports property
    const importsProp = configObject.getProperty('imports');
    if (importsProp) {
      importsProp.remove();
    }

    // Remove bootstrap property
    const bootstrapProp = configObject.getProperty('bootstrap');
    if (bootstrapProp) {
      bootstrapProp.remove();
    }

    // Remove AppModule import if no longer used
    const appModuleImport = sourceFile.getImportDeclaration('./app.module');
    if (appModuleImport) {
      appModuleImport.remove();
    }

    tree.overwrite(appModuleServerPath, sourceFile.getFullText());

    context.logger.info('✅ Updated app.module.server.ts');

    return tree;
  };
}
