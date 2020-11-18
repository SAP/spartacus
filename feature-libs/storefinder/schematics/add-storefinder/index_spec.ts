import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { SpartacusOptions } from '@spartacus/schematics';
import * as path from 'path';
import { Schema as SpartacusStorefinderOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');
// const appModulePath = 'src/app/app.module.ts';

describe('Spartacus Storefinder schematics: ng-add', () => {
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

  const defaultOptions: SpartacusStorefinderOptions = {
    project: 'schematics-test',
    lazy: true,
  };

  const spartacusDefaultOptions: SpartacusOptions = {
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
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('styling', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', defaultOptions, appTree)
        .toPromise();
    });

    it('should add style import to /src/styles/spartacus/organization.scss', async () => {
      const content = appTree.readContent(
        '/src/styles/spartacus/organization.scss'
      );
      expect(content).toEqual(`@import "@spartacus/organization";`);
    });
  });
});
