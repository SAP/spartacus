import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { runMigration } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v2-ng-add-localize-08';
const EXPECTED_IMPORT = `import '@angular/localize/init';`;
const SERVER_TS = `
import 'zone.js/dist/zone-node';

import { ngExpressEngine as engine } from '@nguniversal/express-engine';
import { NgExpressEngineDecorator } from '@spartacus/core';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
`;
const MAIN_SERVER_FILE_TEST = `
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
if (environment.production) {
  enableProdMode();
}
export { AppServerModule } from './app/app.server.module';
export { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";
import { ngExpressEngine as engine } from '@nguniversal/express-engine';
import { NgExpressEngineDecorator } from '@spartacus/core';
export const ngExpressEngine = NgExpressEngineDecorator.get(engine);
`;

const APP_MODULE_FILE_TEST = `
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
`;

describe('ng add localize', () => {
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

    appTree.create('/server.ts', SERVER_TS);
    appTree.create('/webpack.server.config.js', 'webpack config content');
    appTree.create('/src/main.server.ts', MAIN_SERVER_FILE_TEST);
    appTree.create('/src/app/app.server.module.ts', APP_MODULE_FILE_TEST);
  });

  describe(`when the polyfills.ts and server.ts do not have the ${EXPECTED_IMPORT}`, () => {
    it('should add it', async () => {
      await runMigration(appTree, appSchematicRunner, MIGRATION_SCRIPT_NAME);

      const polyfillsContent = appTree.readContent('/src/polyfills.ts');
      expect(polyfillsContent).toContain(EXPECTED_IMPORT);
      const serverContent = appTree.readContent('server.ts');
      expect(serverContent).toContain(EXPECTED_IMPORT);
    });
  });
});
