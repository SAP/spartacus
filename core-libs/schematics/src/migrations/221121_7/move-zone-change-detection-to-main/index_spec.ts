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
  '04-migration-v221121_7-move-zone-change-detection-to-main';

describe('Move Zone Change Detection to Main Migration', () => {
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

  // Main.ts test content
  const mainTsWithProviderContent = `import { platformBrowser } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule, {
  applicationProviders: [
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
})
  .catch(err => console.error(err));
`;

  const mainTsWithoutProviderContent = `import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule)
  .catch(err => console.error(err));
`;

  const mainTsWithMultipleProvidersContent = `import { platformBrowser } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule, {
  applicationProviders: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
  ],
})
  .catch(err => console.error(err));
`;

  const mainTsWithOtherOptionsContent = `import { platformBrowser } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule, {
  applicationProviders: [
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
  defaultEncapsulation: ViewEncapsulation.None,
})
  .catch(err => console.error(err));
`;

  const mainTsMultilineContent = `import { platformBrowser } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(
  AppModule,
  {
    applicationProviders: [
      provideZoneChangeDetection({ eventCoalescing: true }),
    ],
  }
)
  .catch(err => console.error(err));
`;

  const mainTsAlreadyMigratedContent = `import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule)
  .catch(err => console.error(err));
`;

  // App Module test content
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

  describe('Remove from main.ts', () => {
    it('should remove provideZoneChangeDetection and applicationProviders from main.ts', async () => {
      tree.create('/src/main.ts', mainTsWithProviderContent);
      tree.create(appModulePath, appModuleContent);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );
      const mainContent = newTree.readText('/src/main.ts');

      expect(mainContent).toMatchSnapshot();
    });

    it('should not modify main.ts if provideZoneChangeDetection is not present', async () => {
      tree.create('/src/main.ts', mainTsWithoutProviderContent);
      tree.create(appModulePath, appModuleContent);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );
      const mainContent = newTree.readText('/src/main.ts');

      expect(mainContent).toBe(mainTsWithoutProviderContent);
    });

    it('should remove only provideZoneChangeDetection and preserve other providers', async () => {
      tree.create('/src/main.ts', mainTsWithMultipleProvidersContent);
      tree.create(appModulePath, appModuleContent);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );
      const mainContent = newTree.readText('/src/main.ts');

      expect(mainContent).toMatchSnapshot();
      // Verify provideZoneChangeDetection is removed
      expect(mainContent).not.toContain('provideZoneChangeDetection');
      // Verify other providers are preserved
      expect(mainContent).toContain('provideHttpClient()');
      expect(mainContent).toContain('applicationProviders');
    });

    it('should keep other options when removing applicationProviders', async () => {
      tree.create('/src/main.ts', mainTsWithOtherOptionsContent);
      tree.create(appModulePath, appModuleContent);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );
      const mainContent = newTree.readText('/src/main.ts');

      expect(mainContent).toMatchSnapshot();
    });

    it('should handle multiline bootstrapModule call', async () => {
      tree.create('/src/main.ts', mainTsMultilineContent);
      tree.create(appModulePath, appModuleContent);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );
      const mainContent = newTree.readText('/src/main.ts');

      expect(mainContent).toMatchSnapshot();
    });

    it('should not modify already migrated main.ts', async () => {
      tree.create('/src/main.ts', mainTsAlreadyMigratedContent);
      tree.create(appModulePath, appModuleContent);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );
      const mainContent = newTree.readText('/src/main.ts');

      expect(mainContent).toMatchSnapshot();
    });
  });

  describe('Add to app.module.ts', () => {
    it('should add provideZoneChangeDetection to app.module.ts with empty providers array', async () => {
      tree.create('/src/main.ts', mainTsWithProviderContent);
      tree.create(appModulePath, appModuleContent);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );
      const moduleContent = newTree.readText(appModulePath);

      expect(moduleContent).toMatchSnapshot();
    });

    it('should add provideZoneChangeDetection to app.module.ts with existing providers', async () => {
      tree.create('/src/main.ts', mainTsWithProviderContent);
      tree.create(appModulePath, appModuleWithExistingProvidersContent);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );
      const moduleContent = newTree.readText(appModulePath);

      expect(moduleContent).toMatchSnapshot();
    });

    it('should not add provideZoneChangeDetection if already present', async () => {
      tree.create('/src/main.ts', mainTsWithProviderContent);
      tree.create(appModulePath, appModuleWithProviderAlreadyAddedContent);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );
      const moduleContent = newTree.readText(appModulePath);

      // Count occurrences of provideZoneChangeDetection - should only be 2
      // (once in import, once in providers array)
      const matches = moduleContent.match(/provideZoneChangeDetection/g);
      expect(matches).toHaveLength(2);
    });
  });
});
