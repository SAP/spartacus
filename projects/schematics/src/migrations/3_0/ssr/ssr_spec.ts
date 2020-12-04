import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import {
  SPARTACUS_CORE,
  SPARTACUS_SETUP,
  SPARTACUS_SETUP_SSR,
} from '../../../shared/constants';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v3-ssr-09';

describe('ssr migration', () => {
  let host: TempScopedNodeJsSyncHost;
  let appTree = Tree.empty() as UnitTestTree;
  let schematicRunner: SchematicTestRunner;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../../migrations.json')
    );
    host = new TempScopedNodeJsSyncHost();
    appTree = new UnitTestTree(new HostTree(host));

    writeFile(
      host,
      '/package.json',
      JSON.stringify({
        name: 'xxx',
        dependencies: {
          '@spartacus/core': '^2.0.0',
        },
      })
    );
    writeFile(
      host,
      '/tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          lib: ['es2015'],
        },
      })
    );
    writeFile(
      host,
      '/angular.json',
      JSON.stringify({
        projects: {
          'spartacus-test': {
            sourceRoot: 'src',
            architect: {
              build: {
                options: { tsConfig: './tsconfig.json', main: 'src/main.ts' },
              },
              server: {
                options: { main: '/src/server.ts' },
              },
            },
          },
        },
      })
    );

    previousWorkingDir = shx.pwd();
    tmpDirPath = getSystemPath(host.root);

    // Switch into the temporary directory path. This allows us to run
    // the schematic against our custom unit test tree.
    shx.cd(tmpDirPath);
  });

  afterEach(() => {
    shx.cd(previousWorkingDir);
    shx.rm('-r', tmpDirPath);
  });

  describe('when the ssr is not configured', () => {
    it('should not do the migration', async () => {
      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const packageJson = appTree.readContent('/package.json');
      expect(packageJson).not.toContain(SPARTACUS_SETUP);
    });
  });

  describe('when the ssr is configured', () => {
    it('should migrate to the new setup', async () => {
      writeFile(
        host,
        '/src/server.ts',
        `
  import { ngExpressEngine as engine } from '@nguniversal/express-engine';
  import { NgExpressEngineDecorator } from '@spartacus/core';
  `
      );

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const packageJson = appTree.readContent('/package.json');
      expect(packageJson).toContain(SPARTACUS_SETUP);

      const content = appTree.readContent('/src/server.ts');
      expect(content).not.toContain(SPARTACUS_CORE);
      expect(content).toContain(SPARTACUS_SETUP_SSR);
    });
  });
});
