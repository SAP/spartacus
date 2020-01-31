import { experimental, strings } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProjectTargetOptions } from '@angular/cdk/schematics';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import {
  Change,
  InsertChange,
  ReplaceChange,
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
    if (change instanceof InsertChange) {
      const pos = change.pos;
      const toAdd = change.toAdd;
      if (insertDirection === InsertDirection.LEFT) {
        recorder.insertLeft(pos, toAdd);
      } else {
        recorder.insertRight(pos, toAdd);
      }
    } else if (change instanceof ReplaceChange) {
      const pos = change['pos'];
      const oldText = change['oldText'];
      const newText = change['newText'];

      recorder.remove(pos, oldText.length);
      if (insertDirection === InsertDirection.LEFT) {
        recorder.insertLeft(pos, newText);
      } else {
        recorder.insertRight(pos, newText);
      }
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

// TODO:#6027 - test
export function insertCommentAboveMethodCall(
  sourcePath: string,
  source: ts.SourceFile,
  methodName: string,
  comment: string
): InsertChange[] {
  const callExpressionNodes = findIdentifierNodes(source, methodName);
  const changes: InsertChange[] = [];
  callExpressionNodes.forEach(n => {
    changes.push(
      new InsertChange(
        sourcePath,
        getLineStartFromTSFile(source, n.getFullStart()),
        comment
      )
    );
  });
  return changes;
}

// TODO:#6027 - test
export function replaceMethodUsage(
  sourcePath: string,
  source: ts.SourceFile,
  oldMethod: string,
  newMethod: string
): ReplaceChange[] {
  const callExpressionNodes = findIdentifierNodes(source, oldMethod);
  const changes: ReplaceChange[] = [];
  callExpressionNodes.forEach(n =>
    changes.push(
      new ReplaceChange(sourcePath, n.getStart(), oldMethod, newMethod)
    )
  );
  return changes;
}

function findIdentifierNodes(
  source: ts.SourceFile,
  methodName: string
): ts.Node[] {
  const nodes = getSourceNodes(source);
  return nodes
    .filter(n => n.kind === ts.SyntaxKind.Identifier)
    .filter(n => n.getText() === methodName);
}

function getLineStartFromTSFile(
  source: ts.SourceFile,
  position: number
): number {
  const lac = source.getLineAndCharacterOfPosition(position);
  const lineStart = source.getPositionOfLineAndCharacter(lac.line, 0);

  return lineStart;
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
