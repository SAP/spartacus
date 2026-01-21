/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { appModulePath } from '../../../shared';

const collectionPath = join(__dirname, '../../migrations.json');
const MIGRATION_SCRIPT_NAME = '01-migration-v221121_7-angular-providers';

describe('Angular Config Providers Migration', () => {
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

  const appModuleContent = `
import { NgModule } from '@angular/core';
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

  const appModuleWithExistingProvidersContent = `
import { NgModule } from '@angular/core';
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

  const appModuleWithProviderAlreadyAddedContent = `
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
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
    provideBrowserGlobalErrorListeners()
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

  it('should add provideBrowserGlobalErrorListeners to app.module.ts with empty providers array', async () => {
    tree.create(appModulePath, appModuleContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText(appModulePath);

    expect(content).toContain(
      "import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';"
    );
    expect(content).toContain('provideBrowserGlobalErrorListeners()');
  });

  it('should add provideBrowserGlobalErrorListeners to app.module.ts with existing providers', async () => {
    tree.create(appModulePath, appModuleWithExistingProvidersContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText(appModulePath);

    expect(content).toContain('provideHttpClient()');
    expect(content).toContain('provideBrowserGlobalErrorListeners()');
  });

  it('should not add provideBrowserGlobalErrorListeners if already present', async () => {
    tree.create(appModulePath, appModuleWithProviderAlreadyAddedContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText(appModulePath);

    // Count occurrences of provideBrowserGlobalErrorListeners - should only be 2
    // (once in import, once in providers array)
    const matches = content.match(/provideBrowserGlobalErrorListeners/g);
    expect(matches).toHaveLength(2);
  });

  it('should handle app.module.ts in different locations', async () => {
    tree.create(appModulePath, appModuleContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText(appModulePath);

    expect(content).toContain('provideBrowserGlobalErrorListeners()');
  });
});
