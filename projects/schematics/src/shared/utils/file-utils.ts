import { SchematicsException, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { experimental } from '@angular-devkit/core';
import { getProjectTargetOptions } from '@angular/cdk/schematics';

export function getTsSourceFile(tree: Tree, path: string): ts.SourceFile {
  const buffer = tree.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not read file (${path}).`);
  }
  const content = buffer.toString();
  const source = ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  return source;
}

export function getIndexHtmlPath(
  project: experimental.workspace.WorkspaceProject
): string {
  const buildOptions = getProjectTargetOptions(project, 'build');

  if (!buildOptions.index) {
    throw new SchematicsException('"index.html" file not found.');
  }

  return buildOptions.index;
}

export function getPathResultsForFile(
  tree: Tree,
  file: string,
  directory?: string
): string[] {
  const results: string[] = [];
  const dir = directory || '/';

  tree.getDir(dir).visit(filePath => {
    if (filePath.endsWith(file)) {
      results.push(filePath);
    }
  });

  return results;
}
