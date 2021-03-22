import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import {
  LibraryOptions as SpartacusProductConfiguratorOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import { CLI_PRODUCT_CONFIGURATOR_FEATURE } from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const productConfiguratorFeatureModulePath =
  'src/app/spartacus/features/product-configurator-feature.module.ts';

// TODO: Improve tests after lib-util test update
describe('Spartacus product configurator schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: any = {
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

  const defaultOptions: SpartacusProductConfiguratorOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_PRODUCT_CONFIGURATOR_FEATURE],
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    configuration: 'b2c',
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      '@spartacus/schematics',
      '../../projects/schematics/src/collection.json'
    );
    schematicRunner.registerCollection(
      '@spartacus/organization',
      '../../feature-libs/organization/schematics/collection.json'
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

  describe('Product config feature', () => {
    describe('styling', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should add style import to /src/styles/spartacus/product-configurator.scss', async () => {
        const content = appTree.readContent(
          '/src/styles/spartacus/product-configurator.scss'
        );
        expect(content).toEqual(`@import "@spartacus/product-configurator";`);
      });

      it('should add update angular.json with spartacus/product-configurator.scss', async () => {
        const content = appTree.readContent('/angular.json');
        const angularJson = JSON.parse(content);
        const buildStyles: string[] =
          angularJson.projects['schematics-test'].architect.build.options
            .styles;
        expect(buildStyles).toEqual([
          'src/styles.scss',
          'src/styles/spartacus/product-configurator.scss',
        ]);

        const testStyles: string[] =
          angularJson.projects['schematics-test'].architect.test.options.styles;
        expect(testStyles).toEqual([
          'src/styles.scss',
          'src/styles/spartacus/product-configurator.scss',
        ]);
      });
    });

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

      it('should import rulebased root module', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).toContain(
          `import { RulebasedConfiguratorRootModule } from "@spartacus/product-configurator/rulebased/root";`
        );
      });

      it('should import textfield root module', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).toContain(
          `import { TextfieldConfiguratorRootModule } from "@spartacus/product-configurator/textfield/root";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).not.toContain(
          `import('@spartacus/product-configurator/rulebased').then(`
        );
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import rulebased root module and contain the lazy loading syntax', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).toContain(
          `import { RulebasedConfiguratorRootModule } from "@spartacus/product-configurator/rulebased/root";`
        );
        expect(productConfiguratorModule).toContain(
          `import('@spartacus/product-configurator/rulebased').then(`
        );
      });

      it('should import textfield root module and contain the lazy loading syntax', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).toContain(
          `import { TextfieldConfiguratorRootModule } from "@spartacus/product-configurator/textfield/root";`
        );
        expect(productConfiguratorModule).toContain(
          `import('@spartacus/product-configurator/textfield').then(`
        );
      });

      it('should not contain the rulebased module import', () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).not.toContain(
          `import { RulebasedConfiguratorModule } from "@spartacus/product-configurator/rulebased";`
        );
      });

      it('should not contain the textfield module import', () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).not.toContain(
          `import { TextfieldConfiguratorModule } from "@spartacus/product-configurator/textfield";`
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
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).toContain(
          `import { configuratorTranslationChunksConfig, configuratorTranslations } from "@spartacus/product-configurator/common/assets";`
        );
      });
      it('should provideConfig', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).toContain(
          `resources: configuratorTranslations,`
        );
        expect(productConfiguratorModule).toContain(
          `chunks: configuratorTranslationChunksConfig,`
        );
      });
    });
  });
});
