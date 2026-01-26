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

describe('updateAppConfigServer', () => {
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
    name: 'update-app-config-server-test',
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
    project: 'update-app-config-server-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
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

    const appConfigServerContent = `
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
`;
    appTree.create('/src/app/app.config.server.ts', appConfigServerContent);

    tree = (await firstValueFrom(
      schematicRunner.callRule(updateAppConfigServer(defaultOptions), appTree)
    )) as UnitTestTree;
  });

  it('should provide `importProvidersFrom(AppServerModule)` in app.config.server.ts', async () => {
    const appConfigServer = tree.readText('/src/app/app.config.server.ts');
    expect(appConfigServer).toContain('importProvidersFrom(AppServerModule)');
    expect(appConfigServer).toMatchSnapshot();
  });

  it('should remove `withRoutes(serverRoutes)` from `provideServerRendering()` in app.config.server.ts', async () => {
    const appConfigServer = tree.readText('/src/app/app.config.server.ts');

    expect(appConfigServer).toContain('provideServerRendering()');
    expect(appConfigServer).not.toContain('withRoutes');
    expect(appConfigServer).not.toContain('serverRoutes');
    expect(appConfigServer).toMatchSnapshot();
  });
});
