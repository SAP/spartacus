import { Injectable } from '@angular/core';
import {
  EpdVisualizationConfig,
  EpdVisualizationInnerConfig,
  UsageIdConfig,
} from '@spartacus/epd-visualization/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import {
  Metadatum,
  NodesResponse,
  TreeNode,
} from '../../connectors/scene/nodes-response';
import { SceneConnector } from '../../connectors/scene/scene.connector';

export interface NodeIdProductCodes {
  nodeId: string;
  productCodes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SceneNodeToProductLookupService {
  constructor(
    protected epdVisualizationConfig: EpdVisualizationConfig,
    protected sceneConnector: SceneConnector
  ) {
    const epdVisualization = this.epdVisualizationConfig
      .epdVisualization as EpdVisualizationInnerConfig;
    const usageIdConfig = epdVisualization.usageIds as UsageIdConfig;
    this.usageId = usageIdConfig.productUsageId;
  }

  private usageId;

  /**
   * Called to populate the maps with the data for the given scene.
   * This can be done before the scene has been loaded since this just involves a storage service API call
   * @param sceneId The scene id of the loaded scene.
   */
  public populateMapsForScene(sceneId: string): void {
    this.getNodeIdProductCodesForScene(sceneId)
      .pipe(first())
      .subscribe((nodeIdProductCodes: NodeIdProductCodes[]) => {
        this.productCodesByNodeIdMap$.next(
          this.getProductCodesByNodeIdMap(nodeIdProductCodes)
        );
        this.nodeIdsByProductCodeMap$.next(
          this.getNodeIdsByProductCodeMap(nodeIdProductCodes)
        );
      });
  }

  private productCodesByNodeIdMap$ = new BehaviorSubject<Map<string, string[]>>(
    new Map()
  );
  private nodeIdsByProductCodeMap$ = new BehaviorSubject<Map<string, string[]>>(
    new Map()
  );

  private getNodeIdProductCodesForScene(
    sceneId: string
  ): Observable<NodeIdProductCodes[]> {
    return this.sceneConnector
      .getNodes(
        sceneId,
        undefined,
        [
          'hotspot',
          `metadata[${this.usageId.source}].${this.usageId.category}.${this.usageId.keyName}`,
        ],
        [
          `metadata[${this.usageId.source}].${this.usageId.category}.${this.usageId.keyName}`,
        ],
        '*'
      )
      .pipe(
        map((data: NodesResponse) => {
          return (data.nodes as TreeNode[])
            .filter((node: TreeNode) => node.metadata && node.metadata.length)
            .map((node: TreeNode) => {
              return <NodeIdProductCodes>{
                nodeId: node.sid,
                productCodes: (node.metadata as Metadatum[]).map(
                  (metadata: any) => metadata.value
                ),
              };
            });
        })
      );
  }

  private getProductCodesByNodeIdMap(
    nodeIdProductCodes: NodeIdProductCodes[]
  ): Map<string, string[]> {
    return nodeIdProductCodes.reduce(
      (
        productCodeByNodeIdMap: Map<string, string[]>,
        nodeIdProductCodeTuple: NodeIdProductCodes
      ) => {
        productCodeByNodeIdMap.set(
          nodeIdProductCodeTuple.nodeId,
          nodeIdProductCodeTuple.productCodes
        );
        return productCodeByNodeIdMap;
      },
      new Map<string, string[]>()
    );
  }

  private getNodeIdsByProductCodeMap(
    nodeIdProductCodes: NodeIdProductCodes[]
  ): Map<string, string[]> {
    return nodeIdProductCodes.reduce(
      (
        nodeIdByProductCodeMap: Map<string, string[]>,
        nodeIdProductCodeTuple: NodeIdProductCodes
      ) => {
        nodeIdProductCodeTuple.productCodes.forEach((productCode) => {
          const nodeIds = nodeIdByProductCodeMap.get(productCode);
          if (nodeIds !== undefined) {
            nodeIds.push(nodeIdProductCodeTuple.nodeId);
          } else {
            nodeIdByProductCodeMap.set(productCode, [
              nodeIdProductCodeTuple.nodeId,
            ]);
          }
        });
        return nodeIdByProductCodeMap;
      },
      new Map<string, string[]>()
    );
  }

  /**
   * Get distinct values while retaining ordering.
   */
  private distinct(values: string[]) {
    const uniqueArray: string[] = [];
    const valueSet = new Set();
    values.forEach((value) => {
      if (!valueSet.has(value)) {
        valueSet.add(value);
        uniqueArray.push(value);
      }
    });
    return uniqueArray;
  }

  private _lookupProductCodes(
    productCodesByNodeIdMap: Map<string, string[]>,
    nodeIds: string[]
  ): string[] {
    return this.distinct(
      nodeIds.flatMap((nodeId) => productCodesByNodeIdMap.get(nodeId) || [])
    );
  }

  /**
   * Returns an Observable producing an array of product codes corresponding to the specified scene node ids in the currently loaded scene.
   * @param nodeIds The scene node ids.
   * @returns An Observable producing an array of product codes corresponding to the specified scene node ids in the currently loaded scene.
   */
  public lookupProductCodes(nodeIds: string[]): Observable<string[]> {
    return this.productCodesByNodeIdMap$.pipe(
      first(),
      map((productCodesByNodeIdMap) =>
        this._lookupProductCodes(productCodesByNodeIdMap, nodeIds)
      )
    );
  }

  /**
   * Returns an array of product codes corresponding to the specified scene node ids in the currently loaded scene.
   * Returns an empty array if the map of product codes by node id has not yet been populated.
   * For cases where the code must execute synchronously.
   * @param nodeIds The scene node ids.
   * @returns An array of product codes corresponding to the specified scene node ids in the currently loaded scene.
   */
  public syncLookupProductCodes(nodeIds: string[]): string[] {
    return this._lookupProductCodes(
      this.productCodesByNodeIdMap$.getValue(),
      nodeIds
    );
  }

  private _lookupNodeIds(
    nodeIdsByProductCodeMap: Map<string, string[]>,
    productCodes: string[]
  ): string[] {
    return this.distinct(
      productCodes.flatMap(
        (productCode) => nodeIdsByProductCodeMap.get(productCode) || []
      )
    );
  }

  /**
   * Returns an Observable producing an array of scene node ids corresponding to the specified product codes in the currently loaded scene.
   * @param productCodes The product codes.
   * @returns An Observable producing an array of scene node ids corresponding to the specified product codes in the currently loaded scene.
   */
  public lookupNodeIds(productCodes: string[]): Observable<string[]> {
    return this.nodeIdsByProductCodeMap$.pipe(
      map((nodeIdsByProductCodeMap) =>
        this._lookupNodeIds(nodeIdsByProductCodeMap, productCodes)
      )
    );
  }

  /**
   * Returns an array of scene node ids corresponding to the specified product codes in the currently loaded scene.
   * Returns an empty array if the map of node ids by product code has not yet been populated.
   * For cases where the code must execute synchronously.
   * @param productCodes The product codes.
   * @returns An array of scene node ids corresponding to the specified product codes in the currently loaded scene.
   */
  public syncLookupNodeIds(productCodes: string[]): string[] {
    return this._lookupNodeIds(
      this.nodeIdsByProductCodeMap$.getValue(),
      productCodes
    );
  }
}
