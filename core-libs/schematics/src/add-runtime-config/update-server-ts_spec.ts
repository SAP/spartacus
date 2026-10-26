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

  it('should add runtimeEnvironment parameter to app() and inject into ngExpressEngine', () => {
    const serverTs = tree.readText(SERVER_TS_PATH);
    expect(serverTs).toContain(
      'runtimeEnvironment: ServerRuntimeEnvironment = {}'
    );
    expect(serverTs).toContain('RUNTIME_ENVIRONMENT');
    expect(serverTs).toContain('useValue: runtimeEnvironment');
    // provider should be in ngExpressEngine, not in res.render
    expect(serverTs).not.toMatch(
      /res\.render[\s\S]*RUNTIME_ENVIRONMENT[\s\S]*\)/
    );
    expect(serverTs).toMatchSnapshot();
  });

  it('should make run() async and fetch runtimeEnvironment before app(runtimeEnvironment)', () => {
    const serverTs = tree.readText(SERVER_TS_PATH);
    expect(serverTs).toContain('async function run()');
    expect(serverTs).toContain('await getServerRuntimeEnvironment');
    expect(serverTs).toContain('app(runtimeEnvironment)');
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
