/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  generateDefaultWorkspace,
  LibraryOptions as S4OMOptions,
  S4OM_FEATURE_NAME,
  SPARTACUS_CHECKOUT,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const featureModulePath =
  'src/app/spartacus/features/s4om/s4om-feature.module.ts';

describe('Spartacus S4OM schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const libraryNoFeaturesOptions: S4OMOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const s4omFeatureOptions: S4OMOptions = {
    ...libraryNoFeaturesOptions,
    features: [S4OM_FEATURE_NAME],
  };

  async function generateWorkspace() {
    schematicRunner.registerCollection(
      SPARTACUS_CHECKOUT,
      path.join(
        __dirname,
        '../../../../feature-libs/checkout/schematics/collection.json'
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
      expect(appTree.exists(featureModulePath)).toBeFalsy();
    });
  });

  describe('S4OM feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateWorkspace();
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          s4omFeatureOptions,
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
        const module = appTree.readContent(featureModulePath);
        expect(module).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeAll(async () => {
        appTree = await generateWorkspace();
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...s4omFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(featureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });
});
