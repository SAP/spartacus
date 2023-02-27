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
  cartBaseFeatureModulePath,
  checkoutWrapperModulePath,
  CHECKOUT_BASE_FEATURE_NAME,
  digitalPaymentsFeatureModulePath,
  DIGITAL_PAYMENTS_FEATURE_NAME,
  LibraryOptions as SpartacusDigitalPaymentsOptions,
  orderFeatureModulePath,
  SpartacusOptions,
  SPARTACUS_CHECKOUT,
  SPARTACUS_DIGITAL_PAYMENTS,
  SPARTACUS_SCHEMATICS,
  userFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Digital-Payments schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_DIGITAL_PAYMENTS,
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
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const libraryNoFeaturesOptions: SpartacusDigitalPaymentsOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const checkoutFeatureOptions: SpartacusDigitalPaymentsOptions = {
    ...libraryNoFeaturesOptions,
    features: [CHECKOUT_BASE_FEATURE_NAME],
  };

  const digitalPaymentsFeatureOptions: SpartacusDigitalPaymentsOptions = {
    ...libraryNoFeaturesOptions,
    features: [DIGITAL_PAYMENTS_FEATURE_NAME],
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
      SPARTACUS_CHECKOUT,
      path.join(
        __dirname,
        '../../../../feature-libs/checkout/schematics/collection.json'
      )
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
      expect(appTree.exists(digitalPaymentsFeatureModulePath)).toBeFalsy();
    });
  });

  describe('Digital-Payments feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', checkoutFeatureOptions, appTree)
          .toPromise();
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', digitalPaymentsFeatureOptions, appTree)
          .toPromise();
      });

      it('should install necessary Spartacus libraries', async () => {
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

      it('should NOT install the required feature dependencies', async () => {
        const userFeatureModule = appTree.readContent(userFeatureModulePath);
        expect(userFeatureModule).toBeFalsy();

        const cartFeatureModule = appTree.readContent(
          cartBaseFeatureModulePath
        );
        expect(cartFeatureModule).toBeFalsy();

        const orderFeatureModule = appTree.readContent(orderFeatureModulePath);
        expect(orderFeatureModule).toBeFalsy();
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(digitalPaymentsFeatureModulePath);
        expect(module).toMatchSnapshot();

        const wrapperModule = appTree.readContent(checkoutWrapperModulePath);
        expect(wrapperModule).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...checkoutFeatureOptions, lazy: false },
            appTree
          )
          .toPromise();
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...digitalPaymentsFeatureOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(digitalPaymentsFeatureModulePath);
        expect(module).toMatchSnapshot();

        expect(appTree.readContent(checkoutWrapperModulePath)).toBeFalsy();
      });
    });
  });
});
