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
import {
  OMF_FEATURE_NAME,
  SPARTACUS_SCHEMATICS,
  SPARTACUS_OMF,
  LibraryOptions as OmfOptions,
  SpartacusOptions,
  omfFeatureModulePath,
  ORDER_FEATURE_NAME,
  orderWrapperModulePath,
  SPARTACUS_ORDER,
  orderFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');

xdescribe('Spartacus OMF Schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_OMF,
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
    routing: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
    standalone: false,
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const libraryNoFeaturesOptions: OmfOptions = {
    project: 'schematics-test',
    lazy: false,
    features: [],
  };

  const orderFeatureOptions: OmfOptions = {
    ...libraryNoFeaturesOptions,
    features: [ORDER_FEATURE_NAME],
  };

  const omfFeatureOptions: OmfOptions = {
    ...libraryNoFeaturesOptions,
    features: [OMF_FEATURE_NAME],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
      path.join(
        __dirname,
        '../../../../projects/schematics/src/collection.json'
      )
    );
    schematicRunner.registerCollection(
      SPARTACUS_ORDER,
      path.join(
        __dirname,
        '../../../../feature-libs/order/schematics/collection.json'
      )
    );
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

    appTree = await schematicRunner.runExternalSchematic(
      SPARTACUS_SCHEMATICS,
      'ng-add',
      { ...spartacusDefaultOptions, name: 'schematics-test' },
      appTree
    );
  });

  describe('Without features', () => {
    beforeEach(async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        libraryNoFeaturesOptions,
        appTree
      );
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(omfFeatureModulePath)).toBeFalsy();
    });
  });

  describe('OMF feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          orderFeatureOptions,
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          omfFeatureOptions,
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          omfFeatureOptions,
          appTree
        );
      });

      it('should install necessary Spartacus libraries', () => {
        const packageJson = JSON.parse(appTree.readContent('package.json'));
        let dependencies: Record<string, string> = {};
        dependencies = { ...packageJson.dependencies };
        dependencies = { ...dependencies, ...packageJson.devDependencies };

        for (const toAdd in peerDependencies) {
          if (
            !peerDependencies.hasOwnProperty(toAdd) ||
            toAdd === SPARTACUS_SCHEMATICS
          ) {
            continue;
          }
          const expectedDependency = dependencies[toAdd];
          expect(expectedDependency).toBeTruthy();
        }
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(omfFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
      it('should install the appropriate dependencies', async () => {
        const orderWrapperModule = appTree.readContent(orderWrapperModulePath);
        expect(orderWrapperModule).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...orderFeatureOptions, lazy: false },
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...omfFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(omfFeatureModulePath);
        expect(module).toMatchSnapshot();
        expect(appTree.readContent(orderFeatureModulePath)).toBeTruthy();
      });
    });
  });
});
