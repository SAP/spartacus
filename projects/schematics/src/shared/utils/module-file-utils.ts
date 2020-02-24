import { normalize, relative } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import {
  addSymbolToNgModuleMetadata,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import { commitChanges, getTsSourceFile, InsertDirection } from './file-utils';

export function stripTsFromImport(importPath: string): string {
  if (!importPath.endsWith('.ts')) {
    return importPath;
  }

  return importPath.slice(0, importPath.length - 3);
}

export function addImport(
  host: Tree,
  filePath: string,
  importText: string,
  importPath: string
): void {
  const moduleSource = getTsSourceFile(host, filePath) as any;
  if (!isImported(moduleSource, importText, importPath)) {
    const change = insertImport(moduleSource, filePath, importText, importPath);
    commitChanges(host, filePath, [change], InsertDirection.LEFT);
  }
}

export function addToModuleImports(
  host: Tree,
  modulePath: string,
  importText: string,
  moduleSource?: ts.SourceFile
): InsertChange[] {
  return addToMetadata(host, modulePath, importText, 'imports', moduleSource);
}

export function addToModuleDeclarations(
  host: Tree,
  modulePath: string,
  importText: string,
  moduleSource?: ts.SourceFile
): InsertChange[] {
  return addToMetadata(
    host,
    modulePath,
    importText,
    'declarations',
    moduleSource
  );
}

export function addToModuleEntryComponents(
  host: Tree,
  modulePath: string,
  importText: string,
  moduleSource?: ts.SourceFile
): InsertChange[] {
  return addToMetadata(
    host,
    modulePath,
    importText,
    'entryComponents',
    moduleSource
  );
}

export function addToModuleExports(
  host: Tree,
  modulePath: string,
  importText: string,
  moduleSource?: ts.SourceFile
): InsertChange[] {
  return addToMetadata(host, modulePath, importText, 'exports', moduleSource);
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

export function addToModuleImportsAndCommitChanges(
  host: Tree,
  modulePath: string,
  importText: string
): void {
  const metadataChanges = addToModuleImports(host, modulePath, importText);
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
