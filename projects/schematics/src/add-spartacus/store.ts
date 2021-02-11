import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { CallExpression, Node, SourceFile, ts } from 'ts-morph';
import { isImportedFrom } from '../shared/utils/import-utils';
import { createProgram } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

/** Migration that ensures that we have correct RouterModule.forRoot set */
export function setupStoreModules(project: string): Rule {
  return (tree: Tree) => {
    const { buildPaths } = getProjectTsConfigPaths(tree, project);
    const basePath = process.cwd();

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot set RouterModule.'
      );
    }

    for (const tsconfigPath of buildPaths) {
      configureStoreModules(tree, tsconfigPath, basePath);
    }
    return tree;
  };
}

function configureStoreModules(
  tree: Tree,
  tsconfigPath: string,
  basePath: string
) {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  appSourceFiles.forEach((sourceFile) => {
    if (sourceFile.getFilePath().includes('app.module.ts')) {
      addStoreModuleImport(sourceFile);
      addEffectsModuleImport(sourceFile);
      sourceFile.organizeImports();
      sourceFile.saveSync();
    }
  });
}

function addStoreModuleImport(
  sourceFile: SourceFile
): CallExpression | undefined {
  let storeNode;

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
                  moduleSpecifier: '@ngrx/store',
                  namedImports: ['StoreModule'],
                });
                storeNode = initializer.addElement(`StoreModule.forRoot({})`);
              }
            }
          }
        }
      }
    }
    node.forEachChild(visitor);
  }

  sourceFile.forEachChild(visitor);
  return storeNode;
}

function addEffectsModuleImport(
  sourceFile: SourceFile
): CallExpression | undefined {
  let effectsNode;

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
                  moduleSpecifier: '@ngrx/effects',
                  namedImports: ['EffectsModule'],
                });
                effectsNode = initializer.addElement(
                  `EffectsModule.forRoot([])`
                );
              }
            }
          }
        }
      }
    }
    node.forEachChild(visitor);
  }

  sourceFile.forEachChild(visitor);
  return effectsNode;
}
