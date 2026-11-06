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
import { updateAppModule } from './update-app-module';

const collectionPath = path.join(__dirname, '../collection.json');

describe('updateAppModule', () => {
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
    name: 'update-app-module-test',
    inlineStyle: false,
    inlineTemplate: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
    standalone: false,
    zoneless: false,
    fileNameStyleGuide: FileNameStyleGuide.The2016,
  };

  const defaultOptions: SpartacusOptions = {
    project: 'update-app-module-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
  };

  let appTree: UnitTestTree;

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

  it('should add import of spartacus AppRoutingModule to app.module.ts', async () => {
    const appModuleContent = `
import { NgModule } from '@angular/core';

@NgModule({})
export class AppModule {}
`;
    appTree.overwrite('/src/app/app.module.ts', appModuleContent);

    tree = (await firstValueFrom(
      schematicRunner.callRule(updateAppModule(defaultOptions), appTree)
    )) as UnitTestTree;

    const appModule = tree.readContent('/src/app/app.module.ts');
    expect(appModule).toContain('AppRoutingModule');
    expect(appModule).toMatchSnapshot();
  });

  it('should add import of spartacus AppRoutingModule to app.module.ts with customizations', async () => {
    const appModuleContent = `
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
  SomeCustomModule
  ],
  providers: [
    someCustomProvider
  ]
})
export class AppModule {}
`;
    appTree.overwrite('/src/app/app.module.ts', appModuleContent);

    tree = (await firstValueFrom(
      schematicRunner.callRule(updateAppModule(defaultOptions), appTree)
    )) as UnitTestTree;

    const appModule = tree.readContent('/src/app/app.module.ts');
    expect(appModule).toContain('AppRoutingModule');
    expect(appModule).toMatchSnapshot();
  });
});
