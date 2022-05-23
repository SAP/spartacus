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
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Schematics: add-pwa', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );
  schematicRunner.registerCollection(
    '@angular/pwa',
    '../../node_modules/@angular/pwa/collection.json'
  );

  let appTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Scss,
    skipTests: false,
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

  it('Add PWA/ServiceWorker support for your project', async () => {
    appTree = await schematicRunner
      .runSchematicAsync('add-pwa', defaultOptions, appTree)
      .toPromise();
    const packageJson = appTree.readContent('/package.json');
    const packageObj = JSON.parse(packageJson);
    const depPackageList = Object.keys(packageObj.dependencies);
    expect(depPackageList.includes('@angular/service-worker')).toBe(true);
    expect(
      appTree.files.includes(
        '/projects/schematics-test/src/manifest.webmanifest'
      )
    ).toBe(true);
    expect(
      appTree.files.includes(
        '/projects/schematics-test/src/assets/icons/icon-96x96.png'
      )
    ).toBe(true);
  });

  it('should remove the existing SW setup and add Spartacus PWA support', async () => {
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@angular/pwa',
        'ng-add',
        { project: 'schematics-test' },
        appTree
      )
      .toPromise();
    appTree = await schematicRunner
      .runSchematicAsync('add-pwa', defaultOptions, appTree)
      .toPromise();

    const packageJson = appTree.readContent('/package.json');
    const packageObj = JSON.parse(packageJson);
    const depPackageList = Object.keys(packageObj.dependencies);
    expect(depPackageList.includes('@angular/service-worker')).toBe(true);
    expect(
      appTree.files.includes(
        '/projects/schematics-test/src/manifest.webmanifest'
      )
    ).toBe(true);
    expect(
      appTree.files.includes(
        '/projects/schematics-test/src/assets/icons/icon-96x96.png'
      )
    ).toBe(true);
  });
});
