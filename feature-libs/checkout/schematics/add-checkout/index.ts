import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addFeatureTranslations,
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  CHECKOUT_B2B_SCHEMATICS_CONFIG,
  CHECKOUT_BASE_SCHEMATICS_CONFIG,
  CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG,
  CLI_CHECKOUT_B2B_FEATURE,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
  configureB2bFeatures,
  LibraryOptions as SpartacusCheckoutOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addCheckoutFeatures(options: SpartacusCheckoutOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      determineCheckoutFeatures(options, packageJson),
    ]);
  };
}

function determineCheckoutFeatures(
  options: SpartacusCheckoutOptions,
  packageJson: any
): Rule {
  if (
    shouldAddFeature(
      CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
      options.features
    )
  ) {
    return chain([
      addLibraryFeature(
        options,
        CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG
      ),
      addFeatureTranslations(options, CHECKOUT_BASE_SCHEMATICS_CONFIG),
      addFeatureTranslations(options, CHECKOUT_B2B_SCHEMATICS_CONFIG),

      configureB2bFeatures(options, packageJson),
    ]);
  }

  if (shouldAddFeature(CLI_CHECKOUT_B2B_FEATURE, options.features)) {
    return chain([
      addLibraryFeature(options, CHECKOUT_B2B_SCHEMATICS_CONFIG),
      addFeatureTranslations(options, CHECKOUT_BASE_SCHEMATICS_CONFIG),

      configureB2bFeatures(options, packageJson),
    ]);
  }

  if (shouldAddFeature(CLI_CHECKOUT_BASE_FEATURE, options.features)) {
    return addLibraryFeature(options, CHECKOUT_BASE_SCHEMATICS_CONFIG);
  }

  return noop();
}
