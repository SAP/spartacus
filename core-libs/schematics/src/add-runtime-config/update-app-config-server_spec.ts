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
import { updateAppConfigServer } from './update-app-config-server';

const collectionPath = path.join(__dirname, '../collection.json');

const APP_CONFIG_SERVER_PATH = '/src/app/app.config.server.ts';

const baselineAppConfigServer = `import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
`;

describe('updateAppConfigServer (runtime config)', () => {
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

    appTree.create(APP_CONFIG_SERVER_PATH, baselineAppConfigServer);

    tree = (await firstValueFrom(
      schematicRunner.callRule(updateAppConfigServer(defaultOptions), appTree)
    )) as UnitTestTree;
  });

  it('should add provideEnvironmentServer() to app.config.server.ts providers', () => {
    const content = tree.readText(APP_CONFIG_SERVER_PATH);
    expect(content).toContain('provideEnvironmentServer()');
    expect(content).toContain('@spartacus/setup');
    expect(content).toMatchSnapshot();
  });

  it('should insert provideEnvironmentServer() BEFORE provideServerRendering() in providers array', () => {
    const content = tree.readText(APP_CONFIG_SERVER_PATH);
    // Both providers register BEFORE_APP_SERIALIZED hooks. Angular's
    // serializeTransferStateFactory (from provideServerRendering) checks
    // transferStore.isEmpty and skips writing ng-state if the store is empty —
    // so provideEnvironmentServer() must run first to populate the store.
    //
    // Use a regex to find the providers: [...] block and check element order
    // independently of any leading comments that may contain the token text.
    const providersMatch = content.match(/providers:\s*\[([\s\S]*?)\]/);
    expect(providersMatch).not.toBeNull();
    const providersBlock = providersMatch![1];
    // Strip comments before checking positions
    const withoutComments = providersBlock.replace(/\/\/[^\n]*/g, '');
    const envServerPos = withoutComments.indexOf('provideEnvironmentServer()');
    const serverRenderingPos = withoutComments.indexOf(
      'provideServerRendering()'
    );
    expect(envServerPos).toBeGreaterThan(-1);
    expect(serverRenderingPos).toBeGreaterThan(-1);
    expect(envServerPos).toBeLessThan(serverRenderingPos);
  });

  it('should be idempotent — not duplicate provideEnvironmentServer if already present', async () => {
    const alreadyWiredContent = `import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideEnvironmentServer } from '@spartacus/setup';
import { provideServerRendering } from '@angular/ssr';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideEnvironmentServer()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
`;

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
    appTree.create(APP_CONFIG_SERVER_PATH, alreadyWiredContent);

    const resultTree = (await firstValueFrom(
      schematicRunner.callRule(updateAppConfigServer(defaultOptions), appTree)
    )) as UnitTestTree;

    const result = resultTree.readText(APP_CONFIG_SERVER_PATH);
    expect(result).toBe(alreadyWiredContent);
  });

  it('should gracefully skip when app.config.server.ts is absent', async () => {
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

    // No app.config.server.ts created — rule must not throw
    const resultTree = (await firstValueFrom(
      schematicRunner.callRule(updateAppConfigServer(defaultOptions), appTree)
    )) as UnitTestTree;

    expect(resultTree.exists(APP_CONFIG_SERVER_PATH)).toBe(false);
  });
});
