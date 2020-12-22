import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { NGUNIVERSAL_EXPRESS_ENGINE, UTF_8 } from '../shared/constants';
import { getPathResultsForFile } from '../shared/utils/file-utils';

const collectionPath = path.join(__dirname, '../collection.json');

// tslint:disable:max-line-length
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
      .runSchematicAsync(
        'ng-add',
        { ...defaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();

    // Verify that we registered task only for installing packages (no PWA schematics)
    const { tasks } = schematicRunner;
    expect(tasks[0].name).toEqual('node-package');
    expect((tasks[0].options as any).command).toEqual('install');
    expect(tasks.length).toBe(1);

    const packageJson = tree.readContent('/package.json');
    const packageObj = JSON.parse(packageJson);
    const depPackageList = Object.keys(packageObj.dependencies);
    expect(depPackageList.includes('@spartacus/core')).toBe(true);
    expect(depPackageList.includes('@spartacus/storefront')).toBe(true);
    expect(depPackageList.includes('@spartacus/styles')).toBe(true);
  });

  it('should add spartacus with PWA via passed parameter', async () => {
    await schematicRunner
      .runSchematicAsync(
        'ng-add',
        { ...defaultOptions, name: 'schematics-test', pwa: true },
        appTree
      )
      .toPromise();

    // Verify that we registered task for installing and running @angular/pwa schematics
    const { tasks } = schematicRunner;
    // We have 2 node-package install tasks registered
    // Order matters. First install needs to be executed and then angular-pwa schematics
    expect(tasks[1].name).toEqual('node-package');
    expect((tasks[1].options as any).command).toEqual('install');
    expect(tasks[2].name).toEqual('run-schematic');
    expect((tasks[2].options as any).name).toEqual(
      'run-angular-pwa-schematics'
    );

    // Run @angular/pwa schematics as it was registered as future task
    const tree = await schematicRunner
      .runSchematicAsync('run-angular-pwa-schematics', defaultOptions, appTree)
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
      expect(packageJSON.dependencies[NGUNIVERSAL_EXPRESS_ENGINE]).toBeTruthy();
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
