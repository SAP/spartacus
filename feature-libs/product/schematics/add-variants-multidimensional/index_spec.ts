import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  LibraryOptions as SpartacusVariantsMultiDimensionalOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import { CLI_VARIANTS_MULTIDIMENSIONAL_FEATURE } from './../constants';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');
const appModulePath = 'src/app/app.module.ts';

describe('Spartacus Variants Multidimensional schematics: ng-add', () => {
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

  const defaultOptions: SpartacusVariantsMultiDimensionalOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_VARIANTS_MULTIDIMENSIONAL_FEATURE],
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

  describe('Variants Multidimensional feature', () => {
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

      it('should add variantsMultiDimensional deps', async () => {
        const packageJson = appTree.readContent('/package.json');
        const packageObj = JSON.parse(packageJson);
        const depPackageList = Object.keys(packageObj.dependencies);
        expect(depPackageList.includes('@spartacus/product')).toBe(true);
      });

      it('should import appropriate modules', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { VariantsMultiDimensionalRootModule } from '@spartacus/product/multi-d/root';`
        );
        expect(appModule).toContain(
          `import { VariantsMultiDimensionalModule } from '@spartacus/product/multi-d';`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).not.toContain(
          `import('@spartacus/product/multi-d').then(`
        );
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import VariantsMultiDimensionalRootModule and contain the lazy loading syntax', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { VariantsMultiDimensionalRootModule } from '@spartacus/product/multi-d/root';`
        );
        expect(appModule).toContain(
          `import('@spartacus/product/multi-d').then(`
        );
      });

      it('should not contain the VariantsMultiDimensionalModule import', () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).not.toContain(
          `import { VariantsMultiDimensionalModule } from '@spartacus/product/multi-d';`
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
          `import { variantsMultidimensionalTranslations } from '@spartacus/product/multi-d/assets';`
        );
        expect(appModule).toContain(
          `import { variantsMultidimensionalTranslationChunksConfig } from '@spartacus/product/multi-d/assets';`
        );
      });
      it('should provideConfig', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `resources: variantsMultidimensionalTranslations,`
        );
        expect(appModule).toContain(
          `chunks: variantsMultidimensionalTranslationChunksConfig,`
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

    it('should just append variantsMultiDimensional feature without duplicating the featureModules config', () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule.match(/featureModules:/g)?.length).toEqual(1);
      expect(appModule).toContain(`variantsMultidimensional: {`);
    });
  });
});
