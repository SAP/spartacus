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
import { updateAppConfig } from './update-app-config';

const collectionPath = path.join(__dirname, '../collection.json');

describe('updateAppConfig (runtime config)', () => {
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
  };

  const appConfigContent = `
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
  ]
};
`;

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

    appTree.overwrite('/src/app/app.config.ts', appConfigContent);

    tree = (await firstValueFrom(
      schematicRunner.callRule(updateAppConfig(defaultOptions), appTree)
    )) as UnitTestTree;
  });

  it('should add provideRuntimeOccConfig() to app.config.ts providers', () => {
    const appConfig = tree.readText('/src/app/app.config.ts');
    expect(appConfig).toContain('provideRuntimeOccConfig()');
    expect(appConfig).toContain('@spartacus/setup');
    expect(appConfig).toMatchSnapshot();
  });

  it('should be idempotent — not duplicate provideRuntimeOccConfig if already present', async () => {
    const alreadyWiredContent = `
import { ApplicationConfig } from '@angular/core';
import { provideRuntimeOccConfig } from '@spartacus/setup';

export const appConfig: ApplicationConfig = {
  providers: [provideRuntimeOccConfig()]
};
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
    appTree.overwrite('/src/app/app.config.ts', alreadyWiredContent);

    const resultTree = (await firstValueFrom(
      schematicRunner.callRule(updateAppConfig(defaultOptions), appTree)
    )) as UnitTestTree;

    const result = resultTree.readText('/src/app/app.config.ts');
    // File should be unchanged — guard prevented re-modification
    expect(result).toBe(alreadyWiredContent);
  });
});
