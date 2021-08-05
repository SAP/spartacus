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
  CLI_CART_IMPORT_EXPORT_FEATURE,
  CLI_CART_SAVED_CART_FEATURE,
  LibraryOptions as SpartacusCartOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CART,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  CART_FOLDER_NAME,
  CART_IMPORT_EXPORT_FEATURE_NAME_CONSTANT,
  CART_IMPORT_EXPORT_MODULE,
  CART_IMPORT_EXPORT_MODULE_NAME,
  CART_IMPORT_EXPORT_ROOT_MODULE,
  CART_IMPORT_EXPORT_TRANSLATION_CHUNKS_CONFIG,
  CART_IMPORT_EXPORT_TRANSLATIONS,
  CART_SAVED_CART_FEATURE_NAME_CONSTANT,
  CART_SAVED_CART_MODULE_NAME,
  SAVED_CART_MODULE,
  SAVED_CART_ROOT_MODULE,
  SAVED_CART_TRANSLATION_CHUNKS_CONFIG,
  SAVED_CART_TRANSLATIONS,
  SCSS_FILE_NAME,
  SPARTACUS_CART_IMPORT_EXPORT,
  SPARTACUS_CART_IMPORT_EXPORT_ASSETS,
  SPARTACUS_CART_IMPORT_EXPORT_ROOT,
  SPARTACUS_SAVED_CART,
  SPARTACUS_SAVED_CART_ASSETS,
  SPARTACUS_SAVED_CART_ROOT,
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

      shouldAddFeature(CLI_CART_IMPORT_EXPORT_FEATURE, options.features)
        ? addCartImportExportFeature(options)
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

function addCartImportExportFeature(options: SpartacusCartOptions): Rule {
  return addLibraryFeature(options, {
    folderName: CART_FOLDER_NAME,
    moduleName: CART_IMPORT_EXPORT_MODULE_NAME,
    featureModule: {
      name: CART_IMPORT_EXPORT_MODULE,
      importPath: SPARTACUS_CART_IMPORT_EXPORT,
    },
    rootModule: {
      name: CART_IMPORT_EXPORT_ROOT_MODULE,
      importPath: SPARTACUS_CART_IMPORT_EXPORT_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_CART_IMPORT_EXPORT_ROOT,
      namedImports: [CART_IMPORT_EXPORT_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: CART_IMPORT_EXPORT_TRANSLATIONS,
      chunks: CART_IMPORT_EXPORT_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_CART_IMPORT_EXPORT_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_CART,
    },
  });
}
