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
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';
import { Schema as SpartacusOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('createAppModule', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );

  let appTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const standaloneAppOptions: ApplicationOptions = {
    name: 'create-app-module-test',
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
    project: 'create-app-module-test',
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
      standaloneAppOptions,
      appTree
    );
  });

  it('should create app.module.ts for standalone app', async () => {
    const tree = await schematicRunner.runSchematic(
      'add-spartacus',
      defaultOptions,
      appTree
    );

    expect(tree.exists('/src/app/app.module.ts')).toBe(true);
  });

  it('should create app.module.ts with imports of StoreModule.forRoot({}), AppRoutingModule, EffectsModule.forRoot([]), SpartacusModule', async () => {
    const tree = await schematicRunner.runSchematic(
      'add-spartacus',
      defaultOptions,
      appTree
    );

    const appModule = tree.readContent('/src/app/app.module.ts');
    expect(appModule).toMatchSnapshot();
  });

  it('should contain NgModule decorator', async () => {
    const tree = await schematicRunner.runSchematic(
      'add-spartacus',
      defaultOptions,
      appTree
    );

    const appModule = tree.readContent('/src/app/app.module.ts');
    expect(appModule).toContain('@NgModule');
    expect(appModule).toContain('export class AppModule');
  });
});
