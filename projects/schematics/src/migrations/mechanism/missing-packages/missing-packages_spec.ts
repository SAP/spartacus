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

const MIGRATION_SCRIPT_NAME = '03-migration-v4-missing-packages';

const fileWithAsmImport = `import { Something } from "@spartacus/asm";

console.log(Something)`;

const fileWithAsmEntryPointImport = `import { Something } from "@spartacus/asm/root";

console.log(Something)`;

const fileWithoutImports = `console.log('test');`;

const fileWithCheckoutImport = `import { Something } from "@spartacus/checkout";

console.log(Something)`;

describe('missing packages', () => {
  let host: TempScopedNodeJsSyncHost;
  let appTree = Tree.empty() as UnitTestTree;
  let schematicRunner: SchematicTestRunner;
  let tmpDirPath: string;
  let previousWorkingDir: string;
  let loggerSpy: jest.Mock;

  beforeEach(() => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../../test/migrations-test.json')
    );
    host = new TempScopedNodeJsSyncHost();
    appTree = new UnitTestTree(new HostTree(host));

    // hack to spy on logger
    loggerSpy = jest.fn();
    schematicRunner['_logger'] = {
      createChild: () => ({ warn: loggerSpy }),
    };

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

    writeFile(
      host,
      '/package.json',
      JSON.stringify({
        name: 'custom-app',
        dependencies: {
          '@spartacus/checkout': '4.0.0',
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

  it('should log comment about package missing when it is used, but not present in package.json', async () => {
    writeFile(host, '/src/index.ts', fileWithAsmImport);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);
    expect(loggerSpy).toHaveBeenCalledWith('ASM package missing\n');
  });

  it('should not log when package is not used and not present in package.json', async () => {
    writeFile(host, '/src/index.ts', fileWithoutImports);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);
    expect(loggerSpy).not.toHaveBeenCalled();
  });

  it('should not log comment about package when it is used, but it is present in package.json', async () => {
    writeFile(host, '/src/index.ts', fileWithCheckoutImport);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);
    expect(loggerSpy).not.toHaveBeenCalled();
  });

  it('should log comment about missing package when it is used from sub entry point, but it is not present in package.json', async () => {
    writeFile(host, '/src/index.ts', fileWithAsmEntryPointImport);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);
    expect(loggerSpy).toHaveBeenCalledWith('ASM package missing\n');
  });
});
