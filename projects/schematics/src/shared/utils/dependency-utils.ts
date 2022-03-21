// TODO:#schematics - move this file to utils
import { SchematicsException } from '@angular-devkit/schematics';
import collectedDependencies from '../../dependencies.json';
import { CORE_SPARTACUS_SCOPES, SPARTACUS_SCOPE } from '../libs-constants';
import {
  getKeyByMappingValue,
  packageCliMapping,
} from '../updateable-constants';
import {
  crossFeatureInstallationOrder,
  libraryInstallationOrder,
} from './graph-utils';
import { calculateSort } from './lib-utils';
import { getConfiguredDependencies } from './schematics-config-utils';

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
): string[] {
  const result: string[] = [];

  for (const cliFeature of startingCliFeatures) {
    collectCrossFeatureDeps(cliFeature, result);
  }

  return result.sort((subFeature1, subFeature2) =>
    calculateSort(subFeature1, subFeature2, crossFeatureInstallationOrder)
  );
}

/**
 * Collects the cross-feature dependencies for the given feature.
 * It recursively collects the dependencies for each of the
 * found dependencies.
 */
function collectCrossFeatureDeps(cliFeature: string, result: string[]): void {
  if (result.includes(cliFeature)) {
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

  result.push(cliFeature);

  const cliDependencies = getConfiguredDependencies(spartacusLib, cliFeature);
  for (const cliDependency of cliDependencies) {
    collectCrossFeatureDeps(cliDependency, result);
  }
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
  spartacusPeerDeps = spartacusPeerDeps.sort((featureA, featureB) =>
    calculateSort(featureA, featureB, libraryInstallationOrder)
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
