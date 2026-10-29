/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicsException } from '@angular-devkit/schematics';
import { basename } from 'node:path';
import {
  Block,
  CallExpression,
  IndentationText,
  Node,
  QuoteKind,
  SourceFile,
  Statement,
  SymbolFlags,
  SyntaxKind,
  VariableDeclaration,
} from 'ts-morph';
import { SPARTACUS_SETUP } from '../shared/libs-constants';
import { createImports } from '../shared/utils/import-utils';
import { createProgram, formatFile } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

const SSR_MODULE = `${SPARTACUS_SETUP}/ssr`;
const FACTORY = 'createBaseSiteAwareRoute';
const ROUTE_FACTORY = 'registerBaseSiteAwareRoute';
const EXAMPLE_ROUTE = '/example.txt';

type Scope = SourceFile | Block;
type ServerRouteCall = { statement: Statement; call: CallExpression };

export interface UpdateServerOptions {
  project: string;
  serverPath: string;
}

export function updateServer(options: UpdateServerOptions): Rule {
  return (tree, context) => {
    const { project, serverPath } = options;
    const { buildPaths } = getProjectTsConfigPaths(tree, project);
    const source = buildPaths
      .map((tsconfigPath) =>
        createProgram(tree, process.cwd(), tsconfigPath).program.getSourceFile(
          serverPath
        )
      )
      .find((file): file is SourceFile => file !== undefined);
    if (!source) {
      throw new SchematicsException(
        `SSR entry "${serverPath}" is not included in the project's TypeScript build configuration.`
      );
    }
    if (updateServerSource(source)) {
      formatFile(source);
      tree.overwrite(source.getFilePath(), source.getFullText());
      context.logger.info(`Added ${EXAMPLE_ROUTE} to ${serverPath}.`);
    } else {
      context.logger.info(
        `${EXAMPLE_ROUTE} is already configured in ${serverPath}.`
      );
    }
    return tree;
  };
}

function importNames(
  source: SourceFile,
  module: string,
  exportedName?: string
): string[] {
  return source
    .getImportDeclarations()
    .filter((declaration) => declaration.getModuleSpecifierValue() === module)
    .flatMap((declaration) =>
      exportedName
        ? declaration
            .getNamedImports()
            .filter((specifier) => specifier.getName() === exportedName)
            .map(
              (specifier) =>
                specifier.getAliasNode()?.getText() ?? specifier.getName()
            )
        : [
            declaration.getDefaultImport()?.getText(),
            declaration.getNamespaceImport()?.getText(),
          ].filter((name): name is string => name !== undefined)
    );
}

function isImportBinding(
  declaration: Node,
  module: string,
  exportedName?: string
): boolean {
  const importDeclaration = declaration.getFirstAncestorByKind(
    SyntaxKind.ImportDeclaration
  );
  if (importDeclaration?.getModuleSpecifierValue() !== module) {
    return false;
  }
  return exportedName
    ? Node.isImportSpecifier(declaration) &&
        declaration.getName() === exportedName
    : Node.isImportClause(declaration) || Node.isNamespaceImport(declaration);
}

function isImportedValue(
  expression: Node,
  module: string,
  exportedName?: string
): boolean {
  return (
    Node.isIdentifier(expression) &&
    (expression.getSymbol()?.getDeclarations() ?? []).some((declaration) =>
      isImportBinding(declaration, module, exportedName)
    )
  );
}

function declarationsIn(scope: Scope): VariableDeclaration[] {
  return scope
    .getStatements()
    .filter(Node.isVariableStatement)
    .flatMap((statement) => statement.getDeclarations());
}

function containingScope(declaration: VariableDeclaration): Scope {
  const parent = declaration
    .getFirstAncestorByKindOrThrow(SyntaxKind.VariableStatement)
    .getParent();
  if (!Node.isBlock(parent) && !Node.isSourceFile(parent)) {
    throw new SchematicsException(
      'Unsupported variable scope in the SSR server.'
    );
  }
  return parent;
}

function serverCall(
  statement: Statement,
  serverName: string
): CallExpression | undefined {
  if (!Node.isExpressionStatement(statement)) {
    return undefined;
  }
  const call = statement.getExpression();
  if (!Node.isCallExpression(call)) {
    return undefined;
  }
  const expression = call.getExpression();
  return Node.isPropertyAccessExpression(expression) &&
    expression.getExpression().getText() === serverName
    ? call
    : undefined;
}

