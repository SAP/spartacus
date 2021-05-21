import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME =
  'migration-v4-product-configurator-changed-feature-keys';

const APP_MODULE_BEFORE_MIGRATION = `
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { RulebasedConfiguratorRootModule } from '@spartacus/product-configurator/rulebased/root';
import { provideConfig } from '@spartacus/core';
import { configuratorTranslations } from '@spartacus/product-configurator/common/assets';
import { configuratorTranslationChunksConfig } from '@spartacus/product-configurator/common/assets';
import { TextfieldConfiguratorRootModule } from '@spartacus/product-configurator/textfield/root';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    B2cStorefrontModule.withConfig({
      featureModules: {
        textfield: {
        module: () => import('@spartacus/product-configurator/textfield').then(
          (m) => m.TextfieldConfiguratorModule
        ),
        },
        rulebased: {
          module: () => import('@spartacus/product-configurator/rulebased').then(
          (m) => m.RulebasedConfiguratorModule
        ),
        },
      },
    }),
    RulebasedConfiguratorRootModule,
    TextfieldConfiguratorRootModule
  ],
  providers: [
    provideConfig({
      i18n: {
        resources: configuratorTranslations,
        chunks: configuratorTranslationChunksConfig,
      },
    })],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;
const APP_MODULE_AFTER_MIGRATION = `
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { RulebasedConfiguratorRootModule } from '@spartacus/product-configurator/rulebased/root';
import { provideConfig } from '@spartacus/core';
import { configuratorTranslations } from '@spartacus/product-configurator/common/assets';
import { configuratorTranslationChunksConfig } from '@spartacus/product-configurator/common/assets';
import { TextfieldConfiguratorRootModule } from '@spartacus/product-configurator/textfield/root';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    B2cStorefrontModule.withConfig({
      featureModules: {
// TODO:Spartacus - feature key textfield has been replaced with productConfiguratorTextfield
        textfield: {
        module: () => import('@spartacus/product-configurator/textfield').then(
          (m) => m.TextfieldConfiguratorModule
        ),
        },
// TODO:Spartacus - feature key rulebased has been replaced with productConfiguratorRulebased
        rulebased: {
          module: () => import('@spartacus/product-configurator/rulebased').then(
          (m) => m.RulebasedConfiguratorModule
        ),
        },
      },
    }),
    RulebasedConfiguratorRootModule,
    TextfieldConfiguratorRootModule
  ],
  providers: [
    provideConfig({
      i18n: {
        resources: configuratorTranslations,
        chunks: configuratorTranslationChunksConfig,
      },
    })],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;

const APP_MODULE_BEFORE_MIGRATION_USING_NEW_KEYS = `
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { RulebasedConfiguratorRootModule } from '@spartacus/product-configurator/rulebased/root';
import { provideConfig } from '@spartacus/core';
import { configuratorTranslations } from '@spartacus/product-configurator/common/assets';
import { configuratorTranslationChunksConfig } from '@spartacus/product-configurator/common/assets';
import { TextfieldConfiguratorRootModule } from '@spartacus/product-configurator/textfield/root';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    B2cStorefrontModule.withConfig({
      featureModules: {
        productConfiguratorTextfield: {
        module: () => import('@spartacus/product-configurator/textfield').then(
          (m) => m.TextfieldConfiguratorModule
        ),
        },
        productConfiguratorRulebased: {
          module: () => import('@spartacus/product-configurator/rulebased').then(
          (m) => m.RulebasedConfiguratorModule
        ),
        },
      }, 
    }),
    RulebasedConfiguratorRootModule,
    TextfieldConfiguratorRootModule
  ],
  providers: [
    provideConfig({
      i18n: {
        resources: configuratorTranslations,
        chunks: configuratorTranslationChunksConfig,
      },
    })],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;

describe('Product configurator feature keys migration', () => {
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
          '@spartacus/core': '^3.1.0',
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
            },
          },
        },
      })
    );
    writeFile(
      host,
      '/src/main.ts',
      `
import { AppModule } from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));`
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

  it('should add comments to obsolete feature keys', async () => {
    writeFile(host, '/src/app/app.module.ts', APP_MODULE_BEFORE_MIGRATION);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/app/app.module.ts');
    expect(content).toEqual(APP_MODULE_AFTER_MIGRATION);
  });

  it('should not do any changes on case feature keys already have correct format', async () => {
    writeFile(
      host,
      '/src/app/app.module.ts',
      APP_MODULE_BEFORE_MIGRATION_USING_NEW_KEYS
    );

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/app/app.module.ts');
    expect(content).toEqual(APP_MODULE_BEFORE_MIGRATION_USING_NEW_KEYS);
  });
});
