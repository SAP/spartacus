/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ReplaceChange } from '@schematics/angular/utility/change';
import ts from 'typescript';
import {
  commitChanges,
  ConstructorDeprecation,
  getAllTsSourceFiles,
  getTsSourceFile,
  InsertDirection,
} from '../../../shared/utils/file-utils';
import { getSourceRoot } from '../../../shared/utils/workspace-utils';
import { GENERATED_CONSTRUCTOR_MIGRATIONS } from './data/generated-constructor.migration';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Checking Angular 22 constructor deprecations...');
    for (const source of getAllTsSourceFiles(tree, getSourceRoot(tree, {}))) {
      migrateSource(tree, source, context);
    }
    return tree;
  };
}

function migrateSource(
  tree: Tree,
  source: ts.SourceFile,
  context: SchematicContext
): void {
  const changes: ReplaceChange[] = [];
  const removedImports = new Set<string>();
  const nodes = collectNodes(source);
  const imports = nodes.filter(ts.isImportSpecifier);
  for (const declaration of nodes.filter(ts.isClassDeclaration)) {
    changes.push(
      ...migrateClass(source, declaration, imports, removedImports, context)
    );
  }
  if (changes.length) {
    commitChanges(tree, source.fileName, changes, InsertDirection.RIGHT);
    removeUnusedImports(tree, source.fileName, removedImports);
  }
}

function getBaseMigration(
  declaration: ts.ClassDeclaration,
  imports: ts.ImportSpecifier[]
): ConstructorDeprecation | undefined {
  const base = declaration.heritageClauses?.find(
    (clause) => clause.token === ts.SyntaxKind.ExtendsKeyword
  )?.types[0]?.expression;
  if (!base || !ts.isIdentifier(base)) {
    return undefined;
  }
  const baseImport = imports.find(
    (specifier) => specifier.name.text === base.text
  );
  if (!baseImport) {
    return undefined;
  }
  const importDeclaration = baseImport.parent.parent.parent;
  if (!ts.isImportDeclaration(importDeclaration)) {
    return undefined;
  }
  return GENERATED_CONSTRUCTOR_MIGRATIONS.find(
    (entry) =>
      entry.class === (baseImport.propertyName ?? baseImport.name).text &&
      entry.importPath ===
        (importDeclaration.moduleSpecifier as ts.StringLiteral).text
  );
}

function migrateClass(
  source: ts.SourceFile,
  declaration: ts.ClassDeclaration,
  imports: ts.ImportSpecifier[],
  removedImports: Set<string>,
  context: SchematicContext
): ReplaceChange[] {
  const record = getBaseMigration(declaration, imports);
  const classConstructor = declaration.members.find(
    ts.isConstructorDeclaration
  );
  if (!record || !classConstructor?.body) {
    return [];
  }
  const superCalls = classConstructor.body.statements
    .filter(ts.isExpressionStatement)
    .map((statement) => statement.expression)
    .filter(ts.isCallExpression)
    .filter((call) => call.expression.kind === ts.SyntaxKind.SuperKeyword);
  const superCall = superCalls[0];
  if (!superCall || superCall.arguments.length === 0) {
    return [];
  }
  const parameters = superCall.arguments.map((argument) =>
    getArgumentParameter(argument, classConstructor.parameters)
  );
  // Match each actual super argument, in order. Expressions, narrowed
  // types and incomplete fingerprints require customer review.
  if (
    superCalls.length !== 1 ||
    !matchesDeprecatedParameters(source, parameters, imports, record)
  ) {
    context.logger.warn(
      source.fileName +
        ': review constructor of ' +
        declaration.name?.text +
        ' manually; super arguments do not match the old Spartacus constructor.'
    );
    return [];
  }
  const removable = new Set(
    parameters.filter((parameter): parameter is ts.ParameterDeclaration =>
      isPassThroughParameter(parameter, declaration)
    )
  );
  collectRemovedImports(removable, removedImports);
  const remaining = classConstructor.parameters.filter(
    (parameter) => !removable.has(parameter)
  );
  return [
    replaceList(source, superCall.arguments, ''),
    replaceList(
      source,
      classConstructor.parameters,
      remainingListText(source, classConstructor.parameters, remaining)
    ),
  ];
}

function getArgumentParameter(
  argument: ts.Expression,
  parameters: ts.NodeArray<ts.ParameterDeclaration>
): ts.ParameterDeclaration | undefined {
  if (!ts.isIdentifier(argument)) {
    return undefined;
  }
  return parameters.find(
    (parameter) =>
      ts.isIdentifier(parameter.name) && parameter.name.text === argument.text
  );
}