function isIndexPath(
  node: Node,
  declarations: ReadonlyMap<string, VariableDeclaration>,
  visited: ReadonlySet<string> = new Set()
): boolean {
  if (Node.isStringLiteral(node)) {
    return ['index.html', 'index.server.html'].includes(
      basename(node.getLiteralValue())
    );
  }
  if (Node.isIdentifier(node)) {
    const name = node.getText();
    const initializer = declarations.get(name)?.getInitializer();
    return Boolean(
      initializer &&
        !visited.has(name) &&
        isIndexPath(
          initializer,
          declarations,
          new Set([...Array.from(visited), name])
        )
    );
  }
  return (
    Node.isCallExpression(node) &&
    node
      .getArguments()
      .some((argument) => isIndexPath(argument, declarations, visited))
  );
}

function isHtmlRead(
  declaration: VariableDeclaration,
  declarations: ReadonlyMap<string, VariableDeclaration>
): boolean {
  const call = declaration.getInitializerIfKind(SyntaxKind.CallExpression);
  if (!call || !Node.isIdentifier(declaration.getNameNode())) {
    return false;
  }
  const expression = call.getExpression();
  const fsModules = ['node:fs', 'fs'];
  const readsFile = fsModules.some(
    (module) =>
      isImportedValue(expression, module, 'readFileSync') ||
      (Node.isPropertyAccessExpression(expression) &&
        expression.getName() === 'readFileSync' &&
        isImportedValue(expression.getExpression(), module))
  );
  const [path, encoding] = call.getArguments();

  return Boolean(
    readsFile &&
      path &&
      encoding &&
      Node.isStringLiteral(encoding) &&
      ['utf8', 'utf-8'].includes(encoding.getLiteralValue()) &&
      isIndexPath(path, declarations)
  );
}

function isExampleOptions(node: Node): boolean {
  return (
    Node.isObjectLiteralExpression(node) &&
    node
      .getProperty('route')
      ?.asKind(SyntaxKind.PropertyAssignment)
      ?.getInitializerIfKind(SyntaxKind.StringLiteral)
      ?.getLiteralValue() === EXAMPLE_ROUTE
  );
}

function containsExample(call: CallExpression): boolean {
  return call
    .getArguments()
    .some(
      (argument) =>
        (Node.isStringLiteral(argument) &&
          argument.getLiteralValue() === EXAMPLE_ROUTE) ||
        isExampleOptions(argument) ||
        argument
          .getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)
          .some(isExampleOptions)
    );
}

function canMatchExample(route: Node | undefined): boolean {
  if (route && Node.isStringLiteral(route)) {
    const path = route.getLiteralValue().toLowerCase();
    const dynamicStart = path.search(/[:*{}\\]/);
    if (dynamicStart >= 0) {
      return EXAMPLE_ROUTE.startsWith(path.slice(0, dynamicStart));
    }
    const prefix = path.replace(/\/+$/, '');
    return (
      prefix === '' ||
      EXAMPLE_ROUTE === prefix ||
      EXAMPLE_ROUTE.startsWith(`${prefix}/`)
    );
  }
  if (route && Node.isRegularExpressionLiteral(route)) {
    return new RegExp(route.getLiteralValue()).test(EXAMPLE_ROUTE);
  }
  if (route && Node.isArrayLiteralExpression(route)) {
    return route.getElements().some(canMatchExample);
  }
  // Dynamic matchers may consume the example, so do not assume they are scoped away.
  return true;
}

function isCatchAllRouteMatcher(route: Node | undefined): boolean {
  if (!route) {
    return false;
  }
  if (Node.isStringLiteral(route)) {
    return (
      ['*', '/*'].includes(route.getLiteralValue()) ||
      /^\/\*[\w$]+$/.test(route.getLiteralValue()) ||
      /^\/\{\*[\w$]+\}$/.test(route.getLiteralValue())
    );
  }
  return (
    Node.isRegularExpressionLiteral(route) &&
    ['/.*/', '/^.*$/', '/^\\/.*$/'].some((pattern) =>
      route.getText().startsWith(pattern)
    )
  );
}

function isRenderingCatchAll(call: CallExpression): boolean {
  const [route] = call.getArguments();

  return Boolean(
    isCatchAllRouteMatcher(route) &&
      call.getDescendantsOfKind(SyntaxKind.CallExpression).some((nested) => {
        const expression = nested.getExpression();
        return (
          Node.isPropertyAccessExpression(expression) &&
          expression.getName() === 'render'
        );
      })
  );
}

function isTerminalRoute(call: CallExpression): boolean {
  return (
    isRenderingCatchAll(call) ||
    (canMatchExample(call.getArguments()[0]) &&
      call.getDescendantsOfKind(SyntaxKind.CallExpression).some((nested) => {
        const expression = nested.getExpression();
        return (
          Node.isPropertyAccessExpression(expression) &&
          expression.getName() === 'static' &&
          isImportedValue(expression.getExpression(), 'express')
        );
      }))
  );
}

