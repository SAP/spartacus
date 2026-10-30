/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { schema } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  FileNameStyleGuide,
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { join } from 'path';
import { Project, SyntaxKind } from 'ts-morph';
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';
import { Schema } from './schema';
import schemaJson from './schema.json';

const collectionPath = join(__dirname, '../collection.json');
const schematicName = 'add-base-site-aware-route';

function serverSource(
  serverName = 'server',
  htmlName = 'indexHtmlContent',
  moduleHtml = false
): string {
  const htmlDeclaration = `const ${htmlName} = readFileSync('index.server.html', 'utf-8');`;
  return `
import express from 'express';
import { readFileSync } from 'node:fs';
import { getOriginValidationMiddleware, defaultExpressErrorHandlers } from '@spartacus/setup/ssr';
${moduleHtml ? htmlDeclaration : ''}

export function app() {
  const ${serverName} = express();
  ${moduleHtml ? '' : htmlDeclaration}
  ${serverName}.use(getOriginValidationMiddleware({ allowedOrigins: 'https://shop.example' }));
  ${serverName}.get('/health', (_req, res) => res.send('healthy'));
  ${serverName}.get(/.*\\..*/, express.static('./browser'));
  ${serverName}.get(/.*/, (req, res) => res.render('index', { req }));
  ${serverName}.use(defaultExpressErrorHandlers(${htmlName}));
  return ${serverName};
}
`;
}

function projectConfiguration(
  options: Record<string, unknown> = {},
  builder = '@angular/build:application'
) {
  return {
    projectType: 'application',
    root: '',
    sourceRoot: 'src',
    architect: {
      build: {
        builder,
        options: {
          browser: 'src/main.ts',
          server: 'src/main.server.ts',
          ssr: { entry: 'src/server.ts' },
          tsConfig: 'tsconfig.app.json',
          ...options,
        },
      },
    },
  };
}

function createTree(
  source = serverSource(),
  buildOptions: Record<string, unknown> = {},
  builder?: string
): UnitTestTree {
  const tree = new UnitTestTree(Tree.empty());
  tree.create(
    'angular.json',
    JSON.stringify({
      version: 1,
      projects: { app: projectConfiguration(buildOptions, builder) },
    })
  );
  tree.create(
    'tsconfig.app.json',
    JSON.stringify({
      compilerOptions: { target: 'ES2022', module: 'commonjs', types: [] },
      files: ['src/server.ts'],
    })
  );
  tree.create('src/server.ts', source);
  return tree;
}

function snapshot(tree: UnitTestTree): Record<string, string> {
  return Object.fromEntries(
    tree.files.map((file) => [file, tree.readContent(file)])
  );
}

function parseServer(content: string) {
  return new Project({ useInMemoryFileSystem: true }).createSourceFile(
    'server.ts',
    content
  );
}

