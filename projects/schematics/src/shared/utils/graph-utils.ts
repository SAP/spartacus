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
import { getConfiguredDependencies } from './schematics-config-utils';

export class Graph {
  protected adjacentVertices: Record<string, Array<string>> = {};

  constructor(vertices?: string[]) {
    if (vertices) {
      this.addVertex(...vertices);
    }
  }

  addVertex(...vertices: string[]): void {
    for (const vertex of vertices) {
      if (!this.adjacentVertices[vertex]) {
        this.adjacentVertices[vertex] = [];
      }
    }
  }

  createEdge(v1: string, v2: string): void {
    this.adjacentVertices[v1].push(v2);
  }

  getAdjacentVertices(): Record<string, Array<string>> {
    return this.adjacentVertices;
  }
}

export const crossLibraryDependencyGraph: Graph =
  createLibraryDependencyGraph();
export const crossLibraryInstallationOrder: string[] = kahnsAlgorithm(
  crossLibraryDependencyGraph
);

export const crossFeatureDependencyGraph: Graph =
  createCrossFeaturesDependencyGraph();
export const crossFeatureInstallationOrder: string[] = groupFeatures();

function groupFeatures(): string[] {
  const order = kahnsAlgorithm(crossFeatureDependencyGraph);

  const auxOrder: { library: string; feature: string }[] = [];
  for (const [index, feature] of Array.from(order.entries())) {
    const library = getKeyByMappingValueOrThrow(libraryFeatureMapping, feature);

    const lastExistingIndex = getLastLibraryIndex(auxOrder, library);
    if (!lastExistingIndex) {
      auxOrder.push({ library, feature });
      continue;
    }

    auxOrder.splice(lastExistingIndex + 1, 0, { library, feature });
    order.splice(index);
  }

  return auxOrder.map(({ feature }) => feature);
}

function getLastLibraryIndex(
  auxOrder: { library: string; feature: string }[],
  library: string
): number | undefined {
  let lastIndex: number | undefined;
  for (const [index, aux] of Array.from(auxOrder.entries())) {
    if (aux.library === library) {
      lastIndex = index;
    }
  }

  return lastIndex;
}

/**
 * Creates the order in which the Spartacus libraries should be installed.
 * https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
 */
export function kahnsAlgorithm(graph: Graph): string[] {
  // Calculate the incoming degree for each vertex
  const vertices = Object.keys(graph.getAdjacentVertices());

  const inDegree: Record<string, number> = {};
  for (const vertex of vertices) {
    for (const neighbor of graph.getAdjacentVertices()[vertex]) {
      inDegree[neighbor] = inDegree[neighbor] + 1 || 1;
    }
  }

  /**
   * if there are no relations in the given graph,
   * just return the vertices, preserving the order
   */
  if (!Object.keys(inDegree).length) {
    return vertices;
  }

  // Create a queue which stores the vertex without dependencies
  const queue = vertices.filter((vertex) => !inDegree[vertex]);
  const topNums: Record<string, number> = {};
  let index = 0;

  while (queue.length) {
    const vertex = queue.shift();
    if (!vertex) {
      continue;
    }

    topNums[vertex] = index++;
    // adjust the incoming degree of its neighbors
    for (const neighbor of graph.getAdjacentVertices()[vertex]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (index !== vertices.length) {
    throw new Error(`Circular dependency detected.`);
  }

  return Object.keys(topNums).reverse();
}

function createLibraryDependencyGraph(): Graph {
  const skip = CORE_SPARTACUS_SCOPES.concat(
    'storefrontapp-e2e-cypress',
    'storefrontapp',
    'ssr-tests'
  );

  const spartacusLibraries = Object.keys(collectedDependencies).filter(
    (dependency) => !skip.includes(dependency)
  );

  const graph = new Graph(spartacusLibraries);
  for (const spartacusLib of spartacusLibraries) {
    const libraryDependencies = (
      collectedDependencies as Record<string, Record<string, string>>
    )[spartacusLib];
    const spartacusPeerDependencies = Object.keys(libraryDependencies).filter(
      (dependency) => dependency.startsWith(SPARTACUS_SCOPE)
    );
    for (const spartacusPackage of spartacusPeerDependencies) {
      if (skip.includes(spartacusPackage)) {
        continue;
      }

      graph.createEdge(spartacusLib, spartacusPackage);
    }
  }

  return graph;
}

function createCrossFeaturesDependencyGraph(): Graph {
  const graph = new Graph();

  for (const spartacusLib of Array.from(libraryFeatureMapping.keys())) {
    const features = libraryFeatureMapping.get(spartacusLib) ?? [];
    for (const feature of features) {
      graph.addVertex(feature);

      const dependencies = getConfiguredDependencies(feature);
      for (const dependency of dependencies) {
        graph.createEdge(feature, dependency);
      }
    }
  }

  return graph;
}
