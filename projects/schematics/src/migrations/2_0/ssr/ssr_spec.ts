import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { runMigration } from '../../../shared/utils/test-utils';
import { UTF_8 } from '../../../shared/constants';

const MIGRATION_SCRIPT_NAME = 'migration-v2-ssr-07';

const MAIN_SERVER_FILE_TEST = `
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
if (environment.production) {
  enableProdMode();
}
export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
export { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";

import { ngExpressEngine as engine } from '@nguniversal/express-engine';
import { NgExpressEngineDecorator } from '@spartacus/core';
export const ngExpressEngine = NgExpressEngineDecorator.get(engine);
`;

const APP_MODULE_FILE_TEST = `
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
`;

describe('ssr', () => {
  let appTree: UnitTestTree;
  let appSchematicRunner: SchematicTestRunner;
  const workspaceOptions: any = {
    name: 'workspace',
    version: '9.0.0',
  };

  const appOptions: any = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'scss',
    skipTests: false,
    projectRoot: '',
  };

  beforeEach(async () => {
    appSchematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../../migrations.json')
    );

    appTree = await appSchematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await appSchematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();

    appTree.create('/server.ts', 'server content');
    appTree.create('/webpack.server.config.js', 'webpack config content');
    appTree.create('/src/main.server.ts', MAIN_SERVER_FILE_TEST);
    appTree.create('/src/app/app.server.module.ts', APP_MODULE_FILE_TEST);

    const pkg = JSON.parse(appTree.readContent('/package.json'));
    const scripts = pkg.scripts;
    scripts['compile:server'] = 'old compile:server';
    scripts['serve:ssr'] = 'old serve:ssr';
    scripts['build:client-and-server-bundles'] =
      'old build:client-and-server-bundles';

    appTree.overwrite('/package.json', JSON.stringify(pkg, null, 2));

    const angularJson = JSON.parse(appTree.readContent('/angular.json'));
    angularJson.projects[appOptions.name].architect['server'] = {
      options: {
        outputPath: `dist/${appOptions.name}/server`,
      },
    };

    appTree.overwrite('angular.json', JSON.stringify(angularJson, null, 2));
  });

  describe('Schematics SSR migration', () => {
    it(`shouldn't perform migration if server-side is not available`, async () => {
      appTree.delete('/server.ts');
      const angularJson = JSON.parse(appTree.readContent('/angular.json'));
      delete angularJson.projects[appOptions.name].architect['server'];
      appTree.overwrite('angular.json', JSON.stringify(angularJson, null, 2));

      await runMigration(appTree, appSchematicRunner, MIGRATION_SCRIPT_NAME);

      expect(appTree.exists('/server.ts')).toBeFalse();
      expect(appTree.exists('/server.ts.bak')).toBeFalse();
      expect(appTree.exists('/webpack.server.config.js.bak')).toBeFalse();
    });
    it(`should backup old 'server.ts' and 'webpack.server.config.js'`, async () => {
      await runMigration(appTree, appSchematicRunner, MIGRATION_SCRIPT_NAME);

      expect(appTree.exists('/server.ts')).toBeTruthy();
      expect(appTree.exists('/server.ts.bak')).toBeTruthy();
      expect(appTree.exists('/webpack.server.config.js.bak')).toBeTruthy();
    });

    it(`should create new server.ts file with new configuration'`, async () => {
      await runMigration(appTree, appSchematicRunner, MIGRATION_SCRIPT_NAME);

      expect(appTree.exists('/server.ts')).toBeTruthy();
      expect(appTree.exists('/server.ts.bak')).toBeTruthy();

      const serverContent = appTree.readContent('/server.ts').toString();
      expect(
        serverContent.includes(
          'const ngExpressEngine = NgExpressEngineDecorator.get(engine)'
        )
      ).toBeTruthy();
      expect(
        serverContent.includes(
          `const distFolder = join(process.cwd(), 'dist/${appOptions.name}/browser');`
        )
      ).toBeTruthy();
    });

    it(`should backup old 'package.json' scripts`, async () => {
      await runMigration(appTree, appSchematicRunner, MIGRATION_SCRIPT_NAME);

      const buffer = appTree.read('/package.json');
      if (!buffer) {
        return false;
      }

      const { scripts, dependencies, devDependencies } = JSON.parse(
        buffer.toString(UTF_8)
      );
      expect(scripts['build:client-and-server-bundles']).toBeUndefined();
      expect(scripts['compile:server']).toBeUndefined();

      expect(scripts['build:client-and-server-bundles_bak']).toBeDefined();
      expect(scripts['compile:server_bak']).toBeDefined();
      expect(scripts['serve:ssr_bak']).toBeDefined();
      expect(dependencies['@nguniversal/express-engine']).toBeDefined();
      expect(devDependencies['@nguniversal/builders']).toBeDefined();
    });

    it(`should remove ngExpressEngine references and expressions from main.server.ts`, async () => {
      await runMigration(appTree, appSchematicRunner, MIGRATION_SCRIPT_NAME);

      const appServerModule = appTree
        .readContent('/src/main.server.ts')
        .toString();
      expect(appServerModule).not.toContain(
        "import { NgExpressEngineDecorator } from '@spartacus/core'"
      );
      expect(appServerModule).not.toContain(
        'export const ngExpressEngine = NgExpressEngineDecorator.get(engine)'
      );
      expect(appServerModule).not.toContain(
        '@nguniversal/module-map-ngfactory-loader'
      );
    });

    it(`should remove '@nguniversal/module-map-ngfactory-loader' references`, async () => {
      await runMigration(appTree, appSchematicRunner, MIGRATION_SCRIPT_NAME);

      const appServerModule = appTree
        .readContent('/src/app/app.server.module.ts')
        .toString();
      expect(appServerModule).not.toContain(
        `from '@nguniversal/module-map-ngfactory-loader';`
      );
      expect(appServerModule).not.toContain('ModuleMapLoaderModule');

      const mainServer = appTree.readContent('/src/main.server.ts').toString();
      expect(mainServer).not.toContain(
        `from '@nguniversal/module-map-ngfactory-loader';`
      );
    });

    it(`should change output paths for builds in angular.json`, async () => {
      await runMigration(appTree, appSchematicRunner, MIGRATION_SCRIPT_NAME);

      const buffer = appTree.read('/angular.json');
      if (!buffer) {
        return false;
      }
      const { projects } = JSON.parse(buffer.toString(UTF_8));
      expect(
        projects[appOptions.name].architect.build.options.outputPath
      ).toEqual(`dist/${appOptions.name}/browser`);
      expect(
        projects[appOptions.name].architect.server.options.outputPath
      ).toEqual(`dist/${appOptions.name}/server`);
    });
  });
});
