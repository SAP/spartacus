import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { CDS_CONFIG, UTF_8 } from '../constants';
import {
  SPARTACUS_CART,
  SPARTACUS_CDS,
  SPARTACUS_CHECKOUT,
  SPARTACUS_FEATURES_MODULE,
  SPARTACUS_ORDER,
} from '../libs-constants';
import {
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  FeatureConfig,
  LibraryOptions,
  // TODO:#schematics - remove?
  // orderInstalledFeatures,
  shouldAddFeature,
} from './lib-utils';

const xxxFeaturePath = `src/app/spartacus/features/xxx/xxx-feature.module.ts`;
const spartacusFeaturesPath = `src/app/spartacus/${SPARTACUS_FEATURES_MODULE}.module.ts`;

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

  const scssFilePath = `src/styles/spartacus/${SCSS_FILE_NAME}`;

  const BASE_FEATURE_CONFIG: FeatureConfig = {
    library: {
      cli: CLI_FEATURE_NAME,
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

  const DP_FEATURE_CONFIG: FeatureConfig = {
    library: {
      cli: 'dp',
      mainScope: '@spartacus/digital-payments',
    },
    folderName: 'dp',
    moduleName: 'DigitalPayments',
    featureModule: {
      name: 'DigitalPaymentsModule',
      importPath: '@spartacus/digital-payments',
    },
  };
  const DP_OPTIONS: LibraryOptions = {
    project: 'schematics-test',
    features: ['dp-cli'],
    lazy: true,
  };

  const CHECKOUT_FEATURE_CONFIG: FeatureConfig = {
    library: {
      cli: 'checkout',
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

  const CART_FEATURE_CONFIG: FeatureConfig = {
    library: {
      cli: 'cart',
      mainScope: '@spartacus/cart',
      featureScope: '@spartacus/cart/base',
    },
    folderName: 'cart',
    moduleName: 'Cart',
    featureModule: {
      name: 'CartBaseModule',
      importPath: '@spartacus/cart/base',
    },
    rootModule: {
      name: 'CartBaseRootModule',
      importPath: '@spartacus/cart/base/root',
    },
  };
  const CART_OPTIONS: LibraryOptions = {
    project: 'schematics-test',
    features: ['cart-cli'],
    lazy: true,
  };

  const USER_PROFILE_FEATURE_CONFIG: FeatureConfig = {
    library: {
      cli: 'user-profile',
      mainScope: '@spartacus/user',
    },
    folderName: 'user',
    moduleName: 'UserProfile',
    featureModule: {
      name: 'UserProfileModule',
      importPath: '@spartacus/user',
    },
    rootModule: {
      name: 'UserProfileRootModule',
      importPath: '@spartacus/user/root',
    },
  };
  const USER_PROFILE_OPTIONS: LibraryOptions = {
    project: 'schematics-test',
    features: ['user-profile-cli'],
    lazy: true,
  };

  const ORDER_FEATURE_CONFIG: FeatureConfig = {
    library: {
      cli: 'order',
      mainScope: '@spartacus/order',
    },
    folderName: 'order',
    moduleName: 'Order',
    featureModule: {
      name: 'OrderModule',
      importPath: '@spartacus/order',
    },
    rootModule: {
      name: 'OrderRootModule',
      importPath: '@spartacus/order/root',
    },
  };
  const ORDER_OPTIONS: LibraryOptions = {
    project: 'schematics-test',
    features: ['order-cli'],
    lazy: true,
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
      appTree = await schematicRunner
        .callRule(addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG), appTree)
        .toPromise();

      expect(appTree.read(xxxFeaturePath)?.toString(UTF_8)).toMatchSnapshot();
    });
    it('should NOT add i18n if the config is not present', async () => {
      const featureConfig: FeatureConfig = {
        ...BASE_FEATURE_CONFIG,
        i18n: undefined,
      };
      appTree = await schematicRunner
        .callRule(addLibraryFeature(BASE_OPTIONS, featureConfig), appTree)
        .toPromise();

      expect(appTree.read(xxxFeaturePath)?.toString(UTF_8)).toMatchSnapshot();
    });
    describe('when the lazy loading is configured', () => {
      it('should add it in the lazy loading way', async () => {
        appTree = await schematicRunner
          .callRule(
            addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG),
            appTree
          )
          .toPromise();

        expect(appTree.read(xxxFeaturePath)?.toString(UTF_8)).toMatchSnapshot();
      });
    });
    describe('when the eager loading is configured', () => {
      it('should add it in the eager way', async () => {
        const rule = addLibraryFeature(
          { ...BASE_OPTIONS, lazy: false },
          BASE_FEATURE_CONFIG
        );
        appTree = await schematicRunner.callRule(rule, appTree).toPromise();

        expect(appTree.read(xxxFeaturePath)?.toString(UTF_8)).toMatchSnapshot();
      });
    });
    describe('custom config option', () => {
      it('should add the custom config when set', async () => {
        const featureConfig: FeatureConfig = {
          ...BASE_FEATURE_CONFIG,
          customConfig: {
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
        };
        appTree = await schematicRunner
          .callRule(addLibraryFeature(BASE_OPTIONS, featureConfig), appTree)
          .toPromise();

        expect(appTree.read(xxxFeaturePath)?.toString(UTF_8)).toMatchSnapshot();
      });
    });
    describe('assets options', () => {
      it('should update angular.json file with assets', async () => {
        // before
        expect(appTree.read('angular.json')?.toString(UTF_8)).toMatchSnapshot();

        const featureConfig: FeatureConfig = {
          ...BASE_FEATURE_CONFIG,
          assets: {
            input: 'smartedit/assets',
            glob: '**/*',
          },
        };
        appTree = await schematicRunner
          .callRule(addLibraryFeature(BASE_OPTIONS, featureConfig), appTree)
          .toPromise();

        // after
        expect(appTree.read('angular.json')?.toString(UTF_8)).toMatchSnapshot();
      });
    });
    describe('style', () => {
      describe('when style config is provided', () => {
        describe('and the scss file does NOT exist', () => {
          it('should add it', async () => {
            const rule = addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG);
            appTree = await schematicRunner.callRule(rule, appTree).toPromise();

            expect(appTree.exists(scssFilePath)).toEqual(true);
            const content = appTree.read(scssFilePath)?.toString(UTF_8);
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
            appTree = await schematicRunner.callRule(rule, appTree).toPromise();

            expect(appTree.exists(scssFilePath)).toEqual(true);
            const content = appTree.read(scssFilePath)?.toString(UTF_8);
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
            appTree = await schematicRunner.callRule(rule, appTree).toPromise();

            expect(appTree.exists(scssFilePath)).toEqual(true);
            const content = appTree.read(scssFilePath)?.toString(UTF_8);
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
          appTree = await schematicRunner.callRule(rule, appTree).toPromise();

          expect(appTree.exists(scssFilePath)).toEqual(false);
        });
      });
    });
  });

  describe('addPackageJsonDependenciesForLibrary', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .callRule(
          addLibraryFeature(CHECKOUT_OPTIONS, CHECKOUT_FEATURE_CONFIG),
          appTree
        )
        .toPromise();
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

  describe('feature ordering', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .callRule(addLibraryFeature(BASE_OPTIONS, BASE_FEATURE_CONFIG), appTree)
        .toPromise();
      appTree = await schematicRunner
        .callRule(addLibraryFeature(DP_OPTIONS, DP_FEATURE_CONFIG), appTree)
        .toPromise();
      appTree = await schematicRunner
        .callRule(
          addLibraryFeature(CHECKOUT_OPTIONS, CHECKOUT_FEATURE_CONFIG),
          appTree
        )
        .toPromise();
      appTree = await schematicRunner
        .callRule(addLibraryFeature(CART_OPTIONS, CART_FEATURE_CONFIG), appTree)
        .toPromise();
      appTree = await schematicRunner
        .callRule(
          addLibraryFeature(USER_PROFILE_OPTIONS, USER_PROFILE_FEATURE_CONFIG),
          appTree
        )
        .toPromise();
      appTree = await schematicRunner
        .callRule(
          addLibraryFeature(ORDER_OPTIONS, ORDER_FEATURE_CONFIG),
          appTree
        )
        .toPromise();

      // TODO:#schematics - enable?
      // tree = await schematicRunner
      //   .callRule(orderInstalledFeatures(spartacusDefaultOptions), tree)
      //   .toPromise();
    });

    it('should appropriately order the feature modules', () => {
      expect(
        appTree.read(spartacusFeaturesPath)?.toString(UTF_8)
      ).toMatchSnapshot();
    });
  });
});
