/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import collectedDependencies from '../../dependencies.json';
import { CORE_SPARTACUS_SCOPES, SPARTACUS_SCOPE } from '../libs-constants';
import {
  getKeyByMappingValueOrThrow,
  libraryFeatureMapping,
} from '../schematics-config-mappings';
import {
  calculateCrossFeatureSort,
  calculateCrossLibrarySort,
} from './lib-utils';
import { getConfiguredDependencies } from './schematics-config-utils';

/**
 * Analyzes cross-feature Spartacus dependencies
 * for the given set of features.
 *
 * E.g. when installing Digital Payments feature,
 * the following features will also be configured:
 * User-Account, User-Profile, Cart, Order, Checkout
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
    calculateCrossFeatureSort(feature1, feature2)
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
 * Returns the ordered list, according to the features graph.
 */
export function analyzeCrossLibraryDependenciesByFeatures(
  startingFeatures: string[]
): string[] {
  const startingLibraries: string[] = [];
  for (const feature of startingFeatures) {
    const library = getKeyByMappingValueOrThrow(libraryFeatureMapping, feature);
    startingLibraries.push(library);
  }

  return analyzeCrossLibraryDependenciesByLibraries(startingLibraries);
}

/**
 * Analyzes cross-library Spartacus dependencies
 * for the given set of libraries.
 *
 * For example, CDC depends on User and ASM features.
 *
 * Returns the ordered list, according to the features graph.
 */
export function analyzeCrossLibraryDependenciesByLibraries(
  startingLibraries: string[]
): string[] {
  let spartacusPeerDeps = [...startingLibraries];
  for (const spartacusLib of startingLibraries) {
    collectCrossSpartacusPeerDeps(spartacusLib, spartacusPeerDeps);
  }

  // remove the duplicates
  spartacusPeerDeps = Array.from(new Set<string>(spartacusPeerDeps));
  // order the libraries
  spartacusPeerDeps = spartacusPeerDeps.sort((libraryA, libraryB) =>
    calculateCrossLibrarySort(libraryA, libraryB)
  );

  return spartacusPeerDeps;
}

/**
 * Recursively collects the cross Spartacus library dependencies for the given library.
 */
export function collectCrossSpartacusPeerDeps(
  libraryName: string,
  collectedDeps: string[],
  processed: string[] = []
): void {
  if (processed.includes(libraryName)) {
    return;
  }

  const peerDepsWithVersions =
    (collectedDependencies as Record<string, Record<string, string>>)[
      libraryName
    ] ?? {};

  const peerDeps = Object.keys(peerDepsWithVersions)
    .filter((d) => d.startsWith(SPARTACUS_SCOPE))
    .filter((d) => !CORE_SPARTACUS_SCOPES.includes(d))
    .filter((d) => !collectedDeps.includes(d));

  collectedDeps.push(...peerDeps);
  processed.push(libraryName);

  for (const peerDep of peerDeps) {
    collectCrossSpartacusPeerDeps(peerDep, collectedDeps);
  }
}
