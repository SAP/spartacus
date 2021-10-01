import { Injectable } from '@angular/core';
import { EpdVisualizationConfig } from '../../config/epd-visualization-config';
import { StorageService } from '../storage/storage.service';
import { VisualizationService } from '../visualization/visualization.service';

interface NodeIdProductCodes {
  nodeId: string;
  productCodes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SceneNodeToProductLookupService {
  private mapsPopulatedPromise: Promise<void>;
  private nodeIdsByProductCodeMap: Map<string, string[]>;
  private productCodesByNodeIdMap: Map<string, string[]>;

  constructor(
    protected epdVisualizationConfig: EpdVisualizationConfig,
    protected visualizationService: VisualizationService,
    protected storageService: StorageService
  ) {}

  public handleSceneLoaded(sceneId: string): void {
    const sparePartUsageId =
      this.epdVisualizationConfig.usageIds?.sparePartUsageId;
    if (!sparePartUsageId) {
      return;
    }
    this.mapsPopulatedPromise = new Promise((resolve) => {
      this.storageService
        .getNodes(
          sceneId,
          undefined,
          [
            'hotspot',
            `meta.${sparePartUsageId.category}.${sparePartUsageId.keyName}`,
          ],
          [`metadata.${sparePartUsageId.category}.${sparePartUsageId.keyName}`],
          '*'
        )
        .subscribe((data: any) => {
          const nodeIdProductCodeTuples: NodeIdProductCodes[] = data.nodes
            .filter((node: any) => node.metadata && node.metadata.length)
            .map((node: any) => {
              return {
                nodeId: node.sid,
                productCodes: node.metadata.map(
                  (metadata: any) => metadata.value
                ),
              };
            });

          this.productCodesByNodeIdMap = nodeIdProductCodeTuples.reduce(
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

          this.nodeIdsByProductCodeMap = nodeIdProductCodeTuples.reduce(
            (
              nodeIdByProductCodeMap: Map<string, string[]>,
              nodeIdProductCodeTuple
            ) => {
              nodeIdProductCodeTuple.productCodes.forEach((productCode) => {
                const productCodes = nodeIdByProductCodeMap.get(productCode);
                if (!!productCodes) {
                  productCodes.push(nodeIdProductCodeTuple.nodeId);
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

          resolve();
        });
    });
  }

  public lookupProductCodes(nodeIds: string[]): Promise<string[]> {
    if (!this.mapsPopulatedPromise) {
      return Promise.resolve([]);
    }
    return this.mapsPopulatedPromise.then(() => {
      return nodeIds.reduce((productCodes: string[], nodeId: string) => {
        const productCodesForNodeId =
          this.productCodesByNodeIdMap.get(nodeId) || [];
        productCodesForNodeId.forEach((productCode) =>
          productCodes.push(productCode)
        );
        return productCodes;
      }, []);
    });
  }

  public lookupNodeIds(productCodes: string[]): Promise<string[]> {
    if (!this.mapsPopulatedPromise) {
      return Promise.resolve([]);
    }
    return this.mapsPopulatedPromise.then(() => {
      return productCodes.reduce((nodeIds: string[], productCode: string) => {
        const nodeIdsForProductCode =
          this.nodeIdsByProductCodeMap.get(productCode) || [];
        nodeIdsForProductCode.forEach((nodeId) => nodeIds.push(nodeId));
        return nodeIds;
      }, []);
    });
  }
}
