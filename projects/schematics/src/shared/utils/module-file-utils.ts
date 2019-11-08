import { normalize, relative } from '@angular-devkit/core';
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

// as this is copied from angular source, no need to test it
/**
 * Build a relative path from one file path to another file path.
 */
export function buildRelativePath(from: string, to: string): string {
  from = normalize(from);
  to = normalize(to);

  // Convert to arrays.
  const fromParts = from.split('/');
  const toParts = to.split('/');

  // Remove file names (preserving destination)
  fromParts.pop();
  const toFileName = toParts.pop();

  const relativePath = relative(
    normalize(fromParts.join('/') || '/'),
    normalize(toParts.join('/') || '/')
  );
  let pathPrefix = '';

  // Set the path prefix for same dir or child dir, parent dir starts with `..`
  if (!relativePath) {
    pathPrefix = '.';
  } else if (!relativePath.startsWith('.')) {
    pathPrefix = `./`;
  }
  if (pathPrefix && !pathPrefix.endsWith('/')) {
    pathPrefix += '/';
  }

  return pathPrefix + (relativePath ? relativePath + '/' : '') + toFileName;
}
