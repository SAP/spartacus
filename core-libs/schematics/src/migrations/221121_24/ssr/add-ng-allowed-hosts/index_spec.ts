/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

const collectionPath = join(__dirname, '../../../migrations.json');
const MIGRATION_SCRIPT_NAME = '10-migration-v221121_24-add-ng-allowed-hosts';

describe('Add NG_ALLOWED_HOSTS to serve:ssr Migration', () => {
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

  const createPackageJson = (scripts: Record<string, string>) => {
    const packageJson = {
      dependencies: {
        express: '^5.1.0',
      },
      scripts,
    };
    tree.create('/package.json', JSON.stringify(packageJson, null, 2));
  };

  const readScripts = (t: Tree): Record<string, string> =>
    JSON.parse(t.readText('/package.json')).scripts;

  beforeEach(() => {
    tree = Tree.empty();
    runner = new SchematicTestRunner('migrations', collectionPath);
    tree.create('/angular.json', JSON.stringify(workspaceContent));
    tree.create('/src/server.ts', serverTsContent);
  });

  describe('when SSR is configured', () => {
    it('should prepend NG_ALLOWED_HOSTS to the serve:ssr script when missing', async () => {
      createPackageJson({
        start: 'ng serve',
        'serve:ssr:test-app': 'node dist/test-app/server/server.mjs',
      });

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      expect(readScripts(newTree)['serve:ssr:test-app']).toBe(
        'NG_ALLOWED_HOSTS=localhost node dist/test-app/server/server.mjs'
      );
    });

    it('should not modify a serve:ssr script that already sets NG_ALLOWED_HOSTS', async () => {
      const existing =
        'NG_ALLOWED_HOSTS=example.com node dist/test-app/server/server.mjs';
      createPackageJson({
        start: 'ng serve',
        'serve:ssr:test-app': existing,
      });

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      expect(readScripts(newTree)['serve:ssr:test-app']).toBe(existing);
    });

    it('should leave package.json unchanged when there is no serve:ssr script', async () => {
      createPackageJson({
        start: 'ng serve',
        build: 'ng build',
      });

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const scripts = readScripts(newTree);
      expect(scripts['build']).toBe('ng build');
      expect(Object.keys(scripts).some((k) => k.startsWith('serve:ssr'))).toBe(
        false
      );
    });
  });

  describe('when SSR is not configured', () => {
    it('should skip migration and not touch serve:ssr script', async () => {
      tree.overwrite(
        '/angular.json',
        JSON.stringify(workspaceContentWithoutSSR)
      );
      tree.delete('/src/server.ts');
      const original = 'node dist/test-app/server/server.mjs';
      createPackageJson({
        start: 'ng serve',
        'serve:ssr:test-app': original,
      });

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      expect(readScripts(newTree)['serve:ssr:test-app']).toBe(original);
    });
  });
});
