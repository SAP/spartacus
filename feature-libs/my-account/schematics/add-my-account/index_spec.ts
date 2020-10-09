import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema as SpartacusMyAccountOptions } from '../add-my-account/schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus My Account schematics: ng-add', () => {
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

  const defaultOptions: SpartacusMyAccountOptions = {
    project: 'schematics-test',
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      '@spartacus/schematics',
      '../../projects/schematics/src/collection.json'
    );
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
      .runExternalSchematicAsync(
        '@spartacus/schematics',
        'ng-add',
        { ...defaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();

    appTree = await schematicRunner
      .runSchematicAsync('ng-add', defaultOptions, appTree)
      .toPromise();
  });

  it('should add my-account deps', async () => {
    const packageJson = appTree.readContent('/package.json');
    const packageObj = JSON.parse(packageJson);
    const depPackageList = Object.keys(packageObj.dependencies);
    expect(depPackageList.includes('@spartacus/my-account')).toBe(true);
    expect(depPackageList.includes('@spartacus/setup')).toBe(true);
  });

  // TODO: use from `@spartacus/schematics`
  const UTF_8 = 'utf-8';
  describe('styling', () => {
    it('should add style import to /src/assets/styles/my-account.scss', async () => {
      const buffer = appTree.read('/src/assets/styles/my-account.scss');
      expect(buffer).toBeTruthy();
      const content = buffer?.toString(UTF_8);
      expect(content).toEqual(`@import "@spartacus/my-account";`);
    });

    it('should add update angular.json with my-account.scss', async () => {
      const buffer = appTree.read('/angular.json');
      expect(buffer).toBeTruthy();
      if (!buffer) {
        throw new Error('angular.json missing?');
      }

      const angularJson = JSON.parse(buffer.toString(UTF_8));
      const buildStyles: string[] =
        angularJson.projects['schematics-test'].architect.build.options.styles;
      expect(buildStyles).toEqual([
        'src/styles.scss',
        'src/assets/styles/my-account.scss',
      ]);

      const testStyles: string[] =
        angularJson.projects['schematics-test'].architect.test.options.styles;
      expect(testStyles).toEqual([
        'src/styles.scss',
        'src/assets/styles/my-account.scss',
      ]);
    });
  });
});
