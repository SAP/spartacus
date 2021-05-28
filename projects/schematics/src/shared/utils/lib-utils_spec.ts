import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { UTF_8 } from '../constants';
import {
  addLibraryFeature,
  FeatureConfig,
  LibraryOptions,
  shouldAddFeature,
} from './lib-utils';

const collectionPath = path.join(__dirname, '../../collection.json');

const CLI_FEATURE_NAME = 'xxx-cli';
const FEATURE_NAME = 'xxx';
const FEATURE_FOLDER_NAME = 'xxx';
const FEATURE_MODULE_NAME = 'XxxModule';
const FEATURE_MODULE_IMPORT_PATH = '@spartacus/xxx';
const ROOT_MODULE_NAME = 'XxxModuleRoot';
const ROOT_FEATURE_MODULE_IMPORT_PATH = '@spartacus/xxx/root';
const I18N_RESOURCES = 'translations';
const I18N_CHUNKS = 'translationChunk';
const ASSETS_IMPORT_PATH = '@spartacus/xxx/assets';
const SCSS_FILE_NAME = 'xxx.scss';
const STYLE_IMPORT_PATH = FEATURE_MODULE_IMPORT_PATH;

const appModulePath = 'src/app/app.module.ts';
const scssFilePath = `src/styles/spartacus/${SCSS_FILE_NAME}`;

const BASE_FEATURE_CONFIG: FeatureConfig = {
  moduleName: FEATURE_NAME,
  folderName: FEATURE_FOLDER_NAME,
  featureModule: {
    name: FEATURE_MODULE_NAME,
    importPath: FEATURE_MODULE_IMPORT_PATH,
  },
  rootModule: {
    name: ROOT_MODULE_NAME,
    importPath: ROOT_FEATURE_MODULE_IMPORT_PATH,
  },
  i18n: {
    resources: I18N_RESOURCES,
    chunks: I18N_CHUNKS,
    importPath: ASSETS_IMPORT_PATH,
  },
  styles: {
    scssFileName: SCSS_FILE_NAME,
    importStyle: STYLE_IMPORT_PATH,
  },
};

const BASE_OPTIONS: LibraryOptions = {
  project: 'schematics-test',
  features: [CLI_FEATURE_NAME],
  lazy: true,
};

describe('Lib utils', () => {
  describe('shouldAddFeature', () => {
    it('should return true if the feature is present in the given features array', () => {
      const feature1 = 'feature1';
      const features = [feature1];
      expect(shouldAddFeature(feature1, features)).toBe(true);
    });
    it('should return false if the feature is NOT present in the given features array', () => {
      const random = 'random';
      const feature1 = 'feature1';
      const features = [feature1];
      expect(shouldAddFeature(random, features)).toBe(false);
    });
  });

  describe('addLibraryFeature', () => {
    const schematicRunner = new SchematicTestRunner(
      'schematics',
      collectionPath
    );

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

    const spartacusDefaultOptions: SpartacusOptions = {
      project: 'schematics-test',
      lazy: true,
      features: [],
    };

    beforeEach(async () => {
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
        .runSchematicAsync(
          'add-spartacus',
          { ...spartacusDefaultOptions, name: 'schematics-test' },
          appTree
        )
        .toPromise();
    });

    it('should add i18n config in feature module', async () => {
      const rule = addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG);
      const tree = await schematicRunner.callRule(rule, appTree).toPromise();

      // TODO: Finish when config util will be created
      const appModule = tree.read(appModulePath)?.toString(UTF_8);
      expect(appModule).not.toContain(
        `import { ${I18N_RESOURCES} } from '${ASSETS_IMPORT_PATH}';`
      );
    });
    it('should NOT add i18n if the config is not present', async () => {
      const featureConfig: FeatureConfig = {
        ...BASE_FEATURE_CONFIG,
        i18n: undefined,
      };
      const rule = addLibraryFeature(BASE_OPTIONS, featureConfig);
      const tree = await schematicRunner.callRule(rule, appTree).toPromise();

      // TODO: Finish when config util will be created
      const appModule = tree.read(appModulePath)?.toString(UTF_8);
      expect(appModule).not.toContain(`providers: [
        provideConfig({
          i18n: {`);
    });
    describe('when the lazy loading is configured', () => {
      it('should add it in the lazy loading way', async () => {
        const rule = addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG);
        const tree = await schematicRunner.callRule(rule, appTree).toPromise();

        const appModule = tree.read(appModulePath)?.toString(UTF_8);
        // TODO: Finish when config util will be created
        expect(appModule).not.toContain(
          `import { ${ROOT_MODULE_NAME} } from '${ROOT_FEATURE_MODULE_IMPORT_PATH}';`
        );
      });
    });
    describe('when the eager loading is configured', () => {
      it('should add it in the eager way', async () => {
        const rule = addLibraryFeature(
          { ...BASE_OPTIONS, lazy: false },
          BASE_FEATURE_CONFIG
        );
        const tree = await schematicRunner.callRule(rule, appTree).toPromise();

        const appModule = tree.read(appModulePath)?.toString(UTF_8);
        // TODO: Finish when config util will be created
        expect(appModule).not.toContain(
          `module: () => import('${FEATURE_MODULE_IMPORT_PATH}').then(`
        );
      });
    });
    describe('style', () => {
      describe('when style config is provided', () => {
        describe('and the scss file does NOT exist', () => {
          it('should add it', async () => {
            const rule = addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG);
            const tree = await schematicRunner
              .callRule(rule, appTree)
              .toPromise();

            expect(tree.exists(scssFilePath)).toEqual(true);
            const content = tree.read(scssFilePath)?.toString(UTF_8);
            expect(content).toEqual(`@import "${FEATURE_MODULE_IMPORT_PATH}";`);
          });
        });
        describe('and the scss with the same content already exists', () => {
          beforeEach(() => {
            appTree.create(
              scssFilePath,
              `@import "${FEATURE_MODULE_IMPORT_PATH}";`
            );
          });
          it('should NOT append it', async () => {
            const rule = addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG);
            const tree = await schematicRunner
              .callRule(rule, appTree)
              .toPromise();

            expect(tree.exists(scssFilePath)).toEqual(true);
            const content = tree.read(scssFilePath)?.toString(UTF_8);
            expect(content).toEqual(`@import "${FEATURE_MODULE_IMPORT_PATH}";`);
          });
        });
        describe('and the scss file with a different content already exists', () => {
          const randomContent = `@import "@random/xxx";`;
          beforeEach(() => {
            appTree.create(scssFilePath, randomContent);
          });
          it('should append it', async () => {
            const rule = addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG);
            const tree = await schematicRunner
              .callRule(rule, appTree)
              .toPromise();

            expect(tree.exists(scssFilePath)).toEqual(true);
            const content = tree.read(scssFilePath)?.toString(UTF_8);
            expect(content).toEqual(
              `${randomContent}\n@import "${FEATURE_MODULE_IMPORT_PATH}";`
            );
          });
        });
      });
      describe('when style config is NOT provided', () => {
        it('should not add it', async () => {
          const rule = addLibraryFeature(BASE_OPTIONS, {
            ...BASE_FEATURE_CONFIG,
            styles: undefined,
          });
          const tree = await schematicRunner
            .callRule(rule, appTree)
            .toPromise();

          expect(tree.exists(scssFilePath)).toEqual(false);
        });
      });
    });
  });
});