describe(schematicName, () => {
  let runner: SchematicTestRunner;

  beforeEach(() => {
    runner = new SchematicTestRunner(SPARTACUS_SCHEMATICS, collectionPath);
  });

  it('formats existing server declarations and removes unused imports only when updating', async () => {
    const fixture = serverSource()
      .replace('const server = express();', 'const  server=express( );')
      .replace(
        "import express from 'express';",
        "import express from 'express';\nimport { unusedValue } from 'unused-module';"
      );
    const first = await runner.runSchematic(
      schematicName,
      {},
      createTree(fixture)
    );
    const content = first.readContent('src/server.ts');
    const source = parseServer(content);

    expect(content).toContain('const server = express();');
    expect(content).not.toContain('unused-module');
    expect(
      source
        .getImportDeclarationOrThrow('express')
        .getDefaultImport()
        ?.getText()
    ).toBe('express');
    expect(
      source
        .getImportDeclarationOrThrow('node:fs')
        .getNamedImports()
        .map((specifier) => specifier.getName())
    ).toContain('readFileSync');
    expect(
      source
        .getImportDeclarationOrThrow('@spartacus/setup/ssr')
        .getNamedImports()
        .map((specifier) => specifier.getName())
    ).toContain('createBaseSiteAwareRoute');
    expect(content).toContain(
      'const registerBaseSiteAwareRoute = createBaseSiteAwareRoute({'
    );
    expect(content).toContain("route: '/example.txt'");

    const before = snapshot(first);
    const second = await runner.runSchematic(schematicName, {}, first);
    expect(snapshot(second)).toEqual(before);
  });

  it('adds the configured factory and an inline example before static files', async () => {
    const tree = createTree();
    const originalWorkspace = tree.readContent('angular.json');
    const result = await runner.runSchematic(schematicName, {}, tree);
    const content = result.readContent('src/server.ts');
    const source = parseServer(content);
    const [factory] = source
      .getDescendantsOfKind(SyntaxKind.VariableDeclaration)
      .filter(
        (declaration) => declaration.getName() === 'registerBaseSiteAwareRoute'
      );
    const factoryOptions = factory
      .getInitializerIfKindOrThrow(SyntaxKind.CallExpression)
      .getArguments()[0]
      .asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

    expect(factoryOptions.getProperty('indexHtml')?.getText()).toBe(
      'indexHtml: indexHtmlContent'
    );
    expect(factoryOptions.getProperty('pathBaseSiteIds')).toBeUndefined();
    expect(factoryOptions.getProperty('occBaseUrl')).toBeUndefined();
    expect(content).toContain('// pathBaseSiteIds:');
    expect(content).toContain(
      'Provide base-site IDs to resolve prefixed routes locally'
    );
    expect(content).toContain(
      'Omit this option to resolve prefixed routes through OCC'
    );
    expect(content).toContain('// occBaseUrl:');
    expect(content).toContain('Provide the OCC base URL for local development');

    const [exampleOptions] = source
      .getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)
      .filter(
        (object) =>
          object
            .getProperty('route')
            ?.asKind(SyntaxKind.PropertyAssignment)
            ?.getInitializerIfKind(SyntaxKind.StringLiteral)
            ?.getLiteralValue() === '/example.txt'
      );
    const handler = exampleOptions
      .getPropertyOrThrow('handler')
      .asKindOrThrow(SyntaxKind.PropertyAssignment)
      .getInitializerIfKindOrThrow(SyntaxKind.ArrowFunction);

    expect(
      handler.getParameters().map((parameter) => parameter.getName())
    ).toEqual(['{ res, baseSite }']);
    expect(
      handler
        .getDescendantsOfKind(SyntaxKind.TemplateExpression)
        .map((node) => node.getText())
    ).toEqual(['`Current baseSite: ${baseSite}`']);
    expect(handler.getText()).toContain("type('text/plain')");
    expect(exampleOptions.getProperty('withBaseSiteInPath')).toBeUndefined();

    const statements = source
      .getFunctionOrThrow('app')
      .getBodyOrThrow()
      .asKindOrThrow(SyntaxKind.Block)
      .getStatements();
    const indexOf = (text: string) =>
      statements.findIndex((statement) => statement.getText().includes(text));
    expect(indexOf("route: '/example.txt'")).toBeGreaterThan(
      indexOf('getOriginValidationMiddleware(')
    );
    expect(indexOf("route: '/example.txt'")).toBeLessThan(
      indexOf('express.static(')
    );
    expect(content).toContain(
      "server.get('/health', (_req, res) => res.send('healthy'));"
    );
    expect(result.readContent('angular.json')).toBe(originalWorkspace);
    expect(result.files).toEqual(tree.files);
  });

  it.each([false, true])(
    'uses renamed server and HTML variables (module HTML: %s)',
    async (moduleHtml) => {
      const result = await runner.runSchematic(
        schematicName,
        { project: 'app' },
        createTree(serverSource('appServer', 'rawDocument', moduleHtml))
      );
      const content = result.readContent('src/server.ts');

      expect(content).toContain('indexHtml: rawDocument');
      expect(content).toContain('appServer.use(');
      expect(content).toContain("route: '/example.txt'");
      expect(content.match(/readFileSync\(/g)).toHaveLength(1);
    }
  );

  it('recognizes aliases for Express and readFileSync imports', async () => {
    const source = serverSource()
      .replace(
        "import express from 'express'",
        "import createServer from 'express'"
      )
      .replace('const server = express()', 'const server = createServer()')
      .replace('express.static(', 'createServer.static(')
      .replace('import { readFileSync }', 'import { readFileSync as readHtml }')
      .replace('= readFileSync(', '= readHtml(');
    const result = await runner.runSchematic(
      schematicName,
      {},
      createTree(source)
    );

    expect(result.readContent('src/server.ts')).toContain(
      'indexHtml: indexHtmlContent'
    );
    expect(result.readContent('src/server.ts')).toContain(
      "route: '/example.txt'"
    );
  });

  it('keeps protective middleware before the example when a public render route comes first', async () => {
    const fixture = serverSource().replace(
      '  server.use(getOriginValidationMiddleware',
      "  server.get('/status', (_req, res) => res.render('status'));\n  server.use(getOriginValidationMiddleware"
    );
    const result = await runner.runSchematic(
      schematicName,
      {},
      createTree(fixture)
    );
    const statements = parseServer(result.readContent('src/server.ts'))
      .getFunctionOrThrow('app')
      .getBodyOrThrow()
      .asKindOrThrow(SyntaxKind.Block)
      .getStatements();
    const indexOf = (text: string) =>
      statements.findIndex((statement) => statement.getText().includes(text));

    expect(indexOf("route: '/example.txt'")).toBeGreaterThan(
      indexOf('getOriginValidationMiddleware(')
    );
    expect(indexOf("route: '/example.txt'")).toBeLessThan(
      indexOf('express.static(')
    );
    expect(indexOf("'/status'")).toBeLessThan(
      indexOf('getOriginValidationMiddleware(')
    );
  });

  it.each([
    "'/assets'",
    "'/assets/'",
    "'/assets/:file'",
    '/^\\/assets(?:\\/|$)/',
    "['/assets', '/public']",
  ])(
    'keeps protective middleware after scoped public assets at %s',
    async (mount) => {
      const fixture = serverSource().replace(
        '  server.use(getOriginValidationMiddleware',
        `  server.use(${mount}, express.static('./public-assets'));\n  server.use(getOriginValidationMiddleware`
      );
      const result = await runner.runSchematic(
        schematicName,
        {},
        createTree(fixture)
      );
      const statements = parseServer(result.readContent('src/server.ts'))
        .getFunctionOrThrow('app')
        .getBodyOrThrow()
        .asKindOrThrow(SyntaxKind.Block)
        .getStatements();
      const indexOf = (text: string) =>
        statements.findIndex((statement) => statement.getText().includes(text));

      expect(indexOf("route: '/example.txt'")).toBeGreaterThan(
        indexOf('getOriginValidationMiddleware(')
      );
      expect(indexOf("route: '/example.txt'")).toBeLessThan(
        indexOf("express.static('./browser')")
      );
      expect(indexOf("express.static('./public-assets')")).toBeLessThan(
        indexOf('getOriginValidationMiddleware(')
      );
    }
  );

  it.each([
    "server.use(express.static('./public-assets'));",
    "server.use('/', express.static('./public-assets'));",
    "server.get(/.*\\..*/, express.static('./public-assets'));",
  ])(
    'rejects unsafe middleware ordering after %s without editing',
    async (staticRoute) => {
      const fixture = serverSource().replace(
        '  server.use(getOriginValidationMiddleware',
        `  ${staticRoute}\n  server.use(getOriginValidationMiddleware`
      );
      const tree = createTree(fixture);
      const before = snapshot(tree);

      await expect(
        runner.runSchematic(schematicName, {}, tree)
      ).rejects.toThrow('Cannot safely insert /example.txt');
      expect(snapshot(tree)).toEqual(before);
    }
  );

  it('does not reject scoped middleware that cannot match the example', async () => {
    const fixture = serverSource().replace(
      '  server.get(/.*/,',
      "  server.use('/admin', (_req, _res, next) => next());\n  server.get(/.*/,"
    );
    const result = await runner.runSchematic(
      schematicName,
      {},
      createTree(fixture)
    );
    const content = result.readContent('src/server.ts');

    expect(content.indexOf("route: '/example.txt'")).toBeLessThan(
      content.indexOf("express.static('./browser')")
    );
    expect(content).toContain("server.use('/admin'");
  });

  it.each(['/.*/', "'/{*splat}'", "'/*path'"])(
    'registers before the catch-all %s when static files are not configured',
    async (routeExpression) => {
      const fixture = serverSource()
        .replace("  server.get(/.*\\..*/, express.static('./browser'));\n", '')
        .replace('server.get(/.*/,', `server.get(${routeExpression},`);
      const result = await runner.runSchematic(
        schematicName,
        {},
        createTree(fixture)
      );
      const content = result.readContent('src/server.ts');

      expect(content.indexOf("route: '/example.txt'")).toBeGreaterThan(
        content.indexOf('server.use(getOriginValidationMiddleware(')
      );
      expect(content.indexOf("route: '/example.txt'")).toBeLessThan(
        content.indexOf(`server.get(${routeExpression},`)
      );
    }
  );

  it.each([
    {
      name: 'route factory',
      source: serverSource()
        .replace(
          'getOriginValidationMiddleware, defaultExpressErrorHandlers',
          'getOriginValidationMiddleware, defaultExpressErrorHandlers, createBaseSiteAwareRoute'
        )
        .replace(
          'export function app() {',
          'export function app(createBaseSiteAwareRoute: (...args: unknown[]) => unknown) {'
        ),
      message: 'shadowed',
    },
    {
      name: 'HTML reader',
      source: serverSource().replace(
        'export function app() {',
        'export function app(readFileSync: (...args: unknown[]) => string) {'
      ),
      message: 'index HTML',
    },
    {
      name: 'Express',
      source: serverSource().replace(
        'export function app() {',
        'export function app(express: () => unknown) {'
      ),
      message: 'Express',
    },
  ])(
    'rejects a shadowed $name import without editing',
    async ({ source, message }) => {
      const tree = createTree(source);
      const before = snapshot(tree);

      await expect(
        runner.runSchematic(schematicName, {}, tree)
      ).rejects.toThrow(message);
      expect(snapshot(tree)).toEqual(before);
    }
  );

  it('reuses an imported and configured factory without replacing its options', async () => {
    const source = serverSource()
      .replace(
        'getOriginValidationMiddleware, defaultExpressErrorHandlers',
        'getOriginValidationMiddleware, defaultExpressErrorHandlers, createBaseSiteAwareRoute as configureRoute'
      )
      .replace(
        '  server.use(getOriginValidationMiddleware',
        "  const configuredRoute = configureRoute({ indexHtml: indexHtmlContent, occBaseUrl: 'https://custom.example' });\n  server.use(getOriginValidationMiddleware"
      );
    const result = await runner.runSchematic(
      schematicName,
      {},
      createTree(source)
    );
    const content = result.readContent('src/server.ts');

    expect(content).toContain("occBaseUrl: 'https://custom.example'");
    expect(content).toContain('configuredRoute({');
    expect(content).not.toContain('const registerBaseSiteAwareRoute');
    expect(content.match(/configureRoute\(\{/g)).toHaveLength(1);
  });

  it('does not change any file when run a second time', async () => {
    const first = await runner.runSchematic(schematicName, {}, createTree());
    const before = snapshot(first);
    const second = await runner.runSchematic(schematicName, {}, first);

    expect(snapshot(second)).toEqual(before);
  });

  it.each([
    { name: 'missing SSR', options: { ssr: undefined } },
    { name: 'disabled SSR', options: { ssr: false } },
    { name: 'missing entry', options: { ssr: {} } },
    { name: 'missing server', options: { server: undefined } },
  ])('rejects $name without modifying the input', async ({ options }) => {
    const tree = createTree(serverSource(), options);
    tree.create(
      'package.json',
      JSON.stringify({ dependencies: { '@angular/ssr': '21.2.23' } })
    );
    const before = snapshot(tree);

    await expect(runner.runSchematic(schematicName, {}, tree)).rejects.toThrow(
      'SSR is not enabled for project "app"'
    );
    expect(snapshot(tree)).toEqual(before);
  });

  it.each([null, '', ' \n '])(
    'rejects a missing or empty entry before editing',
    async (content) => {
      const tree = createTree();
      if (content === null) {
        tree.delete('src/server.ts');
      } else {
        tree.overwrite('src/server.ts', content);
      }
      const before = snapshot(tree);

      await expect(
        runner.runSchematic(schematicName, {}, tree)
      ).rejects.toThrow('SSR is not enabled for project "app"');
      expect(snapshot(tree)).toEqual(before);
    }
  );

  it('reports an unsupported builder instead of attempting a server rewrite', async () => {
    const tree = createTree(
      serverSource(),
      {},
      '@angular-devkit/build-angular:browser'
    );
    const before = snapshot(tree);

    await expect(runner.runSchematic(schematicName, {}, tree)).rejects.toThrow(
      'unsupported builder'
    );
    expect(snapshot(tree)).toEqual(before);
  });

  it.each([
    {
      name: 'an unrelated factory name',
      source: serverSource().replace(
        '  const server = express();',
        '  const server = express();\n  const registerBaseSiteAwareRoute = () => undefined;'
      ),
      message: 'registerBaseSiteAwareRoute',
    },
    {
      name: 'an existing example route',
      source: serverSource().replace("'/health'", "'/example.txt'"),
      message: '/example.txt',
    },
    {
      name: 'missing HTML content',
      source: serverSource().replace(
        "const indexHtmlContent = readFileSync('index.server.html', 'utf-8');",
        "const indexHtmlContent = '<html></html>';"
      ),
      message: 'index HTML',
    },
    {
      name: 'a non-Express server',
      source: serverSource().replace(
        'const server = express();',
        'const server = customServer();'
      ),
      message: 'Express',
    },
    {
      name: 'a factory initialized after the static route',
      source: serverSource()
        .replace(
          'getOriginValidationMiddleware, defaultExpressErrorHandlers',
          'getOriginValidationMiddleware, defaultExpressErrorHandlers, createBaseSiteAwareRoute'
        )
        .replace(
          '  return server;',
          '  const registerBaseSiteAwareRoute = createBaseSiteAwareRoute({ indexHtml: indexHtmlContent });\n  return server;'
        ),
      message: 'initialized before',
    },
  ])('rejects $name without partial changes', async ({ source, message }) => {
    const tree = createTree(source);
    const before = snapshot(tree);

    await expect(runner.runSchematic(schematicName, {}, tree)).rejects.toThrow(
      message
    );
    expect(snapshot(tree)).toEqual(before);
  });

  function createMultiProjectTree(): UnitTestTree {
    const tree = createTree();
    tree.overwrite(
      'angular.json',
      JSON.stringify({
        version: 1,
        projects: {
          app: projectConfiguration({ ssr: false }),
          other: projectConfiguration({
            server: 'other/main.server.ts',
            ssr: { entry: 'other/server.ts' },
            tsConfig: 'other/tsconfig.app.json',
          }),
        },
      })
    );
    tree.create('other/server.ts', serverSource('otherServer'));
    tree.create(
      'other/tsconfig.app.json',
      JSON.stringify({ files: ['server.ts'] })
    );
    return tree;
  }

  it('uses the Angular Devkit smart default to select the SSR application', async () => {
    const tree = createMultiProjectTree();
    const firstServer = tree.readContent('src/server.ts');
    const registry = new schema.CoreSchemaRegistry();
    registry.addSmartDefaultProvider('projectName', () => 'other');
    const validateOptions = await registry.compile(schemaJson);
    const validation = await validateOptions({});
    expect(validation.success).toBe(true);

    const result = await runner.runSchematic(
      schematicName,
      validation.data as Schema,
      tree
    );

    expect(result.readContent('other/server.ts')).toContain(
      "route: '/example.txt'"
    );
    expect(result.readContent('src/server.ts')).toBe(firstServer);
  });

  it('lets an explicit project override the Angular Devkit smart default', async () => {
    const tree = createMultiProjectTree();
    const before = snapshot(tree);
    const registry = new schema.CoreSchemaRegistry();
    registry.addSmartDefaultProvider('projectName', () => 'other');
    const validateOptions = await registry.compile(schemaJson);
    const validation = await validateOptions({ project: 'app' });
    expect(validation.success).toBe(true);

    await expect(
      runner.runSchematic(schematicName, validation.data as Schema, tree)
    ).rejects.toThrow('SSR is not enabled for project "app"');
    expect(snapshot(tree)).toEqual(before);
  });

  it('falls back to the first project without searching for another SSR application', async () => {
    const tree = createMultiProjectTree();
    const before = snapshot(tree);

    await expect(runner.runSchematic(schematicName, {}, tree)).rejects.toThrow(
      'SSR is not enabled for project "app"'
    );
    expect(snapshot(tree)).toEqual(before);
  });

  it.each([
    { project: 'library', message: 'project type of "application"' },
    { project: 'unknown', message: 'not defined in this workspace' },
  ])(
    'rejects the selected $project project without editing',
    async ({ project, message }) => {
      const tree = createMultiProjectTree();
      const workspace = JSON.parse(tree.readContent('angular.json'));
      tree.overwrite(
        'angular.json',
        JSON.stringify({
          ...workspace,
          projects: {
            ...workspace.projects,
            library: { projectType: 'library', root: 'library' },
          },
        })
      );
      const before = snapshot(tree);

      await expect(
        runner.runSchematic(schematicName, { project }, tree)
      ).rejects.toThrow(message);
      expect(snapshot(tree)).toEqual(before);
    }
  );

  it('does not use another application SSR configuration for a CSR project', async () => {
    const tree = createMultiProjectTree();
    const before = snapshot(tree);

    await expect(
      runner.runSchematic(schematicName, { project: 'app' }, tree)
    ).rejects.toThrow('SSR is not enabled for project "app"');
    expect(snapshot(tree)).toEqual(before);
  });

  it('modifies only the explicitly selected SSR application', async () => {
    const tree = createMultiProjectTree();
    const firstServer = tree.readContent('src/server.ts');
    const result = await runner.runSchematic(
      schematicName,
      { project: 'other' },
      tree
    );

    expect(result.readContent('other/server.ts')).toContain(
      "route: '/example.txt'"
    );
    expect(result.readContent('src/server.ts')).toBe(firstServer);
  });

  it('works with a real application generated by add-ssr and remains idempotent', async () => {
    let tree = await runner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      {
        name: 'workspace',
        version: '0.5.0',
      }
    );
    const applicationOptions: ApplicationOptions = {
      name: 'integration-app',
      projectRoot: '',
      inlineStyle: false,
      inlineTemplate: false,
      style: Style.Scss,
      skipTests: false,
      zoneless: false,
      fileNameStyleGuide: FileNameStyleGuide.The2016,
    };
    tree = await runner.runExternalSchematic(
      '@schematics/angular',
      'application',
      applicationOptions,
      tree
    );
    const spartacusOptions = {
      project: 'integration-app',
      name: 'integration-app',
      baseSite: 'electronics-spa',
      baseUrl: 'https://api.example',
      lazy: true,
      features: [],
    };
    tree = await runner.runSchematic('add-spartacus', spartacusOptions, tree);
    tree = await runner.runSchematic('add-ssr', spartacusOptions, tree);
    const result = await runner.runSchematic(
      schematicName,
      { project: 'integration-app' },
      tree
    );
    const content = result.readContent('src/server.ts');

    expect(content).toContain("route: '/example.txt'");
    expect(content).toContain('// pathBaseSiteIds:');
    expect(content.indexOf("route: '/example.txt'")).toBeLessThan(
      content.indexOf('express.static(')
    );
    const before = snapshot(result);
    const repeated = await runner.runSchematic(
      schematicName,
      { project: 'integration-app' },
      result
    );
    expect(snapshot(repeated)).toEqual(before);
  }, 30000);
});
