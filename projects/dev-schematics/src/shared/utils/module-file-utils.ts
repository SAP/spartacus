import { Tree } from '@angular-devkit/schematics';
import {
  addSymbolToNgModuleMetadata,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { commitChanges, getTsSourceFile, InsertDirection } from './file-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';

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
