import { experimental, strings } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProjectTargetOptions } from '@angular/cdk/schematics';
import { Change, InsertChange } from '@schematics/angular/utility/change';
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

export function defineProperty(
  nodes: ts.Node[],
  path: string,
  toAdd: string
): InsertChange {
  const constructorNode = nodes.find(n => n.kind === ts.SyntaxKind.Constructor);

  if (!constructorNode) {
    throw new SchematicsException(`No constructor found in ${path}.`);
  }

  return new InsertChange(path, constructorNode.pos + 1, toAdd);
}

export function injectService(
  nodes: ts.Node[],
  path: string,
  serviceName: string,
  propertyName?: string
): InsertChange {
  const constructorNode = nodes.find(n => n.kind === ts.SyntaxKind.Constructor);

  if (!constructorNode) {
    throw new SchematicsException(`No constructor found in ${path}.`);
  }

  const parameterListNode = constructorNode
    .getChildren()
    .find(n => n.kind === ts.SyntaxKind.SyntaxList);

  if (!parameterListNode) {
    throw new SchematicsException(
      `No no parameter list found in ${path}'s constructor.`
    );
  }

  propertyName = propertyName
    ? strings.camelize(propertyName)
    : strings.camelize(serviceName);
  const toAdd = `private ${propertyName}: ${strings.classify(serviceName)}`;
  return new InsertChange(path, parameterListNode.pos, toAdd);
}

// as this is copied from https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/app-shell/index.ts#L211, no need to test Angular's code
export function getMetadataProperty(
  metadata: ts.Node,
  propertyName: string
): ts.PropertyAssignment {
  const properties = (metadata as ts.ObjectLiteralExpression).properties;
  const property = properties
    .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
    .filter((prop: ts.PropertyAssignment) => {
      const name = prop.name;
      switch (name.kind) {
        case ts.SyntaxKind.Identifier:
          return (name as ts.Identifier).getText() === propertyName;
        case ts.SyntaxKind.StringLiteral:
          return (name as ts.StringLiteral).text === propertyName;
      }

      return false;
    })[0];

  return property as ts.PropertyAssignment;
}
