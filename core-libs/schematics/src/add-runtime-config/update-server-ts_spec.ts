/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  FileNameStyleGuide,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { firstValueFrom } from 'rxjs';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';
import { updateServerTs } from './update-server-ts';

const collectionPath = path.join(__dirname, '../collection.json');

const SERVER_TS_PATH = '/src/server.ts';

const baselineServerTs = `import { APP_BASE_HREF } from '@angular/common';
import {
  NgExpressEngineDecorator,
  defaultExpressErrorHandlers,
  getOriginValidationMiddleware,
  ngExpressEngine as engine,
} from '@spartacus/setup/ssr';
import express from 'express';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const ngExpressEngine = NgExpressEngineDecorator.get(engine);

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const indexHtmlContent = readFileSync(indexHtml, 'utf-8');

  server.set('trust proxy', 'loopback');
  server.use(getOriginValidationMiddleware({ allowedOrigins: process.env['SSR_ALLOWED_ORIGINS'] }));

  server.engine('html', ngExpressEngine({ bootstrap }));
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get(/.*\\..*/, express.static(browserDistFolder, { maxAge: '1y' }));

  server.get(/.*/, (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  server.use(defaultExpressErrorHandlers(indexHtmlContent));
  return server;
}

function run() {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(\`Node Express server listening on http://localhost:\${port}\`);
  });
}

run();
`;

describe('updateServerTs (runtime config)', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );

  let tree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'runtime-config-test',
    inlineStyle: false,
    inlineTemplate: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
    standalone: true,
    zoneless: false,
    fileNameStyleGuide: FileNameStyleGuide.The2016,
  };

  const defaultOptions: SpartacusOptions = {
    project: 'runtime-config-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
    runtimeConfig: true,
    ssr: true,
  };

  beforeAll(async () => {
    let appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );

    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      appTree
    );

    appTree.create(SERVER_TS_PATH, baselineServerTs);

    tree = (await firstValueFrom(
      schematicRunner.callRule(updateServerTs(defaultOptions), appTree)
    )) as UnitTestTree;
  });

  it('should fetch runtimeEnvironment per-request in catch-all and inject into res.render', () => {
    const serverTs = tree.readText(SERVER_TS_PATH);
    // app() must have no runtimeEnvironment parameter
    expect(serverTs).not.toContain(
      'runtimeEnvironment: ServerRuntimeEnvironment'
    );
    expect(serverTs).toContain('RUNTIME_ENVIRONMENT');
    expect(serverTs).toContain('useValue: runtimeEnvironment');
    // RUNTIME_ENVIRONMENT must be in res.render providers
    expect(serverTs).toMatch(/res\.render[\s\S]*RUNTIME_ENVIRONMENT[\s\S]*\)/);
    // ngExpressEngine call must NOT contain RUNTIME_ENVIRONMENT in its options
    expect(serverTs).not.toMatch(
      /ngExpressEngine\(\s*\{[^}]*RUNTIME_ENVIRONMENT/
    );
    expect(serverTs).toMatchSnapshot();
  });

  it('should make catch-all async, fetch per-request, and call app() with no args', () => {
    const serverTs = tree.readText(SERVER_TS_PATH);
    // run() must NOT be async — fetch moved to catch-all
    expect(serverTs).not.toContain('async function run');
    // catch-all callback must be async
    expect(serverTs).toMatch(/server\.get\(\/\.\*\/,\s*async/);
    expect(serverTs).toContain('await getServerRuntimeEnvironment');
    // app() called without arguments
    expect(serverTs).toContain('app()');
    expect(serverTs).not.toContain('app(runtimeEnvironment)');
  });

  it('should add /config.json proxy route before the Angular catch-all', () => {
    const serverTs = tree.readText(SERVER_TS_PATH);
    expect(serverTs).toContain("server.get('/config.json'");
    const configRoutePos = serverTs.indexOf("server.get('/config.json'");
    const catchAllPos = serverTs.indexOf('server.get(/.*/,');
    expect(configRoutePos).toBeGreaterThan(-1);
    expect(catchAllPos).toBeGreaterThan(-1);
    expect(configRoutePos).toBeLessThan(catchAllPos);
  });

  it('should not use parseConfigJson in the proxy route', () => {
    const serverTs = tree.readText(SERVER_TS_PATH);
    expect(serverTs).not.toContain('parseConfigJson');
    expect(serverTs).toContain("process.env['CONFIG_URL']");
    expect(serverTs).toContain('.secret');
  });

  it('should insert /config.json route after the static asset route', () => {
    const serverTs = tree.readText(SERVER_TS_PATH);
    const staticPos = serverTs.indexOf('express.static(browserDistFolder');
    const configRoutePos = serverTs.indexOf("server.get('/config.json'");
    expect(configRoutePos).toBeGreaterThan(staticPos);
  });

  it('should be idempotent — not duplicate wiring if already present', async () => {
    let appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );
    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      appTree
    );

    // Use the already-transformed file from the happy-path tree
    const alreadyWiredContent = tree.readText(SERVER_TS_PATH);
    appTree.create(SERVER_TS_PATH, alreadyWiredContent);

    const resultTree = (await firstValueFrom(
      schematicRunner.callRule(updateServerTs(defaultOptions), appTree)
    )) as UnitTestTree;

    const result = resultTree.readText(SERVER_TS_PATH);
    expect(result).toBe(alreadyWiredContent);
  });
});
