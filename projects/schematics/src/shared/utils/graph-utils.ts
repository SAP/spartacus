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
