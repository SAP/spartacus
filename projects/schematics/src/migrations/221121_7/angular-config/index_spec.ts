/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

const collectionPath = join(__dirname, '../../migrations.json');
const MIGRATION_SCRIPT_NAME = '00-migration-v221121_7-angular-config';

describe('Remove index property from angular.json migration', () => {
  let tree: Tree;
  let runner: SchematicTestRunner;

  beforeEach(() => {
    tree = Tree.empty();
    runner = new SchematicTestRunner('migrations', collectionPath);
  });

  describe('when index property exists', () => {
    it('should remove the index property from build options', async () => {
      const workspaceContent = {
        version: 1,
        projects: {
          'test-app': {
            root: '',
            architect: {
              build: {
                builder: '@angular/build:application',
                options: {
                  index: 'src/index.html',
                  browser: 'src/main.ts',
                  outputPath: 'dist/test-app',
                },
              },
            },
          },
        },
      };

      tree.create('/angular.json', JSON.stringify(workspaceContent));

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = JSON.parse(newTree.readText('/angular.json'));
      const buildOptions =
        updatedContent.projects['test-app'].architect.build.options;

      expect(buildOptions.index).toBeUndefined();
      expect(buildOptions.browser).toBe('src/main.ts');
      expect(buildOptions.outputPath).toBe('dist/test-app');
    });

    it('should handle projects without build target', async () => {
      const workspaceContent = {
        version: 1,
        projects: {
          'test-app': {
            root: '',
            architect: {
              test: {
                builder: '@angular/build:karma',
              },
            },
          },
        },
      };

      tree.create('/angular.json', JSON.stringify(workspaceContent));

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = JSON.parse(newTree.readText('/angular.json'));
      expect(updatedContent).toEqual(workspaceContent);
    });
  });

  describe('when index property does not exist', () => {
    it('should not modify angular.json if index property is not present', async () => {
      const workspaceContent = {
        version: 1,
        projects: {
          'test-app': {
            root: '',
            architect: {
              build: {
                builder: '@angular/build:application',
                options: {
                  browser: 'src/main.ts',
                  outputPath: 'dist/test-app',
                },
              },
            },
          },
        },
      };

      tree.create('/angular.json', JSON.stringify(workspaceContent));

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = JSON.parse(newTree.readText('/angular.json'));
      expect(updatedContent).toEqual(workspaceContent);
    });
  });
});
