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
  SPARTACUS_SCHEMATICS,
  SPARTACUS_TRACKING,
  SpartacusOptions,
  LibraryOptions as SpartacusTrackingOptions,
  TRACKING_PERSONALIZATION_FEATURE_NAME,
  TRACKING_TMS_AEP_FEATURE_NAME,
  TRACKING_TMS_GTM_FEATURE_NAME,
  trackingPersonalizationFeatureModulePath,
  trackingTagManagementFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Tracking schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_TRACKING,
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

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const libraryNoFeaturesOptions: SpartacusTrackingOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const personalizationFeatureOptions: SpartacusTrackingOptions = {
    ...libraryNoFeaturesOptions,
    features: [TRACKING_PERSONALIZATION_FEATURE_NAME],
  };

  const gtmFeatureOptions: SpartacusTrackingOptions = {
    ...libraryNoFeaturesOptions,
    features: [TRACKING_TMS_GTM_FEATURE_NAME],
  };

  const aepFeatureOptions: SpartacusTrackingOptions = {
    ...libraryNoFeaturesOptions,
    features: [TRACKING_TMS_AEP_FEATURE_NAME],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
      '../../projects/schematics/src/collection.json'
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
      expect(
        appTree.exists(trackingPersonalizationFeatureModulePath)
      ).toBeFalsy();
      expect(
        appTree.exists(trackingTagManagementFeatureModulePath)
      ).toBeFalsy();
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

  describe('Personalization feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          personalizationFeatureOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const personalizationModule = appTree.readContent(
          trackingPersonalizationFeatureModulePath
        );
        expect(personalizationModule).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...personalizationFeatureOptions,
            lazy: false,
          },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(
          trackingPersonalizationFeatureModulePath
        );
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('Tag Management feature', () => {
    describe('GTM', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          gtmFeatureOptions,
          appTree
        );
      });
      describe('general setup', () => {
        it('should import appropriate modules (without lazy loaded syntax)', async () => {
          const tagManagementModule = appTree.readContent(
            trackingTagManagementFeatureModulePath
          );
          expect(tagManagementModule).toMatchSnapshot();
        });
      });
    });

    describe('AEP', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          aepFeatureOptions,
          appTree
        );
      });

      describe('general setup', () => {
        it('should import appropriate modules (without lazy loaded syntax)', async () => {
          const tagManagementModule = appTree.readContent(
            trackingTagManagementFeatureModulePath
          );
          expect(tagManagementModule).toMatchSnapshot();
        });
      });
    });

    describe('GTM and AEP', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...libraryNoFeaturesOptions,
            features: [
              TRACKING_TMS_GTM_FEATURE_NAME,
              TRACKING_TMS_AEP_FEATURE_NAME,
            ],
          },
          appTree
        );
      });

      describe('general setup', () => {
        it('should import appropriate modules (without lazy loaded syntax)', async () => {
          const tagManagementModule = appTree.readContent(
            trackingTagManagementFeatureModulePath
          );
          expect(tagManagementModule).toMatchSnapshot();
        });
      });
    });
  });
});
