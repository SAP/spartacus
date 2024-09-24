/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  generateDefaultWorkspace,
  SMARTEDIT_FEATURE_NAME,
  smartEditFeatureModulePath,
  SPARTACUS_SCHEMATICS,
  SPARTACUS_SMARTEDIT,
  SpartacusSmartEditOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus SmartEdit schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SMARTEDIT,
    collectionPath
  );

  let appTree: UnitTestTree;

  const libraryNoFeaturesOptions: SpartacusSmartEditOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const smarteditFeatureOptions: SpartacusSmartEditOptions = {
    ...libraryNoFeaturesOptions,
    features: [SMARTEDIT_FEATURE_NAME],
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
      expect(appTree.exists(smartEditFeatureModulePath)).toBeFalsy();
    });

    it('should install necessary Spartacus libraries', () => {
      const packageJson = JSON.parse(appTree.readContent('package.json'));
      let dependencies: Record<string, string> = {};
      dependencies = { ...packageJson.dependencies };
      dependencies = { ...dependencies, ...packageJson.devDependencies };

      for (const toAdd in peerDependencies) {
        // skip the SPARTACUS_SCHEMATICS, as those are added only when running by the Angular CLI, and not in the testing environment
        if (
          !peerDependencies.hasOwnProperty(toAdd) ||
          toAdd === SPARTACUS_SCHEMATICS
        ) {
          continue;
        }
        // TODO: after 4.0: use this test, as we'll have synced versions between lib's and root package.json
        // const expectedVersion = (peerDependencies as Record<
        //   string,
        //   string
        // >)[toAdd];
        const expectedDependency = dependencies[toAdd];
        expect(expectedDependency).toBeTruthy();
        // expect(expectedDependency).toEqual(expectedVersion);
      }
    });
  });

  describe('SmartEdit feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          smarteditFeatureOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(smartEditFeatureModulePath);
        expect(module).toMatchSnapshot();
      });

      describe('assets', () => {
        it('should update angular.json', async () => {
          const content = appTree.readContent('/angular.json');
          expect(content).toMatchSnapshot();
        });
      });
    });

    describe('eager loading', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...smarteditFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(smartEditFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });

    describe('with storefrontPreviewRoute config', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...smarteditFeatureOptions,
            storefrontPreviewRoute: 'cx-preview',
          },
          appTree
        );
      });

      it('should configure the storefrontPreviewRoute', async () => {
        const module = appTree.readContent(smartEditFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });

    describe('with allowOrigin config', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...smarteditFeatureOptions,
            allowOrigin: 'localhost:9002',
          },
          appTree
        );
      });

      it('should configure the allowOrigin', async () => {
        const module = appTree.readContent(smartEditFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });
});
