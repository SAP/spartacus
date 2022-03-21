import { SchematicsException } from '@angular-devkit/schematics';
import { packageSchematicConfigMapping } from '../updateable-constants';

// TODO:#schematics - comment
// TODO:#schematics - test
export function getConfiguredDependencies(
  spartacusLib: string,
  cliFeature: string
): string[] {
  const featureConfigs = packageSchematicConfigMapping[spartacusLib];
  if (!featureConfigs) {
    throw new SchematicsException(
      `No feature config found for ${spartacusLib} in 'packageSchematicConfigMapping'`
    );
  }

  let dependencyConfig: Record<string, string[]> = {};
  for (const featureConfig of featureConfigs) {
    if (featureConfig.library.cli === cliFeature) {
      dependencyConfig = featureConfig.dependencyManagement ?? dependencyConfig;
      break;
    }
  }

  const cliDependencies: string[] = [];
  for (const key in dependencyConfig) {
    if (!dependencyConfig.hasOwnProperty(key)) {
      continue;
    }

    cliDependencies.push(...(dependencyConfig[key] ?? []));
  }

  return cliDependencies;
}
