import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import * as fromPackageUtils from '../../../shared/utils/package-utils';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-feature-level-10';
const APP_MODULE_PATH = 'src/app/app.module.ts';
const PROJECT_NAME = 'spartacus-test';
const MAIN_PATH = `${PROJECT_NAME}/src/main.ts`;
const MAIN_TS = `
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
});
`;

const NO_FEATURE_SPECIFIED = `
import { NgModule } from '@angular/core';
import { B2cStorefrontModule } from '@spartacus/storefront';
@NgModule({
  imports: [
    B2cStorefrontModule.withConfig({}),
  ],
})
export class AppModule {}
`;
const V1_5_TO_V2 = `
import { NgModule } from '@angular/core';
import { B2cStorefrontModule } from '@spartacus/storefront';
@NgModule({
  imports: [
    B2cStorefrontModule.withConfig({
      features: {
        level: '1.5',
        anonymousConsents: true
      },
    }),
  ],
})
export class AppModule {}
`;
const V1_5_TO_V2_EXPECTED = `
import { NgModule } from '@angular/core';
import { B2cStorefrontModule } from '@spartacus/storefront';
@NgModule({
  imports: [
    B2cStorefrontModule.withConfig({
      features: {
        level: '2.0',
        anonymousConsents: true
      },
    }),
  ],
})
export class AppModule {}
`;
const V999 = `
import { NgModule } from '@angular/core';
import { B2cStorefrontModule } from '@spartacus/storefront';
@NgModule({
  imports: [
    B2cStorefrontModule.withConfig({
      features: {
        level: '999',
      },
    }),
  ],
})
export class AppModule {}
`;
const V2_0_TO_V2_1 = `
import { NgModule } from '@angular/core';
import { B2cStorefrontModule } from '@spartacus/storefront';
@NgModule({
  imports: [
    B2cStorefrontModule.withConfig({
      features: {
        level: '2.0',
        anonymousConsents: true
      },
    }),
  ],
})
export class AppModule {}
`;
const V_STAR = `
import { NgModule } from '@angular/core';
import { B2cStorefrontModule } from '@spartacus/storefront';
@NgModule({
  imports: [
    B2cStorefrontModule.withConfig({
      features: {
        level: '*',
      },
    }),
  ],
})
export class AppModule {}
`;

describe('feature level flag migration', () => {
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

    writeFile(host, MAIN_PATH, MAIN_TS);
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
          [PROJECT_NAME]: {
            sourceRoot: 'src',
            architect: {
              build: {
                options: {
                  main: MAIN_PATH,
                  tsConfig: './tsconfig.json',
                },
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

  describe('when there is no featureLevel config', () => {
    it('should not do any changes', async () => {
      spyOn(
        fromPackageUtils,
        'getSpartacusCurrentFeatureLevel'
      ).and.returnValue('2.0');
      writeFile(
        host,
        `${PROJECT_NAME}/${APP_MODULE_PATH}`,
        NO_FEATURE_SPECIFIED
      );

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(`${PROJECT_NAME}/${APP_MODULE_PATH}`);
      expect(content).toEqual(NO_FEATURE_SPECIFIED);
    });
  });

  describe('upgrading from v1 to v2', () => {
    it('should bump the version to 2.0', async () => {
      spyOn(
        fromPackageUtils,
        'getSpartacusCurrentFeatureLevel'
      ).and.returnValue('2.0');
      writeFile(host, `${PROJECT_NAME}/${APP_MODULE_PATH}`, V1_5_TO_V2);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(`${PROJECT_NAME}/${APP_MODULE_PATH}`);
      expect(content).toEqual(V1_5_TO_V2_EXPECTED);
    });
  });

  describe('upgrading from v2.0 to v2.1', () => {
    it('should NOT make any changes', async () => {
      spyOn(
        fromPackageUtils,
        'getSpartacusCurrentFeatureLevel'
      ).and.returnValue('2.1');
      writeFile(host, `${PROJECT_NAME}/${APP_MODULE_PATH}`, V2_0_TO_V2_1);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(`${PROJECT_NAME}/${APP_MODULE_PATH}`);
      expect(content).toEqual(V2_0_TO_V2_1);
    });
  });

  describe('when the current feature level is greater than the new feature level', () => {
    it('should not do any changes', async () => {
      spyOn(
        fromPackageUtils,
        'getSpartacusCurrentFeatureLevel'
      ).and.returnValue('2.0');
      writeFile(host, `${PROJECT_NAME}/${APP_MODULE_PATH}`, V999);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(`${PROJECT_NAME}/${APP_MODULE_PATH}`);
      expect(content).toEqual(V999);
    });
  });

  describe(`when the feature level is a '*' symbol`, () => {
    it('should not do any changes', async () => {
      spyOn(
        fromPackageUtils,
        'getSpartacusCurrentFeatureLevel'
      ).and.returnValue('2.0');
      writeFile(host, `${PROJECT_NAME}/${APP_MODULE_PATH}`, V_STAR);

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent(`${PROJECT_NAME}/${APP_MODULE_PATH}`);
      expect(content).toEqual(V_STAR);
    });
  });
});
