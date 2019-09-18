import { SchematicsException, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { experimental } from '@angular-devkit/core';
import { getProjectTargetOptions } from '@angular/cdk/schematics';

export function getTsSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);
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
