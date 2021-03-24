import {
  externalSchematic,
  noop,
  Rule,
  Tree,
} from '@angular-devkit/schematics';
import { getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import {
  ArrayLiteralExpression,
  CallExpression,
  Node,
  SourceFile,
  ts as tsMorph,
} from 'ts-morph';
import ts from 'typescript';
import { ANGULAR_CORE, ANGULAR_SCHEMATICS } from '../constants';
import { getTsSourceFile } from './file-utils';
import { isImportedFrom } from './import-utils';
import { getSourceRoot } from './workspace-utils';

export interface Import {
  moduleSpecifier: string;
  namedImports: string[];
}

export function ensureModuleExists(options: {
  name: string;
  path: string;
  module: string;
  project: string;
}): Rule {
  return (host: Tree): Rule => {
    const modulePath = `${getSourceRoot(host, { project: options.project })}/${
      options.path
    }`;
    const filePath = `${modulePath}/${options.name}.module.ts`;
    if (host.exists(filePath)) {
      const module = getTsSourceFile(host, filePath);
      const metadata = getDecoratorMetadata(
        module,
        'NgModule',
        ANGULAR_CORE
      )[0] as ts.ObjectLiteralExpression;

      if (metadata) {
        return noop();
      }
    }

    return externalSchematic(ANGULAR_SCHEMATICS, 'module', {
      name: options.name,
      flat: true,
      commonModule: false,
      path: modulePath,
      module: options.module,
    });
  };
}

export function addModuleImport(
  sourceFile: SourceFile,
  insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  createIfMissing = true
): CallExpression | undefined {
  return addToModuleInternal(
    sourceFile,
    'imports',
    insertOptions,
    createIfMissing
  );
}

export function addModuleExport(
  sourceFile: SourceFile,
  insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  createIfMissing = true
): CallExpression | undefined {
  return addToModuleInternal(
    sourceFile,
    'exports',
    insertOptions,
    createIfMissing
  );
}

export function addModuleDeclaration(
  sourceFile: SourceFile,
  insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  createIfMissing = true
): CallExpression | undefined {
  return addToModuleInternal(
    sourceFile,
    'declarations',
    insertOptions,
    createIfMissing
  );
}

export function addModuleProvider(
  sourceFile: SourceFile,
  insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  createIfMissing = true
): CallExpression | undefined {
  return addToModuleInternal(
    sourceFile,
    'providers',
    insertOptions,
    createIfMissing
  );
}

function addToModuleInternal(
  sourceFile: SourceFile,
  propertyName: 'imports' | 'exports' | 'declarations' | 'providers',
  insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  createIfMissing = true
): CallExpression | undefined {
  let createdNode;

  function visitor<T>(node: Node): T | undefined {
    if (Node.isCallExpression(node)) {
      const expression = node.getExpression();
      if (
        Node.isIdentifier(expression) &&
        expression.getText() === 'NgModule' &&
        isImportedFrom(expression, ANGULAR_CORE)
      ) {
        const args = node.getArguments();
        if (args.length > 0) {
          const arg = args[0];
          if (Node.isObjectLiteralExpression(arg)) {
            if (!arg.getProperty(propertyName) && createIfMissing) {
              arg.addPropertyAssignment({
                name: propertyName,
                initializer: '[]',
              });
            }

            const property = arg.getProperty(propertyName);
            if (property && Node.isPropertyAssignment(property)) {
              const initializer = property.getInitializerIfKind(
                tsMorph.SyntaxKind.ArrayLiteralExpression
              );
              if (initializer) {
                const imports = ([] as Import[]).concat(insertOptions.import);
                // check if the 'imports', 'declarations' or 'exports' arrays already contain the specified content
                if (
                  propertyName !== 'providers' &&
                  elementExists(initializer, insertOptions.content)
                ) {
                  // don't duplicate the module in the specified array
                  return;
                }

                imports.forEach((specifiedImport) =>
                  sourceFile.addImportDeclaration({
                    moduleSpecifier: specifiedImport.moduleSpecifier,
                    namedImports: specifiedImport.namedImports,
                  })
                );

                if (insertOptions.order || insertOptions.order === 0) {
                  initializer.insertElement(
                    insertOptions.order,
                    insertOptions.content
                  );
                } else {
                  createdNode = initializer.addElement(insertOptions.content);
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
  return createdNode;
}

export function getModule(sourceFile: SourceFile): CallExpression | undefined {
  let moduleNode;

  function visitor(node: Node) {
    if (Node.isCallExpression(node)) {
      const expression = node.getExpression();
      if (
        Node.isIdentifier(expression) &&
        expression.getText() === 'NgModule' &&
        isImportedFrom(expression, ANGULAR_CORE)
      ) {
        moduleNode = node;
      }
    }

    node.forEachChild(visitor);
  }

  sourceFile.forEachChild(visitor);
  return moduleNode;
}

function elementExists(
  initializer: ArrayLiteralExpression,
  moduleToCheck: string
): boolean {
  for (const element of initializer.getElements()) {
    if (element.getText() === moduleToCheck) {
      return true;
    }
  }

  return false;
}
