/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

const collectionPath = join(__dirname, '../../migrations.json');
const MIGRATION_SCRIPT_NAME =
  '04-migration-v221121_7-remove-zone-change-detection-from-main';

describe('Zone Change Detection Main.ts Migration', () => {
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

  beforeEach(() => {
    tree = Tree.empty();
    runner = new SchematicTestRunner('migrations', collectionPath);
    tree.create('/angular.json', JSON.stringify(workspaceContent));
    tree.create('/tsconfig.app.json', JSON.stringify(tsConfigContent));
  });

  it('should remove provideZoneChangeDetection and applicationProviders from main.ts', async () => {
    tree.create('/src/main.ts', mainTsWithProviderContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText('/src/main.ts');

    expect(content).toMatchSnapshot();
  });

  it('should not modify main.ts if provideZoneChangeDetection is not present', async () => {
    tree.create('/src/main.ts', mainTsWithoutProviderContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText('/src/main.ts');

    expect(content).toBe(mainTsWithoutProviderContent);
  });

  it('should remove applicationProviders even with multiple providers', async () => {
    tree.create('/src/main.ts', mainTsWithMultipleProvidersContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText('/src/main.ts');

    expect(content).toMatchSnapshot();
  });

  it('should keep other options when removing applicationProviders', async () => {
    tree.create('/src/main.ts', mainTsWithOtherOptionsContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText('/src/main.ts');

    expect(content).toMatchSnapshot();
  });

  it('should handle multiline bootstrapModule call', async () => {
    tree.create('/src/main.ts', mainTsMultilineContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText('/src/main.ts');

    expect(content).toMatchSnapshot();
  });

  it('should not modify already migrated main.ts', async () => {
    tree.create('/src/main.ts', mainTsAlreadyMigratedContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText('/src/main.ts');

    expect(content).toMatchSnapshot();
  });
});
