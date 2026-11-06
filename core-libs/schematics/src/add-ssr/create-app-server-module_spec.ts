/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
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
import { createAppServerModule } from './create-app-server-module';

const collectionPath = path.join(__dirname, '../collection.json');

describe('createAppServerModule', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );

  let appTree: Tree;

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

    appTree = await firstValueFrom(
      schematicRunner.callRule(createAppServerModule(defaultOptions), appTree)
    );
  });

  it('should create app.module.server.ts for standalone SSR app', async () => {
    expect(appTree.exists('/src/app/app.module.server.ts')).toBe(true);
  });

  it('should create empty app.module.server.ts', async () => {
    const appServerModule = appTree.readText('/src/app/app.module.server.ts');
    expect(appServerModule).toMatchSnapshot();
  });
});
