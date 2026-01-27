/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Project, SourceFile, SyntaxKind } from 'ts-morph';
import {
  createImports,
  formatFile,
  removeImportUsingTsMorph,
} from '../../shared';

/**
 * Updates src/main.ts to use bootstrapApplication instead of bootstrapModule:
 * - Replaces platformBrowser import with bootstrapApplication
 * - Adds imports for appConfig and AppComponent
 * - Replaces platformBrowser().bootstrapModule(AppModule) with bootstrapApplication(AppComponent, appConfig)
 */
export function updateMainTs(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const mainTsPath = 'src/main.ts';

    if (!tree.exists(mainTsPath)) {
      throw new Error(`File ${mainTsPath} not found`);
    }

    context.logger.info('⏳ Updating main.ts...');

    const content = tree.read(mainTsPath)?.toString('utf-8');
    if (!content) {
      throw new Error(`Could not read ${mainTsPath}`);
    }

    const project = new Project({ useInMemoryFileSystem: true });
    const sourceFile = project.createSourceFile(mainTsPath, content, {
      overwrite: true,
    });

    removeImportUsingTsMorph(sourceFile, {
      importName: 'platformBrowser',
      importPath: '@angular/platform-browser',
    });

    // Remove AppModule import (from ./app/app.module)
    const appModuleImport = sourceFile.getImportDeclaration('./app/app.module');
    if (appModuleImport) {
      appModuleImport.remove();
    }

    createImports(sourceFile, [
      {
        namedImports: ['bootstrapApplication'],
        moduleSpecifier: '@angular/platform-browser',
      },
      {
        moduleSpecifier: './app/app.config',
        namedImports: ['appConfig'],
      },
      {
        moduleSpecifier: './app/app.component',
        namedImports: ['AppComponent'],
      },
    ]);

    replaceBootstrapModuleWithBootstrapApplication(sourceFile);

    formatFile(sourceFile);
    tree.overwrite(mainTsPath, sourceFile.getFullText());

    context.logger.info('✅ Updated main.ts');

    return tree;
  };
}

function replaceBootstrapModuleWithBootstrapApplication(
  sourceFile: SourceFile
): void {
  // Find and replace platformBrowser().bootstrapModule(AppModule) with bootstrapApplication(AppComponent, appConfig)
  const expressionStatements = sourceFile.getDescendantsOfKind(
    SyntaxKind.ExpressionStatement
  );

  for (const stmt of expressionStatements) {
    // Find all CallExpression nodes in this statement
    const callExpressions = stmt.getDescendantsOfKind(
      SyntaxKind.CallExpression
    );

    for (const callExpr of callExpressions) {
      const callExprExpression = callExpr.getExpression();

      if (
        callExprExpression.getKind() === SyntaxKind.PropertyAccessExpression
      ) {
        const propAccess = callExprExpression.asKind(
          SyntaxKind.PropertyAccessExpression
        );

        if (
          propAccess &&
          propAccess.getName() === 'bootstrapModule' &&
          propAccess.getExpression().getText() === 'platformBrowser()'
        ) {
          // Replace this call expression with bootstrapApplication(AppComponent, appConfig)
          callExpr.replaceWithText(
            'bootstrapApplication(AppComponent, appConfig)'
          );
          break;
        }
      }
    }
  }
}
