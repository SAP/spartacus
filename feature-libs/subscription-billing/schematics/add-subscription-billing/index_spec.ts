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
  SPARTACUS_SUBSCRIPTION_BILLING,
  SUBSCRIPTION_BILLING_FEATURE_NAME,
  SpartacusOptions,
  LibraryOptions as SpartacusSubscriptionBillingOptions,
  subscriptionBillingFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Subscription Billing Schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SUBSCRIPTION_BILLING,
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
  const libraryNoFeaturesOptions: SpartacusSubscriptionBillingOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };
  const subscriptionBillingFeatureOptions: SpartacusSubscriptionBillingOptions =
    {
      ...libraryNoFeaturesOptions,
      features: [SUBSCRIPTION_BILLING_FEATURE_NAME],
    };
  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
      path.join(
        __dirname,
        '../../../../projects/schematics/src/collection.json'
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
      expect(appTree.exists(subscriptionBillingFeatureModulePath)).toBeFalsy();
    });
  });
  describe('Subscription Billing feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          subscriptionBillingFeatureOptions,
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
        const module = appTree.readContent(
          subscriptionBillingFeatureModulePath
        );
        expect(module).toMatchSnapshot();
      });
      it('should install the appropriate dependencies', async () => {});
    });
    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...subscriptionBillingFeatureOptions, lazy: false },
          appTree
        );
      });
      it('should import appropriate modules', async () => {
        const module = appTree.readContent(
          subscriptionBillingFeatureModulePath
        );
        expect(module).toMatchSnapshot();
      });
    });
  });
});
