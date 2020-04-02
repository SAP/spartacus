import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';
import { Style } from '@angular/cli/lib/config/schema';
import { getPathResultsForFile } from '../shared/utils/file-utils';

const collectionPath = path.join(__dirname, '../collection.json');

describe('add-ssr', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: any = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
  };

  const defaultOptions = {
    project: 'schematics-test',
    target: 'build',
    configuration: 'production',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
  };

  beforeEach(async () => {
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();
    appTree = await schematicRunner
      .runSchematicAsync('add-spartacus', defaultOptions, appTree)
      .toPromise();
    appTree = await schematicRunner
      .runSchematicAsync('add-ssr', defaultOptions, appTree)
      .toPromise();
  });

  describe('package.json', () => {
    it('should add SSR dependencies', async () => {
      const packageJson = appTree.readContent('/package.json');
      const packageObj = JSON.parse(packageJson);
      const depPackageList = Object.keys(packageObj.dependencies);

      expect(depPackageList.includes('@angular/platform-server')).toBe(true);
      expect(depPackageList.includes('@nguniversal/express-engine')).toBe(true);
    });

    it('should contain additional build scripts', async () => {
      const buffer = appTree.read('package.json');
      expect(buffer).toBeTruthy();
      if (buffer) {
        const packageJsonFileObject = JSON.parse(buffer.toString('utf-8'));
        expect(packageJsonFileObject.scripts['build:ssr']).toBeTruthy();
        expect(packageJsonFileObject.scripts['serve:ssr']).toBeTruthy();
      }
    });
  });

  describe('angular.json', () => {
    it('should contain changed output path', async () => {
      const buffer = appTree.read('angular.json');
      expect(buffer).toBeTruthy();
      if (buffer) {
        const angularJsonFileObject = JSON.parse(buffer.toString('utf-8'));
        const projectArchitectObject =
          angularJsonFileObject.projects[defaultOptions.project].architect.build
            .options;
        expect(projectArchitectObject['outputPath']).toEqual(
          `dist/${defaultOptions.project}`
        );
      }
    });
    it('should contain server build configuration', async () => {
      const buffer = appTree.read('angular.json');
      expect(buffer).toBeTruthy();
      if (buffer) {
        const angularJsonFileObject = JSON.parse(buffer.toString('utf-8'));
        const projectArchitectObject =
          angularJsonFileObject.projects[defaultOptions.project].architect;
        expect(projectArchitectObject['server']).toBeTruthy();
      }
    });
  });

  describe('app.server.module.ts', () => {
    it('should contain ServerTransferStateModule import', async () => {
      const appServerModulePath = getPathResultsForFile(
        appTree,
        'app.server.module.ts',
        '/src'
      )[0];
      const buffer = appTree.read(appServerModulePath);
      expect(buffer).toBeTruthy();
      if (buffer) {
        const appServerModule = buffer.toString('utf-8');
        expect(
          appServerModule.includes('ServerTransferStateModule')
        ).toBeTruthy();
        expect(
          appServerModule.includes('@angular/platform-server')
        ).toBeTruthy();
      }
    });
  });

  describe('index.html', () => {
    it('should contain occ-backend-base-url attribute in meta tags', async () => {
      const indexHtmlPath = getPathResultsForFile(
        appTree,
        'index.html',
        '/src'
      )[0];
      const buffer = appTree.read(indexHtmlPath);
      expect(buffer).toBeTruthy();
      if (buffer) {
        const indexHtmlFile = buffer.toString('utf-8');
        expect(
          indexHtmlFile.includes('meta name="occ-backend-base-url"')
        ).toBeTruthy();
      }
    });
  });

  describe('webpack.server.config.js', () => {
    it('should be created', async () => {
      const buffer = appTree.read('./webpack.server.config.js');
      expect(buffer).toBeTruthy();
      if (buffer) {
        const webpackConfigFile = buffer.toString('utf-8');
        expect(webpackConfigFile.length).toBeGreaterThan(0);
      }
    });
  });

  describe('main.server.ts', () => {
    it('should be modified with custom ngExpressImport and export', async () => {
      const buffer = appTree.read('./src/main.server.ts');
      expect(buffer).toBeTruthy();
      if (buffer) {
        const mainServerFileString = buffer.toString('utf-8');
        expect(mainServerFileString.length).toBeGreaterThan(0);

        expect(
          mainServerFileString.includes(
            'export { ngExpressEngine } from "@nguniversal/express-engine";'
          )
        ).toBeFalsy();

        expect(
          mainServerFileString.includes(
            "import { ngExpressEngine as engine } from '@nguniversal/express-engine';"
          )
        ).toBeTruthy();

        expect(
          mainServerFileString.includes(
            "import { NgExpressEngineDecorator } from '@spartacus/core';"
          )
        ).toBeTruthy();

        expect(
          mainServerFileString.includes(
            'export const ngExpressEngine = NgExpressEngineDecorator.get(engine);'
          )
        ).toBeTruthy();
      }
    });
  });

  describe('app.module.ts', () => {
    it('should contain BrowserTransferStateModule import', async () => {
      const appModulePath = getPathResultsForFile(
        appTree,
        'app.module.ts',
        '/src'
      )[0];
      const buffer = appTree.read(appModulePath);
      expect(buffer).toBeTruthy();
      if (buffer) {
        const appModule = buffer.toString('utf-8');
        expect(
          appModule.includes('BrowserTransferStateModule')
        ).toBeTruthy();
        expect(
          appModule.includes('@angular/platform-browser')
        ).toBeTruthy();
      }
    });
  });
});
