import { normalize, strings, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  findNode,
  findNodes,
  getDecoratorMetadata,
  getMetadataField,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import {
  ANGULAR_CORE,
  B2C_STOREFRONT_MODULE,
  SPARTACUS_CONFIGURATION_FILE_PATH,
} from '../constants';
import { getExistingStorefrontConfigNode } from './config-utils';
import { commitChanges, findConstructor, getTsSourceFile } from './file-utils';

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

export function updatePackageJson(
  appTree: UnitTestTree,
  filePath: string,
  type: string,
  pkg: string,
  version: string
): void {
  const packageContent = appTree.read(normalize(filePath));
  if (!packageContent) {
    return;
  }
  const packageJson = JSON.parse(packageContent.toString());
  if (!packageJson[type]) {
    packageJson[type] = {};
  }

  if (!packageJson[type][pkg]) {
    packageJson[type][pkg] = version;
  }

  appTree.overwrite(filePath, JSON.stringify(packageJson));
}

export function moveConfigToAppModule(appTree: UnitTestTree): void {
  const configurationSourceFile = getTsSourceFile(
    appTree,
    SPARTACUS_CONFIGURATION_FILE_PATH
  );
  const configNode = getExistingStorefrontConfigNode(configurationSourceFile);
  appTree.delete(SPARTACUS_CONFIGURATION_FILE_PATH);

  const appModuleSourceFile = getTsSourceFile(
    appTree,
    '/src/app/app.module.ts'
  );
  const node = getDecoratorMetadata(
    appModuleSourceFile,
    'NgModule',
    ANGULAR_CORE
  )[0];
  const assignment = getMetadataField(
    node as ts.ObjectLiteralExpression,
    'imports'
  )[0];
  const b2cNode = findNode(
    assignment,
    ts.SyntaxKind.Identifier,
    B2C_STOREFRONT_MODULE
  );
  if (!b2cNode) {
    throw new Error(
      'The app module does not seem to be valid: \n' +
        appModuleSourceFile.getText()
    );
  }

  const change = new InsertChange(
    appModuleSourceFile.fileName,
    b2cNode?.end,
    `.withConfig(${configNode?.getText()})`
  );
  commitChanges(appTree, appModuleSourceFile.fileName, [change]);
}
