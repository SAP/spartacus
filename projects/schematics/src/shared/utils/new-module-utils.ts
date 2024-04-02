/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
  ObjectLiteralElementLike,
  SourceFile,
  ts as tsMorph,
} from 'ts-morph';
import { ANGULAR_CORE, ANGULAR_SCHEMATICS } from '../constants';
import { isSpartacusConfigDuplicate } from './config-utils';
import { getTsSourceFile } from './file-utils';
import { createImports, isImportedFrom } from './import-utils';
import { getSourceRoot } from './workspace-utils';

export type ModuleProperty =
  | 'imports'
  | 'exports'
  | 'declarations'
  | 'providers';
export interface Import {
  moduleSpecifier: string;
  namedImports: string[];
}

export function ensureModuleExists(options: {
  /** module's name */
  name: string;
  /** path where to create the module */
  path: string;
  /** project name */
  project: string;
  /** the declaring module */
  module: string;
}): Rule {
  return (host: Tree): Rule => {
    const modulePath = `${getSourceRoot(host, { project: options.project })}/${
      options.path
    }`;
    const filePath = `${modulePath}/${dasherize(options.name)}.module.ts`;
    if (host.exists(filePath)) {
      const moduleFile = getTsSourceFile(host, filePath);
      const metadata = getDecoratorMetadata(
        moduleFile,
        'NgModule',
        ANGULAR_CORE
      )[0];

      if (metadata) {
        return noop();
      }
    }
    return externalSchematic(ANGULAR_SCHEMATICS, 'module', {
      project: options.project,
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
  propertyName: ModuleProperty,
  insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  createIfMissing = true
): Expression | undefined {
  const initializer = getModulePropertyInitializer(
    sourceFile,
    propertyName,
    createIfMissing
  );
  if (!initializer) {
    return undefined;
  }

  if (isDuplication(initializer, propertyName, insertOptions.content)) {
    return undefined;
  }

  const imports = ([] as Import[]).concat(insertOptions.import);
  createImports(sourceFile, imports);

  let createdNode: Expression | undefined;
  if (insertOptions.order || insertOptions.order === 0) {
    initializer.insertElement(insertOptions.order, insertOptions.content);
  } else {
    createdNode = initializer.addElement(insertOptions.content);
  }

  return createdNode;
}

function isDuplication(
  initializer: ArrayLiteralExpression,
  propertyName: 'imports' | 'exports' | 'declarations' | 'providers',
  content: string
): boolean {
  if (propertyName !== 'providers') {
    return isTypeTokenDuplicate(initializer, content);
  }

  return isSpartacusConfigDuplicate(content, initializer);
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

export function getModulePropertyInitializer(
  source: SourceFile,
  propertyName: ModuleProperty,
  createIfMissing = true
): ArrayLiteralExpression | undefined {
  const property = getModuleProperty(source, propertyName, createIfMissing);
  if (!property || !Node.isPropertyAssignment(property)) {
    return undefined;
  }

  return property.getInitializerIfKind(
    tsMorph.SyntaxKind.ArrayLiteralExpression
  );
}

function getModuleProperty(
  source: SourceFile,
  propertyName: ModuleProperty,
  createIfMissing = true
): ObjectLiteralElementLike | undefined {
  const moduleNode = getModule(source);
  if (!moduleNode) {
    return undefined;
  }

  const arg = moduleNode.getArguments()[0];
  if (!arg || !Node.isObjectLiteralExpression(arg)) {
    return undefined;
  }

  const property = arg.getProperty(propertyName);
  if (!property && createIfMissing) {
    arg.addPropertyAssignment({
      name: propertyName,
      initializer: '[]',
    });
  }

  return arg.getProperty(propertyName);
}
