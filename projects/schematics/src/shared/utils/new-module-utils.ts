import { dasherize } from '@angular-devkit/core/src/utils/strings';
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
  Expression,
  Node,
  SourceFile,
  ts as tsMorph,
} from 'ts-morph';
import ts from 'typescript';
import { ANGULAR_CORE, ANGULAR_SCHEMATICS } from '../constants';
import { getSpartacusProviders, normalizeConfiguration } from './config-utils';
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
    const filePath = `${modulePath}/${dasherize(options.name)}.module.ts`;
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
      name: dasherize(options.name),
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
): Expression | undefined {
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
): Expression | undefined {
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
): Expression | undefined {
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
): Expression | undefined {
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
): Expression | undefined {
  let createdNode: Expression | undefined;

  const module = getModule(sourceFile);
  if (module) {
    const args = module.getArguments();
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
          if (!initializer) {
            return;
          }

          if (isDuplication(initializer, propertyName, insertOptions.content)) {
            return;
          }

          const imports = ([] as Import[]).concat(insertOptions.import);
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

  return createdNode;
}

function isDuplication(
  initializer: ArrayLiteralExpression,
  propertyName: 'imports' | 'exports' | 'declarations' | 'providers',
  content: string
): boolean {
  if (propertyName === 'providers') {
    const normalizedContent = normalizeConfiguration(content);
    const configs = getSpartacusProviders(initializer.getSourceFile());
    for (const config of configs) {
      const normalizedConfig = normalizeConfiguration(config);
      if (normalizedContent === normalizedConfig) {
        return true;
      }
    }

    return false;
  }

  return isTypeTokenDuplicate(initializer, content);
}

function isTypeTokenDuplicate(
  initializer: ArrayLiteralExpression,
  typeToken: string
): boolean {
  typeToken = normalizeTypeToken(typeToken);

  for (const element of initializer.getElements()) {
    const elementText = normalizeTypeToken(element.getText());
    if (elementText === typeToken) {
      return true;
    }
  }

  return false;
}

export function getModule(sourceFile: SourceFile): CallExpression | undefined {
  let moduleNode: CallExpression | undefined;

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

const COMMENT_REG_EXP = /\/\/.+/gm;
function normalizeTypeToken(token: string): string {
  let newToken = token;

  newToken = newToken.replace(COMMENT_REG_EXP, '');
  newToken = newToken.trim();
  // strip down the trailing comma
  if (newToken.charAt(newToken.length - 1) === ',') {
    newToken = newToken.substring(0, newToken.length - 1);
  }

  return newToken;
}
