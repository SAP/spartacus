import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  CHECKOUT_BASE_FEATURE_NAME_CONSTANT,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_DIGITAL_PAYMENTS_FEATURE,
  CLI_S4OM_FEATURE, LibraryOptions as SpartacusDigitalPaymentsOptions,
  readPackageJson,
  S4OM_MODULE,
  shouldAddFeature,
  SPARTACUS_CHECKOUT,
  SPARTACUS_CHECKOUT_BASE_ROOT, SPARTACUS_S4OM,
  validateSpartacusInstallation
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  S4OM_FOLDER_NAME,
  S4OM_MODULE_NAME,
  S4OM_TRANSLATIONS,
  S4OM_TRANSLATION_CHUNKS_CONFIG, SPARTACUS_S4OM_ASSETS
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
        ? addS4OM(options)
        : noop(),
    ]);
  };
}

function addS4OM(options: SpartacusDigitalPaymentsOptions): Rule {
  return addLibraryFeature(options, {
    folderName: S4OM_FOLDER_NAME,
    moduleName: S4OM_MODULE_NAME,
    featureModule: {
      name: S4OM_MODULE,
      importPath: SPARTACUS_S4OM,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_CHECKOUT_BASE_ROOT,
      namedImports: [CHECKOUT_BASE_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: S4OM_TRANSLATIONS,
      chunks: S4OM_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_S4OM_ASSETS,
    },
    dependencyManagement: {
      featureName: CLI_S4OM_FEATURE,
      featureDependencies: {
        [SPARTACUS_CHECKOUT]: [CLI_CHECKOUT_BASE_FEATURE],
      },
    },
  });
}
