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
  LibraryOptions as SpartacusProductConfiguratorOptions,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_SETUP,
} from '@spartacus/schematics';
import * as path from 'path';
import { CLI_CPQ_FEATURE, CLI_TEXTFIELD_FEATURE } from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const productConfiguratorFeatureModulePath =
  'src/app/spartacus/features/product-configurator/product-configurator-feature.module.ts';

// TODO: Improve tests after lib-util test update
describe('Spartacus product configurator schematics: ng-add', () => {
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

  const defaultOptions: SpartacusProductConfiguratorOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const optionsIncludingCpq: SpartacusProductConfiguratorOptions = {
    ...defaultOptions,
    features: [CLI_CPQ_FEATURE],
  };

  const optionsIncludingTextfield: SpartacusProductConfiguratorOptions = {
    ...defaultOptions,
    features: [CLI_TEXTFIELD_FEATURE],
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
        { ...defaultOptions, name: 'schematics-test' },
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

      it('should not contain lazy loading syntax for rulebased configurator', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).not.toContain(
          `import('@spartacus/product-configurator/rulebased').then(`
        );
      });
    });

    describe('eager loading with textfield configurator enabled', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...optionsIncludingTextfield, lazy: false },
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

      it('should not contain lazy loading syntax for textfield configurator', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).not.toContain(
          `import('@spartacus/product-configurator/textfield').then(`
        );
      });
    });

    describe('eager loading with CPQ feature enabled', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...optionsIncludingCpq, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import rulebased root module and cpq root module', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).toContain(
          `import { CpqConfiguratorRootModule, RulebasedConfiguratorRootModule } from \"@spartacus/product-configurator/rulebased/root\";`
        );
      });

      it('should not contain lazy loading syntax for cpq configurator module', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).not.toContain(
          `import('@spartacus/product-configurator/rulebased/cpq').then(`
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

      it('should not contain the rulebased module import', () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).not.toContain(
          `import { RulebasedConfiguratorModule } from "@spartacus/product-configurator/rulebased";`
        );
      });

      it('should not update package.json with setup per default (as b2b is not required)', () => {
        const packageJson = appTree.readContent(`package.json`);
        expect(packageJson.includes(SPARTACUS_SETUP)).toBe(false);
      });
    });

    describe('lazy loading with textfield feature enabled', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', optionsIncludingTextfield, appTree)
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

      it('should not contain the textfield module import', () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).not.toContain(
          `import { TextfieldConfiguratorModule } from "@spartacus/product-configurator/textfield";`
        );
      });
    });

    describe('lazy loading with CPQ feature enabled', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', optionsIncludingCpq, appTree)
          .toPromise();
      });

      it('should contain the lazy loading syntax for the CPQ flavor', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).toContain(
          `import('@spartacus/product-configurator/rulebased/cpq').then((m) => m.RulebasedCpqConfiguratorModule),`
        );
      });

      it('should import rulebased root module, and rulebased cpq root module separately (as it forces early login)', async () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).toContain(
          `import { CpqConfiguratorRootModule, RulebasedConfiguratorRootModule } from \"@spartacus/product-configurator/rulebased/root\";`
        );
      });

      it('should add b2b features by adding configuration module', () => {
        const configurationModule = appTree.readContent(
          `src/app/spartacus/${SPARTACUS_CONFIGURATION_MODULE}.module.ts`
        );
        expect(configurationModule).toMatchSnapshot();
      });

      it('should update package.json with setup', () => {
        const packageJson = appTree.readContent(`package.json`);
        expect(packageJson).toContain(SPARTACUS_SETUP);
      });

      it('should not contain the rulebased cpq module import', () => {
        const productConfiguratorModule = appTree.readContent(
          productConfiguratorFeatureModulePath
        );
        expect(productConfiguratorModule).not.toContain(
          `import { RulebasedConfiguratorModule } from "@spartacus/product-configurator/rulebased/cpq";`
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
