/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

const collectionPath = join(__dirname, '../../../migrations.json');
const MIGRATION_SCRIPT_NAME = '05-migration-v221121_7-build-ssr-script';

describe('Build SSR Script Migration', () => {
  let tree: Tree;
  let runner: SchematicTestRunner;

  const workspaceContent = {
    version: 1,
    projects: {
      'test-app': {
        root: '',
        architect: {
          build: {
            builder: '@angular-devkit/build-angular:application',
            options: {
              browser: 'src/main.ts',
              server: 'src/main.server.ts',
              tsConfig: 'tsconfig.json',
              ssr: {
                entry: 'src/server.ts',
              },
            },
          },
        },
      },
    },
  };

  const workspaceContentWithoutSSR = {
    version: 1,
    projects: {
      'test-app': {
        root: '',
        architect: {
          build: {
            builder: '@angular-devkit/build-angular:application',
            options: {
              browser: 'src/main.ts',
              tsConfig: 'tsconfig.json',
            },
          },
        },
      },
    },
  };

  const serverTsContent = `
import express from 'express';

export function app(): express.Express {
  const server = express();
  return server;
}
`;

  const createPackageJson = (
    scripts: Record<string, string> | undefined = undefined
  ) => {
    const packageJson = {
      dependencies: {
        express: '^5.1.0',
      },
      scripts,
    };
    tree.create('/package.json', JSON.stringify(packageJson, null, 2));
  };

  beforeEach(() => {
    tree = Tree.empty();
    runner = new SchematicTestRunner('migrations', collectionPath);
    tree.create('/angular.json', JSON.stringify(workspaceContent));
    tree.create('/src/server.ts', serverTsContent);
  });

  describe('when SSR is configured', () => {
    it('should add "build:ssr" script when it does not exist', async () => {
      createPackageJson({
        start: 'ng serve',
        build: 'ng build',
      });

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedPackageJson = newTree.readText('/package.json');
      expect(updatedPackageJson).toMatchSnapshot();
    });

    it('should not modify package.json when "build:ssr" script already exists', async () => {
      createPackageJson({
        start: 'ng serve',
        build: 'ng build',
        'build:ssr': 'ng build --configuration production',
      });

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedPackageJson = newTree.readText('/package.json');
      expect(updatedPackageJson).toMatchSnapshot();
    });
  });

  describe('when SSR is not configured', () => {
    it('should skip migration when SSR is not configured in angular.json', async () => {
      tree.overwrite(
        '/angular.json',
        JSON.stringify(workspaceContentWithoutSSR)
      );
      tree.delete('/src/server.ts');
      createPackageJson({
        start: 'ng serve',
        build: 'ng build',
      });

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedPackageJson = newTree.readText('/package.json');
      expect(updatedPackageJson).toMatchSnapshot();
    });

    it('should skip migration when server.ts file does not exist', async () => {
      tree.delete('/src/server.ts');
      createPackageJson({
        start: 'ng serve',
        build: 'ng build',
      });

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedPackageJson = newTree.readText('/package.json');
      expect(updatedPackageJson).toMatchSnapshot();
    });
  });
});
