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
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';
import { Schema as SpartacusOptions } from './schema';
import { updateAppConfig } from './update-app-config';

const collectionPath = path.join(__dirname, '../collection.json');

describe('updateAppConfig', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );

  let appTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'update-app-config-test',
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
    project: 'update-app-config-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
  };

  beforeAll(async () => {
    appTree = await schematicRunner.runExternalSchematic(
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
  });

  it('should provide `importProvidersFrom(AppModule)` in app.config.ts', async () => {
    const appConfigContent = `import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ]
};
`;
    appTree.overwrite('/src/app/app.config.ts', appConfigContent);

    const tree = await firstValueFrom(
      schematicRunner.callRule(updateAppConfig(defaultOptions), appTree)
    );

    const appConfig = tree.readText('/src/app/app.config.ts');
    expect(appConfig).toContain('importProvidersFrom(AppModule)');
    expect(appConfig).toMatchSnapshot();
  });

  it('should provide `provideHttpClient(withFetch(), withInterceptorsFromDi())` in app.config.ts', async () => {
    const appConfigContent = `import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ]
};
`;
    appTree.overwrite('/src/app/app.config.ts', appConfigContent);

    const tree = await firstValueFrom(
      schematicRunner.callRule(updateAppConfig(defaultOptions), appTree)
    );

    const appConfig = tree.readText('/src/app/app.config.ts');
    expect(appConfig).toContain('importProvidersFrom(AppModule)');
    expect(appConfig).toMatchSnapshot();
  });
});
