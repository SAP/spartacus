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
  CLI_ORDER_FEATURE,
  CLI_USER_ACCOUNT_FEATURE,
  LibraryOptions as SpartacusOrderOptions,
  ORDER_MODULE,
  ORDER_ROOT_MODULE,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CART,
  SPARTACUS_ORDER,
  SPARTACUS_USER,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  ORDER_FEATURE_NAME_CONSTANT,
  ORDER_FOLDER_NAME,
  ORDER_MODULE_NAME,
  ORDER_TRANSLATIONS,
  ORDER_TRANSLATION_CHUNKS_CONFIG,
  SCSS_FILE_NAME,
  SPARTACUS_ORDER_ASSETS,
  SPARTACUS_ORDER_ROOT,
} from '../constants';

export function addOrderFeatures(options: SpartacusOrderOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_ORDER_FEATURE, options.features)
        ? addOrderFeature(options)
        : noop(),
    ]);
  };
}

function addOrderFeature(options: SpartacusOrderOptions): Rule {
  return addLibraryFeature(options, {
    folderName: ORDER_FOLDER_NAME,
    moduleName: ORDER_MODULE_NAME,
    featureModule: {
      name: ORDER_MODULE,
      importPath: SPARTACUS_ORDER,
    },
    rootModule: {
      name: ORDER_ROOT_MODULE,
      importPath: SPARTACUS_ORDER_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_ORDER_ROOT,
      namedImports: [ORDER_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: ORDER_TRANSLATIONS,
      chunks: ORDER_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_ORDER_ASSETS,
    },
    styles: {
      scssFileName: SCSS_FILE_NAME,
      importStyle: SPARTACUS_ORDER,
    },
    dependencyManagement: {
      featureName: CLI_ORDER_FEATURE,
      featureDependencies: {
        [SPARTACUS_CART]: [CLI_CART_BASE_FEATURE],
        [SPARTACUS_USER]: [CLI_USER_ACCOUNT_FEATURE],
      },
    },
  });
}
