import { getSpartacusPackages } from './package-utils';

/**
 * Graph's Node.
 *
 * The node must have a name,
 * and an optional value associated with it.
 */
export class Node<T = unknown> {
  /** Edges represent connections with other Nodes */
  protected edges: Node<T>[] = [];

  constructor(protected name: string, protected value?: T) {}

  /**
   * Adds the provided edges to the current Node.
   */
  addEdges(...edges: Node<T>[]) {
    this.edges.push(...edges);
  }

  /**
   * Returns the edges of the current Node.
   */
  getEdges(): Node<T>[] {
    return this.edges;
  }

  /**
   * Returns the name of the current Node.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Returns the value of the current Node.
   */
  getValue(): T | undefined {
    return this.value;
  }
}

/**
 * Resolves the dependencies of the provided Node.
 */
export function resolveGraphDependencies<T = unknown>(
  node: Node<T>,
  resolved: Node<T>[],
  unresolved: Node<T>[] = []
): void {
  unresolved.push(node);

  for (const edge of node.getEdges()) {
    if (!findNode(resolved, edge)) {
      if (!!findNode(unresolved, edge)) {
        throw new Error(
          `Circular dependency detected for: ${node.getName()} --> ${edge.getName()}`
        );
      }

      resolveGraphDependencies(edge, resolved, unresolved);
    }
  }
  resolved.push(node);
  remove(unresolved, node);
}

export function findNode<T = unknown>(
  nodes: Node<T>[],
  search: Node<T> | string
): Node<T> | undefined {
  const toFind = typeof search === 'string' ? new Node<T>(search) : search;
  return nodes.find((n) => toFind.getName() === n.getName());
}

function remove<T = unknown>(nodes: Node<T>[], toRemove: Node<T>): void {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].getName() === toRemove.getName()) {
      nodes.splice(i, 1);
      return;
    }
  }
}

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
  console.error('Running algo...');

  // Calculate the incoming degree for each vertex
  const vertices = Object.keys(graph.getAdjacentVertices());

  const inDegree: Record<string, number> = {};
  for (const vertex of vertices) {
    for (const neighbor of graph.getAdjacentVertices()[vertex]) {
      inDegree[neighbor] = inDegree[neighbor] + 1 || 1;
    }
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

export function createDependencyGraph(
  dependencies: Record<string, Record<string, string>>,
  skip: string[] = []
): Graph {
  const spartacusLibraries = Object.keys(dependencies).filter(
    (dependency) => !skip.includes(dependency)
  );
  console.log('spartacusLibraries: ', spartacusLibraries);

  const graph = new Graph(spartacusLibraries);
  for (const spartacusLib of spartacusLibraries) {
    const spartacusPeerDependencies = getSpartacusPackages(
      dependencies[spartacusLib]
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
