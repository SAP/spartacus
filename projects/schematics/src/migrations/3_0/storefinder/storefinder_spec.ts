import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v3-storefinder-07';

const STORE_FINDER_MODULE_IMPORTED_TEST = `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { B2cStorefrontModule, StoreFinderModule } from '@spartacus/storefront';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    B2cStorefrontModule.withConfig({}),
    StoreFinderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
`;
const STORE_FINDER_MODULE_IMPORTED_EXPECTED = `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { B2cStorefrontModule,  } from '@spartacus/storefront';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    B2cStorefrontModule.withConfig({}),
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
`;

const STOREFRONT_MODULE_IMPORTED_TEST = `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { B2cStorefrontModule, StorefrontModule } from '@spartacus/storefront';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    B2cStorefrontModule.withConfig({}),
    StorefrontModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
`;
const STOREFRONT_MODULE_IMPORTED_EXPECTED = `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { B2cStorefrontModule, StorefrontModule } from '@spartacus/storefront';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    B2cStorefrontModule.withConfig({}),
    StorefrontModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
`;

describe('Storefinder migration', () => {
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
          '@spartacus/core': '^2.0.0',
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

  describe('when the StoreFinderModule is imported', () => {
    it('should remove it from imports, imports array and migrate to the new setup', async () => {
      writeFile(
        host,
        '/src/app/app.module.ts',
        STORE_FINDER_MODULE_IMPORTED_TEST
      );

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/app/app.module.ts');
      expect(content).toEqual(STORE_FINDER_MODULE_IMPORTED_EXPECTED);
    });
  });

  describe('when the StorefrontModule is imported', () => {
    it('should migrate to the new setup', async () => {
      writeFile(
        host,
        '/src/app/app.module.ts',
        STOREFRONT_MODULE_IMPORTED_TEST
      );

      await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

      const content = appTree.readContent('/src/app/app.module.ts');
      expect(content).toEqual(STOREFRONT_MODULE_IMPORTED_EXPECTED);
    });
  });
});
