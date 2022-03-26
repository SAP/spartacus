import { SchematicsException } from '@angular-devkit/schematics';
import { featureSchematicConfigMapping } from '../updateable-constants';

/**
 * Returns the configured dependencies for the given feature.
 */
export function getConfiguredDependencies(feature: string): string[] {
  const featureConfig = featureSchematicConfigMapping.get(feature);
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
