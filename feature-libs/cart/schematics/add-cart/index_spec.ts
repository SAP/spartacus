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
  LibraryOptions as SpartacusCartOptions,
  SpartacusOptions,
  SPARTACUS_CONFIGURATION_MODULE,
} from '@spartacus/schematics';
import * as path from 'path';
import { CLI_SAVED_CART_FEATURE } from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const saveCartFeatureModulePath =
  'src/app/spartacus/features/cart/cart-saved-cart-feature.module.ts';

describe('Spartacus Cart schematics: ng-add', () => {
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

  const defaultOptions: SpartacusCartOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_SAVED_CART_FEATURE],
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
    schematicRunner.registerCollection(
      '@spartacus/storefinder',
      '../../feature-libs/storefinder/schematics/collection.json'
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

    it('should not install saved-cart', () => {
      expect(appTree.exists(saveCartFeatureModulePath)).toBeFalsy();
    });
  });

  describe('Saved Cart feature', () => {
    describe('styling', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should add style import to /src/styles/spartacus/cart.scss', async () => {
        const content = appTree.readContent('/src/styles/spartacus/cart.scss');
        expect(content).toEqual(`@import "@spartacus/cart";`);
      });

      it('should update angular.json with spartacus/cart.scss', async () => {
        const content = appTree.readContent('/angular.json');
        const angularJson = JSON.parse(content);
        const buildStyles: string[] =
          angularJson.projects['schematics-test'].architect.build.options
            .styles;
        expect(buildStyles).toEqual([
          'src/styles.scss',
          'src/styles/spartacus/cart.scss',
        ]);

        const testStyles: string[] =
          angularJson.projects['schematics-test'].architect.test.options.styles;
        expect(testStyles).toEqual([
          'src/styles.scss',
          'src/styles/spartacus/cart.scss',
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

      it('should import appropriate modules', async () => {
        const appModule = appTree.readContent(saveCartFeatureModulePath);
        expect(appModule).toContain(
          `import { SavedCartRootModule } from "@spartacus/cart/saved-cart/root";`
        );
        expect(appModule).toContain(
          `import { SavedCartModule } from "@spartacus/cart/saved-cart";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const appModule = appTree.readContent(saveCartFeatureModulePath);
        expect(appModule).not.toContain(
          `import('@spartacus/cart/saved-cart').then(`
        );
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import SavedCartRootModule and contain the lazy loading syntax', async () => {
        const appModule = appTree.readContent(saveCartFeatureModulePath);
        expect(appModule).toContain(
          `import { SavedCartRootModule } from "@spartacus/cart/saved-cart/root";`
        );
        expect(appModule).toContain(
          `import('@spartacus/cart/saved-cart').then(`
        );
      });

      it('should not contain the SavedCartModule import', () => {
        const appModule = appTree.readContent(saveCartFeatureModulePath);
        expect(appModule).not.toContain(
          `import { SavedCartModule } from "@spartacus/cart/saved-cart";`
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
        const appModule = appTree.readContent(saveCartFeatureModulePath);
        expect(appModule).toContain(
          `import { savedCartTranslationChunksConfig, savedCartTranslations } from "@spartacus/cart/saved-cart/assets";`
        );
      });
      it('should provideConfig', async () => {
        const appModule = appTree.readContent(saveCartFeatureModulePath);
        expect(appModule).toContain(`resources: savedCartTranslations,`);
        expect(appModule).toContain(
          `chunks: savedCartTranslationChunksConfig,`
        );
      });
    });

    describe('b2b features', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should be added', () => {
        const configurationModule = appTree.readContent(
          `src/app/spartacus/${SPARTACUS_CONFIGURATION_MODULE}.module.ts`
        );
        console.log(configurationModule);
        expect(configurationModule).toMatchSnapshot();
      });
    });
  });
});
