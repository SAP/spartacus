/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  CART_BASE_FEATURE_NAME,
  CART_IMPORT_EXPORT_FEATURE_NAME,
  CART_QUICK_ORDER_FEATURE_NAME,
  CART_SAVED_CART_FEATURE_NAME,
  CART_WISHLIST_FEATURE_NAME,
  cartBaseFeatureModulePath,
  generateDefaultWorkspace,
  importExportFeatureModulePath,
  LibraryOptions as SpartacusCartOptions,
  quickOrderFeatureModulePath,
  savedCartFeatureModulePath,
  SPARTACUS_CART,
  SPARTACUS_SCHEMATICS,
  userFeatureModulePath,
  wishListFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const scssFilePath = 'src/styles/spartacus/cart.scss';

describe('Spartacus Cart schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_CART,
    collectionPath
  );

  let appTree: UnitTestTree;

  const libraryNoFeaturesOptions: SpartacusCartOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const savedCartFeatureOptions: SpartacusCartOptions = {
    ...libraryNoFeaturesOptions,
    features: [CART_SAVED_CART_FEATURE_NAME],
  };

  const cartBaseFeatureOptions: SpartacusCartOptions = {
    ...libraryNoFeaturesOptions,
    features: [CART_BASE_FEATURE_NAME],
  };

  const wishListFeatureOptions: SpartacusCartOptions = {
    ...libraryNoFeaturesOptions,
    features: [CART_WISHLIST_FEATURE_NAME],
  };

  const quickOrderFeatureOptions: SpartacusCartOptions = {
    ...libraryNoFeaturesOptions,
    features: [CART_QUICK_ORDER_FEATURE_NAME],
  };

  const cartImportExportFeatureOptions: SpartacusCartOptions = {
    ...libraryNoFeaturesOptions,
    features: [CART_IMPORT_EXPORT_FEATURE_NAME],
  };

  describe('Without features', () => {
    beforeAll(async () => {
      appTree = await generateDefaultWorkspace(schematicRunner, appTree);
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        { ...libraryNoFeaturesOptions, features: [] },
        appTree
      );
    });

    it('should not create any of the feature modules', () => {
      expect(appTree.exists(savedCartFeatureModulePath)).toBeFalsy();
      expect(appTree.exists(quickOrderFeatureModulePath)).toBeFalsy();
      expect(appTree.exists(importExportFeatureModulePath)).toBeFalsy();
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

  describe('Cart Base feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          cartBaseFeatureOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(cartBaseFeatureModulePath);
        expect(module).toMatchSnapshot();
      });

      it('should NOT install the required feature dependencies', async () => {
        const userFeatureModule = appTree.readContent(userFeatureModulePath);
        expect(userFeatureModule).toBeFalsy();
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

    describe('eager loading', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...cartBaseFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(cartBaseFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('Cart Import Export feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          cartImportExportFeatureOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(importExportFeatureModulePath);
        expect(module).toMatchSnapshot();
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

    describe('eager loading', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...cartImportExportFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(importExportFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('Quick Order feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          quickOrderFeatureOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(quickOrderFeatureModulePath);
        expect(module).toMatchSnapshot();
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

    describe('eager loading', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...quickOrderFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(quickOrderFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('Saved Cart feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          savedCartFeatureOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(savedCartFeatureModulePath);
        expect(module).toMatchSnapshot();
      });

      it('should NOT install the required feature dependencies', async () => {
        const baseCartFeatureModule = appTree.readContent(
          cartBaseFeatureModulePath
        );
        expect(baseCartFeatureModule).toBeFalsy();

        const userFeatureModule = appTree.readContent(userFeatureModulePath);
        expect(userFeatureModule).toBeFalsy();
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

    describe('eager loading', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...savedCartFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(savedCartFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('Wish List feature', () => {
    describe('general setup', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          wishListFeatureOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(wishListFeatureModulePath);
        expect(module).toMatchSnapshot();
      });

      it('should NOT install the required feature dependencies', async () => {
        const baseCartFeatureModule = appTree.readContent(
          cartBaseFeatureModulePath
        );
        expect(baseCartFeatureModule).toBeFalsy();

        const userFeatureModule = appTree.readContent(userFeatureModulePath);
        expect(userFeatureModule).toBeFalsy();
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

    describe('eager loading', () => {
      beforeAll(async () => {
        appTree = await generateDefaultWorkspace(schematicRunner, appTree);
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...wishListFeatureOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(wishListFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });
});
