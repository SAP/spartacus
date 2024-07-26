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
  PRODUCT_BULK_PRICING_FEATURE_NAME,
  PRODUCT_FUTURE_STOCK_FEATURE_NAME,
  PRODUCT_IMAGE_ZOOM_FEATURE_NAME,
  PRODUCT_VARIANTS_FEATURE_NAME,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_PRODUCT,
  SPARTACUS_SCHEMATICS,
  SpartacusOptions,
  LibraryOptions as SpartacusProductOptions,
  productBulkPricingFeatureModulePath,
  productFutureStockFeatureModulePath,
  productImageZoomFeatureModulePath,
  productVariantsFeatureModulePath,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const scssFilePath = 'src/styles/spartacus/product.scss';

describe('Spartacus Product schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_PRODUCT,
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

  const libraryNoFeaturesOptions: SpartacusProductOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const bulkPricingOptions: SpartacusProductOptions = {
    ...libraryNoFeaturesOptions,
    features: [PRODUCT_BULK_PRICING_FEATURE_NAME],
  };

  const variantsOptions: SpartacusProductOptions = {
    ...libraryNoFeaturesOptions,
    features: [PRODUCT_VARIANTS_FEATURE_NAME],
  };

  const imageZoomOptions: SpartacusProductOptions = {
    ...libraryNoFeaturesOptions,
    features: [PRODUCT_IMAGE_ZOOM_FEATURE_NAME],
  };

  const futureStockOptions: SpartacusProductOptions = {
    ...libraryNoFeaturesOptions,
    features: [PRODUCT_FUTURE_STOCK_FEATURE_NAME],
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
      expect(appTree.exists(productBulkPricingFeatureModulePath)).toBeFalsy();
      expect(appTree.exists(productVariantsFeatureModulePath)).toBeFalsy();
      expect(appTree.exists(productImageZoomFeatureModulePath)).toBeFalsy();
      expect(appTree.exists(productFutureStockFeatureModulePath)).toBeFalsy();
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

  describe('BulkPricing feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          bulkPricingOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(productBulkPricingFeatureModulePath);
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

      describe('b2b features', () => {
        it('configuration should be added', () => {
          const configurationModule = appTree.readContent(
            `src/app/spartacus/${SPARTACUS_CONFIGURATION_MODULE}.module.ts`
          );
          expect(configurationModule).toMatchSnapshot();
        });
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...bulkPricingOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(productBulkPricingFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('Variants feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          variantsOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(productVariantsFeatureModulePath);
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
          { ...variantsOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(productVariantsFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('ImageZoom feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          imageZoomOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(productImageZoomFeatureModulePath);
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
          { ...imageZoomOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(productImageZoomFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('FutureStock feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          futureStockOptions,
          appTree
        );
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(productFutureStockFeatureModulePath);
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

      describe('b2b features', () => {
        it('configuration should be added', () => {
          const configurationModule = appTree.readContent(
            `src/app/spartacus/${SPARTACUS_CONFIGURATION_MODULE}.module.ts`
          );
          expect(configurationModule).toMatchSnapshot();
        });
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner.runSchematic(
          'ng-add',
          { ...futureStockOptions, lazy: false },
          appTree
        );
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(productFutureStockFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });
});
