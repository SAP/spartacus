/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

const collectionPath = join(__dirname, '../../migrations.json');
const MIGRATION_SCRIPT_NAME = '02-migration-v221121_8-express-v5';

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
              ssr: {
                entry: 'server.ts',
              },
            },
          },
        },
      },
    },
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

  beforeEach(() => {
    tree = Tree.empty();
    runner = new SchematicTestRunner('migrations', collectionPath);
    tree.create('/angular.json', JSON.stringify(workspaceContent));
    tree.create('/server.ts', 'export const server = {};');
  });

  describe('Express dependency update', () => {
    it('should update Express to ^5.1.0 in package.json', async () => {
      const packageJson = {
        dependencies: {
          express: '^4.18.0',
        },
      };

      tree.create('/package.json', JSON.stringify(packageJson));

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
      const packageJson = {
        devDependencies: {
          express: '^4.18.0',
        },
      };

      tree.create('/package.json', JSON.stringify(packageJson));

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
    it('should replace wildcard strings with regex patterns in root server.ts', async () => {
      const packageJson = {
        dependencies: {
          express: '^4.18.0',
        },
      };

      tree.create('/package.json', JSON.stringify(packageJson));
      if (tree.exists('/server.ts')) {
        tree.delete('/server.ts');
      }
      tree.create('/server.ts', serverTsWithWildcards);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/server.ts');
      expect(updatedContent).toContain('server.get(/.*\\..*/,');
      expect(updatedContent).toContain('server.get(/.*/,');
      expect(updatedContent).not.toContain("server.get('*.*',");
      expect(updatedContent).not.toContain("server.get('*',");
    });

    it('should replace wildcard strings with regex patterns in src/server.ts', async () => {
      const packageJson = {
        dependencies: {
          express: '^4.18.0',
        },
      };

      // Update workspace to point to src/server.ts
      const workspaceWithSrcServer = {
        ...workspaceContent,
        projects: {
          'test-app': {
            ...workspaceContent.projects['test-app'],
            architect: {
              build: {
                ...workspaceContent.projects['test-app'].architect.build,
                options: {
                  ...workspaceContent.projects['test-app'].architect.build
                    .options,
                  ssr: {
                    entry: 'src/server.ts',
                  },
                },
              },
            },
          },
        },
      };
      tree.overwrite('/angular.json', JSON.stringify(workspaceWithSrcServer));

      tree.create('/package.json', JSON.stringify(packageJson));
      tree.create('/src/server.ts', serverTsWithWildcards);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/src/server.ts');
      // Check for regex pattern (may be on multiple lines)
      expect(updatedContent).toMatch(/server\.get\s*\(\s*\/\.\*\\\.\.\*\/\s*,/);
      expect(updatedContent).toMatch(/server\.get\s*\(\s*\/\.\*\/\s*,/);
      expect(updatedContent).not.toContain("server.get('*.*',");
      expect(updatedContent).not.toContain("server.get('*',");
    });

    it('should handle double quotes in wildcard strings', async () => {
      const packageJson = {
        dependencies: {
          express: '^4.18.0',
        },
      };

      tree.create('/package.json', JSON.stringify(packageJson));
      if (tree.exists('/server.ts')) {
        tree.delete('/server.ts');
      }
      tree.create('/server.ts', serverTsWithDoubleQuotes);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/server.ts');
      expect(updatedContent).toContain('server.get(/.*\\..*/,');
      expect(updatedContent).toContain('server.get(/.*/,');
      expect(updatedContent).not.toContain('server.get("*.*",');
      expect(updatedContent).not.toContain('server.get("*",');
    });

    it('should not modify server.ts if already updated', async () => {
      const packageJson = {
        dependencies: {
          express: '^4.18.0',
        },
      };

      tree.create('/package.json', JSON.stringify(packageJson));
      if (tree.exists('/server.ts')) {
        tree.delete('/server.ts');
      }
      tree.create('/server.ts', serverTsAlreadyUpdated);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/server.ts');
      expect(updatedContent).toBe(serverTsAlreadyUpdated);
    });

    it('should skip migration if server.ts file does not exist', async () => {
      const packageJson = {
        dependencies: {
          express: '^4.18.0',
        },
      };

      tree.create('/package.json', JSON.stringify(packageJson));
      // Remove server.ts files created in beforeEach to test this scenario
      tree.delete('/server.ts');

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
      const packageJson = {
        dependencies: {
          express: '^4.18.0',
        },
      };

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

      tree.create('/package.json', JSON.stringify(packageJson));
      if (tree.exists('/server.ts')) {
        tree.delete('/server.ts');
      }
      tree.create('/server.ts', serverTsWithOnlyWildcard);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/server.ts');
      expect(updatedContent).toContain('server.get(/.*/,');
      expect(updatedContent).not.toContain("server.get('*',");
    });

    it('should handle server.ts with only wildcard dot pattern', async () => {
      const packageJson = {
        dependencies: {
          express: '^4.18.0',
        },
      };

      const serverTsWithOnlyWildcardDot = `
import express from 'express';

export function app(): express.Express {
  const server = express();

  server.get('*.*', express.static('./browser', { maxAge: '1y' }));

  return server;
}
`;

      tree.create('/package.json', JSON.stringify(packageJson));
      if (tree.exists('/server.ts')) {
        tree.delete('/server.ts');
      }
      tree.create('/server.ts', serverTsWithOnlyWildcardDot);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/server.ts');
      expect(updatedContent).toContain('server.get(/.*\\..*/,');
      expect(updatedContent).not.toContain("server.get('*.*',");
    });

    it('should handle multiline server.get calls with wildcard patterns', async () => {
      const packageJson = {
        dependencies: {
          express: '^4.18.0',
        },
      };

      tree.create('/package.json', JSON.stringify(packageJson));
      if (tree.exists('/server.ts')) {
        tree.delete('/server.ts');
      }
      tree.create('/server.ts', serverTsMultiline);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/server.ts');
      // Check for regex pattern (may be on multiple lines)
      expect(updatedContent).toMatch(/server\.get\s*\(\s*\/\.\*\\\.\.\*\/\s*,/);
      expect(updatedContent).toMatch(/server\.get\s*\(\s*\/\.\*\/\s*,/);
      expect(updatedContent).not.toContain("server.get('*.*',");
      expect(updatedContent).not.toContain("server.get('*',");
    });

    it('should handle multiline server.get calls with double quotes', async () => {
      const packageJson = {
        dependencies: {
          express: '^4.18.0',
        },
      };

      tree.create('/package.json', JSON.stringify(packageJson));
      if (tree.exists('/server.ts')) {
        tree.delete('/server.ts');
      }
      tree.create('/server.ts', serverTsMultilineDoubleQuotes);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedContent = newTree.readText('/server.ts');
      // Check for regex pattern (may be on multiple lines)
      expect(updatedContent).toMatch(/server\.get\s*\(\s*\/\.\*\\\.\.\*\/\s*,/);
      expect(updatedContent).toMatch(/server\.get\s*\(\s*\/\.\*\/\s*,/);
      expect(updatedContent).not.toContain('server.get("*.*",');
      expect(updatedContent).not.toContain('server.get("*",');
    });
  });

  describe('combined migration', () => {
    it('should update both package.json and server.ts', async () => {
      const packageJson = {
        dependencies: {
          express: '^4.18.0',
        },
      };

      tree.create('/package.json', JSON.stringify(packageJson));
      if (tree.exists('/server.ts')) {
        tree.delete('/server.ts');
      }
      tree.create('/server.ts', serverTsWithWildcards);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      const updatedPackageJson = JSON.parse(newTree.readText('/package.json'));
      expect(updatedPackageJson.dependencies.express).toBe('^5.1.0');

      const updatedContent = newTree.readText('/server.ts');
      expect(updatedContent).toContain('server.get(/.*\\..*/,');
      expect(updatedContent).toContain('server.get(/.*/,');
    });
  });
});
