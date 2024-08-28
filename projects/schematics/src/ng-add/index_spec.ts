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
import { ANGULAR_SSR, UTF_8 } from '../shared/constants';
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';
import { getPathResultsForFile } from '../shared/utils/file-utils';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );

  let appTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
    standalone: false,
  };

  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  beforeEach(async () => {
    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );

    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      appTree
    );
  });

  it('should add spartacus deps', async () => {
    const tree = await schematicRunner.runSchematic(
      'ng-add',
      { ...defaultOptions, name: 'schematics-test' },
      appTree
    );

    const packageJson = tree.readContent('/package.json');
    const packageObj = JSON.parse(packageJson);
    const depPackageList = Object.keys(packageObj.dependencies);
    expect(depPackageList.includes('@spartacus/core')).toBe(true);
    expect(depPackageList.includes('@spartacus/storefront')).toBe(true);
    expect(depPackageList.includes('@spartacus/styles')).toBe(true);
  });

  it('should add spartacus with SSR via passed parameter', async () => {
    const tree = await schematicRunner.runSchematic(
      'ng-add',
      { ...defaultOptions, name: 'schematics-test', ssr: true },
      appTree
    );

    const packageJsonBuffer = tree.read('/package.json');
    expect(packageJsonBuffer).toBeTruthy();
    const appServerModulePath = getPathResultsForFile(
      tree,
      'app.module.server.ts',
      '/src'
    )[0];
    const appServerModuleBuffer = tree.read(appServerModulePath);
    expect(appServerModuleBuffer).toBeTruthy();
    const serverBuffer = tree.read('server.ts');
    expect(serverBuffer).toBeTruthy();

    if (packageJsonBuffer) {
      const packageJSON = JSON.parse(packageJsonBuffer.toString(UTF_8));
      expect(packageJSON.dependencies[ANGULAR_SSR]).toBeTruthy();
      expect(packageJSON.dependencies['@angular/platform-server']).toBeTruthy();
    }
  });

  it('should add spartacus properly with SSR', async () => {
    const tree = await schematicRunner.runSchematic(
      'ng-add',
      {
        ...defaultOptions,
        name: 'schematics-test',
        ssr: true,
      },
      appTree
    );

    const appModule = tree.readContent('src/app/app.module.ts');
    expect(appModule).toMatchSnapshot();

    const packageJson = tree.readContent('/package.json');
    expect(packageJson).toMatchSnapshot();

    const appServerModule = tree.readContent('src/app/app.module.server.ts');
    expect(appServerModule).toMatchSnapshot();
  });
});
