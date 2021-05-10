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
  LibraryOptions as SpartacusVariantsOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import { CLI_VARIANTS_FEATURE } from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const variantsFeatureModulePath =
  'src/app/spartacus/features/product/product-variants-feature.module.ts';
const scssFilePath = 'src/styles/spartacus/product.scss';

describe('Spartacus Variants schematics: ng-add', () => {
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
    configuration: 'b2c',
    lazy: true,
    features: [],
  };

  const defaultFeatureOptions: SpartacusVariantsOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_VARIANTS_FEATURE],
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

  describe('Variants feature', () => {
    describe('styling', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultFeatureOptions, appTree)
          .toPromise();
      });

      it('should create a proper scss file', () => {
        const scssContent = appTree.readContent(scssFilePath);
        expect(scssContent).toMatchSnapshot();
      });

      it('should update angular.json', async () => {
        const content = appTree.readContent('/angular.json');
        expect(content).toMatchSnapshot();
      });
    });

    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultFeatureOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const variantsModule = appTree.readContent(variantsFeatureModulePath);
        expect(variantsModule).toContain(
          `import { ProductVariantsRootModule } from "@spartacus/product/variants/root";`
        );
        expect(variantsModule).toContain(
          `import { ProductVariantsModule } from "@spartacus/product/variants";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const variantsModule = appTree.readContent(variantsFeatureModulePath);
        expect(variantsModule).not.toContain(
          `import('@spartacus/product/variants').then(`
        );
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultFeatureOptions, appTree)
          .toPromise();
      });

      it('should import ProductVariantsRootModule and contain the lazy loading syntax', async () => {
        const variantsModule = appTree.readContent(variantsFeatureModulePath);
        expect(variantsModule).toContain(
          `import { ProductVariantsRootModule, PRODUCT_VARIANTS_FEATURE } from "@spartacus/product/variants/root";`
        );
        expect(variantsModule).toContain(
          `import('@spartacus/product/variants').then(`
        );
      });

      it('should not contain the ProductVariantsContainerModule import', () => {
        const variantsModule = appTree.readContent(variantsFeatureModulePath);
        expect(variantsModule).not.toContain(
          `import { ProductVariantsModule } from "@spartacus/product/variants";`
        );
      });
    });

    describe('i18n', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultFeatureOptions, appTree)
          .toPromise();
      });

      it('should import the i18n resource and chunk from assets', async () => {
        const variantsModule = appTree.readContent(variantsFeatureModulePath);
        expect(variantsModule).toContain(
          `import { productVariantsTranslationChunksConfig, productVariantsTranslations } from "@spartacus/product/variants/assets";`
        );
      });
      it('should provideConfig', async () => {
        const variantsModule = appTree.readContent(variantsFeatureModulePath);
        expect(variantsModule).toContain(
          `resources: productVariantsTranslations,`
        );
        expect(variantsModule).toContain(
          `chunks: productVariantsTranslationChunksConfig,`
        );
      });
    });
  });
});
