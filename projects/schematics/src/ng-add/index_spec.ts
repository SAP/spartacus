import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { UTF_8 } from '../shared/constants';
import { getPathResultsForFile } from '../shared/utils/file-utils';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: any = {
    name: 'workspace',
    version: '0.5.0',
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

  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
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
  });

  it('should add spartacus deps', async () => {
    const tree = await schematicRunner
      .runSchematicAsync('add-spartacus', defaultOptions, appTree)
      .toPromise();
    const packageJson = tree.readContent('/package.json');
    const packageObj = JSON.parse(packageJson);
    const depPackageList = Object.keys(packageObj.dependencies);
    expect(depPackageList.includes('@spartacus/core')).toBe(true);
    expect(depPackageList.includes('@spartacus/storefront')).toBe(true);
    expect(depPackageList.includes('@spartacus/styles')).toBe(true);
  });

  it('should add spartacus with PWA via passed parameter', async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        'ng-add',
        { ...defaultOptions, name: 'schematics-test', pwa: true },
        appTree
      )
      .toPromise();
    const buffer = tree.read('src/manifest.webmanifest');
    expect(buffer).toBeTruthy();

    if (buffer) {
      const webmanifestJSON = JSON.parse(buffer.toString(UTF_8));
      expect(webmanifestJSON.name).toEqual(defaultOptions.project);
    }
  });

  it('should add spartacus with SSR via passed parameter', async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        'ng-add',
        { ...defaultOptions, name: 'schematics-test', ssr: true },
        appTree
      )
      .toPromise();
    const packageJsonBuffer = tree.read('/package.json');
    expect(packageJsonBuffer).toBeTruthy();
    const appServerModulePath = getPathResultsForFile(
      tree,
      'app.server.module.ts',
      '/src'
    )[0];
    const appServerModuleBuffer = tree.read(appServerModulePath);
    expect(appServerModuleBuffer).toBeTruthy();
    const serverBuffer = tree.read('server.ts');
    expect(serverBuffer).toBeTruthy();

    if (packageJsonBuffer) {
      const packageJSON = JSON.parse(packageJsonBuffer.toString(UTF_8));
      expect(
        packageJSON.dependencies['@nguniversal/express-engine']
      ).toBeTruthy();
      expect(packageJSON.dependencies['@angular/platform-server']).toBeTruthy();
    }

    if (appServerModuleBuffer) {
      const appServerModuleContent = appServerModuleBuffer.toString(UTF_8);
      expect(
        appServerModuleContent.includes('ServerTransferStateModule')
      ).toBeTruthy();
    }
  });

  describe('@angular/localize', () => {
    it('should provide import in polyfills.ts and main.server.ts if SSR enabled', async () => {
      const tree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          { ...defaultOptions, name: 'schematics-test', ssr: true },
          appTree
        )
        .toPromise();

      const polyfillsPath = getPathResultsForFile(
        appTree,
        'polyfills.ts',
        '/src'
      )[0];

      const buffer = tree.read('./server.ts');
      const polyfillsBuffer = tree.read(polyfillsPath);
      expect(buffer).toBeTruthy();
      expect(polyfillsBuffer).toBeTruthy();
      if (buffer) {
        const appServerTsFileString = buffer.toString(UTF_8);
        expect(
          appServerTsFileString.includes("import '@angular/localize/init'")
        ).toBeTruthy();
      }
      if (polyfillsBuffer) {
        const polyfills = polyfillsBuffer.toString(UTF_8);
        expect(
          polyfills.includes("import '@angular/localize/init'")
        ).toBeTruthy();
      }
    });
  });
});
