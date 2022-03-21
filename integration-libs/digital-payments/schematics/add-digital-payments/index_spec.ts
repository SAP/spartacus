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
  CLI_DIGITAL_PAYMENTS_FEATURE,
  LibraryOptions as SpartacusDigitalPaymentsOptions,
  SpartacusOptions,
  SPARTACUS_CHECKOUT,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const featureModulePath =
  'src/app/spartacus/features/digital-payments/digital-payments-feature.module.ts';
const userModulePath = 'src/app/spartacus/features/user/user-feature.module.ts';
const cartModulePath =
  'src/app/spartacus/features/cart/cart-base-feature.module.ts';
const orderModulePath =
  'src/app/spartacus/features/order/order-feature.module.ts';
const checkoutModulePath =
  'src/app/spartacus/features/checkout/checkout-feature.module.ts';

describe('Spartacus Digital-Payments schematics: ng-add', () => {
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
    lazy: true,
    features: [],
  };

  const libraryNoFeaturesOptions: SpartacusDigitalPaymentsOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const digitalPaymentsFeatureOptions: SpartacusDigitalPaymentsOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_DIGITAL_PAYMENTS_FEATURE],
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
      expect(appTree.exists(featureModulePath)).toBeFalsy();
    });
  });

  describe('Digital-Payments feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', digitalPaymentsFeatureOptions, appTree)
          .toPromise();
      });

      it('should install the required feature dependencies', async () => {
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

      it('should install the required feature dependencies', async () => {
        const userFeatureModule = appTree.readContent(userModulePath);
        expect(userFeatureModule).toMatchSnapshot();

        const cartFeatureModule = appTree.readContent(cartModulePath);
        expect(cartFeatureModule).toMatchSnapshot();

        const orderFeatureModule = appTree.readContent(orderModulePath);
        expect(orderFeatureModule).toMatchSnapshot();

        const checkoutFeatureModule = appTree.readContent(checkoutModulePath);
        expect(checkoutFeatureModule).toMatchSnapshot();
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(featureModulePath);
        expect(module).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...digitalPaymentsFeatureOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(featureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });
});
