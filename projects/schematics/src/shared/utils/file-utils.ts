import { strings } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { Attribute, Element, HtmlParser, Node } from '@angular/compiler';
import {
  findNode,
  findNodes,
  getSourceNodes,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import {
  Change,
  InsertChange,
  NoopChange,
  RemoveChange,
  ReplaceChange,
} from '@schematics/angular/utility/change';
import ts from 'typescript';
import {
  ANGULAR_CORE,
  INJECT_DECORATOR,
  TODO_SPARTACUS,
  UTF_8,
} from '../constants';
import {
  getAngularJsonFile,
  getDefaultProjectNameFromWorkspace,
} from './workspace-utils';

export enum InsertDirection {
  LEFT,
  RIGHT,
}

export interface ClassType {
  className: string;
  importPath?: string;
  literalInference?: string;
  injectionToken?: {
    token: string;
    importPath?: string;
    isArray?: boolean;
  };
}

interface InjectServiceConfiguration {
  constructorNode: ts.Node | undefined;
  path: string;
  serviceName: string;
  modifier: 'private' | 'protected' | 'public' | 'no-modifier';
  propertyName?: string;
  propertyType?: string;
  injectionToken?: string;
  isArray?: boolean;
}

export interface ComponentProperty {
  /** property name */
  name: string;
  /** comment describing the change to the property */
  comment: string;
}
export interface ComponentData {
  /** a component's selector, e.g. cx-start-rating */
  selector: string;
  /** a component.ts' class name */
  componentClassName: string;
  /** only `@Input` and `@Output` properties should be listed here */
  removedInputOutputProperties?: ComponentProperty[];
  /** all other removed component properties should be listed here */
  removedProperties?: ComponentProperty[];
}

export interface ConstructorDeprecation {
  class: string;
  importPath: string;
  deprecatedParams: ClassType[];

  /** The list of constructor parameters that are _added_ for the given version. */
  addParams?: ClassType[];

  /** The list of constructor parameters that are _removed_ for the given version. */
  removeParams?: ClassType[];
}

export interface MethodPropertyDeprecation {
  class: string;
  importPath: string;
  deprecatedNode: string;
  newNode?: string;
  comment?: string;
}

export interface DeprecatedNode {
  node: string;
  importPath: string;
  comment?: string;
}

export interface ConfigDeprecation {
  propertyName: string;
  comment: string;
}

export interface RenamedSymbol {
  previousNode: string;
  previousImportPath: string;
  newNode?: string;
  newImportPath: string;
}

export function getTsSourceFile(tree: Tree, path: string): ts.SourceFile {
  const buffer = tree.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not read file (${path}).`);
  }
  const content = buffer.toString(UTF_8);
  const source = ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  return source;
}

export function getAllTsSourceFiles(
  tree: Tree,
  basePath: string
): ts.SourceFile[] {
  const results: string[] = [];
  tree.getDir(basePath).visit((filePath) => {
    if (filePath.endsWith('.ts')) {
      results.push(filePath);
    }
  });

  return results.map((f) => getTsSourceFile(tree, f));
}

export function getIndexHtmlPath(tree: Tree): string {
  const projectName = getDefaultProjectNameFromWorkspace(tree);
  const angularJson = getAngularJsonFile(tree);
  const indexHtml: string = (angularJson.projects[projectName]?.architect?.build
    ?.options as any)?.index;
  if (!indexHtml) {
    throw new SchematicsException('"index.html" file not found.');
  }

  return indexHtml;
}

export function getPathResultsForFile(
  tree: Tree,
  file: string,
  directory?: string
): string[] {
  const results: string[] = [];
  const dir = directory || '/';

  tree.getDir(dir).visit((filePath) => {
    if (filePath.endsWith(file)) {
      results.push(filePath);
    }
  });

  return results;
}

export function getHtmlFiles(
  tree: Tree,
  fileName = '.html',
  directory?: string
): string[] {
  return getPathResultsForFile(tree, fileName || '.html', directory);
}

export function insertComponentSelectorComment(
  content: string,
  componentSelector: string,
  componentProperty: ComponentProperty
): string | undefined {
  const selector = buildSelector(componentSelector);
  const comment = buildHtmlComment(componentProperty.comment);

  let index: number | undefined = 0;
  let newContent = content;
  while (true) {
    index = getTextPosition(newContent, selector, index);
    if (index == null) {
      break;
    }

    newContent = newContent.slice(0, index) + comment + newContent.slice(index);
    index += comment.length + componentSelector.length;
  }

  return newContent;
}

function getTextPosition(
  content: string,
  text: string,
  startingPosition = 0
): number | undefined {
  const index = content.indexOf(text, startingPosition);
  return index !== -1 ? index : undefined;
}

function buildSelector(selector: string): string {
  return `<${selector}`;
}

function visitHtmlNodesRecursively(
  nodes: Node[],
  propertyName: string,
  resultingElements: Node[] = [],
  parentElement?: Element
): void {
  nodes.forEach((node) => {
    if (node instanceof Attribute && parentElement) {
      if (
        node.name.includes(propertyName) ||
        node.value.includes(propertyName)
      ) {
        resultingElements.push(parentElement);
      }
    }
    if (node instanceof Element) {
      visitHtmlNodesRecursively(
        node.attrs,
        propertyName,
        resultingElements,
        node
      );
      visitHtmlNodesRecursively(
        node.children,
        propertyName,
        resultingElements,
        node
      );
    }
  });
}

export function insertHtmlComment(
  content: string,
  componentProperty: ComponentProperty
): string | undefined {
  const comment = buildHtmlComment(componentProperty.comment);
  const result = new HtmlParser().parse(content, '');

  const resultingElements: Node[] = [];
  visitHtmlNodesRecursively(
    result.rootNodes,
    componentProperty.name,
    resultingElements
  );

  resultingElements
    .map((node: Node) => node.sourceSpan.start.line)
    .forEach((line, i) => {
      const split = content.split('\n');
      split.splice(line + i, 0, comment);
      content = split.join('\n');
    });

  return content;
}

function buildHtmlComment(commentText: string): string {
  return `<!-- ${TODO_SPARTACUS} ${commentText} -->`;
}

export function commitChanges(
  host: Tree,
  path: string,
  changes: Change[] | null,
  insertDirection: InsertDirection = InsertDirection.RIGHT
): void {
  if (!changes || changes.length === 0) {
    return;
  }

  const recorder = host.beginUpdate(path);
  changes.forEach((change) => {
    if (change instanceof InsertChange) {
      const pos = change.pos;
      const toAdd = change.toAdd;
      if (insertDirection === InsertDirection.LEFT) {
        recorder.insertLeft(pos, toAdd);
      } else {
        recorder.insertRight(pos, toAdd);
      }
    } else if (change instanceof RemoveChange) {
      const pos = change['pos'];
      const length = change['toRemove'].length;
      recorder.remove(pos, length);
    } else if (change instanceof NoopChange) {
      // nothing to do here...
    } else {
      const pos = (change as ReplaceChange)['pos'];
      const oldText = (change as ReplaceChange)['oldText'];
      const newText = (change as ReplaceChange)['newText'];

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

export function findConstructor(nodes: ts.Node[]): ts.Node | undefined {
  return nodes.find((n) => n.kind === ts.SyntaxKind.Constructor);
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

/**
 *
 * Method performs the following checks on the provided `source` file:
 * - is the file inheriting the provided `constructorDeprecation.class`
 * - is the `constructorDeprecation.class` imported from the specified `constructorDeprecation.importPath`
 * - is the file importing all the provided `parameterClassTypes` from the expected import path
 * - does the provided file contain a constructor
 * - does the `super()` call exist in the constructor
 * - does the param number passed to `super()` match the expected number
 * - does the order and the type of the constructor parameters match the expected `parameterClassTypes`
 *
 * If only once condition is not satisfied, the method returns `false`. Otherwise, it returns `true`.
 *
 * @param source a ts source file
 * @param inheritedClass a class which customers might have extended
 * @param parameterClassTypes a list of parameter class types. Must be provided in the order in which they appear in the deprecated constructor.
 */
export function isCandidateForConstructorDeprecation(
  source: ts.SourceFile,
  constructorDeprecation: ConstructorDeprecation
): boolean {
  const nodes = getSourceNodes(source);

  if (!isInheriting(nodes, constructorDeprecation.class)) {
    return false;
  }

  if (
    !isImported(
      source,
      constructorDeprecation.class,
      constructorDeprecation.importPath
    )
  ) {
    return false;
  }

  if (!checkImports(source, constructorDeprecation.deprecatedParams)) {
    return false;
  }

  const constructorNode = findConstructor(nodes);
  if (!constructorNode) {
    return false;
  }

  if (
    !checkConstructorParameters(
      constructorNode,
      constructorDeprecation.deprecatedParams
    )
  ) {
    return false;
  }

  if (!checkSuper(constructorNode, constructorDeprecation.deprecatedParams)) {
    return false;
  }

  return true;
}

export function isInheriting(
  nodes: ts.Node[],
  inheritedClass: string
): boolean {
  const heritageClauseNodes = nodes.filter(
    (node) => node.kind === ts.SyntaxKind.HeritageClause
  );
  const heritageNodes = findMultiLevelNodesByTextAndKind(
    heritageClauseNodes,
    inheritedClass,
    ts.SyntaxKind.Identifier
  );
  return heritageNodes.length !== 0;
}

function checkImports(
  source: ts.SourceFile,
  parameterClassTypes: ClassType[]
): boolean {
  for (const classImport of parameterClassTypes) {
    if (
      classImport.importPath &&
      !isImported(source, classImport.className, classImport.importPath)
    ) {
      return false;
    }
  }
  return true;
}

function checkConstructorParameters(
  constructorNode: ts.Node,
  parameterClassTypes: ClassType[]
): boolean {
  const constructorParameters = findNodes(
    constructorNode,
    ts.SyntaxKind.Parameter
  );

  const foundClassTypes: ClassType[] = [];
  for (const parameterClassType of parameterClassTypes) {
    for (const constructorParameter of constructorParameters) {
      const constructorParameterType = findNodes(
        constructorParameter,
        ts.SyntaxKind.Identifier
      ).filter((node) => node.getText() === parameterClassType.className);

      if (constructorParameterType.length !== 0) {
        foundClassTypes.push(parameterClassType);
      }
    }
  }

  return foundClassTypes.length === parameterClassTypes.length;
}

function isInjected(
  constructorNode: ts.Node,
  parameterClassType: ClassType
): boolean {
  const constructorParameters = findNodes(
    constructorNode,
    ts.SyntaxKind.Parameter
  );

  for (const constructorParameter of constructorParameters) {
    const constructorParameterType = findNodes(
      constructorParameter,
      ts.SyntaxKind.Identifier
    ).filter((node) => node.getText() === parameterClassType.className);

    if (constructorParameterType.length > 0) {
      return true;
    }
  }

  return false;
}

function checkSuper(
  constructorNode: ts.Node,
  parameterClassTypes: ClassType[]
): boolean {
  const constructorBlock = findNodes(constructorNode, ts.SyntaxKind.Block)[0];
  const callExpressions = findNodes(
    constructorBlock,
    ts.SyntaxKind.CallExpression
  );
  if (callExpressions.length === 0) {
    return false;
  }
  // super has to be the first expression in constructor
  const firstCallExpression = callExpressions[0];
  const superKeyword = findNodes(
    firstCallExpression,
    ts.SyntaxKind.SuperKeyword
  );
  if (superKeyword && superKeyword.length === 0) {
    return false;
  }

  const params = findNodes(firstCallExpression, ts.SyntaxKind.Identifier);
  if (params.length !== parameterClassTypes.length) {
    return false;
  }

  return true;
}

export function addConstructorParam(
  source: ts.SourceFile,
  sourcePath: string,
  constructorNode: ts.Node | undefined,
  paramToAdd: ClassType
): Change[] {
  if (!constructorNode) {
    throw new SchematicsException(`No constructor found in ${sourcePath}.`);
  }
  const changes: Change[] = [];
  if (!isInjected(constructorNode, paramToAdd)) {
    changes.push(
      injectService({
        constructorNode,
        path: sourcePath,
        serviceName: paramToAdd.className,
        modifier: 'no-modifier',
        propertyType: paramToAdd.literalInference,
        injectionToken: paramToAdd.injectionToken?.token,
        isArray: paramToAdd.injectionToken?.isArray,
      })
    );
  }

  if (
    paramToAdd.importPath &&
    !isImported(source, paramToAdd.className, paramToAdd.importPath)
  ) {
    changes.push(
      insertImport(
        source,
        sourcePath,
        paramToAdd.className,
        paramToAdd.importPath
      )
    );
  }
  if (paramToAdd.injectionToken?.token) {
    if (!isImported(source, INJECT_DECORATOR, ANGULAR_CORE)) {
      changes.push(
        insertImport(source, sourcePath, INJECT_DECORATOR, ANGULAR_CORE)
      );
    }

    /**
     * This is for the case when an injection token is the same as the import's type.
     * In this case we don't want to add two imports.
     * Ex: `@Inject(LaunchRenderStrategy) launchRenderStrategy: LaunchRenderStrategy[]`
     */
    if (
      paramToAdd.injectionToken.importPath &&
      paramToAdd.injectionToken.token !== paramToAdd.className &&
      !isImported(
        source,
        paramToAdd.injectionToken.token,
        paramToAdd.injectionToken.importPath
      )
    ) {
      changes.push(
        insertImport(
          source,
          sourcePath,
          paramToAdd.injectionToken.token,
          paramToAdd.injectionToken.importPath
        )
      );
    }
  }

  const paramName = getParamName(source, constructorNode, paramToAdd);
  changes.push(
    updateConstructorSuperNode(
      sourcePath,
      constructorNode,
      paramName || paramToAdd.className
    )
  );

  return changes;
}

export function removeConstructorParam(
  source: ts.SourceFile,
  sourcePath: string,
  constructorNode: ts.Node | undefined,
  paramToRemove: ClassType
): Change[] {
  if (!constructorNode) {
    throw new SchematicsException(`No constructor found in ${sourcePath}.`);
  }

  const changes: Change[] = [];

  if (shouldRemoveImportAndParam(source, paramToRemove)) {
    const importRemovalChange = removeImport(source, paramToRemove);
    const injectImportRemovalChange = removeInjectImports(
      source,
      constructorNode,
      paramToRemove
    );
    const constructorParamRemovalChanges = removeConstructorParamInternal(
      sourcePath,
      constructorNode,
      paramToRemove
    );

    changes.push(
      importRemovalChange,
      ...constructorParamRemovalChanges,
      ...injectImportRemovalChange
    );
  }
  const paramName = getParamName(source, constructorNode, paramToRemove);
  if (!paramName) {
    return [new NoopChange()];
  }

  const superRemoval = removeParamFromSuper(
    sourcePath,
    constructorNode,
    paramName
  );
  changes.push(...superRemoval);

  return changes;
}

export function shouldRemoveDecorator(
  constructorNode: ts.Node,
  decoratorIdentifier: string
): boolean {
  const decoratorParameters = findNodes(
    constructorNode,
    ts.SyntaxKind.Decorator
  ).filter((x) => x.getText().includes(decoratorIdentifier));

  // if there are 0, or exactly 1 usage of the `decoratorIdentifier` in the whole class, we can safely remove it.
  return decoratorParameters.length < 2;
}

function getParamName(
  source: ts.SourceFile,
  constructorNode: ts.Node,
  classType: ClassType
): string | undefined {
  const nodes = getSourceNodes(source);

  const constructorParameters = findNodes(
    constructorNode,
    ts.SyntaxKind.Parameter
  );
  const classDeclarationNode = nodes.find(
    (node) => node.kind === ts.SyntaxKind.ClassDeclaration
  );
  if (!classDeclarationNode) {
    return undefined;
  }

  for (const constructorParameter of constructorParameters) {
    if (constructorParameter.getText().includes(classType.className)) {
      const paramVariableNode = constructorParameter
        .getChildren()
        .find((node) => node.kind === ts.SyntaxKind.Identifier);
      const paramName = paramVariableNode
        ? paramVariableNode.getText()
        : undefined;
      return paramName;
    }
  }

  return undefined;
}

function shouldRemoveImportAndParam(
  source: ts.SourceFile,
  importToRemove: ClassType
): boolean {
  const nodes = getSourceNodes(source);
  const constructorNode = findConstructor(nodes);
  if (!constructorNode) {
    return true;
  }

  const classDeclarationNode = nodes.find(
    (node) => node.kind === ts.SyntaxKind.ClassDeclaration
  );
  if (!classDeclarationNode) {
    return true;
  }

  const constructorParameters = getConstructorParameterList(constructorNode);
  for (const constructorParameter of constructorParameters) {
    if (constructorParameter.getText().includes(importToRemove.className)) {
      const paramVariableNode = constructorParameter
        .getChildren()
        .find((node) => node.kind === ts.SyntaxKind.Identifier);
      const paramName = paramVariableNode ? paramVariableNode.getText() : '';

      const paramUsages = findNodes(
        classDeclarationNode,
        ts.SyntaxKind.Identifier
      ).filter((node) => node.getText() === paramName);
      // if there are more than two usages (injection and passing to super), then the param is used elsewhere in the class
      if (paramUsages.length > 2) {
        return false;
      }

      return true;
    }
  }

  return true;
}

export function removeInjectImports(
  source: ts.SourceFile,
  constructorNode: ts.Node,
  paramToRemove: ClassType
): Change[] {
  if (!paramToRemove.injectionToken) {
    return [new NoopChange()];
  }

  const importRemovalChange: Change[] = [];

  if (shouldRemoveDecorator(constructorNode, INJECT_DECORATOR))
    importRemovalChange.push(
      removeImport(source, {
        className: INJECT_DECORATOR,
        importPath: ANGULAR_CORE,
      })
    );

  /**
   * This is for the case when an injection token is the same as the import's type.
   * In this case we don't want to have two import removal changes.
   * Ex: `@Inject(LaunchRenderStrategy) launchRenderStrategy: LaunchRenderStrategy[]`
   */
  if (
    paramToRemove.injectionToken.importPath &&
    paramToRemove.injectionToken.token !== paramToRemove.className
  ) {
    importRemovalChange.push(
      removeImport(source, {
        className: paramToRemove.injectionToken.token,
        importPath: paramToRemove.injectionToken.importPath,
      })
    );
  }

  return importRemovalChange;
}

export function removeImport(
  source: ts.SourceFile,
  importToRemove: ClassType
): Change {
  const importDeclarationNode = getImportDeclarationNode(
    source,
    importToRemove
  );
  if (!importDeclarationNode) {
    return new NoopChange();
  }

  let position: number;
  let toRemove = importToRemove.className;
  const importSpecifierNodes = findNodes(
    importDeclarationNode,
    ts.SyntaxKind.ImportSpecifier
  );
  if (importSpecifierNodes.length === 1) {
    // delete the whole import line
    position = importDeclarationNode.getStart();
    toRemove = importDeclarationNode.getText();
  } else {
    // delete only the specified import, and leave the rest
    const importSpecifier = importSpecifierNodes
      .map((node, i) => {
        const importNode = findNode(
          node,
          ts.SyntaxKind.Identifier,
          importToRemove.className
        );
        return {
          importNode,
          i,
        };
      })
      .filter((result) => result.importNode)[0];

    if (!importSpecifier.importNode) {
      return new NoopChange();
    }

    // in case the import that needs to be removed is in the middle, we need to remove the ',' that follows the found import
    if (importSpecifier.i !== importSpecifierNodes.length - 1) {
      toRemove += ',';
    }

    position = importSpecifier.importNode.getStart();
  }
  return new RemoveChange(source.fileName, position, toRemove);
}

function getImportDeclarationNode(
  source: ts.SourceFile,
  importToCheck: ClassType
): ts.Node | undefined {
  if (!importToCheck.importPath) {
    return undefined;
  }

  // collect al the import declarations
  const importDeclarationNodes = getImportDeclarations(
    source,
    importToCheck.importPath
  );

  if (importDeclarationNodes.length === 0) {
    return undefined;
  }

  // find the one that contains the specified `importToCheck.className`
  let importDeclarationNode = importDeclarationNodes[0];
  for (const currentImportDeclaration of importDeclarationNodes) {
    const importIdentifiers = findNodes(
      currentImportDeclaration,
      ts.SyntaxKind.Identifier
    );
    const found = importIdentifiers.find(
      (node) => node.getText() === importToCheck.className
    );
    if (found) {
      importDeclarationNode = currentImportDeclaration;
      break;
    }
  }

  return importDeclarationNode;
}

function getConstructorParameterList(constructorNode: ts.Node): ts.Node[] {
  const syntaxList = constructorNode
    .getChildren()
    .filter((node) => node.kind === ts.SyntaxKind.SyntaxList)[0];
  return findNodes(syntaxList, ts.SyntaxKind.Parameter);
}

function removeConstructorParamInternal(
  sourcePath: string,
  constructorNode: ts.Node,
  importToRemove: ClassType
): Change[] {
  const constructorParameters = getConstructorParameterList(constructorNode);

  for (let i = 0; i < constructorParameters.length; i++) {
    const constructorParameter = constructorParameters[i];
    if (constructorParameter.getText().includes(importToRemove.className)) {
      const changes: RemoveChange[] = [];
      // if it's not the first parameter that should be removed, we should remove the comma after the previous parameter
      if (i !== 0) {
        const previousParameter = constructorParameters[i - 1];
        changes.push(new RemoveChange(sourcePath, previousParameter.end, ','));
        // if removing the first param, cleanup the comma after it
      } else if (i === 0 && constructorParameters.length > 1) {
        const commas = findNodes(constructorNode, ts.SyntaxKind.CommaToken);
        // get the comma that matches the constructor parameter's position
        const comma = commas[i];
        changes.push(new RemoveChange(sourcePath, comma.getStart(), ','));
      }

      changes.push(
        new RemoveChange(
          sourcePath,
          constructorParameter.getStart(),
          constructorParameter.getText()
        )
      );
      return changes;
    }
  }
  return [];
}

function removeParamFromSuper(
  sourcePath: string,
  constructorNode: ts.Node,
  paramName: string
): Change[] {
  const constructorBlock = findNodes(constructorNode, ts.SyntaxKind.Block)[0];
  const callExpressions = findNodes(
    constructorBlock,
    ts.SyntaxKind.CallExpression
  );
  if (callExpressions.length === 0) {
    throw new SchematicsException('No super() call found.');
  }

  const changes: Change[] = [];

  // `super()` has to be the first expression in constructor
  const firstCallExpression = callExpressions[0];
  const params = findNodes(firstCallExpression, ts.SyntaxKind.Identifier);
  const commas = findNodes(firstCallExpression, ts.SyntaxKind.CommaToken);
  for (let i = 0; i < params.length; i++) {
    const param = params[i];

    if (param.getText() === paramName) {
      if (i !== 0) {
        const previousCommaPosition = commas[i - 1].getStart();
        changes.push(new RemoveChange(sourcePath, previousCommaPosition, ','));
        // if removing the first param, cleanup the comma after it
      } else if (i === 0 && params.length > 0) {
        // get the comma that matches the constructor parameter's position
        const comma = commas[i];
        changes.push(new RemoveChange(sourcePath, comma.getStart(), ','));
      }

      changes.push(new RemoveChange(sourcePath, param.getStart(), paramName));

      break;
    }
  }

  return changes;
}

function updateConstructorSuperNode(
  sourcePath: string,
  constructorNode: ts.Node,
  propertyName: string
): InsertChange {
  const callBlock = findNodes(constructorNode, ts.SyntaxKind.Block);
  propertyName = strings.camelize(propertyName);

  if (callBlock.length === 0) {
    throw new SchematicsException('No constructor body found.');
  }

  const callExpression = findNodes(callBlock[0], ts.SyntaxKind.CallExpression);

  // super has to be the first expression in constructor
  const firstCallExpression = callExpression[0];
  const superKeyword = findNodes(
    firstCallExpression,
    ts.SyntaxKind.SuperKeyword
  );

  if (superKeyword && superKeyword.length === 0) {
    throw new SchematicsException('No super() call found.');
  }

  let toInsert = '';
  let position: number;
  const params = findNodes(firstCallExpression, ts.SyntaxKind.Identifier);
  // just an empty super() call, without any params passed to it
  if (params.length === 0) {
    position = superKeyword[0].end + 1;
  } else {
    const lastParam = params[params.length - 1];
    toInsert += ', ';
    position = lastParam.end;
  }

  toInsert += propertyName;
  return new InsertChange(sourcePath, position, toInsert);
}

export function injectService(
  config: InjectServiceConfiguration
): InsertChange {
  if (!config.constructorNode) {
    throw new SchematicsException(`No constructor found in ${config.path}.`);
  }

  const constructorParameters = getConstructorParameterList(
    config.constructorNode
  );

  let toInsert = '';
  let position = config.constructorNode.getStart() + 'constructor('.length;
  if (constructorParameters.length > 0) {
    toInsert += ', ';
    const lastParam = constructorParameters[constructorParameters.length - 1];
    position = lastParam.end;
  }

  config.propertyName = config.propertyName
    ? strings.camelize(config.propertyName)
    : strings.camelize(config.serviceName);

  config.propertyType =
    config.propertyType ?? strings.classify(config.serviceName);

  if (config.injectionToken) toInsert += `@Inject(${config.injectionToken}) `;
  if (config.modifier !== 'no-modifier') toInsert += `${config.modifier} `;
  toInsert += `${config.propertyName}: ${config.propertyType}`;

  if (config.isArray) toInsert += '[]';

  return new InsertChange(config.path, position, toInsert);
}

export function buildSpartacusComment(comment: string): string {
  return `// ${TODO_SPARTACUS} ${comment}\n`;
}

export function insertCommentAboveConfigProperty(
  sourcePath: string,
  source: ts.SourceFile,
  identifierName: string,
  comment: string
): Change[] {
  const identifierNodes = new Set<ts.Node>();
  getSourceNodes(source)
    .filter((node) => node.kind === ts.SyntaxKind.ObjectLiteralExpression)
    .forEach((objectLiteralNode) =>
      findNodes(objectLiteralNode, ts.SyntaxKind.Identifier)
        .filter((node) => node.getText() === identifierName)
        .forEach((idNode) => identifierNodes.add(idNode))
    );

  const changes: Change[] = [];
  identifierNodes.forEach((n) =>
    changes.push(
      new InsertChange(
        sourcePath,
        getLineStartFromTSFile(source, n.getStart()),
        `${comment}`
      )
    )
  );
  return changes;
}

export function insertCommentAboveIdentifier(
  sourcePath: string,
  source: ts.SourceFile,
  identifierName: string,
  comment: string,
  identifierType = ts.SyntaxKind.Identifier
): Change[] {
  const classNode = getSourceNodes(source).find(
    (node) => node.kind === ts.SyntaxKind.ClassDeclaration
  );
  if (!classNode) {
    return [new NoopChange()];
  }

  const identifierNodes = findNodes(classNode, identifierType).filter(
    (node) => node.getText() === identifierName
  );

  const changes: InsertChange[] = [];
  identifierNodes.forEach((n) =>
    changes.push(
      new InsertChange(
        sourcePath,
        getLineStartFromTSFile(source, n.getStart()),
        `${comment}`
      )
    )
  );
  return changes;
}

function getImportDeclarations(
  source: ts.SourceFile,
  importPath: string
): ts.ImportDeclaration[] {
  const imports = getSourceNodes(source).filter(
    (node) => node.kind === ts.SyntaxKind.ImportDeclaration
  );
  return imports.filter((imp) =>
    ((imp as ts.ImportDeclaration).moduleSpecifier as ts.StringLiteral)
      .getText()
      .includes(importPath)
  ) as ts.ImportDeclaration[];
}

function filterNamespacedImports(
  imports: ts.ImportDeclaration[]
): ts.ImportDeclaration[] {
  return imports
    .filter((imp) => (imp.importClause?.namedBindings as any)?.name)
    .filter(Boolean);
}

function filterNamedImports(
  imports: ts.ImportDeclaration[]
): ts.ImportDeclaration[] {
  return imports
    .filter((imp) => (imp.importClause?.namedBindings as any)?.elements)
    .filter(Boolean);
}

export function insertCommentAboveImportIdentifier(
  sourcePath: string,
  source: ts.SourceFile,
  identifierName: string,
  importPath: string,
  comment: string
): Change[] {
  const imports = getImportDeclarations(source, importPath);
  const namedImports = filterNamedImports(imports);
  const namespacedImports = filterNamespacedImports(imports);

  const namespacedIdentifiers = namespacedImports
    .map((imp) => (imp.importClause?.namedBindings as any)?.name?.escapedText)
    .filter(Boolean);
  const namedImportsWithIdentifierName = namedImports.filter((imp) =>
    findNodes(imp, ts.SyntaxKind.ImportSpecifier).find(
      (node) => (node as any).name.escapedText === identifierName
    )
  );

  const propertyAccessExpressions = getSourceNodes(source).filter(
    (node) => node.kind === ts.SyntaxKind.PropertyAccessExpression
  );

  const accessPropertiesToIdentifierName = propertyAccessExpressions
    .filter((member) =>
      namespacedIdentifiers.includes((member as any)?.expression?.escapedText)
    )
    .filter((member) => identifierName === (member as any)?.name?.escapedText)
    .filter(Boolean);

  const changes: InsertChange[] = [];

  namedImportsWithIdentifierName.forEach((n) =>
    changes.push(
      new InsertChange(
        sourcePath,
        getLineStartFromTSFile(source, n.getStart()),
        comment
      )
    )
  );

  accessPropertiesToIdentifierName.forEach((n) =>
    changes.push(
      new InsertChange(
        sourcePath,
        getLineStartFromTSFile(source, n.getStart()),
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
  const identifierNodes = findLevel1NodesInSourceByTextAndKind(
    source,
    oldName,
    ts.SyntaxKind.Identifier
  );
  const changes: ReplaceChange[] = [];
  identifierNodes.forEach((n) =>
    changes.push(new ReplaceChange(sourcePath, n.getStart(), oldName, newName))
  );
  return changes;
}

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
    .filter((n) => n.kind === syntaxKind)
    .filter((n) => n.getText() === text);
}

export function findMultiLevelNodesByTextAndKind(
  nodes: ts.Node[],
  text: string,
  syntaxKind: ts.SyntaxKind
): ts.Node[] {
  const result: ts.Node[] = [];
  for (const node of nodes) {
    result.push(
      ...findNodes(node, syntaxKind).filter((n) => n.getText() === text)
    );
  }
  return result;
}

function getLineStartFromTSFile(
  source: ts.SourceFile,
  position: number
): number {
  const lac = source.getLineAndCharacterOfPosition(position);
  return source.getPositionOfLineAndCharacter(lac.line, 0);
}

// as this is copied from https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/app-shell/index.ts#L211, no need to test Angular's code
export function getMetadataProperty(
  metadata: ts.Node,
  propertyName: string
): ts.PropertyAssignment {
  const properties = (metadata as ts.ObjectLiteralExpression).properties;
  const property = properties.filter((prop) => {
    if (!ts.isPropertyAssignment(prop)) {
      return false;
    }
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

export function getLineFromTSFile(
  host: Tree,
  path: string,
  position: number
): [number, number] {
  const tsFile = getTsSourceFile(host, path);

  const lac = tsFile.getLineAndCharacterOfPosition(position);
  const lineStart = tsFile.getPositionOfLineAndCharacter(lac.line, 0);
  const nextLineStart = tsFile.getPositionOfLineAndCharacter(lac.line + 1, 0);

  return [lineStart, nextLineStart - lineStart];
}

export function getServerTsPath(host: Tree): string | undefined {
  const projectName = getDefaultProjectNameFromWorkspace(host);
  const angularJson = getAngularJsonFile(host);
  return angularJson.projects[projectName].architect?.server?.options?.main;
}
