/// <reference types="jest" />

import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v4-rename-symbol-01';

// const fileWithSimpleImport = `import { OtherComponent1 } from "@spartacus/storefront";
// const array = [test];`;

// const expectFileWithSimpleImport = `import { OtherComponent1 } from "@spartacus/storefinder/components";

// const array = [test];`;

// -----------------------------------------------------------------------

const fileWithSimpleImportWithAlias = `import { OtherComponent1 as Test } from "@spartacus/storefront";
const array = [test];`;

const expectFileWithSimpleImportWithAlias = `import { OtherComponent1 as Test } from "@spartacus/storefinder/components";

const array = [test];`;

// -----------------------------------------------------------------------

// const fileWithSimpleImportAndRename = `
// import { OtherComponent2 } from "@spartacus/storefront";
// const array = [test];
// `;

// const expectFileWithSimpleImportAndRename = `
// import { OtherComponentTest2 } from "@spartacus/storefinder/components";
// const array = [test];
// `;

// -----------------------------------------------------------------------

// const fileWithComplexImport = `import { OtherComponent3 as Test} from "@spartacus/storefront";
// const array = [OtherComponent3];`;

// const fileWithComplexImportAndRename = `import { OtherComponent4 as Test} from "@spartacus/storefront";
// const array = [OtherComponent4];`;

describe('renamed symbols', () => {
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
            architect: {
              build: { options: { tsConfig: './tsconfig.json' } },
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

  describe('Previous import', () => {
    // it('should became new import', async () => {
    //   writeFile(host, '/src/index.ts', fileWithSimpleImport);

    //   await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    //   const content = appTree.readContent('/src/index.ts');

    //   console.log(content);
    //   console.log(expectFileWithSimpleImport);

    //   expect(content).toEqual(expectFileWithSimpleImport);
    // });

    it('should became new import with aliases', async () => {
      writeFile(host, '/src/index.ts', fileWithSimpleImportWithAlias);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');

      console.log(content);
      console.log(expectFileWithSimpleImportWithAlias);

      expect(content).toEqual(expectFileWithSimpleImportWithAlias);
    });

    // it('should became new import and new name', async () => {
    //   writeFile(host, '/src/index.ts', fileWithSimpleImportAndRename);

    //   await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    //   const content = appTree.readContent('/src/index.ts');

    //   console.log(content);
    //   console.log(expectFileWithSimpleImportAndRename);

    //   expect(content).toEqual(expectFileWithSimpleImportAndRename);
    // });
  });
});
