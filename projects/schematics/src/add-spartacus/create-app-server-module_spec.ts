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
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';

const collectionPath = path.join(__dirname, '../collection.json');

describe('createAppServerModule', () => {
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
    name: 'create-app-server-test',
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
    project: 'create-app-server-test',
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

    // Run add-spartacus first
    appTree = await schematicRunner.runSchematic(
      'add-spartacus',
      defaultOptions,
      appTree
    );

    // Then run add-ssr which calls createAppServerModule
    appTree = await schematicRunner.runSchematic(
      'add-ssr',
      defaultOptions,
      appTree
    );
  });

  it('should create app.module.server.ts for standalone SSR app', async () => {
    expect(appTree.exists('/src/app/app.module.server.ts')).toBe(true);
  });

  it('should create app.module.server.ts with provideServer() using serverRequestOrigin: process.env["SERVER_REQUEST_ORIGIN"],', async () => {
    const appServerModule = appTree.readContent(
      '/src/app/app.module.server.ts'
    );
    expect(appServerModule).toMatchSnapshot();
  });

  it('should contain NgModule decorator', async () => {
    const appServerModule = appTree.readContent(
      '/src/app/app.module.server.ts'
    );
    expect(appServerModule).toContain('@NgModule');
    expect(appServerModule).toContain('export class AppServerModule');
  });
});
