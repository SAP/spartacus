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
  CART_BASE_FEATURE_NAME,
  ESTIMATED_DELIVERY_DATE_FEATURE_NAME,
  SPARTACUS_CART_BASE,
  SPARTACUS_ESTIMATED_DELIVERY_DATE,
  SPARTACUS_SCHEMATICS,
  LibraryOptions as SpartacusEddOptions,
  SpartacusOptions,
  cartBaseWrapperModulePath,
  estimatedDeliveryDateFeatureModulePath,
  orderFeatureModulePath,
  userFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const scssFilePath = 'src/styles/spartacus/estimated-delivery-date.scss';

describe('Spartacus Estimated-Delivery-Date schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_ESTIMATED_DELIVERY_DATE,
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

  const libraryNoFeaturesOptions: SpartacusEddOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const cartBaseFeatureOptions: SpartacusEddOptions = {
    ...libraryNoFeaturesOptions,
    features: [CART_BASE_FEATURE_NAME],
  };

  const estimatedDeliveryDateFeatureOptions: SpartacusEddOptions = {
    ...libraryNoFeaturesOptions,
    features: [ESTIMATED_DELIVERY_DATE_FEATURE_NAME],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
      '../../projects/schematics/src/collection.json'
    );
    schematicRunner.registerCollection(
      SPARTACUS_CART_BASE,
      '../feature-libs/cart/schematics/collection.json'
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
        appTree.exists(estimatedDeliveryDateFeatureModulePath)
      ).toBeFalsy();
    });
  });

  describe('Estimated-Delivery-Date feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          cartBaseFeatureOptions,
          appTree
        );

        appTree = await schematicRunner.runSchematic(
          'ng-add',
          estimatedDeliveryDateFeatureOptions,
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

        const orderFeatureModule = appTree.readContent(orderFeatureModulePath);
        expect(orderFeatureModule).toBeFalsy();
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(
          estimatedDeliveryDateFeatureModulePath
        );
        expect(module).toMatchSnapshot();

        const wrapperModule = appTree.readContent(cartBaseWrapperModulePath);
        expect(wrapperModule).toMatchSnapshot();
      });

      describe('styling', () => {
        it('should create a proper scss file', () => {
          const scssContent = appTree.readContent(scssFilePath);
          expect(scssContent).toMatchSnapshot();
        });

        it('should update angular.json', async () => {
          const content = appTree.readContent('/angular.json');
          expect(content).toMatchSnapshot();
        });
      });
    });
  });

  describe('eager loading', () => {
    beforeEach(async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        { ...cartBaseFeatureOptions, lazy: false },
        appTree
      );

      appTree = await schematicRunner.runSchematic(
        'ng-add',
        { ...estimatedDeliveryDateFeatureOptions, lazy: false },
        appTree
      );
    });

    it('should import appropriate modules', async () => {
      const module = appTree.readContent(
        estimatedDeliveryDateFeatureModulePath
      );
      expect(module).toMatchSnapshot();

      expect(appTree.readContent(cartBaseWrapperModulePath)).toBeFalsy();
    });
  });
});