function matchesDeprecatedParameters(
  source: ts.SourceFile,
  parameters: (ts.ParameterDeclaration | undefined)[],
  imports: ts.ImportSpecifier[],
  record: ConstructorDeprecation
): boolean {
  return (
    parameters.length === record.deprecatedParams.length &&
    parameters.every(
      (parameter, index) =>
        getParameterTypeName(source, parameter, imports) ===
        record.deprecatedParams[index].className
    )
  );
}

function getParameterTypeName(
  source: ts.SourceFile,
  parameter: ts.ParameterDeclaration | undefined,
  imports: ts.ImportSpecifier[]
): string | undefined {
  const type = parameter?.type;
  const name =
    type && ts.isTypeReferenceNode(type)
      ? type.typeName.getText(source)
      : type?.getText(source);
  const typeImport = imports.find((specifier) => specifier.name.text === name);
  return typeImport?.propertyName?.text ?? name;
}

function isPassThroughParameter(
  parameter: ts.ParameterDeclaration | undefined,
  declaration: ts.ClassDeclaration
): boolean {
  if (!parameter || !ts.isIdentifier(parameter.name)) {
    return false;
  }
  const name = parameter.name.text;
  // Keep dependencies used by customer initialization or methods.
  // Counting conservatively also preserves shadowed names.
  return (
    collectNodes(declaration).filter(
      (node) => ts.isIdentifier(node) && node.text === name
    ).length === 2
  );
}

function collectRemovedImports(
  parameters: Set<ts.ParameterDeclaration>,
  removedImports: Set<string>
): void {
  for (const parameter of parameters) {
    for (const node of collectNodes(parameter).filter(ts.isIdentifier)) {
      if (node !== parameter.name) {
        removedImports.add(node.text);
      }
    }
  }
}

function remainingListText<T extends ts.Node>(
  source: ts.SourceFile,
  original: ts.NodeArray<T>,
  remaining: T[]
): string {
  return (
    remaining.map((node) => node.getFullText(source)).join(',') +
    (remaining.length && original.hasTrailingComma ? ',' : '')
  );
}

function replaceList(
  source: ts.SourceFile,
  list: ts.NodeArray<ts.Node>,
  replacement: string
): ReplaceChange {
  return new ReplaceChange(
    source.fileName,
    list.pos,
    source.text.slice(list.pos, list.end),
    replacement
  );
}

function removeUnusedImports(
  tree: Tree,
  path: string,
  candidates: Set<string>
): void {
  const source = getTsSourceFile(tree, path);
  const used = collectUsedIdentifiers(source);
  const changes: ReplaceChange[] = [];
  for (const statement of source.statements.filter(ts.isImportDeclaration)) {
    const change = getUnusedImportChange(source, statement, candidates, used);
    if (change) {
      changes.push(change);
    }
  }
  commitChanges(tree, path, changes, InsertDirection.RIGHT);
}

function collectUsedIdentifiers(source: ts.SourceFile): Set<string> {
  return new Set(
    source.statements
      .filter((statement) => !ts.isImportDeclaration(statement))
      .flatMap(collectNodes)
      .filter(ts.isIdentifier)
      .map((node) => node.text)
  );
}

function getUnusedImportChange(
  source: ts.SourceFile,
  statement: ts.ImportDeclaration,
  candidates: Set<string>,
  used: Set<string>
): ReplaceChange | undefined {
  const bindings = statement.importClause?.namedBindings;
  if (!bindings || !ts.isNamedImports(bindings)) {
    return undefined;
  }
  const remaining = bindings.elements.filter(
    (specifier) =>
      !candidates.has(specifier.name.text) || used.has(specifier.name.text)
  );
  if (remaining.length === bindings.elements.length) {
    return undefined;
  }
  if (!remaining.length && !statement.importClause?.name) {
    return new ReplaceChange(
      source.fileName,
      statement.getStart(source),
      statement.getText(source),
      ''
    );
  }
  return replaceList(
    source,
    bindings.elements,
    remainingListText(source, bindings.elements, remaining)
  );
}

function collectNodes(root: ts.Node): ts.Node[] {
  const nodes: ts.Node[] = [];
  function visit(node: ts.Node): void {
    nodes.push(node);
    ts.forEachChild(node, visit);
  }
  visit(root);
  return nodes;
}
