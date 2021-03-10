import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  LibraryOptions as SpartacusProductOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import {
  SPARTACUS_BULK_PRICING_ROOT,
  CLI_BULK_PRICING_FEATURE,
  SPARTACUS_VARIANTS_ROOT,
  CLI_VARIANTS_FEATURE,
} from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const appModulePath = 'src/app/app.module.ts';

describe('Spartacus Product schematics: ng-add', () => {
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

  const defaultOptions: SpartacusProductOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_BULK_PRICING_FEATURE, CLI_VARIANTS_FEATURE],
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

    it('should not install bulkPricing feature', () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule).not.toContain(SPARTACUS_BULK_PRICING_ROOT);
    });

    it('should not install variants feature', () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule).not.toContain(SPARTACUS_VARIANTS_ROOT);
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

    it('should just append the product features without duplicating the featureModules config', () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule.match(/featureModules:/g)?.length).toEqual(1);
      expect(appModule).toContain(`bulkPricing: {`);
      expect(appModule).toContain(`variants: {`);
    });
  });

  describe('styling', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', defaultOptions, appTree)
        .toPromise();
    });

    it('should add style import to /src/styles/spartacus/product.scss', async () => {
      const content = appTree.readContent('/src/styles/spartacus/product.scss');
      expect(content).toEqual(`@import "@spartacus/product";`);
    });

    it('should add update angular.json with spartacus/product.scss', async () => {
      const content = appTree.readContent('/angular.json');
      const angularJson = JSON.parse(content);
      const buildStyles: string[] =
        angularJson.projects['schematics-test'].architect.build.options.styles;
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
