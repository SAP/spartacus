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
  CLI_PICKUP_IN_STORE_FEATURE,
  LibraryOptions as SpartacusPickupInStoreOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_PICKUP_IN_STORE,
  PICKUP_IN_STORE_MODULE,
  PICKUP_IN_STORE_ROOT_MODULE,
  PICKUP_IN_STORE_SCSS_FILE_NAME,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  SPARTACUS_PICKUP_IN_STORE_ASSETS,
  SPARTACUS_PICKUP_IN_STORE_ROOT,
  PICKUP_IN_STORE_FEATURE_NAME_CONSTANT,
  PICKUP_IN_STORE_FOLDER_NAME,
  PICKUP_IN_STORE_MODULE_NAME,
  PICKUP_IN_STORE_TRANSLATIONS,
  PICKUP_IN_STORE_TRANSLATION_CHUNKS_CONFIG,
} from '../constants';

export function addPickupInStoreFeatures(
  options: SpartacusPickupInStoreOptions
): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_PICKUP_IN_STORE_FEATURE, options.features)
        ? addPickupInStoreFeature(options)
        : noop(),
    ]);
  };
}

function addPickupInStoreFeature(options: SpartacusPickupInStoreOptions): Rule {
  return addLibraryFeature(options, {
    folderName: PICKUP_IN_STORE_FOLDER_NAME,
    moduleName: PICKUP_IN_STORE_MODULE_NAME,
    featureModule: {
      name: PICKUP_IN_STORE_MODULE,
      importPath: SPARTACUS_PICKUP_IN_STORE,
    },
    rootModule: {
      name: PICKUP_IN_STORE_ROOT_MODULE,
      importPath: SPARTACUS_PICKUP_IN_STORE_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_PICKUP_IN_STORE_ROOT,
      namedImports: [PICKUP_IN_STORE_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: PICKUP_IN_STORE_TRANSLATIONS,
      chunks: PICKUP_IN_STORE_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_PICKUP_IN_STORE_ASSETS,
    },
    styles: {
      scssFileName: PICKUP_IN_STORE_SCSS_FILE_NAME,
      importStyle: SPARTACUS_PICKUP_IN_STORE,
    },
  });
}
