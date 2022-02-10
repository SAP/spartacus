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

const MIGRATION_SCRIPT_NAME = '02-migration-v4-dependency-management';

describe('dependency management migrations', () => {
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

  describe('when the dependencies are not present', () => {
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
    it('should add them', async () => {
      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const packageJson = appTree.readContent('/package.json');
      const updatedVersion: string = JSON.parse(packageJson).dependencies.rxjs;
      expect(updatedVersion).toEqual(
        collectedDependencies['@spartacus/core'].rxjs
      );
    });
  });

  describe('when the semver range is not satisfied', () => {
    describe('and when the present dependencies are higher', () => {
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

        const packageJson = appTree.readContent('/package.json');
        const updatedVersion: string =
          JSON.parse(packageJson).dependencies.bootstrap;
        expect(updatedVersion).toEqual(
          collectedDependencies['@spartacus/styles'].bootstrap
        );
      });
    });

    describe('and when the present dependencies are lower', () => {
      beforeEach(() => {
        writeFile(
          host,
          '/package.json',
          JSON.stringify({
            name: 'xxx',
            version: '3.0.0',
            dependencies: {
              '@spartacus/styles': '3.0.0',
              bootstrap: '^3.0.0',
            },
          })
        );
      });
      it('should upgrade them', async () => {
        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const packageJson = appTree.readContent('/package.json');
        const updatedVersion: string =
          JSON.parse(packageJson).dependencies.bootstrap;
        expect(updatedVersion).toEqual(
          collectedDependencies['@spartacus/styles'].bootstrap
        );
      });
    });
  });

  describe('cross dependencies', () => {
    describe('when only "core" deps are present', () => {
      beforeEach(() => {
        writeFile(
          host,
          '/package.json',
          JSON.stringify({
            name: 'xxx',
            version: '3.0.0',
            dependencies: {
              '@spartacus/core': '3.0.0',
              '@spartacus/storefront': '3.0.0',
              '@spartacus/organization': '3.0.0',
              '@spartacus/setup': '3.0.0',
            },
          })
        );
      });
      it('should install cross spartacus peer deps', async () => {
        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const packageJson = JSON.parse(appTree.readContent('/package.json'));

        expect(packageJson.dependencies['@spartacus/core']).toBeTruthy();
        expect(packageJson.dependencies['@spartacus/storefront']).toBeTruthy();
        expect(packageJson.dependencies['@spartacus/cart']).toBeTruthy();
        expect(packageJson.dependencies['@spartacus/checkout']).toBeTruthy();
        expect(packageJson.dependencies['@spartacus/user']).toBeTruthy();
      });
    });

    describe('when deps other than "core" are present', () => {
      beforeEach(() => {
        writeFile(
          host,
          '/package.json',
          JSON.stringify({
            name: 'xxx',
            version: '3.0.0',
            dependencies: {
              '@spartacus/core': '3.0.0',
              '@spartacus/storefront': '3.0.0',
              '@spartacus/cds': '3.0.0',
              '@spartacus/qualtrics': '3.0.0',
            },
          })
        );
      });
      it('should install cross spartacus peer deps', async () => {
        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const packageJson = JSON.parse(appTree.readContent('/package.json'));

        expect(packageJson.dependencies['@spartacus/core']).toBeTruthy();
        expect(packageJson.dependencies['@spartacus/storefront']).toBeTruthy();
        expect(packageJson.dependencies['@spartacus/cds']).toBeTruthy();
        expect(packageJson.dependencies['@spartacus/tracking']).toBeTruthy();
        expect(packageJson.dependencies['@spartacus/cart']).toBeTruthy();
        expect(packageJson.dependencies['@spartacus/checkout']).toBeTruthy();
        expect(packageJson.dependencies['@spartacus/qualtrics']).toBeTruthy();
      });
    });
  });
});
