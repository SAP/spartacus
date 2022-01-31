import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  CLI_CART_BASE_FEATURE,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_ORDER_FEATURE,
  LibraryOptions as SpartacusCheckoutOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CART,
  SPARTACUS_CHECKOUT,
  SPARTACUS_CHECKOUT_BASE,
  SPARTACUS_CHECKOUT_BASE_ASSETS,
  SPARTACUS_CHECKOUT_BASE_ROOT,
  SPARTACUS_ORDER,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  CHECKOUT_BASE_FEATURE_NAME_CONSTANT,
  CHECKOUT_BASE_MODULE,
  CHECKOUT_BASE_MODULE_NAME,
  CHECKOUT_BASE_ROOT_MODULE,
  CHECKOUT_BASE_TRANSLATIONS,
  CHECKOUT_BASE_TRANSLATION_CHUNKS_CONFIG,
  CHECKOUT_FOLDER_NAME,
  SCSS_FILE_NAME,
} from '../constants';

export function addCheckoutFeatures(options: SpartacusCheckoutOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_CHECKOUT_BASE_FEATURE, options.features)
        ? addCheckoutBaseFeature(options)
        : noop(),
    ]);
  };
}

function addCheckoutBaseFeature(options: SpartacusCheckoutOptions): Rule {
  return addLibraryFeature(options, {
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
  });
}
