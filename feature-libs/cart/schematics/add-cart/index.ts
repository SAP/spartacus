import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  LibraryOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CART,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import {
  CART_FOLDER_NAME,
  CART_SAVED_CART_FEATURE_NAME,
  CLI_QUICK_ORDER_FEATURE,
  CLI_SAVED_CART_FEATURE,
  QUICK_ORDER_FEATURE_NAME,
  QUICK_ORDER_MODULE,
  QUICK_ORDER_ROOT_MODULE,
  QUICK_ORDER_TRANSLATION_CHUNKS_CONFIG,
  QUICK_ORDER_TRANSLATIONS,
  SAVED_CART_MODULE,
  SAVED_CART_ROOT_MODULE,
  SAVED_CART_TRANSLATION_CHUNKS_CONFIG,
  SAVED_CART_TRANSLATIONS,
  SCSS_FILE_NAME,
  SPARTACUS_QUICK_ORDER_ASSETS,
  SPARTACUS_QUICK_ORDER_ROOT,
  SPARTACUS_QUICK_ORDER,
  SPARTACUS_SAVED_CART_ASSETS,
  SPARTACUS_SAVED_CART_ROOT,
  SPARTACUS_SAVED_CART,
} from '../constants';

export function addCartFeatures(options: LibraryOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(CLI_SAVED_CART_FEATURE, options.features)
        ? addSavedCartFeature(options)
        : noop(),
      shouldAddFeature(CLI_QUICK_ORDER_FEATURE, options.features)
        ? addQuickOrderFeature(options)
        : noop(),
    ]);
  };
}

function addSavedCartFeature(options: LibraryOptions): Rule {
  return addLibraryFeature(options, {
    folderName: CART_FOLDER_NAME,
    name: CART_SAVED_CART_FEATURE_NAME,
    featureModule: {
      name: SAVED_CART_MODULE,
      importPath: SPARTACUS_SAVED_CART,
    },
    rootModule: {
      name: SAVED_CART_ROOT_MODULE,
      importPath: SPARTACUS_SAVED_CART_ROOT,
    },
    i18n: {
      resources: SAVED_CART_TRANSLATIONS,
      chunks: SAVED_CART_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_SAVED_CART_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_CART,
    },
  });
}

function addQuickOrderFeature(options: LibraryOptions): Rule {
  return addLibraryFeature(options, {
    folderName: CART_FOLDER_NAME,
    name: QUICK_ORDER_FEATURE_NAME,
    featureModule: {
      name: QUICK_ORDER_MODULE,
      importPath: SPARTACUS_QUICK_ORDER,
    },
    rootModule: {
      name: QUICK_ORDER_ROOT_MODULE,
      importPath: SPARTACUS_QUICK_ORDER_ROOT,
    },
    i18n: {
      resources: QUICK_ORDER_TRANSLATIONS,
      chunks: QUICK_ORDER_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_QUICK_ORDER_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_CART,
    },
  });
}
