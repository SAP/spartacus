import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { TODO_SPARTACUS } from '../../../shared/constants';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-removed-public-api-deprecation-04';

const REMOVED_NODE_USED_VALID_TEST = `
import { Dummy } from '@angular/core';
import { CartEffects } from '@spartacus/core';
import { notImportant } from '@spartacus/core';
`;

const REMOVED_NODE_USED_EXPECTED = `
import { Dummy } from '@angular/core';
// ${TODO_SPARTACUS} 'CartEffects' is no longer part of the public API. Please look into migration guide for more information
import { CartEffects } from '@spartacus/core';
import { notImportant } from '@spartacus/core';
`;

const MULTI_LINE_IMPORT_VALID_TEST = `
import { Dummy } from '@angular/core';
import {
  CartEffects,
  WishlistEffects
 } from '@spartacus/core';
`;

const MULTI_LINE_IMPORT_EXPECTED = `
import { Dummy } from '@angular/core';
// ${TODO_SPARTACUS} 'CartEffects' is no longer part of the public API. Please look into migration guide for more information
// ${TODO_SPARTACUS} 'WishlistEffects' is no longer part of the public API. Please look into migration guide for more information
import {
  CartEffects,
  WishlistEffects
 } from '@spartacus/core';
`;

const NAMESPACED_IMPORT_VALID_TEST = `
import * as Core from '@spartacus/core';

new Core.CartEffects()
`;

const NAMESPACED_IMPORT_EXPECTED = `
import * as Core from '@spartacus/core';

// ${TODO_SPARTACUS} 'CartEffects' is no longer part of the public API. Please look into migration guide for more information
new Core.CartEffects()
`;

const NOT_IMPORTED = `
import { ActiveCartService } from '@spartacus/core';
`;

const NOT_USED_PROPERTY = `
import * as Core from '@spartacus/core';

new Core.ActiveCartService()
`;

describe('removed public api migrations', () => {
  let host: TempScopedNodeJsSyncHost;
  let appTree = Tree.empty() as UnitTestTree;
  let schematicRunner: SchematicTestRunner;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../../test/migrations-test.json')
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
      writeFile(host, '/src/index.ts', REMOVED_NODE_USED_VALID_TEST);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(REMOVED_NODE_USED_EXPECTED);
    });
  });

  describe('when the imports are present in the file', () => {
    it('should leave comment above each one', async () => {
      writeFile(host, '/src/index.ts', MULTI_LINE_IMPORT_VALID_TEST);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(MULTI_LINE_IMPORT_EXPECTED);
    });
  });

  describe('when namespaced import is present in the file', () => {
    it('should add comment above access to this property', async () => {
      writeFile(host, '/src/index.ts', NAMESPACED_IMPORT_VALID_TEST);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(NAMESPACED_IMPORT_EXPECTED);
    });
  });

  describe('when the import is not present in the file', () => {
    it('should not change anything', async () => {
      writeFile(host, '/src/index.ts', NOT_IMPORTED);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(NOT_IMPORTED);
    });
  });

  describe('when the namespaced import is present in the file', () => {
    it('should not change anything when property is not access', async () => {
      writeFile(host, '/src/index.ts', NOT_USED_PROPERTY);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(NOT_USED_PROPERTY);
    });
  });
});
