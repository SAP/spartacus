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
  LibraryOptions as SpartacusCartOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CART,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  CART_FOLDER_NAME,
  CART_SAVED_CART_FEATURE_NAME,
  CLI_SAVED_CART_FEATURE,
  SAVED_CART_MODULE,
  SAVED_CART_ROOT_MODULE,
  SAVED_CART_TRANSLATIONS,
  SAVED_CART_TRANSLATION_CHUNKS_CONFIG,
  SCSS_FILE_NAME,
  SPARTACUS_SAVED_CART,
  SPARTACUS_SAVED_CART_ASSETS,
  SPARTACUS_SAVED_CART_ROOT,
} from '../constants';

export function addCartFeatures(options: SpartacusCartOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(CLI_SAVED_CART_FEATURE, options.features)
        ? addSavedCartFeature(options)
        : noop(),

      addPackageJsonDependenciesForLibrary({
        packageJson,
        context,
        libraryPeerDependencies: peerDependencies,
        options,
      }),
    ]);
  };
}

function addSavedCartFeature(options: SpartacusCartOptions): Rule {
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
