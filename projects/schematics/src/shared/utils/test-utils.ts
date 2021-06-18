import { normalize, strings, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { findNodes } from '@schematics/angular/utility/ast-utils';
import ts from 'typescript';
import { findConstructor } from './file-utils';

export function writeFile(
  host: TempScopedNodeJsSyncHost,
  filePath: string,
  contents: string
): void {
  host.sync.write(normalize(filePath), virtualFs.stringToFileBuffer(contents));
}

export function runMigration(
  appTree: UnitTestTree,
  schematicRunner: SchematicTestRunner,
  migrationScript: string,
  options = {}
): Promise<UnitTestTree> {
  return schematicRunner
    .runSchematicAsync(migrationScript, options, appTree)
    .toPromise();
}

export function getConstructor(nodes: ts.Node[]): ts.Node {
  const constructorNode = findConstructor(nodes);
  if (!constructorNode) {
    throw new Error('No constructor node found');
  }
  return constructorNode;
}

export function getSuperNode(constructorNode: ts.Node): ts.Node | undefined {
  const superNodes = findNodes(constructorNode, ts.SyntaxKind.SuperKeyword);
  if (!superNodes || superNodes.length === 0) {
    return undefined;
  }
  return superNodes[0];
}

export function getParams(
  constructorNode: ts.Node,
  camelizedParamNames: string[]
): string[] {
  const superNode = getSuperNode(constructorNode);
  if (!superNode) {
    throw new Error('No super() node found');
  }

  const callExpressions = findNodes(
    constructorNode,
    ts.SyntaxKind.CallExpression
  );
  if (!callExpressions || callExpressions.length === 0) {
    throw new Error('No call expressions found in constructor');
  }
  const params = findNodes(callExpressions[0], ts.SyntaxKind.Identifier);

  camelizedParamNames = camelizedParamNames.map((param) =>
    strings.camelize(param)
  );

  return params
    .filter((n) => n.kind === ts.SyntaxKind.Identifier)
    .map((n) => n.getText())
    .filter((text) => camelizedParamNames.includes(text));
}
