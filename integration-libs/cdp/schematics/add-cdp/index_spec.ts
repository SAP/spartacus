/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  CDP_FEATURE_NAME,
  cdpFeatureModulePath,
  CUSTOMER_TICKETING_FEATURE_NAME,
  customerTicketingFeatureModulePath,
  customerTicketingWrapperModulePath,
  LibraryOptions as CdpOptions,
  SPARTACUS_CDP,
  SPARTACUS_SCHEMATICS,
  generateDefaultWorkspace,
} from '@spartacus/schematics';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus CDP schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_CDP,
    collectionPath
  );

  let appTree: UnitTestTree;

  const libraryNoFeaturesOptions: CdpOptions = {
    project: 'schematics-test',
    lazy: false,
    features: [],
  };

  const cdpFeatureOptions: CdpOptions = {
    ...libraryNoFeaturesOptions,
    features: [CDP_FEATURE_NAME],
  };

  describe('Without CDP features', () => {
    beforeAll(async () => {
      appTree = await generateDefaultWorkspace(schematicRunner, appTree);
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        libraryNoFeaturesOptions,
        appTree
      );
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(cdpFeatureModulePath)).toBeFalsy();
    });
  });

  describe('With CDP feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...cdpFeatureOptions,
            features: [CUSTOMER_TICKETING_FEATURE_NAME],
          },
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          cdpFeatureOptions,
          appTree
        );
      });

      it('should install necessary Spartacus libraries', () => {
        const packageJson = JSON.parse(appTree.readContent('package.json'));
        let dependencies: Record<string, string> = {};
        dependencies = { ...packageJson.dependencies };
        dependencies = { ...dependencies, ...packageJson.devDependencies };

        for (const toAdd in dependencies) {
          if (
            !dependencies.hasOwnProperty(toAdd) ||
            toAdd === SPARTACUS_SCHEMATICS
          ) {
            continue;
          }
          const expectedVersion = (dependencies as Record<string, string>)[
            toAdd
          ];
          const expectedDependency = dependencies[toAdd];
          expect(expectedDependency).toBeTruthy();
          expect(expectedDependency).toEqual(expectedVersion);
        }
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(cdpFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
      it('should install the appropriate dependencies', async () => {
        const customerTicketingWrapperModule = appTree.readContent(
          customerTicketingWrapperModulePath
        );
        expect(customerTicketingWrapperModule).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...cdpFeatureOptions,
            features: [CUSTOMER_TICKETING_FEATURE_NAME],
          },
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...cdpFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(cdpFeatureModulePath);
        expect(module).toMatchSnapshot();
        expect(
          appTree.readContent(customerTicketingFeatureModulePath)
        ).toBeTruthy();
      });
    });
  });
});
