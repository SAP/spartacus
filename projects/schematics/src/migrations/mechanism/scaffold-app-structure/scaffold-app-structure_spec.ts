/// <reference types="jest" />

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
import { Schema as SpartacusOptions } from '../../../add-spartacus/schema';
import { SPARTACUS_SCHEMATICS } from '../../../shared/constants';
import { scaffoldAppStructure } from './scaffold-app-structure';

const collectionPath = path.join(__dirname, '../../../collection.json');
const featuresModulePath = 'src/app/spartacus/spartacus-features.module.ts';
const configurationModulePath =
  'src/app/spartacus/spartacus-configuration.module.ts';
const spartacusModulePath = 'src/app/spartacus/spartacus.module.ts';

describe('scaffold app structure', () => {
  let appTree: UnitTestTree;
  let schematicRunner: SchematicTestRunner;

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

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  beforeEach(async () => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../../test/migrations-test.json')
    );
    schematicRunner.registerCollection(SPARTACUS_SCHEMATICS, collectionPath);

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

  describe('When the new app structure does NOT exist', () => {
    it('should create it', async () => {
      const resultTree = await schematicRunner
        .callRule(scaffoldAppStructure, appTree)
        .toPromise();

      expect(resultTree.read(featuresModulePath)?.toString()).toMatchSnapshot();
      expect(
        resultTree.read(configurationModulePath)?.toString()
      ).toMatchSnapshot();
      expect(
        resultTree.read(spartacusModulePath)?.toString()
      ).toMatchSnapshot();
    });
  });

  describe('When the new app structure is already in place', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runExternalSchematicAsync(
          SPARTACUS_SCHEMATICS,
          'ng-add',
          { ...spartacusDefaultOptions, name: 'schematics-test' },
          appTree
        )
        .toPromise();
    });

    it('should not touch it', async () => {
      const resultTree = await schematicRunner
        .callRule(scaffoldAppStructure, appTree)
        .toPromise();

      expect(resultTree.read(featuresModulePath)?.toString()).toMatchSnapshot();
      expect(
        resultTree.read(configurationModulePath)?.toString()
      ).toMatchSnapshot();
      expect(
        resultTree.read(spartacusModulePath)?.toString()
      ).toMatchSnapshot();
    });
  });
});
