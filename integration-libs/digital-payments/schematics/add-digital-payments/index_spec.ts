/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  cartBaseFeatureModulePath,
  CHECKOUT_BASE_FEATURE_NAME,
  checkoutWrapperModulePath,
  DIGITAL_PAYMENTS_FEATURE_NAME,
  digitalPaymentsFeatureModulePath,
  generateDefaultWorkspace,
  LibraryOptions as SpartacusDigitalPaymentsOptions,
  orderFeatureModulePath,
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
      expect(appTree.exists(digitalPaymentsFeatureModulePath)).toBeFalsy();
    });
  });

  describe('Digital-Payments feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateWorkspace();
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          checkoutFeatureOptions,
          appTree
        );

        appTree = await schematicRunner.runSchematic(
          'ng-add',
          digitalPaymentsFeatureOptions,
          appTree
        );
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
      beforeAll(async () => {
        appTree = await generateWorkspace();
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...checkoutFeatureOptions, lazy: false },
          appTree
        );

        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...digitalPaymentsFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(digitalPaymentsFeatureModulePath);
        expect(module).toMatchSnapshot();

        expect(appTree.readContent(checkoutWrapperModulePath)).toBeFalsy();
      });
    });
  });
});
