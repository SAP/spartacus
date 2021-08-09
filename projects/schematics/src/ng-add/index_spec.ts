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

describe('Spartacus Schematics: ng-add', () => {
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
  });

  it('should add spartacus deps', async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        'ng-add',
        { ...defaultOptions, name: 'schematics-test' },
        appTree
      )
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
});
