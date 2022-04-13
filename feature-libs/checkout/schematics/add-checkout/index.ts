import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addFeatures,
  addFeatureTranslations,
  addPackageJsonDependenciesForLibrary,
  analyzeCrossFeatureDependencies,
  CHECKOUT_B2B_SCHEMATICS_CONFIG,
  CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG,
  CLI_CHECKOUT_B2B_FEATURE,
  CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
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

    const features = analyzeCrossFeatureDependencies(
      options.features as string[]
    );

    return chain([
      addFeatures(options, features),
      additionalCheckoutConfiguration(options),
      addPackageJsonDependenciesForLibrary(peerDependencies, options),
    ]);
  };
}

function additionalCheckoutConfiguration(
  options: SpartacusCheckoutOptions
): Rule {
  const rules: Rule[] = [];

  if (shouldAddFeature(CLI_CHECKOUT_B2B_FEATURE, options.features)) {
    rules.push(addFeatureTranslations(options, CHECKOUT_B2B_SCHEMATICS_CONFIG));
  }

  if (
    shouldAddFeature(
      CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
      options.features
    )
  ) {
    rules.push(
      addFeatureTranslations(options, CHECKOUT_B2B_SCHEMATICS_CONFIG),
      addFeatureTranslations(
        options,
        CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG
      )
    );
  }

  return chain(rules);
}
