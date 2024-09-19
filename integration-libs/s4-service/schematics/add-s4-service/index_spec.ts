/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  CHECKOUT_B2B_FEATURE_NAME,
  CHECKOUT_BASE_FEATURE_NAME,
  checkoutWrapperModulePath,
  generateDefaultWorkspace,
  LibraryOptions as SpartacusS4ServiceOptions,
  ORDER_FEATURE_NAME,
  orderWrapperModulePath,
  S4_SERVICE_FEATURE_NAME,
  s4ServiceFeatureModulePath,
  SPARTACUS_CHECKOUT_B2B,
  SPARTACUS_CHECKOUT_BASE,
  SPARTACUS_ORDER,
  SPARTACUS_S4_SERVICE,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus S/4HANA Service Integration (S4-Service) Schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_S4_SERVICE,
    collectionPath
  );
  let appTree: UnitTestTree;

  const libraryNoFeaturesOptions: SpartacusS4ServiceOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };
  const checkoutFeatureOptions: SpartacusS4ServiceOptions = {
    ...libraryNoFeaturesOptions,
    features: [CHECKOUT_BASE_FEATURE_NAME],
  };
  const checkoutB2BFeatureOptions: SpartacusS4ServiceOptions = {
    ...libraryNoFeaturesOptions,
    features: [CHECKOUT_B2B_FEATURE_NAME],
  };
  const orderFeatureOptions: SpartacusS4ServiceOptions = {
    ...libraryNoFeaturesOptions,
    features: [ORDER_FEATURE_NAME],
  };
  const s4ServiceFeatureOptions: SpartacusS4ServiceOptions = {
    ...libraryNoFeaturesOptions,
    features: [S4_SERVICE_FEATURE_NAME],
  };

  async function generateWorkspace() {
    schematicRunner.registerCollection(
      SPARTACUS_CHECKOUT_BASE,
      path.join(
        __dirname,
        '../../../../feature-libs/checkout/schematics/collection.json'
      )
    );
    schematicRunner.registerCollection(
      SPARTACUS_CHECKOUT_B2B,
      path.join(
        __dirname,
        '../../../../feature-libs/checkout/schematics/collection.json'
      )
    );
    schematicRunner.registerCollection(
      SPARTACUS_ORDER,
      path.join(
        __dirname,
        '../../../../feature-libs/order/schematics/collection.json'
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
      expect(appTree.exists(s4ServiceFeatureModulePath)).toBeFalsy();
    });
  });
  describe('S4-Service feature', () => {
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
          checkoutB2BFeatureOptions,
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          orderFeatureOptions,
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          s4ServiceFeatureOptions,
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
        const module = appTree.readContent(s4ServiceFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
      it('should install the appropriate dependencies', async () => {
        const orderWrapperModule = appTree.readContent(orderWrapperModulePath);
        expect(orderWrapperModule).toMatchSnapshot();
        const checkoutWrapperModule = appTree.readContent(
          checkoutWrapperModulePath
        );
        expect(checkoutWrapperModule).toMatchSnapshot();
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
          { ...checkoutB2BFeatureOptions, lazy: false },
          appTree
        );
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...orderFeatureOptions, lazy: false },
          appTree
        );

        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...s4ServiceFeatureOptions, lazy: false },
          appTree
        );
      });
      it('should import appropriate modules', async () => {
        const module = appTree.readContent(s4ServiceFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });
});
