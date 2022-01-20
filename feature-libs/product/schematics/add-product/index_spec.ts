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
  CLI_PRODUCT_BULK_PRICING_FEATURE,
  CLI_PRODUCT_IMAGE_ZOOM_FEATURE,
  CLI_PRODUCT_VARIANTS_FEATURE,
  LibraryOptions as SpartacusProductOptions,
  SpartacusOptions,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';

const collectionPath = path.join(__dirname, '../collection.json');
const bulkPricingModulePath =
  'src/app/spartacus/features/product/product-bulk-pricing-feature.module.ts';
const variantsFeatureModulePath =
  'src/app/spartacus/features/product/product-variants-feature.module.ts';
const imageZoomFeatureModulePath =
  'src/app/spartacus/features/product/product-image-zoom-feature.module.ts';
const scssFilePath = 'src/styles/spartacus/product.scss';

describe('Spartacus Product schematics: ng-add', () => {
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

  const libraryNoFeaturesOptions: SpartacusProductOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const bulkPricingOptions: SpartacusProductOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_PRODUCT_BULK_PRICING_FEATURE],
  };

  const variantsOptions: SpartacusProductOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_PRODUCT_VARIANTS_FEATURE],
  };

  const imageZoomOptions: SpartacusProductOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_PRODUCT_IMAGE_ZOOM_FEATURE],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
      '../../projects/schematics/src/collection.json'
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
      expect(appTree.exists(bulkPricingModulePath)).toBeFalsy();
      expect(appTree.exists(variantsFeatureModulePath)).toBeFalsy();
      expect(appTree.exists(imageZoomFeatureModulePath)).toBeFalsy();
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
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', bulkPricingOptions, appTree)
          .toPromise();
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(bulkPricingModulePath);
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
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...bulkPricingOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(bulkPricingModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('Variants feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', variantsOptions, appTree)
          .toPromise();
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(variantsFeatureModulePath);
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
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...variantsOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(variantsFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });

  describe('ImageZoom feature', () => {
    describe('general setup', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', imageZoomOptions, appTree)
          .toPromise();
      });

      it('should add the feature using the lazy loading syntax', async () => {
        const module = appTree.readContent(imageZoomFeatureModulePath);
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
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...imageZoomOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(imageZoomFeatureModulePath);
        expect(module).toMatchSnapshot();
      });
    });
  });
});
