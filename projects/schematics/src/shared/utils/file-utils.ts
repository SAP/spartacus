import { experimental, strings } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProjectTargetOptions } from '@angular/cdk/schematics';
import { parseTsconfigFile } from '@angular/core/schematics/utils/typescript/parse_tsconfig';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import {
  Change,
  InsertChange,
  ReplaceChange,
} from '@schematics/angular/utility/change';
import { dirname, relative } from 'path';
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

export function getAllTsSourceFiles(
  tsconfigPath: string,
  tree: Tree,
  basePath: string
): ts.SourceFile[] {
  const parsed = parseTsconfigFile(tsconfigPath, dirname(tsconfigPath));
  const host = createMigrationCompilerHost(tree, parsed.options, basePath);
  const program = ts.createProgram(parsed.fileNames, parsed.options, host);
  return program
    .getSourceFiles()
    .filter(
      f => !f.isDeclarationFile && !program.isSourceFileFromExternalLibrary(f)
    );
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

export function insertCommentAboveIdentifier(
  sourcePath: string,
  source: ts.SourceFile,
  identifierName: string,
  comment: string
): InsertChange[] {
  const callExpressionNodes = findNodesByTextAndKind(
    source,
    identifierName,
    ts.SyntaxKind.Identifier
  );
  const changes: InsertChange[] = [];
  callExpressionNodes.forEach(n =>
    changes.push(
      new InsertChange(
        sourcePath,
        getLineStartFromTSFile(source, n.getFullStart()),
        comment
      )
    )
  );
  return changes;
}

export function renameIdentifierNode(
  sourcePath: string,
  source: ts.SourceFile,
  oldName: string,
  newName: string
): ReplaceChange[] {
  const callExpressionNodes = findNodesByTextAndKind(
    source,
    oldName,
    ts.SyntaxKind.Identifier
  );
  const changes: ReplaceChange[] = [];
  callExpressionNodes.forEach(n =>
    changes.push(new ReplaceChange(sourcePath, n.getStart(), oldName, newName))
  );
  return changes;
}

function findNodesByTextAndKind(
  source: ts.SourceFile,
  text: string,
  syntaxKind: ts.SyntaxKind
): ts.Node[] {
  const nodes = getSourceNodes(source);
  return nodes
    .filter(n => n.kind === syntaxKind)
    .filter(n => n.getText() === text);
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

// copied from https://github.com/angular/angular/blob/master/packages/core/schematics/utils/typescript/compiler_host.ts#L12, no need to test angular's code
export function createMigrationCompilerHost(
  tree: Tree,
  options: ts.CompilerOptions,
  basePath: string,
  fakeRead?: (fileName: string) => string | null
): ts.CompilerHost {
  const host = ts.createCompilerHost(options, true);

  // We need to overwrite the host "readFile" method, as we want the TypeScript
  // program to be based on the file contents in the virtual file tree. Otherwise
  // if we run multiple migrations we might have intersecting changes and
  // source files.
  host.readFile = fileName => {
    const treeRelativePath = relative(basePath, fileName);
    const fakeOutput = fakeRead ? fakeRead(treeRelativePath) : null;
    const buffer =
      fakeOutput === null ? tree.read(treeRelativePath) : fakeOutput;
    // Strip BOM as otherwise TSC methods (Ex: getWidth) will return an offset,
    // which breaks the CLI UpdateRecorder.
    // See: https://github.com/angular/angular/pull/30719
    return buffer ? buffer.toString().replace(/^\uFEFF/, '') : undefined;
  };

  return host;
}
