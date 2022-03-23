import { SchematicsException } from '@angular-devkit/schematics';
import collectedDependencies from '../../dependencies.json';
import { CORE_SPARTACUS_SCOPES, SPARTACUS_SCOPE } from '../libs-constants';
import {
  getKeyByMappingValue,
  libraryFeatureMapping,
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
 * E.g. when installing Digital Payments feature,
 * the following features will also be configured:
 * Account, Profile, Cart, Order, Checkout
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

  const spartacusLib = getKeyByMappingValue(libraryFeatureMapping, feature);
  if (!spartacusLib) {
    throw new SchematicsException(
      `Spartacus library not found for '${spartacusLib}' in ${JSON.stringify(
        libraryFeatureMapping
      )}`
    );
  }

  result.push(feature);

  const featureDependencies = getConfiguredDependencies(feature);
  for (const featureDependency of featureDependencies) {
    collectCrossFeatureDeps(featureDependency, result);
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
    const library = getKeyByMappingValue(libraryFeatureMapping, feature);
    if (!library) {
      throw new SchematicsException(
        `The given '${feature}' doesn't contain a Spartacus package mapping.
Please check its schematics configuration.`
      );
    }

    startingLibraries.push(library);
  }

  let spartacusPeerDeps: string[] = startingLibraries;
  for (const spartacusLib of startingLibraries) {
    collectCrossSpartacusPeerDeps(spartacusLib, spartacusPeerDeps);
  }

  // remove the duplicates
  spartacusPeerDeps = Array.from(new Set<string>(spartacusPeerDeps));
  // order the libraries
  spartacusPeerDeps = spartacusPeerDeps.sort((featureA, featureB) =>
    calculateSort(featureA, featureB, libraryInstallationOrder)
  );

  return spartacusPeerDeps;
}

/**
 * Recursively collects the cross Spartacus library dependencies for the given library.
 */
export function collectCrossSpartacusPeerDeps(
  name: string,
  collectedDeps: string[],
  processed: string[] = []
): void {
  if (processed.includes(name)) {
    return;
  }

  const peerDepsWithVersions =
    (collectedDependencies as Record<string, Record<string, string>>)[name] ??
    {};

  const peerDeps = Object.keys(peerDepsWithVersions)
    .filter((d) => d.startsWith(SPARTACUS_SCOPE))
    .filter((d) => !CORE_SPARTACUS_SCOPES.includes(d))
    .filter((d) => !collectedDeps.includes(d));

  collectedDeps.push(...peerDeps);
  processed.push(name);

  for (const peerDep of peerDeps) {
    collectCrossSpartacusPeerDeps(peerDep, collectedDeps);
  }
}
