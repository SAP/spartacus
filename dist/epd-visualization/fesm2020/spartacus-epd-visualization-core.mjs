import * as i0 from '@angular/core';
import { InjectionToken, Injectable, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as i1 from '@spartacus/epd-visualization/root';
import { ContentType } from '@spartacus/epd-visualization/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const NODES_RESPONSE_NORMALIZER = new InjectionToken('NodesResponseNormalizer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var MetadatumValueType;
(function (MetadatumValueType) {
    MetadatumValueType["string"] = "string";
    MetadatumValueType["integer"] = "integer";
    MetadatumValueType["float"] = "float";
    MetadatumValueType["date"] = "date";
    MetadatumValueType["blob"] = "blob";
    MetadatumValueType["string_array"] = "string_array";
})(MetadatumValueType || (MetadatumValueType = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SceneAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SceneConnector {
    constructor(sceneAdapter) {
        this.sceneAdapter = sceneAdapter;
    }
    /**
     * Used for invoking the EPD Visualization API for retrieving scene node information.
     * @param sceneId The scene id to use as the sceneId path parameter.
     * @param nodeIds An array of scene node ids to pass in id query parameters.
     * @param $expand A set of strings to combine to form the $expand query parameter.
     * @param $filter A set of strings to combine to form the $filter query parameter.
     * @param contentType The contentType query parameter.
     * @returns An Observable producing a NodesResponse which contains an array of objects describing scene nodes.
     */
    getNodes(sceneId, nodeIds, $expand, $filter, contentType) {
        return this.sceneAdapter.getNodes(sceneId, nodeIds, $expand, $filter, contentType);
    }
}
SceneConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneConnector, deps: [{ token: SceneAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
SceneConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: SceneAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER = new InjectionToken('LookupVisualizationsResponseNormalizer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualizationAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualizationConnector {
    constructor(visualizationAdapter) {
        this.visualizationAdapter = visualizationAdapter;
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
        return this.visualizationAdapter.lookupVisualization(visualizationUsageId, folderUsageId);
    }
}
VisualizationConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationConnector, deps: [{ token: VisualizationAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
VisualizationConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: VisualizationAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SceneNodeToProductLookupService {
    constructor(epdVisualizationConfig, sceneConnector) {
        this.epdVisualizationConfig = epdVisualizationConfig;
        this.sceneConnector = sceneConnector;
        this.productCodesByNodeIdMap$ = new BehaviorSubject(new Map());
        this.nodeIdsByProductCodeMap$ = new BehaviorSubject(new Map());
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const usageIdConfig = epdVisualization.usageIds;
        this.usageId = usageIdConfig.productUsageId;
    }
    /**
     * Called to populate the maps with the data for the given scene.
     * This can be done before the scene has been loaded since this just involves a storage service API call
     * @param sceneId The scene id of the loaded scene.
     */
    populateMapsForScene(sceneId) {
        this.getNodeIdProductCodesForScene(sceneId)
            .pipe(first())
            .subscribe((nodeIdProductCodes) => {
            this.productCodesByNodeIdMap$.next(this.getProductCodesByNodeIdMap(nodeIdProductCodes));
            this.nodeIdsByProductCodeMap$.next(this.getNodeIdsByProductCodeMap(nodeIdProductCodes));
        });
    }
    getNodeIdProductCodesForScene(sceneId) {
        return this.sceneConnector
            .getNodes(sceneId, undefined, [
            'hotspot',
            `metadata[${this.usageId.source}].${this.usageId.category}.${this.usageId.keyName}`,
        ], [
            `metadata[${this.usageId.source}].${this.usageId.category}.${this.usageId.keyName}`,
        ], '*')
            .pipe(map((data) => {
            return data.nodes
                .filter((node) => node.metadata && node.metadata.length)
                .map((node) => {
                return {
                    nodeId: node.sid,
                    productCodes: node.metadata.map((metadata) => metadata.value),
                };
            });
        }));
    }
    getProductCodesByNodeIdMap(nodeIdProductCodes) {
        return nodeIdProductCodes.reduce((productCodeByNodeIdMap, nodeIdProductCodeTuple) => {
            productCodeByNodeIdMap.set(nodeIdProductCodeTuple.nodeId, nodeIdProductCodeTuple.productCodes);
            return productCodeByNodeIdMap;
        }, new Map());
    }
    getNodeIdsByProductCodeMap(nodeIdProductCodes) {
        return nodeIdProductCodes.reduce((nodeIdByProductCodeMap, nodeIdProductCodeTuple) => {
            nodeIdProductCodeTuple.productCodes.forEach((productCode) => {
                const nodeIds = nodeIdByProductCodeMap.get(productCode);
                if (nodeIds !== undefined) {
                    nodeIds.push(nodeIdProductCodeTuple.nodeId);
                }
                else {
                    nodeIdByProductCodeMap.set(productCode, [
                        nodeIdProductCodeTuple.nodeId,
                    ]);
                }
            });
            return nodeIdByProductCodeMap;
        }, new Map());
    }
    /**
     * Get distinct values while retaining ordering.
     */
    distinct(values) {
        const uniqueArray = [];
        const valueSet = new Set();
        values.forEach((value) => {
            if (!valueSet.has(value)) {
                valueSet.add(value);
                uniqueArray.push(value);
            }
        });
        return uniqueArray;
    }
    _lookupProductCodes(productCodesByNodeIdMap, nodeIds) {
        return this.distinct(nodeIds.flatMap((nodeId) => productCodesByNodeIdMap.get(nodeId) || []));
    }
    /**
     * Returns an Observable producing an array of product codes corresponding to the specified scene node ids in the currently loaded scene.
     * @param nodeIds The scene node ids.
     * @returns An Observable producing an array of product codes corresponding to the specified scene node ids in the currently loaded scene.
     */
    lookupProductCodes(nodeIds) {
        return this.productCodesByNodeIdMap$.pipe(first(), map((productCodesByNodeIdMap) => this._lookupProductCodes(productCodesByNodeIdMap, nodeIds)));
    }
    /**
     * Returns an array of product codes corresponding to the specified scene node ids in the currently loaded scene.
     * Returns an empty array if the map of product codes by node id has not yet been populated.
     * For cases where the code must execute synchronously.
     * @param nodeIds The scene node ids.
     * @returns An array of product codes corresponding to the specified scene node ids in the currently loaded scene.
     */
    syncLookupProductCodes(nodeIds) {
        return this._lookupProductCodes(this.productCodesByNodeIdMap$.getValue(), nodeIds);
    }
    _lookupNodeIds(nodeIdsByProductCodeMap, productCodes) {
        return this.distinct(productCodes.flatMap((productCode) => nodeIdsByProductCodeMap.get(productCode) || []));
    }
    /**
     * Returns an Observable producing an array of scene node ids corresponding to the specified product codes in the currently loaded scene.
     * @param productCodes The product codes.
     * @returns An Observable producing an array of scene node ids corresponding to the specified product codes in the currently loaded scene.
     */
    lookupNodeIds(productCodes) {
        return this.nodeIdsByProductCodeMap$.pipe(map((nodeIdsByProductCodeMap) => this._lookupNodeIds(nodeIdsByProductCodeMap, productCodes)));
    }
    /**
     * Returns an array of scene node ids corresponding to the specified product codes in the currently loaded scene.
     * Returns an empty array if the map of node ids by product code has not yet been populated.
     * For cases where the code must execute synchronously.
     * @param productCodes The product codes.
     * @returns An array of scene node ids corresponding to the specified product codes in the currently loaded scene.
     */
    syncLookupNodeIds(productCodes) {
        return this._lookupNodeIds(this.nodeIdsByProductCodeMap$.getValue(), productCodes);
    }
}
SceneNodeToProductLookupService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneNodeToProductLookupService, deps: [{ token: i1.EpdVisualizationConfig }, { token: SceneConnector }], target: i0.ɵɵFactoryTarget.Injectable });
SceneNodeToProductLookupService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneNodeToProductLookupService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneNodeToProductLookupService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EpdVisualizationConfig }, { type: SceneConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualizationLookupService {
    constructor(epdVisualizationConfig, visualizationConnector) {
        this.epdVisualizationConfig = epdVisualizationConfig;
        this.visualizationConnector = visualizationConnector;
    }
    /**
     * Finds visualizations by usage id containing product code values.
     * The search space is limited to folders with a configured usage id value.
     * @param productCode The product code value to search for.
     * @returns An Observable producing an VisualizationInfo array containing the set of matching visualizations.
     */
    findMatchingVisualizations(productCode) {
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const usageIdConfig = epdVisualization.usageIds;
        const productUsageId = usageIdConfig.productUsageId;
        const folderUsageId = usageIdConfig.folderUsageId;
        const usage = {
            name: productUsageId.name,
            keys: [
                {
                    name: productUsageId.keyName,
                    value: productCode,
                },
            ],
        };
        return this.visualizationConnector
            .lookupVisualization(usage, folderUsageId)
            .pipe(map((data) => data.visualizations.filter((item) => item.contentType === ContentType.Model3D ||
            item.contentType === ContentType.Drawing2D)));
    }
}
VisualizationLookupService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationLookupService, deps: [{ token: i1.EpdVisualizationConfig }, { token: VisualizationConnector }], target: i0.ɵɵFactoryTarget.Injectable });
VisualizationLookupService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationLookupService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationLookupService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EpdVisualizationConfig }, { type: VisualizationConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class EpdVisualizationCoreModule {
}
EpdVisualizationCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
EpdVisualizationCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationCoreModule });
EpdVisualizationCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationCoreModule, providers: [
        SceneConnector,
        VisualizationConnector,
        SceneNodeToProductLookupService,
        VisualizationLookupService,
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        SceneConnector,
                        VisualizationConnector,
                        SceneNodeToProductLookupService,
                        VisualizationLookupService,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { EpdVisualizationCoreModule, LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER, MetadatumValueType, NODES_RESPONSE_NORMALIZER, SceneAdapter, SceneConnector, SceneNodeToProductLookupService, VisualizationAdapter, VisualizationConnector, VisualizationLookupService };
//# sourceMappingURL=spartacus-epd-visualization-core.mjs.map
