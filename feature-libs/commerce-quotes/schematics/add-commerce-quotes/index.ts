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
  CLI_COMMERCE_QUOTES_FEATURE,
  COMMERCE_QUOTES_MODULE,
  COMMERCE_QUOTES_ROOT_MODULE,
  LibraryOptions as SpartacusCommerceQuotesOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_COMMERCE_QUOTES,
  STORE_FINDER_SCSS_FILE_NAME,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  COMMERCE_QUOTES_FEATURE_NAME_CONSTANT,
  COMMERCE_QUOTES_FOLDER_NAME,
  COMMERCE_QUOTES_MODULE_NAME,
  COMMERCE_QUOTES_TRANSLATIONS,
  COMMERCE_QUOTES_TRANSLATION_CHUNKS_CONFIG,
  SPARTACUS_COMMERCE_QUOTES_ASSETS,
  SPARTACUS_COMMERCE_QUOTES_ROOT,
} from '../constants';

export function addCommerceQuotesFeatures(
  options: SpartacusCommerceQuotesOptions
): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_COMMERCE_QUOTES_FEATURE, options.features)
        ? addCommerceQuotesFeature(options)
        : noop(),
    ]);
  };
}

function addCommerceQuotesFeature(options: SpartacusCommerceQuotesOptions): Rule {
  return addLibraryFeature(options, {
    folderName: COMMERCE_QUOTES_FOLDER_NAME,
    moduleName: COMMERCE_QUOTES_MODULE_NAME,
    featureModule: {
      name: COMMERCE_QUOTES_MODULE,
      importPath: SPARTACUS_COMMERCE_QUOTES,
    },
    rootModule: {
      name: COMMERCE_QUOTES_ROOT_MODULE,
      importPath: SPARTACUS_COMMERCE_QUOTES_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_COMMERCE_QUOTES_ROOT,
      namedImports: [COMMERCE_QUOTES_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: COMMERCE_QUOTES_TRANSLATIONS,
      chunks: COMMERCE_QUOTES_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_COMMERCE_QUOTES_ASSETS,
    },
    styles: {
      scssFileName: STORE_FINDER_SCSS_FILE_NAME,
      importStyle: SPARTACUS_COMMERCE_QUOTES,
    },
  });
}
