import { Tree } from '@angular-devkit/schematics';
import { getTsSourceFile } from './file-utils';
import {
  addSymbolToNgModuleMetadata,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

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
    if (change) {
      const recorder = host.beginUpdate(modulePath);
      recorder.insertLeft(
        (change as InsertChange).pos,
        (change as InsertChange).toAdd
      );
      host.commitUpdate(recorder);
    }
  }
}

export function importModule(
  host: Tree,
  modulePath: string,
  importText: string
) {
  const moduleSource = getTsSourceFile(host, modulePath);
  const metadataChanges = addSymbolToNgModuleMetadata(
    moduleSource,
    modulePath,
    'imports',
    importText
  );
  if (metadataChanges) {
    const recorder = host.beginUpdate(modulePath);
    metadataChanges.forEach((change: InsertChange) => {
      recorder.insertRight(change.pos, change.toAdd);
    });
    host.commitUpdate(recorder);
  }
}
