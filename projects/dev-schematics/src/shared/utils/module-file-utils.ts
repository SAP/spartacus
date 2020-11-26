import { Tree } from '@angular-devkit/schematics';
import {
  getDecoratorMetadata,
  getMetadataField,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import {
  ANGULAR_CORE,
  commitChanges,
  getTsSourceFile,
  InsertDirection,
} from '@spartacus/schematics';
import * as ts from 'typescript';

export function insertPropertyInStorefrontModuleCallExpression(
  host: Tree,
  configModuleName: string,
  modulePath: string,
  insertion: string
): void {
  const appModuleSourceFile = getTsSourceFile(host, modulePath);
  const moduleElementImportsAST = getExistingStorefrontConfigNode(
    host,
    modulePath,
    configModuleName
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
  modulePath: string,
  configModuleName: string
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
      node.getFullText().indexOf(`${configModuleName}.withConfig`) !== -1
  )[0] as ts.CallExpression;
}
