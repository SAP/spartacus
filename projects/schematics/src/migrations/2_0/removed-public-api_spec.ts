import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { TODO_SPARTACUS } from '../../shared/constants';
import { runMigration, writeFile } from '../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-removed-public-api-04';

const REMOVED_NODE_USED_VALID_TEST_CLASS = `
import { Dummy } from '@angular/core';
import { CartEffects } from '@spartacus/core';
`;

const REMOVED_NODE_USED_EXPECTED_CLASS = `
import { Dummy } from '@angular/core';
// ${TODO_SPARTACUS} 'CartEffects' is no longer part of the public API. Please look into migration guide for more information
import { CartEffects } from '@spartacus/core';
`;

describe('removed public api migrations', () => {
  let host = new TempScopedNodeJsSyncHost();
  let appTree = Tree.empty() as UnitTestTree;
  let schematicRunner: SchematicTestRunner;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../migrations.json')
    );
    host = new TempScopedNodeJsSyncHost();
    appTree = new UnitTestTree(new HostTree(host));

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
            test: {
              architect: {
                build: { options: { tsConfig: './tsconfig.json' } },
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

  describe('when the import is present in the file', () => {
    it('should leave comment above it', async () => {
      writeFile(host, '/src/index.ts', REMOVED_NODE_USED_VALID_TEST_CLASS);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(REMOVED_NODE_USED_EXPECTED_CLASS);
    });
  });
});
