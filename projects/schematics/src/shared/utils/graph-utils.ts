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
  toFind: Node<T>
): Node<T> | undefined {
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

export function createDependencyGraph<T = unknown>(
  installedLibs: string[],
  dependencies: Record<string, Record<string, string>>,
  skip: string[] = []
): Node<T>[] {
  const graph: Node<T>[] = [];
  for (const spartacusLib of installedLibs) {
    if (skip.includes(spartacusLib)) {
      continue;
    }

    const node = new Node<T>(spartacusLib);
    const spartacusPeerDependencies = getSpartacusPackages(
      dependencies[spartacusLib]
    );
    for (const spartacusPackage of spartacusPeerDependencies) {
      if (skip.includes(spartacusPackage)) {
        continue;
      }

      const edge = new Node<T>(spartacusPackage);
      node.addEdges(edge);
    }

    graph.push(node);
  }

  return graph;
}
