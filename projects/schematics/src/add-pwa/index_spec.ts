import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';

const collectionPath = path.join(__dirname, '../collection.json');

// tslint:disable:max-line-length
describe('Spartacus Schematics: add-pwa', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: any = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '0.5.0',
  };

  const appOptions: any = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'scss',
    skipTests: false,
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

  it('Add PWA/ServiceWorker support for your project', async () => {
    await schematicRunner
      .runSchematicAsync('add-pwa', defaultOptions, appTree)
      .toPromise();

    // Verify that we registered task for installing and running @angular/pwa schematics
    const { tasks } = schematicRunner;
    // Order matters. First install needs to be executed and then angular-pwa schematics
    expect(tasks[0].name).toEqual('node-package');
    expect((tasks[0].options as any).command).toEqual('install');
    expect(tasks[1].name).toEqual('run-schematic');
    expect((tasks[1].options as any).name).toEqual(
      'run-angular-pwa-schematics'
    );

    // Run @angular/pwa schematics as it was registered as future task
    const tree = await schematicRunner
      .runSchematicAsync('run-angular-pwa-schematics', defaultOptions, appTree)
      .toPromise();

    const packageJson = tree.readContent('/package.json');
    const packageObj = JSON.parse(packageJson);
    const depPackageList = Object.keys(packageObj.dependencies);
    expect(depPackageList.includes('@angular/service-worker')).toBe(true);
    expect(
      tree.files.includes('/projects/schematics-test/src/manifest.webmanifest')
    ).toBe(true);
    expect(
      tree.files.includes(
        '/projects/schematics-test/src/assets/icons/icon-96x96.png'
      )
    ).toBe(true);
  });
});