function ensureFactoryImport(source: SourceFile): void {
  const imports = source
    .getImportDeclarations()
    .filter(
      (declaration) => declaration.getModuleSpecifierValue() === SSR_MODULE
    );
  const existing = imports
    .flatMap((declaration) => declaration.getNamedImports())
    .find((specifier) => specifier.getName() === FACTORY);

  if (existing) {
    const declaration = existing.getImportDeclaration();
    if (declaration.isTypeOnly()) {
      declaration
        .getNamedImports()
        .filter((specifier) => specifier !== existing)
        .forEach((specifier) => specifier.setIsTypeOnly(true));
      declaration.setIsTypeOnly(false);
    }
    existing.setIsTypeOnly(false);
  } else if (imports[0]?.isTypeOnly()) {
    source.addImportDeclaration({
      moduleSpecifier: SSR_MODULE,
      namedImports: [FACTORY],
    });
  } else {
    createImports(source, {
      moduleSpecifier: SSR_MODULE,
      namedImports: [FACTORY],
    });
  }
}

function getExpressApplication(source: SourceFile): VariableDeclaration {
  const expressDeclarations = source
    .getDescendantsOfKind(SyntaxKind.VariableDeclaration)
    .filter((declaration) => {
      const initializer = declaration.getInitializerIfKind(
        SyntaxKind.CallExpression
      );
      return (
        Node.isIdentifier(declaration.getNameNode()) &&
        initializer &&
        isImportedValue(initializer.getExpression(), 'express')
      );
    });
  if (expressDeclarations.length !== 1) {
    throw new SchematicsException(
      'Could not identify a unique Express application in the SSR server.'
    );
  }

  return expressDeclarations[0];
}

function getRouteFactories(
  declarations: ReadonlyMap<string, VariableDeclaration>
): VariableDeclaration[] {
  return Array.from(declarations.values()).filter((declaration) => {
    const initializer = declaration.getInitializerIfKind(
      SyntaxKind.CallExpression
    );
    return (
      initializer &&
      isImportedValue(initializer.getExpression(), SSR_MODULE, FACTORY)
    );
  });
}

function isExampleConfigured(
  calls: readonly ServerRouteCall[],
  factory: VariableDeclaration | undefined
): boolean {
  const examples = calls.filter(({ call }) => containsExample(call));
  if (examples.length) {
    const alreadyConfigured =
      examples.length === 1 &&
      factory &&
      examples[0].call
        .getArguments()
        .some(
          (argument) =>
            Node.isCallExpression(argument) &&
            argument.getExpression().getText() === factory.getName() &&
            argument.getArguments().some(isExampleOptions)
        );
    if (alreadyConfigured) {
      return true;
    }
    throw new SchematicsException(
      `The SSR server already contains a different ${EXAMPLE_ROUTE} route.`
    );
  }
  return false;
}

function validateRouteFactoryBindings(
  scope: Scope,
  factoryNames: readonly string[],
  factories: readonly VariableDeclaration[],
  factory: VariableDeclaration | undefined
): void {
  if (factories.length > 1 && !factory) {
    throw new SchematicsException(
      'Multiple base-site route factories exist; configure the example manually.'
    );
  }
  if (
    !factory &&
    scope
      .getSymbolsInScope(SymbolFlags.Value)
      .some((symbol) => symbol.getName() === ROUTE_FACTORY)
  ) {
    throw new SchematicsException(
      `"${ROUTE_FACTORY}" is already declared and is not a base-site route factory.`
    );
  }
  if (
    !factoryNames.length &&
    scope
      .getSymbolsInScope(SymbolFlags.Value)
      .some((symbol) => symbol.getName() === FACTORY)
  ) {
    throw new SchematicsException(`"${FACTORY}" is already declared.`);
  }
}

