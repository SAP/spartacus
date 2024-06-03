import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import collectedDependencies from '../../../dependencies.json';
import {
  SPARTACUS_CART,
  SPARTACUS_CDS,
  SPARTACUS_CHECKOUT,
  SPARTACUS_CORE,
  SPARTACUS_ORDER,
  SPARTACUS_ORGANIZATION,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  SPARTACUS_QUALTRICS,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_TRACKING,
  SPARTACUS_USER,
} from '../../../shared/libs-constants';
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
          lib: ['es2022'],
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
            [SPARTACUS_CORE]: '3.0.0',
          },
        })
      );
    });
    it('should add them', async () => {
      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const packageJson = appTree.readContent('/package.json');
      const updatedVersion: string = JSON.parse(packageJson).dependencies.rxjs;
      expect(updatedVersion).toEqual(
        collectedDependencies[SPARTACUS_CORE].rxjs
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
              [SPARTACUS_STOREFRONTLIB]: '3.0.0',
              rxjs: '^10.0.0',
            },
          })
        );
      });
      it('should downgrade them', async () => {
        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const packageJson = appTree.readContent('/package.json');
        const updatedVersion: string =
          JSON.parse(packageJson).dependencies.rxjs;
        expect(updatedVersion).toEqual(
          collectedDependencies['@spartacus/storefront'].rxjs
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
              [SPARTACUS_STOREFRONTLIB]: '3.0.0',
              rxjs: '^3.0.0',
            },
          })
        );
      });
      it('should upgrade them', async () => {
        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const packageJson = appTree.readContent('/package.json');
        const updatedVersion: string =
          JSON.parse(packageJson).dependencies.rxjs;
        expect(updatedVersion).toEqual(
          collectedDependencies['@spartacus/storefront'].rxjs
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
              [SPARTACUS_CORE]: '3.0.0',
              [SPARTACUS_STOREFRONTLIB]: '3.0.0',
              [SPARTACUS_ORGANIZATION]: '3.0.0',
              [SPARTACUS_PRODUCT_CONFIGURATOR]: '3.0.0',
            },
          })
        );
      });
      it('should install cross spartacus peer deps', async () => {
        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const packageJson = JSON.parse(appTree.readContent('/package.json'));

        expect(packageJson.dependencies[SPARTACUS_USER]).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_CART]).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_ORDER]).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_CHECKOUT]).toBeTruthy();
        expect(
          packageJson.dependencies[SPARTACUS_PRODUCT_CONFIGURATOR]
        ).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_ORGANIZATION]).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_CORE]).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_STOREFRONTLIB]).toBeTruthy();
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
              [SPARTACUS_CORE]: '3.0.0',
              [SPARTACUS_STOREFRONTLIB]: '3.0.0',
              [SPARTACUS_CDS]: '3.0.0',
              [SPARTACUS_QUALTRICS]: '3.0.0',
            },
          })
        );
      });
      it('should install cross spartacus peer deps', async () => {
        await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

        const packageJson = JSON.parse(appTree.readContent('/package.json'));

        expect(packageJson.dependencies[SPARTACUS_CORE]).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_STOREFRONTLIB]).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_CDS]).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_TRACKING]).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_CART]).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_ORDER]).toBeTruthy();
        expect(packageJson.dependencies[SPARTACUS_QUALTRICS]).toBeTruthy();
      });
    });
  });
});
