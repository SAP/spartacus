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
  CHECKOUT_BASE_FEATURE_NAME_CONSTANT,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_DIGITAL_PAYMENTS_FEATURE,
  DIGITAL_PAYMENTS_MODULE,
  LibraryOptions as SpartacusDigitalPaymentsOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CHECKOUT,
  SPARTACUS_CHECKOUT_BASE_ROOT,
  SPARTACUS_DIGITAL_PAYMENTS,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  DIGITAL_PAYMENTS_FOLDER_NAME,
  DIGITAL_PAYMENTS_MODULE_NAME,
  DIGITAL_PAYMENTS_TRANSLATIONS,
  DIGITAL_PAYMENTS_TRANSLATION_CHUNKS_CONFIG,
  SPARTACUS_DIGITAL_PAYMENTS_ASSETS,
} from '../constants';

export function addDigitalPaymentsFeature(
  options: SpartacusDigitalPaymentsOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_DIGITAL_PAYMENTS_FEATURE, options.features)
        ? addDigitalPayments(options)
        : noop(),
    ]);
  };
}

function addDigitalPayments(options: SpartacusDigitalPaymentsOptions): Rule {
  return addLibraryFeature(options, {
    folderName: DIGITAL_PAYMENTS_FOLDER_NAME,
    moduleName: DIGITAL_PAYMENTS_MODULE_NAME,
    featureModule: {
      name: DIGITAL_PAYMENTS_MODULE,
      importPath: SPARTACUS_DIGITAL_PAYMENTS,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_CHECKOUT_BASE_ROOT,
      namedImports: [CHECKOUT_BASE_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: DIGITAL_PAYMENTS_TRANSLATIONS,
      chunks: DIGITAL_PAYMENTS_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_DIGITAL_PAYMENTS_ASSETS,
    },
    dependencyManagement: {
      featureName: CLI_DIGITAL_PAYMENTS_FEATURE,
      featureDependencies: {
        [SPARTACUS_CHECKOUT]: [CLI_CHECKOUT_BASE_FEATURE],
      },
    },
  });
}
