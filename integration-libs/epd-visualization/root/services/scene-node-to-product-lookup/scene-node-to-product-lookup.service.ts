import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, shareReplay, tap } from 'rxjs/operators';
import {
  EpdVisualizationConfig,
  EpdVisualizationInnerConfig,
  UsageIdConfig,
} from '../../config/epd-visualization-config';
import {
  Metadatum,
  NodesResponse,
  StorageApiService,
  TreeNode,
} from '../storage-api/storage-api.service';

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
    protected storageService: StorageApiService
  ) {
    const epdVisualization = this.epdVisualizationConfig
      .epdVisualization as EpdVisualizationInnerConfig;
    const usageIdConfig = epdVisualization.usageIds as UsageIdConfig;
    this.usageId = usageIdConfig.productUsageId;

    this.nodeIdsByProductCodeMap$.subscribe(() => {});
    this.productCodesByNodeIdMap$.subscribe(() => {});
    this.nodeIdProductCodeTuples$.subscribe(() => {});
  }

  private resolvedSceneId$ = new EventEmitter<string>();
  private usageId;

  /**
   * Called to populate the maps with the data for the given scene.
   * This can be done before the scene has been loaded since this just involves a storage service API call
   * @param sceneId The scene id of the loaded scene.
   */
  public populateMapsForScene(sceneId: string): void {
    this.resolvedSceneId$.emit(sceneId);
  }

  protected nodeIdProductCodeTuples$: Observable<NodeIdProductCodes[]> =
    this.resolvedSceneId$.pipe(
      mergeMap((sceneId: string) =>
        this.storageService.getNodes(
          sceneId,
          undefined,
          ['hotspot', `meta.${this.usageId.category}.${this.usageId.keyName}`],
          [`metadata.${this.usageId.category}.${this.usageId.keyName}`],
          '*'
        )
      ),
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
      }),
      shareReplay()
    );

  private productCodesByNodeIdMap$: Observable<Map<string, string[]>> =
    this.nodeIdProductCodeTuples$.pipe(
      map((nodeIdProductCodeTuples) =>
        nodeIdProductCodeTuples.reduce(
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
        )
      ),
      tap((productCodesByNodeIdMap: Map<string, string[]>) => {
        this._productCodesByNodeIdMap = productCodesByNodeIdMap;
      }),
      shareReplay()
    );

  private _productCodesByNodeIdMap: Map<string, string[]>;

  private nodeIdsByProductCodeMap$: Observable<Map<string, string[]>> =
    this.nodeIdProductCodeTuples$.pipe(
      map((nodeIdProductCodeTuples) =>
        nodeIdProductCodeTuples.reduce(
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
        )
      ),
      tap((nodeIdsByProductCodeMap: Map<string, string[]>) => {
        this._nodeIdsByProductCodeMap = nodeIdsByProductCodeMap;
      }),
      shareReplay()
    );

  private _nodeIdsByProductCodeMap: Map<string, string[]>;

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
    if (!this._productCodesByNodeIdMap) {
      return [];
    }
    return this._lookupProductCodes(this._productCodesByNodeIdMap, nodeIds);
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
    if (!this._nodeIdsByProductCodeMap) {
      return [];
    }
    return this._lookupNodeIds(this._nodeIdsByProductCodeMap, productCodes);
  }
}