function getRouteInsertionBoundary(
  calls: readonly ServerRouteCall[],
  scope: Scope,
  factory: VariableDeclaration | undefined
): Statement {
  const boundaryIndex = calls.findIndex(({ call }) => isTerminalRoute(call));
  const boundary = calls[boundaryIndex]?.statement;
  if (!boundary) {
    throw new SchematicsException(
      'Could not locate the static-file or SSR render route in the Express application.'
    );
  }
  const renderIndex = calls.findIndex(
    ({ call }, index) => index >= boundaryIndex && isRenderingCatchAll(call)
  );
  if (
    renderIndex !== boundaryIndex &&
    calls
      .slice(boundaryIndex + 1, renderIndex < 0 ? undefined : renderIndex)
      .some(({ call }) => {
        const expression = call.getExpression();
        return (
          Node.isPropertyAccessExpression(expression) &&
          expression.getName() === 'use' &&
          canMatchExample(call.getArguments()[0]) &&
          !isTerminalRoute(call)
        );
      })
  ) {
    throw new SchematicsException(
      `Cannot safely insert ${EXAMPLE_ROUTE} before static/render routes without bypassing existing middleware. Move protective middleware before those routes or register the example manually.`
    );
  }
  if (
    factory &&
    containingScope(factory) === scope &&
    factory.getStart() >= boundary.getStart()
  ) {
    throw new SchematicsException(
      'The base-site route factory must be initialized before the static-file or SSR render route.'
    );
  }
  return boundary;
}

function getIndexHtmlDeclaration(
  declarations: ReadonlyMap<string, VariableDeclaration>,
  scope: Scope,
  boundary: Statement,
  factory: VariableDeclaration | undefined,
  factoryNames: readonly string[]
): VariableDeclaration | undefined {
  const html = Array.from(declarations.values())
    .reverse()
    .find(
      (declaration) =>
        (containingScope(declaration) !== scope ||
          declaration.getStart() < boundary.getStart()) &&
        isHtmlRead(declaration, declarations)
    );
  if (!factory && !html) {
    throw new SchematicsException(
      'Could not find existing index HTML content read as UTF-8 in the SSR server.'
    );
  }
  if (!factory && html && factoryNames.length) {
    const binding = containingScope(html)
      // TypeScript expects a bitmask to include value bindings and import aliases.
      // eslint-disable-next-line no-bitwise
      .getSymbolsInScope(SymbolFlags.Value | SymbolFlags.Alias)
      .find((symbol) => symbol.getName() === factoryNames[0]);
    if (
      !binding
        ?.getDeclarations()
        .some((declaration) =>
          isImportBinding(declaration, SSR_MODULE, FACTORY)
        )
    ) {
      throw new SchematicsException(
        `The imported "${factoryNames[0]}" is shadowed in the HTML initialization scope.`
      );
    }
  }
  return html;
}

function updateServerSource(source: SourceFile): boolean {
  const server = getExpressApplication(source);
  const scope = containingScope(server);
  const serverName = server.getName();
  const declarations = new Map(
    [...declarationsIn(source), ...declarationsIn(scope)].map(
      (declaration) => [declaration.getName(), declaration] as const
    )
  );
  const calls = scope
    .getStatements()
    .map((statement) => ({
      statement,
      call: serverCall(statement, serverName),
    }))
    .filter((entry): entry is ServerRouteCall => entry.call !== undefined);
  const factoryNames = importNames(source, SSR_MODULE, FACTORY);
  const factories = getRouteFactories(declarations);
  const factory =
    factories.find((declaration) => declaration.getName() === ROUTE_FACTORY) ??
    (factories.length === 1 ? factories[0] : undefined);
  if (isExampleConfigured(calls, factory)) {
    return false;
  }
  validateRouteFactoryBindings(scope, factoryNames, factories, factory);
  const boundary = getRouteInsertionBoundary(calls, scope, factory);
  const html = getIndexHtmlDeclaration(
    declarations,
    scope,
    boundary,
    factory,
    factoryNames
  );

  source.getProject().manipulationSettings.set({
    indentationText: IndentationText.TwoSpaces,
    quoteKind: QuoteKind.Single,
  });
  ensureFactoryImport(source);
  if (!factory && html) {
    const htmlScope = containingScope(html);
    const htmlStatement = html.getFirstAncestorByKindOrThrow(
      SyntaxKind.VariableStatement
    );
    htmlScope.insertStatements(
      htmlScope.getStatements().indexOf(htmlStatement) + 1,
      `const ${ROUTE_FACTORY} = ${factoryNames[0] ?? FACTORY}({
  indexHtml: ${html.getName()},
  // Provide base-site IDs to resolve prefixed routes locally.
  // Omit this option to resolve prefixed routes through OCC.
  // pathBaseSiteIds: ['your-base-site'],

  // Provide the OCC base URL for local development if it is not set in the HTML.
  // occBaseUrl: 'https://your-occ-backend',
});`
    );
  }
  scope.insertStatements(
    scope.getStatements().indexOf(boundary),
    `${serverName}.use(
  ${factory?.getName() ?? ROUTE_FACTORY}({
    route: '${EXAMPLE_ROUTE}',
    handler: ({ res, baseSite }) => {
      res.type('text/plain').send(\`Current baseSite: \${baseSite}\`);
    },
  })
);`
  );
  return true;
}
