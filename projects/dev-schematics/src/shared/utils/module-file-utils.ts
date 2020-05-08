import { Tree } from '@angular-devkit/schematics';
import {
  addSymbolToNgModuleMetadata,
  getDecoratorMetadata,
  getMetadataField,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { commitChanges, getTsSourceFile, InsertDirection } from './file-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import { ANGULAR_CORE } from '../constants';

export function addImport(
  host: Tree,
  filePath: string,
  importText: string,
  importPath: string
): void {
  const moduleSource = getTsSourceFile(host, filePath);
  if (!isImported(moduleSource, importText, importPath)) {
    const change = insertImport(moduleSource, filePath, importText, importPath);
    commitChanges(host, filePath, [change], InsertDirection.LEFT);
  }
}

export function addToModuleImportsAndCommitChanges(
  host: Tree,
  modulePath: string,
  importText: string
): void {
  const metadataChanges = addToModuleImports(host, modulePath, importText);
  commitChanges(host, modulePath, metadataChanges, InsertDirection.RIGHT);
}

export function addToModuleImports(
  host: Tree,
  modulePath: string,
  importText: string,
  moduleSource?: ts.SourceFile
): InsertChange[] {
  return addToMetadata(host, modulePath, importText, 'imports', moduleSource);
}

function addToMetadata(
  host: Tree,
  modulePath: string,
  importText: string,
  metadataType: 'imports' | 'declarations' | 'entryComponents' | 'exports',
  moduleSource?: ts.SourceFile
): InsertChange[] {
  moduleSource = moduleSource || getTsSourceFile(host, modulePath);
  return addSymbolToNgModuleMetadata(
    moduleSource,
    modulePath,
    metadataType,
    importText
  ) as InsertChange[];
}

export function insertPropertyInStorefrontModuleCallExpression(
  host: Tree,
  modulePath: string,
  insertion: string
) {
  const appModuleSourceFile = getTsSourceFile(host, modulePath);

  getDecoratorMetadata(appModuleSourceFile, 'NgModule', ANGULAR_CORE).forEach(
    (metadata: ts.ObjectLiteralExpression) => {
      const matchingProperties = getMetadataField(metadata, 'imports');

      if (!matchingProperties) {
        return;
      }

      const assignment = matchingProperties[0] as ts.PropertyAssignment;
      if (!ts.isArrayLiteralExpression(assignment.initializer)) {
        return;
      }
      const arrayLiteral = assignment.initializer;
      const moduleElementImportsAST = arrayLiteral.elements.filter(
        (node) =>
          ts.isCallExpression(node) &&
          node.getFullText().indexOf('B2cStorefrontModule.withConfig') !== -1
      )[0] as ts.CallExpression;

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
  );
}
