import { SchematicsException } from '@angular-devkit/schematics';
import { librarySchematicConfigMapping } from '../updateable-constants';
import { FeatureConfig } from './lib-utils';

/**
 * Returns the configured dependencies for the given feature.
 */
export function getConfiguredDependencies(feature: string): string[] {
  const featureConfig = getSchematicsConfigurationByFeature(feature);
  if (!featureConfig) {
    throw new SchematicsException(`No feature config found for ${feature}.`);
  }

  const dependencyConfig = featureConfig.dependencyManagement ?? {};
  const featureDependencies: string[] = [];
  for (const key in dependencyConfig) {
    if (!dependencyConfig.hasOwnProperty(key)) {
      continue;
    }

    featureDependencies.push(...(dependencyConfig[key] ?? []));
  }

  return featureDependencies;
}

/**
 * Returns the schematics config for the given feature.
 */
export function getSchematicsConfigurationByFeature(
  feature: string
): FeatureConfig | undefined {
  for (const library in librarySchematicConfigMapping) {
    if (!librarySchematicConfigMapping.hasOwnProperty(library)) {
      continue;
    }

    const featureConfigs = librarySchematicConfigMapping[library];

    for (const featureConfig of featureConfigs) {
      if (featureConfig.library.cli === feature) {
        return featureConfig;
      }
    }
  }

  return undefined;
}
