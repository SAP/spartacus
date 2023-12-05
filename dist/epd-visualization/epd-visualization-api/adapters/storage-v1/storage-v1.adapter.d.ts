import { HttpClient } from '@angular/common/http';
import { ConverterService, LoggerService } from '@spartacus/core';
import { NodesResponse, SceneAdapter } from '@spartacus/epd-visualization/core';
import { EpdVisualizationConfig } from '@spartacus/epd-visualization/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * This adapter references an API that is expected to be deprecated and relocated
 * since multiple microservice APIs are being combined into a single namespace.
 * A new adapter implementation will be added and this one will be deprecated
 * when the new endpoint is available.
 */
export declare class StorageV1Adapter implements SceneAdapter {
    protected http: HttpClient;
    protected epdVisualizationConfig: EpdVisualizationConfig;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, epdVisualizationConfig: EpdVisualizationConfig, converter: ConverterService);
    private baseUrl;
    private getBaseUrl;
    protected getUrl(sceneId: string, nodeIds?: string[], $expand?: string[], $filter?: string[], contentType?: string): string;
    /**
     * Used for getting information about scene nodes (such as metadata used to store usage ID values).
     * @param sceneId The scene id to use as the sceneId path parameter.
     * @param nodeIds An array of scene node ids to pass in id query parameters.
     * @param $expand A set of strings to combine to form the $expand query parameter.
     * @param $filter A set of strings to combine to form the $filter query parameter.
     * @param contentType The contentType query parameter.
     * @returns An Observable producing a NodesResponse which contains an array of objects describing scene nodes.
     */
    getNodes(sceneId: string, nodeIds?: string[], $expand?: string[], $filter?: string[], contentType?: string): Observable<NodesResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StorageV1Adapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StorageV1Adapter>;
}
