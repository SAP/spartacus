import { experimental, strings } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProjectTargetOptions } from '@angular/cdk/schematics';
import { parseTsconfigFile } from '@angular/core/schematics/utils/typescript/parse_tsconfig';
import {
  findNodes,
  getSourceNodes,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import {
  Change,
  InsertChange,
  ReplaceChange,
} from '@schematics/angular/utility/change';
import { dirname, relative } from 'path';
import * as ts from 'typescript';

export enum InsertDirection {
  LEFT,
  RIGHT,
}

export interface ClassType {
  className: string;
  importPath: string;
}
// TODO:#6432 - remove
export interface Param {
  paramName: string;
  paramType: string;
}

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

// TODO:#6432 - test
export function findConstructor(nodes: ts.Node[]): ts.Node | undefined {
  return nodes.find(n => n.kind === ts.SyntaxKind.Constructor);
}

export function defineProperty(
  nodes: ts.Node[],
  path: string,
  toAdd: string
): InsertChange {
  const constructorNode = findConstructor(nodes);

  if (!constructorNode) {
    throw new SchematicsException(`No constructor found in ${path}.`);
  }

  return new InsertChange(path, constructorNode.pos + 1, toAdd);
}

const DELETE_ME = true;
/**
 *
 * Method performs the following checks on the provided `source` file:
 * - is the file inheriting the provided `inheritedClass`
 * - is the file importing all the provided `parameterClassTypes` from the expected import path
 * - does the provided file contain a constructor
 * - does the number of the constructor parameters match the expected `parameterClassTypes`
 * - does the order and the type of the constructor parameters match the expected `parameterClassTypes`
 *
 * If only once condition is not satisfied, the method returns `false`. Otherwise, it returns `true`.
 *
 * @param source a ts source file
 * @param inheritedClass a class which customers might have extended
 * @param parameterClassTypes a list of parameter class types. Must be provided in the order in which they appear in the deprecated constructor.
 */
// TODO:#6432  - test
export function isCandidateForConstructorDeprecation(
  source: ts.SourceFile,
  inheritedClass: string,
  parameterClassTypes: ClassType[]
): boolean {
  const nodes = getSourceNodes(source);

  // TODO:#6432 - extract every piece of logic to a smaller non-exported function

  const heritageClauseNodes = nodes.filter(
    node => node.kind === ts.SyntaxKind.HeritageClause
  );
  const heritageNodes = findMultiLevelNodesByTextAndKind(
    heritageClauseNodes,
    inheritedClass,
    ts.SyntaxKind.Identifier
  );
  if (!heritageNodes || heritageNodes.length === 0) {
    if (DELETE_ME) console.log('no heritage nodes');
    return false;
  }

  for (const classImport of parameterClassTypes) {
    if (!isImported(source, classImport.className, classImport.importPath)) {
      if (DELETE_ME) console.log('no import: ', classImport);
      return false;
    }
  }

  const constructorNode = findConstructor(nodes);
  if (!constructorNode) {
    if (DELETE_ME) console.log('no constructor');
    return false;
  }

  const constructorParameters = findNodes(
    constructorNode,
    ts.SyntaxKind.Parameter
  );
  // the number of constructor parameter does not match with the expected number of parameters
  if (constructorParameters.length !== parameterClassTypes.length) {
    if (DELETE_ME) console.log('constructor param number does not match');
    return false;
  }

  for (let i = 0; i < parameterClassTypes.length; i++) {
    const parameterClassType = parameterClassTypes[i];
    const constructorParameter = constructorParameters[i];

    const constructorParameterTypeReferenceNode = constructorParameter
      .getChildren()
      .find(node => node.kind === ts.SyntaxKind.TypeReference);
    if (!constructorParameterTypeReferenceNode) {
      if (DELETE_ME) console.log('no TypeReference node');
      return false;
    }
    const constructorParameterType = findLevel1NodesByTextAndKind(
      constructorParameterTypeReferenceNode.getChildren(),
      parameterClassType.className,
      ts.SyntaxKind.Identifier
    );

    // return false if there's no param with the expected type on the current position
    if (constructorParameterType.length === 0) {
      if (DELETE_ME) console.log('param not on expected position');
      return false;
    }
  }

  return true;
}

// TODO:#6432 - delete?
// TODO:#6432 - test
export function collectConstructorParameterNames(
  constructorNode: ts.Node | undefined
): Param[] {
  if (!constructorNode) {
    throw new SchematicsException('No constructor provided.');
  }

  const constructorParameters = findNodes(
    constructorNode,
    ts.SyntaxKind.Parameter
  );
  return constructorParameters.map(paramNode => {
    const paramNameNode = paramNode
      .getChildren()
      .find(node => node.kind === ts.SyntaxKind.Identifier);
    const constructorParameterTypeReferenceNode = paramNode
      .getChildren()
      .find(node => node.kind === ts.SyntaxKind.TypeReference);

    return {
      paramName: paramNameNode ? paramNameNode.getText() : '',
      paramType: constructorParameterTypeReferenceNode
        ? constructorParameterTypeReferenceNode.getText()
        : '',
    };
  });
}

// TODO:#6432 - test
// export function removeConstructor(): Change[] {}

// TODO:#6432 - rename to `addParamToConstructor`
// TODO:#6432 - test
export function updateConstructor(
  constructorNode: ts.Node | undefined,
  sourcePath: string,
  paramToAdd: ClassType
): InsertChange[] {
  if (!constructorNode) {
    throw new SchematicsException(`No constructor found in ${sourcePath}.`);
  }

  const changes: InsertChange[] = [];

  changes.push(
    injectService(
      constructorNode,
      sourcePath,
      paramToAdd.className,
      'no-modifier'
    )
  );

  // TODO:#6432 - add import statement
  // TODO:#6432 - check if the import path already exists, in which case the import should just be appended
  // TODO:#6432 - maybe create one method that will perform this task. refactor the existing code to use it.

  // TODO:#6432 add to super()
  changes.push(
    updateConstructorSuperNode(
      sourcePath,
      constructorNode,
      paramToAdd.className
    )
  );

  return changes;
}

function updateConstructorSuperNode(
  sourcePath: string,
  constructorNode: ts.Node,
  propertyName: string
): InsertChange {
  const callExpressions = findNodes(
    constructorNode,
    ts.SyntaxKind.CallExpression
  );
  propertyName = strings.camelize(propertyName);

  // TODO:#6432 - how to check if there are no super calls?
  if (callExpressions.length === 0) {
    // TODO:#6432 - test this
    return createSuper(sourcePath, constructorNode, propertyName);
  }
  // super has to be the first expression in constructor
  const superKeyword = findNodes(
    callExpressions[0],
    ts.SyntaxKind.SuperKeyword
  );
  if (superKeyword && superKeyword.length === 0) {
    // TODO:#6432 - test this
    return createSuper(sourcePath, constructorNode, propertyName);
  }

  let toAdd = '';
  let position: number;

  const params = findNodes(callExpressions[0], ts.SyntaxKind.Identifier);
  // just an empty super() call, without any params passed to it
  if (params && params.length === 0) {
    // TODO:#6432 - test this
    position = superKeyword[0].end + 1;
  } else {
    // TODO:#6432 - test this
    const lastParam = params[params.length - 1];
    toAdd += ', ';
    position = lastParam.end;
  }

  toAdd += propertyName;
  return new InsertChange(sourcePath, position, toAdd);
}

function createSuper(
  sourcePath: string,
  constructorNode: ts.Node,
  propertyName: string
): InsertChange {
  propertyName = strings.camelize(propertyName);
  const blockNode = findNodes(constructorNode, ts.SyntaxKind.Block)[0];
  if (DELETE_ME) console.log('inserting super on: ', blockNode.getStart());
  const toAdd = `super(${propertyName});`;
  return new InsertChange(sourcePath, blockNode.getStart() + 1, toAdd);
}

// TODO:#6432 - check if the add cms component schematic is still working as before
export function injectService(
  constructorNode: ts.Node | undefined,
  path: string,
  serviceName: string,
  modifier: 'private' | 'protected' | 'public' | 'no-modifier',
  propertyName?: string
): InsertChange {
  if (!constructorNode) {
    throw new SchematicsException(`No constructor found in ${path}.`);
  }

  const constructorParameters = findNodes(
    constructorNode,
    ts.SyntaxKind.Parameter
  );

  // TODO:#6432 - test what happens if there are no constructor parameters. We SHOULD NOT throw the exception in this
  if (!constructorParameters) {
    throw new SchematicsException(
      `No parameter list found in ${path}'s constructor.`
    );
  }

  const append = constructorParameters.length > 0;
  const lastParam = constructorParameters[constructorParameters.length - 1];

  propertyName = propertyName
    ? strings.camelize(propertyName)
    : strings.camelize(serviceName);

  let toAdd = append ? ', ' : '';
  if (modifier !== 'no-modifier') toAdd += modifier;
  toAdd += `${propertyName}: ${strings.classify(serviceName)}`;

  return new InsertChange(path, lastParam.end, toAdd);
}

export function insertCommentAboveIdentifier(
  sourcePath: string,
  source: ts.SourceFile,
  identifierName: string,
  comment: string
): InsertChange[] {
  const callExpressionNodes = findLevel1NodesInSourceByTextAndKind(
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
  const callExpressionNodes = findLevel1NodesInSourceByTextAndKind(
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

// TODO:#6432 - delete the test, the function is not exported
function findLevel1NodesInSourceByTextAndKind(
  source: ts.SourceFile,
  text: string,
  syntaxKind: ts.SyntaxKind
): ts.Node[] {
  const nodes = getSourceNodes(source);
  return findLevel1NodesByTextAndKind(nodes, text, syntaxKind);
}

function findLevel1NodesByTextAndKind(
  nodes: ts.Node[],
  text: string,
  syntaxKind: ts.SyntaxKind
): ts.Node[] {
  return nodes
    .filter(n => n.kind === syntaxKind)
    .filter(n => n.getText() === text);
}

function findMultiLevelNodesByTextAndKind(
  nodes: ts.Node[],
  text: string,
  syntaxKind: ts.SyntaxKind
): ts.Node[] {
  const result: ts.Node[] = [];
  for (const node of nodes) {
    result.push(
      ...findNodes(node, syntaxKind).filter(n => n.getText() === text)
    );
  }
  return result;
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
