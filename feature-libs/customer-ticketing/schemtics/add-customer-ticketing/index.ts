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
  CUSTOMER_TICKETING_MODULE,
  CUSTOMER_TICKETING_ROOT_MODULE,
  CLI_CUSTOMER_TICKETING_FEATURE,
  LibraryOptions as SpartacusCustomerTicketingOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CUSTOMER_TICKETING,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  CUSTOMER_TICKETING_FEATURE_NAME_CONSTANT,
  CUSTOMER_TICKETING_FOLDER_NAME,
  CUSTOMER_TICKETING_MODULE_NAME,
  CUSTOMER_TICKETING_TRANSLATIONS,
  CUSTOMER_TICKETING_TRANSLATION_CHUNKS_CONFIG,
  SPARTACUS_CUSTOMER_TICKETING_ASSETS,
  SPARTACUS_CUSTOMER_TICKETING_ROOT,
  CUSTOMER_TICKETING_SCSS_FILE_NAME,
} from '../constants';

export function addCustomerTicketingFeatures(options: SpartacusCustomerTicketingOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_CUSTOMER_TICKETING_FEATURE, options.features)
        ? addCustomerTicketingFeature(options)
        : noop(),
    ]);
  };
}

function addCustomerTicketingFeature(options: SpartacusCustomerTicketingOptions): Rule {
  return addLibraryFeature(options, {
    folderName: CUSTOMER_TICKETING_FOLDER_NAME,
    moduleName: CUSTOMER_TICKETING_MODULE_NAME,
    featureModule: {
      name: CUSTOMER_TICKETING_MODULE,
      importPath: SPARTACUS_CUSTOMER_TICKETING,
    },
    rootModule: {
      name: CUSTOMER_TICKETING_ROOT_MODULE,
      importPath: SPARTACUS_CUSTOMER_TICKETING_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_CUSTOMER_TICKETING_ROOT,
      namedImports: [CUSTOMER_TICKETING_FEATURE_NAME_CONSTANT],
    },
    styles: {
      scssFileName: CUSTOMER_TICKETING_SCSS_FILE_NAME,
      importStyle: SPARTACUS_CUSTOMER_TICKETING,
    },
    i18n: {
      resources: CUSTOMER_TICKETING_TRANSLATIONS,
      chunks: CUSTOMER_TICKETING_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_CUSTOMER_TICKETING_ASSETS,
    },
  });
}
