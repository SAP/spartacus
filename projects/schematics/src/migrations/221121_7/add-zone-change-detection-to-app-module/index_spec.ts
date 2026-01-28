/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { appModulePath } from '../../../shared';

const collectionPath = join(__dirname, '../../migrations.json');
const MIGRATION_SCRIPT_NAME =
  '04-migration-v221121_7-add-zone-change-detection-to-app-module';

describe('Zone Change Detection App Module Migration', () => {
  let tree: Tree;
  let runner: SchematicTestRunner;

  const workspaceContent = {
    version: 1,
    projects: {
      app: {
        root: '',
        architect: {
          build: {
            options: {
              tsConfig: 'tsconfig.app.json',
            },
          },
        },
      },
    },
  };

  const tsConfigContent = {
    compilerOptions: {
      outDir: './out-tsc/app',
      types: [],
    },
    files: ['src/main.ts'],
    include: ['src/**/*.ts'],
  };

  const appModuleContent = `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;

  const appModuleWithExistingProvidersContent = `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;

  const appModuleWithProviderAlreadyAddedContent = `import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;

  beforeEach(() => {
    tree = Tree.empty();
    runner = new SchematicTestRunner('migrations', collectionPath);
    tree.create('/angular.json', JSON.stringify(workspaceContent));
    tree.create('/tsconfig.app.json', JSON.stringify(tsConfigContent));
  });

  it('should add provideZoneChangeDetection to app.module.ts with empty providers array', async () => {
    tree.create(appModulePath, appModuleContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText(appModulePath);

    expect(content).toMatchSnapshot();
  });

  it('should add provideZoneChangeDetection to app.module.ts with existing providers', async () => {
    tree.create(appModulePath, appModuleWithExistingProvidersContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText(appModulePath);

    expect(content).toMatchSnapshot();
  });

  it('should not add provideZoneChangeDetection if already present', async () => {
    tree.create(appModulePath, appModuleWithProviderAlreadyAddedContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText(appModulePath);

    // Count occurrences of provideZoneChangeDetection - should only be 2
    // (once in import, once in providers array)
    const matches = content.match(/provideZoneChangeDetection/g);
    expect(matches).toHaveLength(2);
  });
});
