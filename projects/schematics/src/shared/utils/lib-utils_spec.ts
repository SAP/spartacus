import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { firstValueFrom } from 'rxjs';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { CDS_CONFIG, UTF_8 } from '../constants';
import {
  SPARTACUS_CART,
  SPARTACUS_CDS,
  SPARTACUS_CHECKOUT,
  SPARTACUS_ORDER,
} from '../libs-constants';
import {
  LibraryOptions,
  SchematicConfig,
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  shouldAddFeature,
} from './lib-utils';

const xxxFeaturePath = `src/app/spartacus/features/xxx/xxx-feature.module.ts`;

describe('Lib utils', () => {
  const schematicRunner = new SchematicTestRunner(
    'schematics',
    path.join(__dirname, '../../collection.json')
  );

  let appTree: Tree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
    standalone: false,
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

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

  const STYLES_CONFIG_IMPORT = '@import "../../styles-config";';
  const STYLES_CONFIG_FILE_PATH = 'src/styles-config.scss';

  const FEATURE_MODULE_STYLE_IMPORT = `@import "${FEATURE_MODULE_IMPORT_PATH}";`;

  const scssFilePath = `src/styles/spartacus/${SCSS_FILE_NAME}`;

  const BASE_FEATURE_CONFIG: SchematicConfig = {
    library: {
      featureName: CLI_FEATURE_NAME,
      mainScope: FEATURE_MODULE_IMPORT_PATH,
    },
    folderName: FEATURE_FOLDER_NAME,
    moduleName: FEATURE_NAME,
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

  const CHECKOUT_FEATURE_CONFIG: SchematicConfig = {
    library: {
      featureName: 'checkout',
      mainScope: '@spartacus/checkout',
      featureScope: '@spartacus/checkout/base',
    },
    folderName: 'checkout',
    moduleName: 'Checkout',
    featureModule: {
      name: 'CheckoutModule',
      importPath: '@spartacus/checkout/base',
    },
    rootModule: {
      name: 'CheckoutRootModule',
      importPath: '@spartacus/checkout/base/root',
    },
  };
  const CHECKOUT_OPTIONS: LibraryOptions = {
    project: 'schematics-test',
    features: ['checkout-base-cli'],
    lazy: true,
  };

  beforeEach(async () => {
    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );

    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      appTree
    );

    appTree = await schematicRunner.runSchematic(
      'add-spartacus',
      { ...spartacusDefaultOptions, name: 'schematics-test' },
      appTree
    );
  });

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
    it('should add i18n config in feature module', async () => {
      appTree = await firstValueFrom(
        schematicRunner.callRule(
          addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG),
          appTree
        )
      );

      expect(appTree.read(xxxFeaturePath)?.toString(UTF_8)).toMatchSnapshot();
    });
    it('should NOT add i18n if the config is not present', async () => {
      const featureConfig: SchematicConfig = {
        ...BASE_FEATURE_CONFIG,
        i18n: undefined,
      };
      appTree = await firstValueFrom(
        schematicRunner.callRule(
          addLibraryFeature(BASE_OPTIONS, featureConfig),
          appTree
        )
      );

      expect(appTree.read(xxxFeaturePath)?.toString(UTF_8)).toMatchSnapshot();
    });
    describe('when the lazy loading is configured', () => {
      it('should add it in the lazy loading way', async () => {
        appTree = await firstValueFrom(
          schematicRunner.callRule(
            addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG),
            appTree
          )
        );

        expect(appTree.read(xxxFeaturePath)?.toString(UTF_8)).toMatchSnapshot();
      });
    });
    describe('when the eager loading is configured', () => {
      it('should add it in the eager way', async () => {
        const rule = addLibraryFeature(
          { ...BASE_OPTIONS, lazy: false },
          BASE_FEATURE_CONFIG
        );
        appTree = await firstValueFrom(schematicRunner.callRule(rule, appTree));

        expect(appTree.read(xxxFeaturePath)?.toString(UTF_8)).toMatchSnapshot();
      });
    });
    describe('custom config option', () => {
      it('should add the custom config when set', async () => {
        const featureConfig: SchematicConfig = {
          ...BASE_FEATURE_CONFIG,
          customConfig: () => ({
            providers: {
              import: [
                {
                  moduleSpecifier: SPARTACUS_CDS,
                  namedImports: [CDS_CONFIG],
                },
              ],
              content: `<${CDS_CONFIG}>{
              cds: {
                profileTag: {
                  javascriptUrl:
                    'random',
                  configUrl:
                    'random',
                  allowInsecureCookies: true,
                },
              },
            }`,
            },
          }),
        };
        appTree = await firstValueFrom(
          schematicRunner.callRule(
            addLibraryFeature(BASE_OPTIONS, featureConfig),
            appTree
          )
        );

        expect(appTree.read(xxxFeaturePath)?.toString(UTF_8)).toMatchSnapshot();
      });
    });
    describe('assets options', () => {
      it('should update angular.json file with assets', async () => {
        // before
        expect(appTree.read('angular.json')?.toString(UTF_8)).toMatchSnapshot();

        const featureConfig: SchematicConfig = {
          ...BASE_FEATURE_CONFIG,
          assets: {
            input: 'smartedit/assets',
            glob: '**/*',
          },
        };
        appTree = await firstValueFrom(
          schematicRunner.callRule(
            addLibraryFeature(BASE_OPTIONS, featureConfig),
            appTree
          )
        );

        // after
        expect(appTree.read('angular.json')?.toString(UTF_8)).toMatchSnapshot();
      });
    });
    describe('style', () => {
      describe('when the library style file name is provided in the config', () => {
        describe('and the scss file does NOT exist', () => {
          it('should add it', async () => {
            const rule = addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG);
            appTree = await firstValueFrom(
              schematicRunner.callRule(rule, appTree)
            );

            expect(appTree.exists(scssFilePath)).toEqual(true);
            const content = appTree.read(scssFilePath)?.toString(UTF_8);
            expect(content).toEqual(
              `${STYLES_CONFIG_IMPORT}\n${FEATURE_MODULE_STYLE_IMPORT}\n`
            );
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
            appTree = await firstValueFrom(
              schematicRunner.callRule(rule, appTree)
            );

            expect(appTree.exists(scssFilePath)).toEqual(true);
            const content = appTree.read(scssFilePath)?.toString(UTF_8);
            expect(content).toEqual(`${FEATURE_MODULE_STYLE_IMPORT}`);
          });
        });
        describe('and the scss file with a different content already exists', () => {
          const randomContent = `@import "@random/xxx";`;
          beforeEach(() => {
            appTree.create(scssFilePath, randomContent);
          });
          it('should append it', async () => {
            const rule = addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG);
            appTree = await firstValueFrom(
              schematicRunner.callRule(rule, appTree)
            );

            expect(appTree.exists(scssFilePath)).toEqual(true);
            const content = appTree.read(scssFilePath)?.toString(UTF_8);
            expect(content).toEqual(
              `${randomContent}\n@import "${FEATURE_MODULE_IMPORT_PATH}";`
            );
          });
        });
      });
      describe('When the library style file name is NOT provided in the config', () => {
        it('should not add it', async () => {
          const rule = addLibraryFeature(BASE_OPTIONS, {
            ...BASE_FEATURE_CONFIG,
            styles: undefined,
          });
          appTree = await firstValueFrom(
            schematicRunner.callRule(rule, appTree)
          );

          expect(appTree.exists(scssFilePath)).toEqual(false);
        });
      });

      describe('When the global style config file exists, ', () => {
        it('import the global style config file in the library style file', async () => {
          expect(appTree.exists(STYLES_CONFIG_FILE_PATH)).toEqual(true);
          const rule = addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG);
          appTree = await firstValueFrom(
            schematicRunner.callRule(rule, appTree)
          );

          expect(appTree.exists(scssFilePath)).toEqual(true);
          const content = appTree.read(scssFilePath)?.toString(UTF_8);
          expect(content?.startsWith(`${STYLES_CONFIG_IMPORT}\n`)).toBeTruthy();
        });
      });

      describe('When the global style config file does NOT exists, ', () => {
        it('Do NOT import the global style config file in the library style file', async () => {
          expect(appTree.exists(STYLES_CONFIG_FILE_PATH)).toEqual(true);
          appTree.delete(STYLES_CONFIG_FILE_PATH);
          const rule = addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG);
          appTree = await firstValueFrom(
            schematicRunner.callRule(rule, appTree)
          );

          expect(appTree.exists(scssFilePath)).toEqual(true);
          const content = appTree.read(scssFilePath)?.toString(UTF_8);
          expect(content?.startsWith(`${STYLES_CONFIG_IMPORT}\n`)).toBeFalsy();
        });
      });
    });
  });

  describe('addPackageJsonDependenciesForLibrary', () => {
    beforeEach(async () => {
      appTree = await firstValueFrom(
        schematicRunner.callRule(
          addLibraryFeature(CHECKOUT_OPTIONS, CHECKOUT_FEATURE_CONFIG),
          appTree
        )
      );
    });

    it('checkout', async () => {
      const peerDependencies: Record<string, string> = {
        [SPARTACUS_ORDER]: '4.1.0-next.0',
        [SPARTACUS_CART]: '4.1.0-next.0',
        [SPARTACUS_CHECKOUT]: '4.1.0-next.0',
      };

      await schematicRunner
        .callRule(
          addPackageJsonDependenciesForLibrary(
            peerDependencies,
            CHECKOUT_OPTIONS
          ),
          appTree
        )
        .toPromise();

      const packageJson = JSON.parse(
        appTree.read('package.json')?.toString(UTF_8) ?? ''
      ).dependencies as Record<string, string>;

      expect(packageJson[SPARTACUS_ORDER]).toBeTruthy();
      expect(packageJson[SPARTACUS_CART]).toBeTruthy();
      expect(packageJson[SPARTACUS_CHECKOUT]).toBeTruthy();
    });
  });
});
