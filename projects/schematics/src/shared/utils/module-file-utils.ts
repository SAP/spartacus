import { Tree } from '@angular-devkit/schematics';
import {
  addSymbolToNgModuleMetadata,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { commitChanges, getTsSourceFile, InsertDirection } from './file-utils';

export function addImport(
  host: Tree,
  modulePath: string,
  importText: string,
  importPath: string
) {
  const moduleSource = getTsSourceFile(host, modulePath) as any;
  if (!isImported(moduleSource, importText, importPath)) {
    const change = insertImport(
      moduleSource,
      modulePath,
      importText,
      importPath
    );
    commitChanges(host, modulePath, [change], InsertDirection.LEFT);
  }
}

export function importModule(
  host: Tree,
  modulePath: string,
  importText: string
): InsertChange[] {
  const moduleSource = getTsSourceFile(host, modulePath);
  return addSymbolToNgModuleMetadata(
    moduleSource,
    modulePath,
    'imports',
    importText
  ) as InsertChange[];
}

export function importModuleAndCommitChanges(
  host: Tree,
  modulePath: string,
  importText: string
): void {
  const metadataChanges = importModule(host, modulePath, importText);
  commitChanges(host, modulePath, metadataChanges, InsertDirection.RIGHT);
}
