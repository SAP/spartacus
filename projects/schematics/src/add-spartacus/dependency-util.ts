import { SchematicsException } from '@angular-devkit/schematics';
import collectedDependencies from '../dependencies.json';
import {
  CORE_SPARTACUS_SCOPES,
  SPARTACUS_SCOPE,
} from '../shared/libs-constants';
import {
  getKeyByMappingValue,
  packageCliMapping,
  packageSchematicConfigMapping,
} from '../shared/updateable-constants';
import { calculateSort } from '../shared/utils/lib-utils';

/**
 * Analyzes cross-feature Spartacus dependencies
 * for the given set of features.
 *
 * E.g. Digital Payments feature has a dependency on
 * Base checkout, Base cart and Order. Transitively,
 * it also depends on User features: Profile and Account.
 *
 * Returns the ordered list, according to the graph.
 */
export function analyzeCrossFeatureDependencies(
  startingCliFeatures: string[]
): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const cliFeature of startingCliFeatures) {
    collectCrossFeatureDeps(cliFeature, result);
  }

  return result;
}

/**
 * Collects the cross-feature dependencies for the given feature.
 * It recursively collects the dependencies for each of the
 * found dependencies.
 */
function collectCrossFeatureDeps(
  cliFeature: string,
  result: Record<string, string[]>
): void {
  if (getKeyByMappingValue(result, cliFeature)) {
    // already processed
    return;
  }

  const spartacusLib = getKeyByMappingValue(packageCliMapping, cliFeature);
  if (!spartacusLib) {
    throw new SchematicsException(
      `Spartacus library not found for '${spartacusLib}' in ${JSON.stringify(
        packageCliMapping
      )}`
    );
  }

  result[spartacusLib] = (result[spartacusLib] ?? []).concat(cliFeature);

  const cliDependencies = getConfiguredDependencies(spartacusLib, cliFeature);
  for (const cliDependency of cliDependencies) {
    collectCrossFeatureDeps(cliDependency, result);
  }
}

function getConfiguredDependencies(
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

/**
 * Analyzes cross-library Spartacus dependencies
 * for the given set of features.
 *
 * For example, CDC depends on User and ASM features.
 *
 * Returns the ordered list, according to the graph.
 */
/**
 * TODO:#schematics - very similar to collectSpartacusLibraryDependencies() and collectSpartacusPeerDeps()
 * from projects/schematics/src/migrations/mechanism/dependency-management/dependency-management.ts
 */
export function analyzeCrossLibraryDependencies(
  startingDependencies: string[]
): string[] {
  let spartacusPeerDeps: string[] = startingDependencies;
  for (const spartacusLib of startingDependencies) {
    spartacusPeerDeps = collectCrossSpartacusPeerDeps(
      spartacusLib,
      spartacusPeerDeps
    );
  }

  // remove the duplicates
  spartacusPeerDeps = Array.from(new Set<string>(spartacusPeerDeps));
  // order the libraries
  spartacusPeerDeps = spartacusPeerDeps.sort((moduleA, moduleB) =>
    calculateSort(moduleA, moduleB)
  );

  return spartacusPeerDeps;
}

export function collectCrossSpartacusPeerDeps(
  name: string,
  collectedDeps: string[]
): string[] {
  const peerDepsWithVersions =
    (collectedDependencies as Record<string, Record<string, string>>)[name] ??
    {};

  const peerDeps = Object.keys(peerDepsWithVersions)
    .filter((d) => d.startsWith(SPARTACUS_SCOPE))
    .filter((d) => !CORE_SPARTACUS_SCOPES.includes(d))
    .filter((d) => !collectedDeps.includes(d));

  collectedDeps = collectedDeps.concat(peerDeps);
  for (const peerDep of peerDeps) {
    collectedDeps = collectCrossSpartacusPeerDeps(peerDep, collectedDeps);
  }

  return collectedDeps;
}
