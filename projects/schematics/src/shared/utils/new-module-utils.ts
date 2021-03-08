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
  options: {
    moduleSpecifier: string;
    namedImports: string[];
    importContent: string;
  }
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
            const property = arg.getProperty('imports');
            if (property && Node.isPropertyAssignment(property)) {
              const initializer = property.getInitializerIfKind(
                tsMorph.SyntaxKind.ArrayLiteralExpression
              );
              if (initializer) {
                sourceFile.addImportDeclaration({
                  moduleSpecifier: options.moduleSpecifier,
                  namedImports: options.namedImports,
                });
                storeNode = initializer.addElement(options.importContent);
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
