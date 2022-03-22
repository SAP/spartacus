import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addFeatures,
  addPackageJsonDependenciesForLibrary,
  analyzeCrossFeatureDependencies,
  CLI_TRACKING_TMS_AEP_FEATURE,
  CLI_TRACKING_TMS_GTM_FEATURE,
  FeatureConfigurationOverrides,
  LibraryOptions as SpartacusTrackingOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addTrackingFeatures(options: SpartacusTrackingOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const features = analyzeCrossFeatureDependencies(options.features ?? []);
    const overrides = buildTrackingConfig(options);

    return chain([
      addFeatures(options, features, overrides),
      addPackageJsonDependenciesForLibrary(peerDependencies, options),
    ]);
  };
}

function buildTrackingConfig(
  options: SpartacusTrackingOptions
): Record<string, FeatureConfigurationOverrides> {
  const gtmConfig = shouldAddFeature(
    CLI_TRACKING_TMS_GTM_FEATURE,
    options.features
  )
    ? buildGtm(options)
    : {};

  const aepConfig = shouldAddFeature(
    CLI_TRACKING_TMS_AEP_FEATURE,
    options.features
  )
    ? buildAep(options)
    : {};

  return {
    ...gtmConfig,
    ...aepConfig,
  };
}

function buildGtm(
  options: SpartacusTrackingOptions
): Record<string, FeatureConfigurationOverrides> {
  return {
    [CLI_TRACKING_TMS_GTM_FEATURE]: {
      options: {
        // Just import the feature module
        ...options,
        lazy: false,
      },
    },
  };
}

function buildAep(
  options: SpartacusTrackingOptions
): Record<string, FeatureConfigurationOverrides> {
  return {
    [CLI_TRACKING_TMS_AEP_FEATURE]: {
      options: {
        // Just import the feature module
        ...options,
        lazy: false,
      },
    },
  };
}
