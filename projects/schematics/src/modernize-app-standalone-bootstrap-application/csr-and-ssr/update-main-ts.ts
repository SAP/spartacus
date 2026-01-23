/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Project, SyntaxKind } from 'ts-morph';
import { formatFile } from '../../shared';

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

    // Remove platformBrowser named import (from @angular/platform-browser)
    // but keep the import declaration if there are other named imports
    const platformBrowserImport = sourceFile.getImportDeclaration(
      '@angular/platform-browser'
    );
    if (platformBrowserImport) {
      const namedImports = platformBrowserImport.getNamedImports();
      const platformBrowserNamedImport = namedImports.find(
        (ni) => ni.getName() === 'platformBrowser'
      );
      if (platformBrowserNamedImport) {
        platformBrowserNamedImport.remove();
        // If no more named imports, remove the entire import declaration
        if (platformBrowserImport.getNamedImports().length === 0) {
          platformBrowserImport.remove();
        }
      }
    }

    // Remove AppModule import (from ./app/app.module)
    const appModuleImport = sourceFile.getImportDeclaration('./app/app.module');
    if (appModuleImport) {
      appModuleImport.remove();
    }

    // Add bootstrapApplication import (from @angular/platform-browser)
    let bootstrapAppImport = sourceFile.getImportDeclaration(
      '@angular/platform-browser'
    );
    if (!bootstrapAppImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: '@angular/platform-browser',
        namedImports: ['bootstrapApplication'],
      });
    } else {
      const namedImports = bootstrapAppImport.getNamedImports();
      const hasBootstrapApplication = namedImports.some(
        (ni) => ni.getName() === 'bootstrapApplication'
      );
      if (!hasBootstrapApplication) {
        bootstrapAppImport.addNamedImport('bootstrapApplication');
      }
    }

    // Add appConfig import (from ./app/app.config)
    const appConfigImport = sourceFile.getImportDeclaration('./app/app.config');
    if (!appConfigImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: './app/app.config',
        namedImports: ['appConfig'],
      });
    }

    // Add AppComponent import (from ./app/app.component)
    const appComponentImport = sourceFile.getImportDeclaration(
      './app/app.component'
    );
    if (!appComponentImport) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: './app/app.component',
        namedImports: ['AppComponent'],
      });
    } else {
      const namedImports = appComponentImport.getNamedImports();
      const hasAppComponent = namedImports.some(
        (ni) => ni.getName() === 'AppComponent'
      );
      if (!hasAppComponent) {
        appComponentImport.addNamedImport('AppComponent');
      }
    }

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

    formatFile(sourceFile);
    tree.overwrite(mainTsPath, sourceFile.getFullText());

    context.logger.info('✅ Updated main.ts');

    return tree;
  };
}
