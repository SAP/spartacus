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
  CDS_FEATURE_NAME,
  SPARTACUS_CDS,
  SPARTACUS_SCHEMATICS,
  SpartacusCdsOptions,
  SpartacusOptions,
  cdsFeatureModulePath,
  trackingPersonalizationFeatureModulePath,
  userFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus CDS schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_CDS,
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

  const libraryNoFeaturesOptions: SpartacusCdsOptions = {
    project: 'schematics-test',
    features: [],
    lazy: true,
    tenant: 'my-tenant',
    baseUrl: 'my-base-url.com',
  };

  const cdsFeatureOptions: SpartacusCdsOptions = {
    ...libraryNoFeaturesOptions,
    features: [CDS_FEATURE_NAME],
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
      expect(appTree.exists(cdsFeatureModulePath)).toBeFalsy();
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

  describe('CDS feature', () => {
    describe('without Profile tag', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner.runSchematic(
            'ng-add',
            cdsFeatureOptions,
            appTree
          );
        });

        it('should create the feature module', async () => {
          const module = appTree.readContent(cdsFeatureModulePath);
          expect(module).toMatchSnapshot();
        });

        it('should NOT install the required feature dependencies', async () => {
          const userFeatureModule = appTree.readContent(userFeatureModulePath);
          expect(userFeatureModule).toBeFalsy();

          const trackingPersonalizationFeatureModule = appTree.readContent(
            trackingPersonalizationFeatureModulePath
          );
          expect(trackingPersonalizationFeatureModule).toBeFalsy();
        });
      });
    });

    describe('with Profile tag configured', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          {
            ...cdsFeatureOptions,
            profileTagConfigUrl: 'profile-tag-config-url.com',
            profileTagLoadUrl: 'profile-tag-load-url.com',
          },
          appTree
        );
      });

      describe('general setup', () => {
        it('should create the feature module', async () => {
          const module = appTree.readContent(cdsFeatureModulePath);
          expect(module).toMatchSnapshot();
        });

        it('should NOT install the required feature dependencies', async () => {
          const userFeatureModule = appTree.readContent(userFeatureModulePath);
          expect(userFeatureModule).toBeFalsy();

          const trackingPersonalizationFeatureModule = appTree.readContent(
            trackingPersonalizationFeatureModulePath
          );
          expect(trackingPersonalizationFeatureModule).toBeFalsy();
        });
      });
    });
  });
});
