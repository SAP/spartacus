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
  startingFeatures: string[]
): string[] {
  const result: string[] = [];

  for (const feature of startingFeatures) {
    collectCrossFeatureDeps(feature, result);
  }

  return result.sort((feature1, feature2) =>
    calculateSort(feature1, feature2, crossFeatureInstallationOrder)
  );
}

/**
 * Collects the cross-feature dependencies for the given feature.
 * It recursively collects the dependencies for each of the
 * found dependencies.
 */
function collectCrossFeatureDeps(feature: string, result: string[]): void {
  // already processed
  if (result.includes(feature)) {
    return;
  }

  const spartacusLib = getKeyByMappingValue(packageCliMapping, feature);
  if (!spartacusLib) {
    throw new SchematicsException(
      `Spartacus library not found for '${spartacusLib}' in ${JSON.stringify(
        packageCliMapping
      )}`
    );
  }

  result.push(feature);

  const cliDependencies = getConfiguredDependencies(spartacusLib, feature);
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
  startingFeatures: string[]
): string[] {
  const startingLibraries: string[] = [];
  for (const feature of startingFeatures) {
    const library = getKeyByMappingValue(packageCliMapping, feature);
    if (!library) {
      throw new SchematicsException(
        `The given '${feature}' doesn't contain a Spartacus package mapping.
Please check 'packageSubFeaturesMapping' in 'projects/schematics/src/shared/updateable-constants.ts'`
      );
    }

    startingLibraries.push(library);
  }

  let spartacusPeerDeps: string[] = startingLibraries;
  for (const spartacusLib of startingLibraries) {
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

// TODO:#schematics - export?
// TODO:#schematics - add comment
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
