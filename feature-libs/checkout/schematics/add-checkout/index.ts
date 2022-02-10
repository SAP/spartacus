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
  CLI_CHECKOUT_FEATURE,
  CLI_USER_ACCOUNT_FEATURE,
  LibraryOptions as SpartacusCheckoutOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CHECKOUT,
  SPARTACUS_USER,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  CHECKOUT_FEATURE_NAME_CONSTANT,
  CHECKOUT_FOLDER_NAME,
  CHECKOUT_MODULE,
  CHECKOUT_MODULE_NAME,
  CHECKOUT_ROOT_MODULE,
  CHECKOUT_TRANSLATIONS,
  CHECKOUT_TRANSLATION_CHUNKS_CONFIG,
  SCSS_FILE_NAME,
  SPARTACUS_CHECKOUT_ASSETS,
  SPARTACUS_CHECKOUT_ROOT,
} from '../constants';

export function addCheckoutFeatures(options: SpartacusCheckoutOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_CHECKOUT_FEATURE, options.features)
        ? addSavedCheckoutFeature(options)
        : noop(),
    ]);
  };
}

function addSavedCheckoutFeature(options: SpartacusCheckoutOptions): Rule {
  return addLibraryFeature(options, {
    folderName: CHECKOUT_FOLDER_NAME,
    moduleName: CHECKOUT_MODULE_NAME,
    featureModule: {
      name: CHECKOUT_MODULE,
      importPath: SPARTACUS_CHECKOUT,
    },
    rootModule: {
      name: CHECKOUT_ROOT_MODULE,
      importPath: SPARTACUS_CHECKOUT_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_CHECKOUT_ROOT,
      namedImports: [CHECKOUT_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: CHECKOUT_TRANSLATIONS,
      chunks: CHECKOUT_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_CHECKOUT_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_CHECKOUT,
    },
    dependencyManagement: {
      featureName: CLI_CHECKOUT_FEATURE,
      featureDependencies: {
        [SPARTACUS_USER]: [CLI_USER_ACCOUNT_FEATURE],
      },
    },
  });
}
