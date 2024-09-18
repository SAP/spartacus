/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  generateDefaultWorkspace,
  LibraryOptions as OmfOptions,
  OMF_FEATURE_NAME,
  omfFeatureModulePath,
  ORDER_FEATURE_NAME,
  orderFeatureModulePath,
  orderWrapperModulePath,
  SPARTACUS_OMF,
  SPARTACUS_ORDER,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus OMF Schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_OMF,
    collectionPath
  );

  let appTree: UnitTestTree;

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

  async function generateWorkspace() {
    schematicRunner.registerCollection(
      SPARTACUS_ORDER,
      path.join(
        __dirname,
        '../../../../feature-libs/order/schematics/collection.json'
      )
    );
    return (appTree = await generateDefaultWorkspace(schematicRunner, appTree));
  }

  describe('Without features', () => {
    beforeAll(async () => {
      appTree = await generateWorkspace();
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
      beforeAll(async () => {
        appTree = await generateWorkspace();
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
      beforeAll(async () => {
        appTree = await generateWorkspace();
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
