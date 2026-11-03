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
      const changes: ReplaceChange[] = [];
      const removedImports = new Set<string>();
      const imports = collectNodes(source).filter(ts.isImportSpecifier);
      for (const declaration of collectNodes(source).filter(
        ts.isClassDeclaration
      )) {
        const base = declaration.heritageClauses?.find(
          (clause) => clause.token === ts.SyntaxKind.ExtendsKeyword
        )?.types[0]?.expression;
        if (!base || !ts.isIdentifier(base)) {
          continue;
        }
        const baseImport = imports.find(
          (specifier) => specifier.name.text === base.text
        );
        if (!baseImport) {
          continue;
        }
        const moduleSpecifier = baseImport.parent.parent.parent;
        if (!ts.isImportDeclaration(moduleSpecifier)) {
          continue;
        }
        const record = GENERATED_CONSTRUCTOR_MIGRATIONS.find(
          (entry) =>
            entry.class === (baseImport.propertyName ?? baseImport.name).text &&
            entry.importPath ===
              (moduleSpecifier.moduleSpecifier as ts.StringLiteral).text
        );
        const constructor = declaration.members.find(
          ts.isConstructorDeclaration
        );
        if (!record || !constructor?.body) {
          continue;
        }
        const superCalls = constructor.body.statements
          .filter(ts.isExpressionStatement)
          .map((statement) => statement.expression)
          .filter(ts.isCallExpression)
          .filter(
            (call) => call.expression.kind === ts.SyntaxKind.SuperKeyword
          );
        const superCall = superCalls[0];
        if (!superCall || superCall.arguments.length === 0) {
          continue;
        }
        const parameters = superCall.arguments.map((argument) =>
          ts.isIdentifier(argument)
            ? constructor.parameters.find(
                (parameter) =>
                  ts.isIdentifier(parameter.name) &&
                  parameter.name.text === argument.text
              )
            : undefined
        );
        // Match each actual super argument, in order. Expressions, narrowed
        // types and incomplete fingerprints require customer review.
        if (
          superCalls.length !== 1 ||
          parameters.length !== record.deprecatedParams.length ||
          !parameters.every((parameter, index) => {
            const type = parameter?.type;
            const name =
              type && ts.isTypeReferenceNode(type)
                ? type.typeName.getText(source)
                : type?.getText(source);
            const typeImport = imports.find(
              (specifier) => specifier.name.text === name
            );
            return (
              (typeImport?.propertyName?.text ?? name) ===
              record.deprecatedParams[index].className
            );
          })
        ) {
          context.logger.warn(
            source.fileName +
              ': review constructor of ' +
              declaration.name?.text +
              ' manually; super arguments do not match the old Spartacus constructor.'
          );
          continue;
        }
        changes.push(replaceList(source, superCall.arguments, ''));
        const removable = new Set(
          parameters.filter((parameter) => {
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
          })
        );
        for (const parameter of removable) {
          if (parameter) {
            for (const node of collectNodes(parameter)) {
              if (ts.isIdentifier(node) && node !== parameter.name) {
                removedImports.add(node.text);
              }
            }
          }
        }
        const remaining = constructor.parameters.filter(
          (parameter) => !removable.has(parameter)
        );
        changes.push(
          replaceList(
            source,
            constructor.parameters,
            remaining
              .map((parameter) => parameter.getFullText(source))
              .join(',') +
              (remaining.length && constructor.parameters.hasTrailingComma
                ? ','
                : '')
          )
        );
      }
      if (changes.length) {
        commitChanges(tree, source.fileName, changes, InsertDirection.RIGHT);
        removeUnusedImports(tree, source.fileName, removedImports);
      }
    }
    return tree;
  };
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
  const used = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) {
      for (const node of collectNodes(statement)) {
        if (ts.isIdentifier(node)) {
          used.add(node.text);
        }
      }
    }
  }
  const changes: ReplaceChange[] = [];
  for (const statement of source.statements.filter(ts.isImportDeclaration)) {
    const bindings = statement.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) {
      continue;
    }
    const remaining = bindings.elements.filter(
      (specifier) =>
        !candidates.has(specifier.name.text) || used.has(specifier.name.text)
    );
    if (remaining.length === bindings.elements.length) {
      continue;
    }
    if (!remaining.length && !statement.importClause?.name) {
      changes.push(
        new ReplaceChange(
          path,
          statement.getStart(source),
          statement.getText(source),
          ''
        )
      );
    } else {
      changes.push(
        replaceList(
          source,
          bindings.elements,
          remaining
            .map((specifier) => specifier.getFullText(source))
            .join(',') +
            (remaining.length && bindings.elements.hasTrailingComma ? ',' : '')
        )
      );
    }
  }
  commitChanges(tree, path, changes, InsertDirection.RIGHT);
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
