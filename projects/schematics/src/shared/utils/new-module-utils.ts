import {
  externalSchematic,
  noop,
  Rule,
  Tree,
} from '@angular-devkit/schematics';
import { getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import { CallExpression, Node, SourceFile, ts as tsMorph } from 'ts-morph';
import ts from 'typescript';
import { ANGULAR_CORE, ANGULAR_SCHEMATICS } from '../constants';
import { getTsSourceFile } from './file-utils';
import { isImportedFrom } from './import-utils';
import { getSourceRoot } from './workspace-utils';

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
    moduleSpecifier: string;
    namedImports: string[];
    content: string;
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
    moduleSpecifier: string;
    namedImports: string[];
    content: string;
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
    moduleSpecifier: string;
    namedImports: string[];
    content: string;
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
    moduleSpecifier: string;
    namedImports: string[];
    content: string;
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
    moduleSpecifier: string;
    namedImports: string[];
    content: string;
  },
  createIfMissing = true
): CallExpression | undefined {
  let storeNode;

  function visitor(node: Node) {
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
                sourceFile.addImportDeclaration({
                  moduleSpecifier: insertOptions.moduleSpecifier,
                  namedImports: insertOptions.namedImports,
                });
                storeNode = initializer.addElement(insertOptions.content);
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
