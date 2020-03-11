import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-page-meta-07';
const USE_OF_RESOLVE_METHODS = `
// before changes done by test

export class CustomPageMetaService extends PageMetaService {
  resolverMethods() {
    // no implementation here...
  }
}
`;
const EXPECTED_CLASS = `
// before changes done by test

export class CustomPageMetaService extends PageMetaService {
  // TODO:Spartacus - the method is no longer public
  resolverMethods() {
    // no implementation here...
  }
}
`;

fdescribe('constructor migrations', () => {
  let host = new TempScopedNodeJsSyncHost();
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

  describe('PageMetaService update for 2.0', () => {
    it('should add a comment when resolveMethods is used', async () => {
      writeFile(host, '/src/index.ts', USE_OF_RESOLVE_METHODS);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/index.ts');
      expect(content).toEqual(EXPECTED_CLASS);
    });
  });
});
