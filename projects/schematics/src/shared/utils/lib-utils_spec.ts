import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
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
const FEATURE_MODULE_NAME = 'XxxModule';
const FEATURE_MODULE_IMPORT_PATH = '@spartacus/xxx';
const ROOT_MODULE_NAME = 'XxxModuleRoot';
const ROOT_FEATURE_MODULE_IMPORT_PATH = '@spartacus/xxx/root';
const I18N_RESOURCES = 'translations';
const I18N_CHUNKS = 'translationChunk';
const ASSETS_IMPORT_PATH = '@spartacus/xxx/assets';
const SCSS_FILE_NAME = 'xxx.scss';
const STYLE_IMPORT_PATH = FEATURE_MODULE_IMPORT_PATH;
const DEFAULT_CONFIG = 'defaultXxxConfig';
const DEFAULT_CONFIG_IMPORT_PATH = '@spartacus/default/config';

const appModulePath = 'src/app/app.module.ts';
const scssFilePath = `src/styles/spartacus/${SCSS_FILE_NAME}`;

const BASE_FEATURE_CONFIG: FeatureConfig = {
  name: FEATURE_NAME,
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
      expect(shouldAddFeature(features, feature1)).toBe(true);
    });
    it('should return false if the feature is NOT present in the given features array', () => {
      const random = 'random';
      const feature1 = 'feature1';
      const features = [feature1];
      expect(shouldAddFeature(features, random)).toBe(false);
    });
  });

  describe('addLibraryFeature', () => {
    const schematicRunner = new SchematicTestRunner(
      'schematics',
      collectionPath
    );

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

    const spartacusDefaultOptions: SpartacusOptions = {
      project: 'schematics-test',
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

    it('should add i18n', async () => {
      const rule = addLibraryFeature(
        appModulePath,
        BASE_OPTIONS,
        BASE_FEATURE_CONFIG
      );
      const result = await schematicRunner.callRule(rule, appTree).toPromise();

      const appModule = result.read(appModulePath)?.toString(UTF_8);
      expect(appModule).toContain(
        `import { ${I18N_RESOURCES} } from '${ASSETS_IMPORT_PATH}';`
      );
      expect(appModule).toContain(
        `import { ${I18N_CHUNKS} } from '${ASSETS_IMPORT_PATH}';`
      );
      expect(appModule).toContain(`resources: ${I18N_RESOURCES},`);
      expect(appModule).toContain(`chunks: ${I18N_CHUNKS},`);
    });
    it('should NOT add i18n if the config is not present', async () => {
      const featureConfig: FeatureConfig = {
        ...BASE_FEATURE_CONFIG,
        i18n: undefined,
      };
      const rule = addLibraryFeature(
        appModulePath,
        BASE_OPTIONS,
        featureConfig
      );
      const result = await schematicRunner.callRule(rule, appTree).toPromise();

      const appModule = result.read(appModulePath)?.toString(UTF_8);
      expect(appModule).not.toContain(`providers: [
        provideConfig({
          i18n: {`);
    });
    describe('when no default config is present', () => {
      it('should not add it', async () => {
        const rule = addLibraryFeature(
          appModulePath,
          BASE_OPTIONS,
          BASE_FEATURE_CONFIG
        );
        const result = await schematicRunner
          .callRule(rule, appTree)
          .toPromise();

        const appModule = result.read(appModulePath)?.toString(UTF_8);
        expect(appModule).not.toContain(DEFAULT_CONFIG_IMPORT_PATH);
        expect(appModule).not.toContain(DEFAULT_CONFIG);
      });
    });
    describe('when a default config is present', () => {
      it('should add it', async () => {
        const rule = addLibraryFeature(appModulePath, BASE_OPTIONS, {
          ...BASE_FEATURE_CONFIG,
          defaultConfig: {
            name: DEFAULT_CONFIG,
            importPath: DEFAULT_CONFIG_IMPORT_PATH,
          },
        });
        const result = await schematicRunner
          .callRule(rule, appTree)
          .toPromise();

        const appModule = result.read(appModulePath)?.toString(UTF_8);
        expect(appModule).toContain(DEFAULT_CONFIG_IMPORT_PATH);
        expect(appModule).toContain(DEFAULT_CONFIG);
      });
    });
    describe('when the lazy loading is configured', () => {
      it('should add it in the lazy loading way', async () => {
        const rule = addLibraryFeature(
          appModulePath,
          BASE_OPTIONS,
          BASE_FEATURE_CONFIG
        );
        const result = await schematicRunner
          .callRule(rule, appTree)
          .toPromise();

        const appModule = result.read(appModulePath)?.toString(UTF_8);
        expect(appModule).toContain(
          `import { ${ROOT_MODULE_NAME} } from '${ROOT_FEATURE_MODULE_IMPORT_PATH}';`
        );
        expect(appModule).toContain(
          `module: () => import('${FEATURE_MODULE_IMPORT_PATH}').then(`
        );
        expect(appModule).not.toContain(
          `import { ${FEATURE_MODULE_NAME} } from '${FEATURE_MODULE_IMPORT_PATH}';`
        );
      });
    });
    describe('when the eager loading is configured', () => {
      it('should add it in the eager way', async () => {
        const rule = addLibraryFeature(
          appModulePath,
          { ...BASE_OPTIONS, lazy: false },
          BASE_FEATURE_CONFIG
        );
        const result = await schematicRunner
          .callRule(rule, appTree)
          .toPromise();

        const appModule = result.read(appModulePath)?.toString(UTF_8);
        expect(appModule).not.toContain(
          `module: () => import('${FEATURE_MODULE_IMPORT_PATH}').then(`
        );
        expect(appModule).toContain(
          `import { ${FEATURE_MODULE_NAME} } from '${FEATURE_MODULE_IMPORT_PATH}';`
        );
        expect(appModule).toContain(
          `import { ${ROOT_MODULE_NAME} } from '${ROOT_FEATURE_MODULE_IMPORT_PATH}';`
        );
      });
    });
    describe('when styling config is provided', () => {
      it('should add it ', async () => {
        const rule = addLibraryFeature(
          appModulePath,
          BASE_OPTIONS,
          BASE_FEATURE_CONFIG
        );
        const result = await schematicRunner
          .callRule(rule, appTree)
          .toPromise();

        expect(result.exists(scssFilePath)).toEqual(true);
        const content = result.read(scssFilePath)?.toString(UTF_8);
        expect(content).toContain(`@import "${FEATURE_MODULE_IMPORT_PATH}";`);
      });
    });
    describe('when styling config is NOT provided', () => {
      it('should not add it ', async () => {
        const rule = addLibraryFeature(appModulePath, BASE_OPTIONS, {
          ...BASE_FEATURE_CONFIG,
          styles: undefined,
        });
        const result = await schematicRunner
          .callRule(rule, appTree)
          .toPromise();

        expect(result.exists(scssFilePath)).toEqual(false);
      });
    });
  });
});
