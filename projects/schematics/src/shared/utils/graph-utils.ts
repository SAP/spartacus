import collectedDependencies from '../../dependencies.json';
import { CORE_SPARTACUS_SCOPES, SPARTACUS_SCOPE } from '../libs-constants';
import { packageCliMapping } from '../updateable-constants';
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

// TODO:#schematics - move somewhere? To graph-utils?
export const dependencyGraph: Graph = createLibraryDependencyGraph();
export const libraryInstallationOrder: string[] =
  kahnsAlgorithm(dependencyGraph);

// TODO:#schematics - move somewhere? To graph-utils?
export const crossFeatureDependencyGraph: Graph =
  createCrossFeaturesDependencyGraph();
export const crossFeatureInstallationOrder: string[] = kahnsAlgorithm(
  crossFeatureDependencyGraph
);

function createLibraryDependencyGraph(): Graph {
  const skip = CORE_SPARTACUS_SCOPES.concat(
    'storefrontapp-e2e-cypress',
    'storefrontapp'
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

  for (const spartacusLib in packageCliMapping) {
    if (!packageCliMapping.hasOwnProperty(spartacusLib)) {
      continue;
    }

    const subFeatures = packageCliMapping[spartacusLib] ?? [];
    for (const subFeature of subFeatures) {
      graph.addVertex(subFeature);

      const dependencies = getConfiguredDependencies(spartacusLib, subFeature);
      for (const dependency of dependencies) {
        graph.createEdge(subFeature, dependency);
      }
    }
  }

  return graph;
}
