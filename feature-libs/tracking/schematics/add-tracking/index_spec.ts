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
  CLI_TRACKING_PERSONALIZATION_FEATURE,
  CLI_TRACKING_TMS_AEP_FEATURE,
  CLI_TRACKING_TMS_GTM_FEATURE,
  LibraryOptions as SpartacusTrackingOptions,
  SpartacusOptions,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const personalizationModulePath =
  'src/app/spartacus/features/tracking/personalization-feature.module.ts';
const tagManagementModulePath =
  'src/app/spartacus/features/tracking/tag-management-feature.module.ts';

describe('Spartacus Tracking schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

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
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    configuration: 'b2c',
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
    features: [CLI_TRACKING_PERSONALIZATION_FEATURE],
  };

  const gtmFeatureOptions: SpartacusTrackingOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_TRACKING_TMS_GTM_FEATURE],
  };

  const aepFeatureOptions: SpartacusTrackingOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_TRACKING_TMS_AEP_FEATURE],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
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
        SPARTACUS_SCHEMATICS,
        'ng-add',
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('Without features', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', libraryNoFeaturesOptions, appTree)
        .toPromise();
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(personalizationModulePath)).toBeFalsy();
      expect(appTree.exists(tagManagementModulePath)).toBeFalsy();
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
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', personalizationFeatureOptions, appTree)
          .toPromise();
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const personalizationModule = appTree.readContent(
          personalizationModulePath
        );
        expect(personalizationModule).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...personalizationFeatureOptions,
              lazy: false,
            },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(personalizationModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('Tag Management feature', () => {
    describe('GTM', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', gtmFeatureOptions, appTree)
          .toPromise();
      });
      describe('general setup', () => {
        it('should import appropriate modules (without lazy loaded syntax)', async () => {
          const tagManagementModule = appTree.readContent(
            tagManagementModulePath
          );
          expect(tagManagementModule).toMatchSnapshot();
        });
      });
    });

    describe('AEP', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', aepFeatureOptions, appTree)
          .toPromise();
      });

      describe('general setup', () => {
        it('should import appropriate modules (without lazy loaded syntax)', async () => {
          const tagManagementModule = appTree.readContent(
            tagManagementModulePath
          );
          expect(tagManagementModule).toMatchSnapshot();
        });
      });
    });

    describe('GTM and AEP', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            {
              ...libraryNoFeaturesOptions,
              features: [
                CLI_TRACKING_TMS_GTM_FEATURE,
                CLI_TRACKING_TMS_AEP_FEATURE,
              ],
            },
            appTree
          )
          .toPromise();
      });

      describe('general setup', () => {
        it('should import appropriate modules (without lazy loaded syntax)', async () => {
          const tagManagementModule = appTree.readContent(
            tagManagementModulePath
          );
          expect(tagManagementModule).toMatchSnapshot();
        });
      });
    });
  });
});
