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
import { CLI_VARIANTS_FEATURE } from './../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const variantsFeatureModulePath =
  'src/app/spartacus/features/product/product-variants-feature.module.ts';

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

  const defaultOptions: SpartacusVariantsOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_VARIANTS_FEATURE],
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

  describe('Variants feature', () => {
    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultOptions, lazy: false },
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
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import ProductVariantsRootModule and contain the lazy loading syntax', async () => {
        const variantsModule = appTree.readContent(variantsFeatureModulePath);
        expect(variantsModule).toContain(
          `import { ProductVariantsRootModule } from "@spartacus/product/variants/root";`
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
          .runSchematicAsync('ng-add', defaultOptions, appTree)
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
        expect(variantsModule).toContain(`resources: productVariantsTranslations,`);
        expect(variantsModule).toContain(
          `chunks: productVariantsTranslationChunksConfig,`
        );
      });
    });

    describe('styling', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should add style import to /src/styles/spartacus/product.scss', async () => {
        const content = appTree.readContent(
          '/src/styles/spartacus/product.scss'
        );
        expect(content).toEqual(`@import "@spartacus/product";`);
      });

      it('should add update angular.json with spartacus/product.scss', async () => {
        const content = appTree.readContent('/angular.json');
        const angularJson = JSON.parse(content);
        const buildStyles: string[] =
          angularJson.projects['schematics-test'].architect.build.options
            .styles;
        expect(buildStyles).toEqual([
          'src/styles.scss',
          'src/styles/spartacus/product.scss',
        ]);

        const testStyles: string[] =
          angularJson.projects['schematics-test'].architect.test.options.styles;
        expect(testStyles).toEqual([
          'src/styles.scss',
          'src/styles/spartacus/product.scss',
        ]);
      });
    });
  });
});
