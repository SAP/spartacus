/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { CallExpression, Node, SourceFile, ts } from 'ts-morph';
import { isImportedFrom } from '../shared/utils/import-utils';
import { createProgram } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

/** Migration that ensures that we have correct RouterModule.forRoot set */
export function setupRouterModule(project: string): Rule {
  return (tree: Tree) => {
    const { buildPaths } = getProjectTsConfigPaths(tree, project);
    const basePath = process.cwd();

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot set RouterModule.'
      );
    }

    for (const tsconfigPath of buildPaths) {
      configureRouterModule(tree, tsconfigPath, basePath);
    }
    return tree;
  };
}

function configureRouterModule(
  tree: Tree,
  tsconfigPath: string,
  basePath: string
) {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  appSourceFiles.forEach((sourceFile) => {
    if (sourceFile.getFilePath().includes('app-routing.module.ts')) {
      let routerModule = getRouterModule(sourceFile);
      if (!routerModule) {
        routerModule = addRouterModuleImport(sourceFile);
      }
      configureOptionsInRouterModule(routerModule as CallExpression);
      sourceFile.organizeImports();
      sourceFile.saveSync();
    }
  });
}

function getRouterModule(sourceFile: SourceFile): CallExpression | undefined {
  let routerNode;

  // We only want to consider RouterModule.forRoot()
  // It needs to be in `imports` array in NgModule decorator
  // The RouterModule must be imported from @angular/router and decorator from @angular/core

  function visitor(node: Node) {
    if (Node.isCallExpression(node)) {
      const expression = node.getExpression();
      if (Node.isPropertyAccessExpression(expression)) {
        const exp = expression.getExpression();
        if (
          Node.isIdentifier(exp) &&
          exp.getText() === 'RouterModule' &&
          isImportedFrom(exp, '@angular/router') &&
          expression.getName() === 'forRoot'
        ) {
          const assignment = node.getFirstAncestorByKind(
            ts.SyntaxKind.PropertyAssignment
          );
          if (assignment) {
            const name = assignment.getStructure().name;
            if (name === 'imports') {
              const callExpression = node.getFirstAncestorByKind(
                ts.SyntaxKind.CallExpression
              );
              if (callExpression) {
                const exp = callExpression.getExpression();
                if (
                  Node.isIdentifier(exp) &&
                  exp.getText() === 'NgModule' &&
                  isImportedFrom(exp, '@angular/core')
                ) {
                  routerNode = node;
                }
              }
            }
          }
        }
      }
    }
    node.forEachChild(visitor);
  }

  sourceFile.forEachChild(visitor);
  return routerNode;
}

function addRouterModuleImport(
  sourceFile: SourceFile
): CallExpression | undefined {
  let routerNode;

  // We only want to consider RouterModule.forRoot()
  // It needs to be in `imports` array in NgModule decorator
  // The RouterModule must be imported from @angular/router and decorator from @angular/core

  function visitor(node: Node) {
    if (Node.isCallExpression(node)) {
      const expression = node.getExpression();
      if (
        Node.isIdentifier(expression) &&
        expression.getText() === 'NgModule' &&
        isImportedFrom(expression, '@angular/core')
      ) {
        const args = node.getArguments();
        if (args.length > 0) {
          const arg = args[0];
          if (Node.isObjectLiteralExpression(arg)) {
            const property = arg.getProperty('imports');
            if (property && Node.isPropertyAssignment(property)) {
              const initializer = property.getInitializerIfKind(
                ts.SyntaxKind.ArrayLiteralExpression
              );
              if (initializer) {
                sourceFile.addImportDeclaration({
                  moduleSpecifier: '@angular/router',
                  namedImports: ['RouterModule'],
                });
                routerNode = initializer.addElement(`RouterModule.forRoot([])`);
              }
            }
          }
        }
      }
    }
    node.forEachChild(visitor);
  }

  sourceFile.forEachChild(visitor);
  return routerNode;
}

function configureOptionsInRouterModule(routerModule: CallExpression): void {
  const args = routerModule.getArguments();
  const options = `{
  anchorScrolling: 'enabled',
  relativeLinkResolution: 'corrected',
  initialNavigation: 'enabled',
}`;
  if (args.length === 0) {
    routerModule.addArguments(['[]', options]);
  } else if (args.length === 1) {
    routerModule.addArgument(options);
  } else {
    // TODO: Maybe check the second argument and adjust properties
  }
}
