import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';
import * as shared from '../../../shared/utils/package-utils';

jest.mock('../../../shared/utils/package-utils', () => ({
  ...jest.requireActual('../../../shared/utils/package-utils'),
  isSsrUsed: jest.fn(),
}));

const collectionPath = join(__dirname, '../../migrations.json');
const MIGRATION_SCRIPT_NAME = '01-migration-v2211_36-ssr';

describe('Update SSR Migration', () => {
  let tree: Tree;
  let runner: SchematicTestRunner;

  const workspaceContent = {
    version: 1,
    projects: {
      app: {
        root: '',
        architect: {
          build: {
            builder: '@angular-devkit/build-angular:application',
          },
        },
      },
    },
  };

  const serverFileContent = `
    import { APP_BASE_HREF } from '@angular/common';
    import {
      NgExpressEngineDecorator,
      defaultExpressErrorHandlers,
      ngExpressEngine as engine,
    } from '@spartacus/setup/ssr';
    import express from 'express';
    import { readFileSync } from 'node:fs';
    import { dirname, join, resolve } from 'node:path';
    import { fileURLToPath } from 'node:url';
    import AppServerModule from './main.server';

    const ngExpressEngine = NgExpressEngineDecorator.get(engine, {
      ssrFeatureToggles: {
        avoidCachingErrors: true,
      },
    });

    // The Express app is exported so that it can be used by serverless Functions.
    export function app(): express.Express {
      const server = express();
      const serverDistFolder = dirname(fileURLToPath(import.meta.url));
      const browserDistFolder = resolve(serverDistFolder, '../browser');
      const indexHtml = join(browserDistFolder, 'index.html');
      const indexHtmlContent = readFileSync(indexHtml, 'utf-8');
    }
  `;

  beforeEach(() => {
    tree = Tree.empty();
    runner = new SchematicTestRunner('migrations', collectionPath);
    jest.resetAllMocks();
    tree.create('/angular.json', JSON.stringify(workspaceContent));
  });

  it.each(['/server.ts', '/src/server.ts'])(
    'should update %s when using application builder and SSR is used',
    async (filePath) => {
      (shared.isSsrUsed as jest.Mock).mockReturnValue(true);
      tree.create(filePath, serverFileContent);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );
      const content = newTree.readText(filePath);

      expect(content).toContain('export function app()');
      expect(content).toContain("join(serverDistFolder, 'index.server.html')");
      expect(content).not.toContain("join(browserDistFolder, 'index.html')");
      expect(shared.isSsrUsed).toHaveBeenCalledWith(tree);
    }
  );

  it('should not update when SSR is not used', async () => {
    (shared.isSsrUsed as jest.Mock).mockReturnValue(false);
    tree.create('/server.ts', serverFileContent);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText('/server.ts');

    expect(content).toContain("join(browserDistFolder, 'index.html')");
    expect(content).not.toContain(
      "join(serverDistFolder, 'index.server.html')"
    );
    expect(shared.isSsrUsed).toHaveBeenCalledWith(tree);
  });

  it('should handle missing server.ts file', async () => {
    (shared.isSsrUsed as jest.Mock).mockReturnValue(true);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);

    expect(newTree.exists('/server.ts')).toBe(false);
    expect(newTree.exists('/src/server.ts')).toBe(false);
    expect(shared.isSsrUsed).toHaveBeenCalledWith(tree);
  });

  it('should preserve other join statements when SSR is used', async () => {
    (shared.isSsrUsed as jest.Mock).mockReturnValue(true);

    const contentWithMultipleJoins = `
      const otherFile = join(process.cwd(), 'other.html');
      const indexHtml = join(browserDistFolder, "index.html");
      const anotherFile = join(process.cwd(), 'another.html');
    `;

    tree.create('/server.ts', contentWithMultipleJoins);

    const newTree = await runner.runSchematic(MIGRATION_SCRIPT_NAME, {}, tree);
    const content = newTree.readText('/server.ts');

    expect(content).toContain("join(process.cwd(), 'other.html')");
    expect(content).toContain('join(serverDistFolder, "index.server.html")');
    expect(content).toContain("join(process.cwd(), 'another.html')");
    expect(shared.isSsrUsed).toHaveBeenCalledWith(tree);
  });
});
