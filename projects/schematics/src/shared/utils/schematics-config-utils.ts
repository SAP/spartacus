import { SchematicsException } from '@angular-devkit/schematics';
import { packageSchematicConfigMapping } from '../updateable-constants';
import { FeatureConfig } from './lib-utils';

// TODO:#schematics - comment
// TODO:#schematics - test
export function getConfiguredDependencies(
  spartacusLib: string,
  feature: string
): string[] {
  const featureConfig = getSchematicsConfigurationByFeature(feature);
  if (!featureConfig) {
    throw new SchematicsException(
      `No feature config found for ${spartacusLib} in 'packageSchematicConfigMapping'`
    );
  }
  const dependencyConfig: Record<string, string[]> =
    featureConfig.dependencyManagement ?? {};
  const cliDependencies: string[] = [];
  for (const key in dependencyConfig) {
    if (!dependencyConfig.hasOwnProperty(key)) {
      continue;
    }

    cliDependencies.push(...(dependencyConfig[key] ?? []));
  }

  return cliDependencies;
}

// TODO:#schematics - comment
// TODO:#schematics - test
export function getSchematicsConfigurationByFeature(
  feature: string
): FeatureConfig | undefined {
  for (const library in packageSchematicConfigMapping) {
    if (!packageSchematicConfigMapping.hasOwnProperty(library)) {
      continue;
    }

    const featureConfigs = packageSchematicConfigMapping[library];

    for (const featureConfig of featureConfigs) {
      if (featureConfig.library.cli === feature) {
        return featureConfig;
      }
    }
  }

  return undefined;
}
