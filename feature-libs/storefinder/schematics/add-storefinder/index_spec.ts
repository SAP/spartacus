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
  CLI_STOREFINDER_FEATURE,
  LibraryOptions as SpartacusStorefinderOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');
const storeFinderModulePath =
  'src/app/spartacus/features/storefinder/store-finder-feature.module.ts';

// TODO: Improve tests after lib-util test update
describe('Spartacus Storefinder schematics: ng-add', () => {
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

  const defaultOptions: SpartacusStorefinderOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_STOREFINDER_FEATURE],
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

  describe('Storefinder feature', () => {
    describe('styling', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should add style import to /src/styles/spartacus/storefinder.scss', async () => {
        const content = appTree.readContent(
          '/src/styles/spartacus/storefinder.scss'
        );
        expect(content).toEqual(`@import "@spartacus/storefinder";`);
      });

      it('should add update angular.json with spartacus/storefinder.scss', async () => {
        const content = appTree.readContent('/angular.json');
        const angularJson = JSON.parse(content);
        const buildStyles: string[] =
          angularJson.projects['schematics-test'].architect.build.options
            .styles;
        expect(buildStyles).toEqual([
          'src/styles.scss',
          'src/styles/spartacus/storefinder.scss',
        ]);

        const testStyles: string[] =
          angularJson.projects['schematics-test'].architect.test.options.styles;
        expect(testStyles).toEqual([
          'src/styles.scss',
          'src/styles/spartacus/storefinder.scss',
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
        const storeFinderModule = appTree.readContent(storeFinderModulePath);
        expect(storeFinderModule).toContain(
          `import { StoreFinderRootModule } from "@spartacus/storefinder/root";`
        );
        expect(storeFinderModule).toContain(
          `import { StoreFinderModule } from "@spartacus/storefinder";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const storeFinderModule = appTree.readContent(storeFinderModulePath);
        expect(storeFinderModule).not.toContain(
          `import('@spartacus/storefinder').then(`
        );
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import StoreFinderRootModule and contain the lazy loading syntax', async () => {
        const storeFinderModule = appTree.readContent(storeFinderModulePath);
        expect(storeFinderModule).toContain(
          `import { StoreFinderRootModule } from "@spartacus/storefinder/root";`
        );
        expect(storeFinderModule).toContain(
          `import('@spartacus/storefinder').then(`
        );
      });

      it('should not contain the StoreFinderModule import', () => {
        const storeFinderModule = appTree.readContent(storeFinderModulePath);
        expect(storeFinderModule).not.toContain(
          `import { StoreFinderModule } from "@spartacus/storefinder";`
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
        const storeFinderModule = appTree.readContent(storeFinderModulePath);
        expect(storeFinderModule).toContain(
          `import { storeFinderTranslationChunksConfig, storeFinderTranslations } from "@spartacus/storefinder/assets";`
        );
      });
      it('should provideConfig', async () => {
        const storeFinderModule = appTree.readContent(storeFinderModulePath);
        expect(storeFinderModule).toContain(
          `resources: storeFinderTranslations,`
        );
        expect(storeFinderModule).toContain(
          `chunks: storeFinderTranslationChunksConfig,`
        );
      });
    });
  });
});
