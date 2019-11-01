import { experimental, strings } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProjectTargetOptions } from '@angular/cdk/schematics';
import {
  Change,
  InsertChange,
  NoopChange,
} from '@schematics/angular/utility/change';
import * as ts from 'typescript';

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

export enum InsertDirection {
  LEFT,
  RIGHT,
}

// TODO:#12
export function commitChanges(
  host: Tree,
  path: string,
  changes: Change[] | null,
  insertDirection: InsertDirection
): void {
  if (!changes) {
    return;
  }

  const recorder = host.beginUpdate(path);
  changes.forEach(change => {
    const pos = (change as InsertChange).pos;
    const toAdd = (change as InsertChange).toAdd;

    if (insertDirection === InsertDirection.LEFT) {
      recorder.insertLeft(pos, toAdd);
    } else {
      recorder.insertRight(pos, toAdd);
    }
  });
  host.commitUpdate(recorder);
}

export function inject(
  nodes: ts.Node[],
  path: string,
  serviceName: string,
  propertyName?: string
): Change {
  const constructorNode = nodes.find(n => n.kind === ts.SyntaxKind.Constructor);

  if (!constructorNode) {
    // TODO:#12 create the constructor
    // constructorNode = createConstructor();
    return new NoopChange();
  }

  const siblings = constructorNode.getChildren();
  const parameterListNode = siblings.find(
    n => n.kind === ts.SyntaxKind.SyntaxList
  );
  if (!parameterListNode) {
    // TODO:#12 what to do here?
    return new NoopChange();
  }

  propertyName = propertyName || strings.camelize(serviceName);
  const toAdd = `private ${propertyName}: ${strings.classify(serviceName)}`;
  return new InsertChange(path, parameterListNode.pos, toAdd);
}
