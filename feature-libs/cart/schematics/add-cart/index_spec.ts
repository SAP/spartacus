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
  CART_IMPORT_EXPORT_FEATURE_NAME,
  CART_QUICK_ORDER_FEATURE_NAME,
  CART_SAVED_CART_FEATURE_NAME,
  CART_WISHLIST_FEATURE_NAME,
  SPARTACUS_CART,
  SPARTACUS_SCHEMATICS,
  LibraryOptions as SpartacusCartOptions,
  SpartacusOptions,
  cartBaseFeatureModulePath,
  importExportFeatureModulePath,
  quickOrderFeatureModulePath,
  savedCartFeatureModulePath,
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
      beforeEach(async () => {
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
      beforeEach(async () => {
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
      beforeEach(async () => {
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
      beforeEach(async () => {
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
      beforeEach(async () => {
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
      beforeEach(async () => {
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
      beforeEach(async () => {
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
      beforeEach(async () => {
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
      beforeEach(async () => {
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
      beforeEach(async () => {
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
