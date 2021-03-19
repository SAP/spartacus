import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import {
  LibraryOptions as SpartacusBulkPricingOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import { CLI_BULK_PRICING_FEATURE } from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const appModulePath = 'src/app/app.module.ts';

describe('Spartacus BulkPricing schematics: ng-add', () => {
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

  const defaultOptions: SpartacusBulkPricingOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_BULK_PRICING_FEATURE],
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
      '@spartacus/product',
      '../../feature-libs/product/schematics/collection.json'
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

  describe('BulkPricing feature', () => {
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

      it('should add bulkPricing deps', async () => {
        const packageJson = appTree.readContent('/package.json');
        const packageObj = JSON.parse(packageJson);
        const depPackageList = Object.keys(packageObj.dependencies);
        expect(depPackageList.includes('@spartacus/product')).toBe(true);
      });

      it('should import appropriate modules', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { BulkPricingRootModule } from '@spartacus/product/bulk-pricing/root';`
        );
        expect(appModule).toContain(
          `import { BulkPricingModule } from '@spartacus/product/bulk-pricing';`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).not.toContain(
          `import('@spartacus/product/bulk-pricing').then(`
        );
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import BulkPricingRootModule and contain the lazy loading syntax', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { BulkPricingRootModule } from '@spartacus/product/bulk-pricing/root';`
        );
        expect(appModule).toContain(
          `import('@spartacus/product/bulk-pricing').then(`
        );
      });

      it('should not contain the BulkPricingModule import', () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).not.toContain(
          `import { BulkPricingModule } from '@spartacus/product/bulk-pricing';`
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
          `import { bulkPricingTranslations } from '@spartacus/product/bulk-pricing/assets';`
        );
        expect(appModule).toContain(
          `import { bulkPricingTranslationChunksConfig } from '@spartacus/product/bulk-pricing/assets';`
        );
      });
      it('should provideConfig', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(`resources: bulkPricingTranslations,`);
        expect(appModule).toContain(
          `chunks: bulkPricingTranslationChunksConfig,`
        );
      });
    });
  });

  describe('when other Spartacus features are already installed', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runExternalSchematicAsync(
          '@spartacus/product',
          'ng-add',
          { ...spartacusDefaultOptions, name: 'schematics-test' },
          appTree
        )
        .toPromise();
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', defaultOptions, appTree)
        .toPromise();
    });

    it('should just append bulkPricing feature without duplicating the featureModules config', () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule.match(/featureModules:/g)?.length).toEqual(1);
      expect(appModule).toContain(`bulkPricing: {`);
    });
  });
});
