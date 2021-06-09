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
  CLI_CART_SAVED_CART_FEATURE,
  LibraryOptions as SpartacusCartOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CART,
  validateSpartacusInstallation,
  CLI_CART_VALIDATION_FEATURE
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  CART_FOLDER_NAME,
  CART_SAVED_CART_FEATURE_NAME_CONSTANT,
  CART_SAVED_CART_MODULE_NAME,
  SAVED_CART_MODULE,
  SAVED_CART_ROOT_MODULE,
  SAVED_CART_TRANSLATIONS,
  SAVED_CART_TRANSLATION_CHUNKS_CONFIG,
  SCSS_FILE_NAME,
  SPARTACUS_SAVED_CART,
  SPARTACUS_SAVED_CART_ASSETS,
  SPARTACUS_SAVED_CART_ROOT,
  CART_VALIDATION_MODULE_NAME,
  CART_VALIDATION_MODULE,
  SPARTACUS_CART_VALIDATION,
  CART_VALIDATION_ROOT_MODULE,
  SPARTACUS_CART_VALIDATION_ROOT,
  CART_VALIDATION_FEATURE_NAME_CONSTANT,
  CART_VALIDATION_TRANSLATIONS, CART_VALIDATION_TRANSLATION_CHUNKS_CONFIG, SPARTACUS_CART_VALIDATION_ASSETS,
} from '../constants';

export function addCartFeatures(options: SpartacusCartOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_CART_SAVED_CART_FEATURE, options.features)
        ? addSavedCartFeature(options)
        : noop(),

      shouldAddFeature(CLI_CART_VALIDATION_FEATURE, options.features)
        ? addCartValidationFeature(options)
        : noop(),
    ]);
  };
}

function addSavedCartFeature(options: SpartacusCartOptions): Rule {
  return addLibraryFeature(options, {
    folderName: CART_FOLDER_NAME,
    moduleName: CART_SAVED_CART_MODULE_NAME,
    featureModule: {
      name: SAVED_CART_MODULE,
      importPath: SPARTACUS_SAVED_CART,
    },
    rootModule: {
      name: SAVED_CART_ROOT_MODULE,
      importPath: SPARTACUS_SAVED_CART_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_SAVED_CART_ROOT,
      namedImports: [CART_SAVED_CART_FEATURE_NAME_CONSTANT],
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

function addCartValidationFeature(options: SpartacusCartOptions): Rule {
  return addLibraryFeature(options, {
    folderName: CART_FOLDER_NAME,
    moduleName: CART_VALIDATION_MODULE_NAME,
    featureModule: {
      name: CART_VALIDATION_MODULE,
      importPath: SPARTACUS_CART_VALIDATION,
    },
    rootModule: {
      name: CART_VALIDATION_ROOT_MODULE,
      importPath: SPARTACUS_CART_VALIDATION_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_CART_VALIDATION_ROOT,
      namedImports: [CART_VALIDATION_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: CART_VALIDATION_TRANSLATIONS,
      chunks: CART_VALIDATION_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_CART_VALIDATION_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_CART,
    },
  });
}
