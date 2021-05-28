import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import collectedDependencies from '../../../dependencies.json';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v4-dependency-management-03';

describe('dependency management migrations', () => {
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

  describe('when the present dependencies are lower', () => {
    beforeEach(() => {
      writeFile(
        host,
        '/package.json',
        JSON.stringify({
          name: 'xxx',
          version: '3.0.0',
          dependencies: {
            '@spartacus/core': '3.0.0',
          },
        })
      );
    });
    it('should update them', async () => {
      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);
      await schematicRunner.engine.executePostTasks().toPromise();

      const packageJson = appTree.readContent('/package.json');
      const updatedVersion: string = JSON.parse(packageJson).dependencies.rxjs;
      expect(updatedVersion).toEqual(
        collectedDependencies['@spartacus/core'].rxjs
      );
    });
  });

  describe('when the present dependencies are higher', () => {
    beforeEach(() => {
      writeFile(
        host,
        '/package.json',
        JSON.stringify({
          name: 'xxx',
          version: '3.0.0',
          dependencies: {
            '@spartacus/styles': '3.0.0',
            bootstrap: '^5.0.0',
          },
        })
      );
    });
    it('should downgrade them', async () => {
      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);
      await schematicRunner.engine.executePostTasks().toPromise();

      const packageJson = appTree.readContent('/package.json');
      const updatedVersion: string = JSON.parse(packageJson).dependencies
        .bootstrap;
      expect(updatedVersion).toEqual(
        collectedDependencies['@spartacus/styles'].bootstrap
      );
    });
  });
});
