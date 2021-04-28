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
  LibraryOptions as SpartacusProductOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import {
  CLI_BULK_PRICING_FEATURE,
  CLI_VARIANTS_FEATURE,
  SPARTACUS_BULK_PRICING_ROOT,
  SPARTACUS_VARIANTS_ROOT,
} from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const bulkPricingModulePath =
  'src/app/spartacus/features/product/bulk-pricing-feature.module.ts';
const variantsFeatureModulePath =
  'src/app/spartacus/features/product/product-variants-feature.module.ts';

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

  const defaultOptions: SpartacusProductOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_BULK_PRICING_FEATURE, CLI_VARIANTS_FEATURE],
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    configuration: 'b2c',
    lazy: true,
    features: [],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      '@spartacus/schematics',
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
        '@spartacus/schematics',
        'ng-add',
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('when no features are selected', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          { ...defaultOptions, features: [] },
          appTree
        )
        .toPromise();
    });

    it('should not install bulkPricing feature', () => {
      const bulkPricingModule = appTree.readContent(bulkPricingModulePath);
      expect(bulkPricingModule).not.toContain(SPARTACUS_BULK_PRICING_ROOT);
    });

    it('should not install variants feature', () => {
      const variantsModule = appTree.readContent(variantsFeatureModulePath);
      expect(variantsModule).not.toContain(SPARTACUS_VARIANTS_ROOT);
    });
  });
});
