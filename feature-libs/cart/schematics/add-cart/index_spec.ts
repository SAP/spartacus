import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  B2B_STOREFRONT_MODULE,
  B2C_STOREFRONT_MODULE,
  LibraryOptions as SpartacusCartOptions,
  SpartacusOptions,
  SPARTACUS_SETUP,
} from '@spartacus/schematics';
import * as path from 'path';
import {
  CLI_SAVED_CART_FEATURE,
  SAVED_CART_ROOT_MODULE,
  SPARTACUS_CART,
} from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const appModulePath = 'src/app/app.module.ts';

describe('Spartacus Cart schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: any = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: any = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'scss',
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

    it('should still install @spartacus/cart and @spartacus/setup libraries', () => {
      const packageJson = appTree.readContent('package.json');
      expect(packageJson).toContain(SPARTACUS_SETUP);
      expect(packageJson).toContain(SPARTACUS_CART);
    });

    it('should not install saved-cart', () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule).not.toContain(SAVED_CART_ROOT_MODULE);
    });
  });

  describe('app.module.ts', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', defaultOptions, appTree)
        .toPromise();
    });
    it(`should remove 'B2cStorefrontModule' `, () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule).not.toContain(B2C_STOREFRONT_MODULE);
    });
    it(`should replace it with 'B2bStorefrontModule'`, () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule).toContain(B2B_STOREFRONT_MODULE);
    });
    it(`should add inject provideDefaultConfig and provide it`, () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule).toContain(
        `defaultB2bOccConfig } from '@spartacus/setup';`
      );
      expect(appModule).toContain(
        `providers: [provideDefaultConfig(defaultB2bOccConfig),`
      );
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

      it('should add update angular.json with spartacus/cart.scss', async () => {
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

      it('should add cart deps', async () => {
        const packageJson = appTree.readContent('/package.json');
        const packageObj = JSON.parse(packageJson);
        const depPackageList = Object.keys(packageObj.dependencies);
        expect(depPackageList.includes('@spartacus/cart')).toBe(true);
        expect(depPackageList.includes('@spartacus/setup')).toBe(true);
      });

      it('should import appropriate modules', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { SavedCartRootModule } from '@spartacus/cart/saved-cart/root';`
        );
        expect(appModule).toContain(
          `import { SavedCartModule } from '@spartacus/cart/saved-cart';`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const appModule = appTree.readContent(appModulePath);
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
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { SavedCartRootModule } from '@spartacus/cart/saved-cart/root';`
        );
        expect(appModule).toContain(
          `import('@spartacus/cart/saved-cart').then(`
        );
      });

      it('should not contain the SavedCartModule import', () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).not.toContain(
          `import { SavedCartModule } from '@spartacus/cart/saved-cart';`
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
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { savedCartTranslations } from '@spartacus/cart/saved-cart/assets';`
        );
        expect(appModule).toContain(
          `import { savedCartTranslationChunksConfig } from '@spartacus/cart/saved-cart/assets';`
        );
      });
      it('should provideConfig', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(`resources: savedCartTranslations,`);
        expect(appModule).toContain(
          `chunks: savedCartTranslationChunksConfig,`
        );
      });
    });
  });

  describe('when other Spartacus features are already installed', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runExternalSchematicAsync(
          '@spartacus/storefinder',
          'ng-add',
          { ...spartacusDefaultOptions, name: 'schematics-test' },
          appTree
        )
        .toPromise();
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', defaultOptions, appTree)
        .toPromise();
    });

    it('should just append the cart features without duplicating the featureModules config', () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule.match(/featureModules:/g)?.length).toEqual(1);
      expect(appModule).toContain(`cartSavedCart: {`);
    });
  });
});
