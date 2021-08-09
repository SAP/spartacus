import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { NGUNIVERSAL_EXPRESS_ENGINE, UTF_8 } from '../shared/constants';
import { getPathResultsForFile } from '../shared/utils/file-utils';

const collectionPath = path.join(__dirname, '../collection.json');

describe('add-ssr', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
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

  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
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
      .runSchematicAsync(
        'add-spartacus',
        { ...defaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
    appTree = await schematicRunner
      .runSchematicAsync(
        'add-ssr',
        { ...defaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('package.json', () => {
    it('should add SSR dependencies', async () => {
      const packageJson = appTree.readContent('/package.json');
      const packageObj = JSON.parse(packageJson);
      const depPackageList = Object.keys(packageObj.dependencies);

      expect(depPackageList.includes('@angular/platform-server')).toBe(true);
      expect(depPackageList.includes(NGUNIVERSAL_EXPRESS_ENGINE)).toBe(true);
      expect(depPackageList.includes('@spartacus/setup')).toBe(true);
    });

    it('should contain additional build scripts', async () => {
      const buffer = appTree.read('package.json');
      expect(buffer).toBeTruthy();
      if (buffer) {
        const packageJsonFileObject = JSON.parse(buffer.toString(UTF_8));
        expect(packageJsonFileObject.scripts['build:ssr']).toBeTruthy();
        expect(packageJsonFileObject.scripts['serve:ssr']).toBeTruthy();
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
        const appServerModule = buffer.toString(UTF_8);
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
        const indexHtmlFile = buffer.toString(UTF_8);
        expect(
          indexHtmlFile.includes('meta name="occ-backend-base-url"')
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
        expect(appModule.includes('BrowserTransferStateModule')).toBeTruthy();
        expect(appModule.includes('@angular/platform-browser')).toBeTruthy();
      }
    });
  });
});
