import { EpdVisualizationConfig } from '@spartacus/epd-visualization/root';
import { Observable } from 'rxjs';
import { SceneConnector } from '../../connectors/scene/scene.connector';
import * as i0 from "@angular/core";
export interface NodeIdProductCodes {
    nodeId: string;
    productCodes: string[];
}
export declare class SceneNodeToProductLookupService {
    protected epdVisualizationConfig: EpdVisualizationConfig;
    protected sceneConnector: SceneConnector;
    constructor(epdVisualizationConfig: EpdVisualizationConfig, sceneConnector: SceneConnector);
    private usageId;
    /**
     * Called to populate the maps with the data for the given scene.
     * This can be done before the scene has been loaded since this just involves a storage service API call
     * @param sceneId The scene id of the loaded scene.
     */
    populateMapsForScene(sceneId: string): void;
    private productCodesByNodeIdMap$;
    private nodeIdsByProductCodeMap$;
    private getNodeIdProductCodesForScene;
    private getProductCodesByNodeIdMap;
    private getNodeIdsByProductCodeMap;
    /**
     * Get distinct values while retaining ordering.
     */
    private distinct;
    private _lookupProductCodes;
    /**
     * Returns an Observable producing an array of product codes corresponding to the specified scene node ids in the currently loaded scene.
     * @param nodeIds The scene node ids.
     * @returns An Observable producing an array of product codes corresponding to the specified scene node ids in the currently loaded scene.
     */
    lookupProductCodes(nodeIds: string[]): Observable<string[]>;
    /**
     * Returns an array of product codes corresponding to the specified scene node ids in the currently loaded scene.
     * Returns an empty array if the map of product codes by node id has not yet been populated.
     * For cases where the code must execute synchronously.
     * @param nodeIds The scene node ids.
     * @returns An array of product codes corresponding to the specified scene node ids in the currently loaded scene.
     */
    syncLookupProductCodes(nodeIds: string[]): string[];
    private _lookupNodeIds;
    /**
     * Returns an Observable producing an array of scene node ids corresponding to the specified product codes in the currently loaded scene.
     * @param productCodes The product codes.
     * @returns An Observable producing an array of scene node ids corresponding to the specified product codes in the currently loaded scene.
     */
    lookupNodeIds(productCodes: string[]): Observable<string[]>;
    /**
     * Returns an array of scene node ids corresponding to the specified product codes in the currently loaded scene.
     * Returns an empty array if the map of node ids by product code has not yet been populated.
     * For cases where the code must execute synchronously.
     * @param productCodes The product codes.
     * @returns An array of scene node ids corresponding to the specified product codes in the currently loaded scene.
     */
    syncLookupNodeIds(productCodes: string[]): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<SceneNodeToProductLookupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SceneNodeToProductLookupService>;
}
