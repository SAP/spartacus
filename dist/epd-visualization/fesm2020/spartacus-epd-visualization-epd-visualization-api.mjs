import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import { NODES_RESPONSE_NORMALIZER, LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER, SceneAdapter, VisualizationAdapter } from '@spartacus/epd-visualization/core';
import * as i3 from '@spartacus/core';
import { LoggerService, normalizeHttpError } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import * as i2 from '@spartacus/epd-visualization/root';

/**
 * This adapter references an API that is expected to be deprecated and relocated
 * since multiple microservice APIs are being combined into a single namespace.
 * A new adapter implementation will be added and this one will be deprecated
 * when the new endpoint is available.
 */
class StorageV1Adapter {
    constructor(http, epdVisualizationConfig, converter) {
        this.http = http;
        this.epdVisualizationConfig = epdVisualizationConfig;
        this.converter = converter;
        this.logger = inject(LoggerService);
        this.baseUrl = this.getBaseUrl();
    }
    getBaseUrl() {
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const visualizationApiConfig = epdVisualization.apis;
        return `${visualizationApiConfig.baseUrl}/vis/public/storage`;
    }
    getUrl(sceneId, nodeIds, $expand, $filter, contentType) {
        const queryParts = [];
        if (nodeIds) {
            nodeIds.forEach((nodeId) => queryParts.push(`id=${nodeId}`));
        }
        if ($expand) {
            queryParts.push(`$expand=${$expand.join(',')}`);
        }
        if ($filter) {
            queryParts.push(`$filter=${$filter.join(',')}`);
        }
        if (contentType) {
            queryParts.push(`contentType=${contentType}`);
        }
        const queryString = queryParts.length
            ? `?${queryParts.join('&')}`
            : '';
        return `${this.baseUrl}/v1/scenes/${sceneId}/nodes${queryString}`;
    }
    /**
     * Used for getting information about scene nodes (such as metadata used to store usage ID values).
     * @param sceneId The scene id to use as the sceneId path parameter.
     * @param nodeIds An array of scene node ids to pass in id query parameters.
     * @param $expand A set of strings to combine to form the $expand query parameter.
     * @param $filter A set of strings to combine to form the $filter query parameter.
     * @param contentType The contentType query parameter.
     * @returns An Observable producing a NodesResponse which contains an array of objects describing scene nodes.
     */
    getNodes(sceneId, nodeIds, $expand, $filter, contentType) {
        return this.http
            .get(this.getUrl(sceneId, nodeIds, $expand, $filter, contentType))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(NODES_RESPONSE_NORMALIZER));
    }
}
StorageV1Adapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StorageV1Adapter, deps: [{ token: i1.HttpClient }, { token: i2.EpdVisualizationConfig }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
StorageV1Adapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StorageV1Adapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StorageV1Adapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.EpdVisualizationConfig }, { type: i3.ConverterService }]; } });

/**
 * This adapter references an API that is expected to be deprecated and relocated
 * since multiple microservice APIs are being combined into a single namespace.
 * A new adapter implementation will be added and this one will be deprecated
 * when the new endpoint is available.
 */
class VisualizationV1Adapter {
    constructor(http, epdVisualizationConfig, converter) {
        this.http = http;
        this.epdVisualizationConfig = epdVisualizationConfig;
        this.converter = converter;
        this.logger = inject(LoggerService);
        this.baseUrl = this.getBaseUrl();
    }
    getBaseUrl() {
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const visualizationApiConfig = epdVisualization.apis;
        return `${visualizationApiConfig.baseUrl}/vis/public/visualization`;
    }
    getUrl(visualizationUsageId, folderUsageId) {
        const queryParts = [
            `usage=${encodeURIComponent(JSON.stringify(visualizationUsageId))}`,
            `folderUsageId=${encodeURIComponent(JSON.stringify(folderUsageId))}`,
        ];
        return `${this.baseUrl}/v1/lookup/visualization?${queryParts.join('&')}`;
    }
    /**
     * Used for finding a visualization by Usage ID that has anonymous (unauthenticated) read access enabled.
     * The search is performed in the SAP EPD Visualization service instance associated with the SaaS subscription for the SAP EPD tenant.
     * @param visualizationUsageId The SAP EPD Visualization usage ID value identifying visualizations to match.
     * Only visualizations that have the specified usage ID value will be returned.
     * @param folderUsageId The SAP EPD Visualization usage ID identifying folders to search for visualizations.
     * Only folders that are tagged with the specified usage ID value that have anonymous access enabled will be searched.
     * @returns An Observable producing a LookupVisualizationsResponse which contains an array of objects describing matched visualizations.
     */
    lookupVisualization(visualizationUsageId, folderUsageId) {
        return this.http.get(this.getUrl(visualizationUsageId, folderUsageId)).pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER));
    }
}
VisualizationV1Adapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationV1Adapter, deps: [{ token: i1.HttpClient }, { token: i2.EpdVisualizationConfig }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
VisualizationV1Adapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationV1Adapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationV1Adapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.EpdVisualizationConfig }, { type: i3.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class EpdVisualizationApiModule {
}
EpdVisualizationApiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationApiModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
EpdVisualizationApiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationApiModule });
EpdVisualizationApiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationApiModule, providers: [
        { provide: SceneAdapter, useClass: StorageV1Adapter },
        { provide: VisualizationAdapter, useClass: VisualizationV1Adapter },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationApiModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        { provide: SceneAdapter, useClass: StorageV1Adapter },
                        { provide: VisualizationAdapter, useClass: VisualizationV1Adapter },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// export * from './adapters/storage-v1';  // Not in Spartacus public API since the /storage/v1 prefix will be deprecated and relocated
// export * from './adapters/visualization-v1';  // Not in Spartacus public API since the /visualization/v1 prefix will be deprecated and relocated

/**
 * Generated bundle index. Do not edit.
 */

export { EpdVisualizationApiModule };
//# sourceMappingURL=spartacus-epd-visualization-epd-visualization-api.mjs.map
