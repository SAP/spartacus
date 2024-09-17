/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  generateDefaultWorkspace,
  LibraryOptions as OppsOptions,
  OPPS_FEATURE_NAME,
  oppsFeatureModulePath,
  SPARTACUS_OPPS,
  SPARTACUS_SCHEMATICS,
  TRACKING_PERSONALIZATION_FEATURE_NAME,
  trackingPersonalizationFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Opps Schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_OPPS,
    collectionPath
  );

  let appTree: UnitTestTree;

  const libraryNoFeaturesOptions: OppsOptions = {
    project: 'schematics-test',
    lazy: false,
    features: [],
  };

  const oppsFeatureOptions: OppsOptions = {
    ...libraryNoFeaturesOptions,
    features: [OPPS_FEATURE_NAME],
  };

  describe('Without features', () => {
    beforeAll(async () => {
      appTree = await generateDefaultWorkspace(schematicRunner, appTree);
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        libraryNoFeaturesOptions,
        appTree
      );
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(oppsFeatureModulePath)).toBeFalsy();
    });
  });

  describe('opps feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...oppsFeatureOptions,
            features: [TRACKING_PERSONALIZATION_FEATURE_NAME],
          },
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          oppsFeatureOptions,
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
        const module = appTree.readContent(oppsFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...oppsFeatureOptions,
            features: [TRACKING_PERSONALIZATION_FEATURE_NAME],
          },
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...oppsFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(oppsFeatureModulePath);
        expect(module).toMatchSnapshot();
        expect(
          appTree.readContent(trackingPersonalizationFeatureModulePath)
        ).toBeTruthy();
      });
    });
  });
});
