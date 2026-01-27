/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

const collectionPath = join(__dirname, '../../../migrations.json');
const MIGRATION_SCRIPT_NAME = '02-migration-v221121_7-express-v5';

describe('Express v5 Migration', () => {
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

  const tsConfigContent = {
    compilerOptions: {
      outDir: './out-tsc/app',
      types: [],
      lib: ['es2015'],
    },
    files: ['src/server.ts'],
    include: ['src/**/*.ts'],
  };

  const serverTsWithWildcards = `
import express from 'express';

export function app(): express.Express {
  const server = express();

  server.get('*.*', express.static('./browser', { maxAge: '1y' }));

  server.get('*', (req, res) => {
    res.render('index', { req });
  });

  return server;
}
`;

  const serverTsWithDoubleQuotes = `
import express from 'express';

export function app(): express.Express {
  const server = express();

  server.get("*.*", express.static('./browser', { maxAge: '1y' }));

  server.get("*", (req, res) => {
    res.render('index', { req });
  });

  return server;
}
`;

  const serverTsWithCustomExpressInstance = `
import express from 'express';

export function app(): express.Express {
  const appServer = express();

  appServer.get('*.*', express.static('./browser', { maxAge: '1y' }));

  appServer.get('*', (req, res) => {
    res.render('index', { req });
  });

  return appServer;
}
`;

  const serverTsAlreadyUpdated = `
import express from 'express';

export function app(): express.Express {
  const server = express();

  server.get(/.*\\..*/, express.static('./browser', { maxAge: '1y' }));

  server.get(/.*/, (req, res) => {
    res.render('index', { req });
  });

  return server;
}
`;

  const serverTsMultiline = `
import express from 'express';

export function app(): express.Express {
  const server = express();

  server.get(
    '*.*',
    express.static('./browser', { maxAge: '1y' })
  );

  server.get(
    '*',
    (req, res) => {
      res.render('index', { req });
    }
  );

  return server;
}
`;

  const serverTsMultilineDoubleQuotes = `
import express from 'express';

export function app(): express.Express {
  const server = express();

  server.get(
    "*.*",
    express.static('./browser', { maxAge: '1y' })
  );

  server.get(
    "*",
    (req, res) => {
      res.render('index', { req });
    }
  );

  return server;
}
`;

  const createPackageJson = (express: string, isDev = false) => {
    const packageJson = isDev
      ? { devDependencies: { express } }
      : { dependencies: { express } };
    tree.create('/package.json', JSON.stringify(packageJson));
  };

  beforeEach(() => {
    tree = Tree.empty();
    runner = new SchematicTestRunner('migrations', collectionPath);
    tree.create('/angular.json', JSON.stringify(workspaceContent));
    tree.create('/tsconfig.json', JSON.stringify(tsConfigContent));
    tree.create('/src/server.ts', 'export const server = {};');
  });

  describe('Express dependency update', () => {
    it('should update Express to ^5.1.0 in package.json', async () => {
      createPackageJson('^4.18.0');

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedPackageJson = JSON.parse(newTree.readText('/package.json'));
      expect(updatedPackageJson.dependencies.express).toBe('^5.1.0');
    });

    it('should skip migration if Express is not present in package.json', async () => {
      const packageJson = {
        dependencies: {},
      };

      tree.create('/package.json', JSON.stringify(packageJson));

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedPackageJson = JSON.parse(newTree.readText('/package.json'));
      expect(updatedPackageJson.dependencies.express).toBeUndefined();
    });

    it('should update Express in devDependencies if present', async () => {
      createPackageJson('^4.18.0', true);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedPackageJson = JSON.parse(newTree.readText('/package.json'));
      expect(updatedPackageJson.devDependencies.express).toBe('^5.1.0');
    });
  });

  describe('server.ts file updates', () => {
    it('should replace wildcard strings with regex patterns in src/server.ts', async () => {
      createPackageJson('^4.18.0');
      tree.overwrite('/src/server.ts', serverTsWithWildcards);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/src/server.ts');
      expect(updatedContent).toMatchSnapshot();
    });

    it('should update server.ts when Express instance name differs from server', async () => {
      createPackageJson('^4.18.0');
      tree.overwrite('/src/server.ts', serverTsWithCustomExpressInstance);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/src/server.ts');
      expect(updatedContent).toMatchSnapshot();
    });

    it('should handle double quotes in wildcard strings', async () => {
      createPackageJson('^4.18.0');
      tree.overwrite('/src/server.ts', serverTsWithDoubleQuotes);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/src/server.ts');
      expect(updatedContent).toMatchSnapshot();
    });

    it('should not modify server.ts if already updated', async () => {
      createPackageJson('^4.18.0');
      tree.overwrite('/src/server.ts', serverTsAlreadyUpdated);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/src/server.ts');
      expect(updatedContent).toMatchSnapshot();
    });

    it('should skip migration if server.ts file does not exist', async () => {
      createPackageJson('^4.18.0');
      tree.delete('/src/server.ts');

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      expect(newTree.exists('/server.ts')).toBe(false);
      expect(newTree.exists('/src/server.ts')).toBe(false);
      const updatedPackageJson = JSON.parse(newTree.readText('/package.json'));
      expect(updatedPackageJson.dependencies.express).toBe('^4.18.0');
    });

    it('should handle server.ts with only one wildcard pattern', async () => {
      const serverTsWithOnlyWildcard = `
import express from 'express';

export function app(): express.Express {
  const server = express();

  server.get('*', (req, res) => {
    res.render('index', { req });
  });

  return server;
}
`;

      createPackageJson('^4.18.0');
      tree.overwrite('/src/server.ts', serverTsWithOnlyWildcard);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/src/server.ts');
      expect(updatedContent).toMatchSnapshot();
    });

    it('should handle server.ts with only wildcard dot pattern', async () => {
      const serverTsWithOnlyWildcardDot = `
import express from 'express';

export function app(): express.Express {
  const server = express();

  server.get('*.*', express.static('./browser', { maxAge: '1y' }));

  return server;
}
`;

      createPackageJson('^4.18.0');
      tree.overwrite('/src/server.ts', serverTsWithOnlyWildcardDot);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/src/server.ts');
      expect(updatedContent).toMatchSnapshot();
    });

    it('should handle multiline server.get calls with wildcard patterns', async () => {
      createPackageJson('^4.18.0');
      tree.overwrite('/src/server.ts', serverTsMultiline);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/src/server.ts');
      expect(updatedContent).toMatchSnapshot();
    });

    it('should handle multiline server.get calls with double quotes', async () => {
      createPackageJson('^4.18.0');
      tree.overwrite('/src/server.ts', serverTsMultilineDoubleQuotes);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/src/server.ts');
      expect(updatedContent).toMatchSnapshot();
    });
  });

  describe('combined migration', () => {
    it('should update both package.json and server.ts', async () => {
      createPackageJson('^4.18.0');
      tree.overwrite('/src/server.ts', serverTsWithWildcards);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedPackageJson = JSON.parse(newTree.readText('/package.json'));
      expect(updatedPackageJson.dependencies.express).toBe('^5.1.0');

      const updatedContent = newTree.readText('/src/server.ts');
      expect(updatedContent).toMatchSnapshot();
    });
  });
});
