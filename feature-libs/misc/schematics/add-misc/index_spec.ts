import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  CLI_STOREFINDER_FEATURE,
  SpartacusOptions,
  SPARTACUS_MISC,
  SPARTACUS_SETUP,
  STOREFINDER_ROOT_MODULE,
} from '@spartacus/schematics';
import * as path from 'path';
import { Schema as SpartacusMiscOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');
const appModulePath = 'src/app/app.module.ts';

describe('Spartacus Misc schematics: ng-add', () => {
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

  const defaultOptions: SpartacusMiscOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_STOREFINDER_FEATURE],
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

    it('should still install @spartacus/misc and @spartacus/setup libraries', () => {
      const packageJson = appTree.readContent('package.json');
      expect(packageJson).toContain(SPARTACUS_SETUP);
      expect(packageJson).toContain(SPARTACUS_MISC);
    });

    it('should not install storefinder feature', () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule).not.toContain(STOREFINDER_ROOT_MODULE);
    });
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
        expect(content).toEqual(`@import "@spartacus/misc";`);
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

      it('should add storefinder deps', async () => {
        const packageJson = appTree.readContent('/package.json');
        const packageObj = JSON.parse(packageJson);
        const depPackageList = Object.keys(packageObj.dependencies);
        expect(depPackageList.includes('@spartacus/misc')).toBe(true);
        expect(depPackageList.includes('@spartacus/setup')).toBe(true);
      });

      it('should import appropriate modules', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { StoreFinderRootModule } from '@spartacus/misc/storefinder/root';`
        );
        expect(appModule).toContain(
          `import { StoreFinderModule } from '@spartacus/misc/storefinder';`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).not.toContain(
          `import('@spartacus/misc/storefinder').then(`
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
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(
          `import { StoreFinderRootModule } from '@spartacus/misc/storefinder/root';`
        );
        expect(appModule).toContain(
          `import('@spartacus/misc/storefinder').then(`
        );
      });

      it('should not contain the StoreFinderModule import', () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).not.toContain(
          `import { StoreFinderModule } from '@spartacus/misc/storefinder';`
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
          `import { storeFinderTranslations } from '@spartacus/misc/storefinder/assets';`
        );
        expect(appModule).toContain(
          `import { storeFinderTranslationChunksConfig } from '@spartacus/misc/storefinder/assets';`
        );
      });
      it('should provideConfig', async () => {
        const appModule = appTree.readContent(appModulePath);
        expect(appModule).toContain(`resources: storeFinderTranslations,`);
        expect(appModule).toContain(
          `chunks: storeFinderTranslationChunksConfig,`
        );
      });
    });
  });

  describe('when other Spartacus features are already installed', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runExternalSchematicAsync(
          '@spartacus/organization',
          'ng-add',
          { ...spartacusDefaultOptions, name: 'schematics-test' },
          appTree
        )
        .toPromise();
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', defaultOptions, appTree)
        .toPromise();
    });

    it('should just append storefinder feature without duplicating the featureModules config', () => {
      const appModule = appTree.readContent(appModulePath);
      expect(appModule.match(/featureModules:/g).length).toEqual(1);
      expect(appModule).toContain(`storeFinder: {`);
    });
  });
});
