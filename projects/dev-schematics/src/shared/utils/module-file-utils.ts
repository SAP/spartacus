import { Tree } from '@angular-devkit/schematics';
import {
  findNode,
  findNodes,
  getDecoratorMetadata,
  getMetadataField,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import {
  ANGULAR_CORE,
  B2C_STOREFRONT_MODULE,
  commitChanges,
  getTsSourceFile,
  InsertDirection,
} from '@spartacus/schematics';
import * as ts from 'typescript';

// TODO: revise - should we remove these?

export function insertPropertyInStorefrontModuleCallExpression(
  host: Tree,
  modulePath: string,
  insertion: string
): void {
  const appModuleSourceFile = getTsSourceFile(host, modulePath);
  const moduleElementImportsAST = getExistingStorefrontConfigNode(
    host,
    modulePath
  );
  if (!moduleElementImportsAST) {
    return;
  }

  const storefrontModuleArgumentPropertiesEnd = (moduleElementImportsAST
    .arguments[0] as ts.ObjectLiteralExpression).properties.end;
  const newChange = new InsertChange(
    appModuleSourceFile.fileName,
    storefrontModuleArgumentPropertiesEnd,
    insertion
  );
  commitChanges(
    host,
    appModuleSourceFile.fileName,
    [newChange],
    InsertDirection.LEFT
  );
}

export function getExistingStorefrontConfigNode(
  host: Tree,
  modulePath: string
): ts.CallExpression | undefined {
  const appModuleSourceFile = getTsSourceFile(host, modulePath);
  const metadata = getDecoratorMetadata(
    appModuleSourceFile,
    'NgModule',
    ANGULAR_CORE
  )[0] as ts.ObjectLiteralExpression;

  if (!metadata) {
    return undefined;
  }

  const matchingProperties = getMetadataField(metadata, 'imports');
  if (!matchingProperties) {
    return undefined;
  }

  const assignment = matchingProperties[0] as ts.PropertyAssignment;
  const arrayLiteral = assignment.initializer;
  if (!ts.isArrayLiteralExpression(arrayLiteral)) {
    return undefined;
  }
  return arrayLiteral.elements.filter(
    (node) =>
      ts.isCallExpression(node) &&
      node.getFullText().indexOf(`${B2C_STOREFRONT_MODULE}.withConfig`) !== -1
  )[0] as ts.CallExpression;
}

export function getSpartacusConfig(
  storefrontConfig: ts.CallExpression,
  configName: string
): ts.SyntaxList | undefined {
  const propertyAssignments = findNodes(
    storefrontConfig,
    ts.SyntaxKind.PropertyAssignment
  );
  for (const propertyAssignment of propertyAssignments) {
    const config = findNode(
      propertyAssignment,
      ts.SyntaxKind.Identifier,
      configName
    );
    if (config) {
      const syntaxListNodes = findNodes(
        config,
        ts.SyntaxKind.SyntaxList,
        1,
        false
      );
      return syntaxListNodes.length
        ? (syntaxListNodes[0] as ts.SyntaxList)
        : undefined;
    }
  }

  return undefined;
}
