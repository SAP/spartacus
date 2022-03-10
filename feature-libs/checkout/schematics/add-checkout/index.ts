import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addFeatureTranslations,
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  CHECKOUT_B2B_MODULE,
  CHECKOUT_B2B_ROOT_MODULE,
  CHECKOUT_BASE_FEATURE_NAME_CONSTANT,
  CHECKOUT_BASE_MODULE,
  CHECKOUT_BASE_MODULE_NAME,
  CHECKOUT_BASE_ROOT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
  CLI_CART_BASE_FEATURE,
  CLI_CHECKOUT_B2B_FEATURE,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
  CLI_ORDER_FEATURE,
  configureB2bFeatures,
  FeatureConfig,
  LibraryOptions as SpartacusCheckoutOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CART,
  SPARTACUS_CHECKOUT,
  SPARTACUS_CHECKOUT_B2B,
  SPARTACUS_CHECKOUT_B2B_ASSETS,
  SPARTACUS_CHECKOUT_B2B_ROOT,
  SPARTACUS_CHECKOUT_BASE,
  SPARTACUS_CHECKOUT_BASE_ASSETS,
  SPARTACUS_CHECKOUT_BASE_ROOT,
  SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT,
  SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ASSETS,
  SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT,
  SPARTACUS_ORDER,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  CHECKOUT_B2B_TRANSLATIONS,
  CHECKOUT_B2B_TRANSLATION_CHUNKS_CONFIG,
  CHECKOUT_BASE_TRANSLATIONS,
  CHECKOUT_BASE_TRANSLATION_CHUNKS_CONFIG,
  CHECKOUT_FOLDER_NAME,
  CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATIONS,
  CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATION_CHUNKS_CONFIG,
  SCSS_FILE_NAME,
} from '../constants';

const checkoutBaseFeatureConfig: FeatureConfig = {
  folderName: CHECKOUT_FOLDER_NAME,
  moduleName: CHECKOUT_BASE_MODULE_NAME,
  featureModule: {
    name: CHECKOUT_BASE_MODULE,
    importPath: SPARTACUS_CHECKOUT_BASE,
  },
  rootModule: {
    name: CHECKOUT_BASE_ROOT_MODULE,
    importPath: SPARTACUS_CHECKOUT_BASE_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CHECKOUT_BASE_ROOT,
    namedImports: [CHECKOUT_BASE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: CHECKOUT_BASE_TRANSLATIONS,
    chunks: CHECKOUT_BASE_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CHECKOUT_BASE_ASSETS,
  },
  styles: {
    scssFileName: SCSS_FILE_NAME,
    importStyle: SPARTACUS_CHECKOUT,
  },
  dependencyManagement: {
    featureName: CLI_CHECKOUT_BASE_FEATURE,
    featureDependencies: {
      [SPARTACUS_CART]: [CLI_CART_BASE_FEATURE],
      [SPARTACUS_ORDER]: [CLI_ORDER_FEATURE],
    },
  },
  recreate: true,
};

const checkoutB2bFeatureConfig: FeatureConfig = {
  folderName: CHECKOUT_FOLDER_NAME,
  moduleName: CHECKOUT_BASE_MODULE_NAME,
  featureModule: {
    name: CHECKOUT_B2B_MODULE,
    importPath: SPARTACUS_CHECKOUT_B2B,
  },
  rootModule: {
    name: CHECKOUT_B2B_ROOT_MODULE,
    importPath: SPARTACUS_CHECKOUT_B2B_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CHECKOUT_BASE_ROOT,
    namedImports: [CHECKOUT_BASE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: CHECKOUT_B2B_TRANSLATIONS,
    chunks: CHECKOUT_B2B_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CHECKOUT_B2B_ASSETS,
  },
  styles: {
    scssFileName: SCSS_FILE_NAME,
    importStyle: SPARTACUS_CHECKOUT,
  },
  dependencyManagement: {
    featureName: CLI_CHECKOUT_B2B_FEATURE,
    featureDependencies: {
      [SPARTACUS_CART]: [CLI_CART_BASE_FEATURE],
      [SPARTACUS_ORDER]: [CLI_ORDER_FEATURE],
    },
  },
  recreate: true,
};

const checkoutScheduleReplenishmentFeatureConfig: FeatureConfig = {
  folderName: CHECKOUT_FOLDER_NAME,
  moduleName: CHECKOUT_BASE_MODULE_NAME,
  featureModule: {
    name: CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
    importPath: SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT,
  },
  rootModule: {
    name: CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
    importPath: SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_CHECKOUT_BASE_ROOT,
    namedImports: [CHECKOUT_BASE_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATIONS,
    chunks: CHECKOUT_SCHEDULED_REPLENISHMENT_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_CHECKOUT_SCHEDULED_REPLENISHMENT_ASSETS,
  },
  styles: {
    scssFileName: SCSS_FILE_NAME,
    importStyle: SPARTACUS_CHECKOUT,
  },
  dependencyManagement: {
    featureName: CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
    featureDependencies: {
      [SPARTACUS_CART]: [CLI_CART_BASE_FEATURE],
      [SPARTACUS_ORDER]: [CLI_ORDER_FEATURE],
    },
  },
  recreate: true,
};

export function addCheckoutFeatures(options: SpartacusCheckoutOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      determineCheckoutFeatures(options, packageJson),
    ]);
  };
}

function determineCheckoutFeatures(
  options: SpartacusCheckoutOptions,
  packageJson: any
): Rule {
  if (
    shouldAddFeature(
      CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
      options.features
    )
  ) {
    return chain([
      addLibraryFeature(options, checkoutScheduleReplenishmentFeatureConfig),
      addFeatureTranslations(options, checkoutBaseFeatureConfig),
      addFeatureTranslations(options, checkoutB2bFeatureConfig),

      configureB2bFeatures(options, packageJson),
    ]);
  }

  if (shouldAddFeature(CLI_CHECKOUT_B2B_FEATURE, options.features)) {
    return chain([
      addLibraryFeature(options, checkoutB2bFeatureConfig),
      addFeatureTranslations(options, checkoutBaseFeatureConfig),

      configureB2bFeatures(options, packageJson),
    ]);
  }

  if (shouldAddFeature(CLI_CHECKOUT_BASE_FEATURE, options.features)) {
    return addLibraryFeature(options, checkoutBaseFeatureConfig);
  }

  return noop();
}
