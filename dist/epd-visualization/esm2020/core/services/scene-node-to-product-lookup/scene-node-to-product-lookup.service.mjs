/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/epd-visualization/root";
import * as i2 from "../../connectors/scene/scene.connector";
export class SceneNodeToProductLookupService {
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
SceneNodeToProductLookupService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneNodeToProductLookupService, deps: [{ token: i1.EpdVisualizationConfig }, { token: i2.SceneConnector }], target: i0.ɵɵFactoryTarget.Injectable });
SceneNodeToProductLookupService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneNodeToProductLookupService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneNodeToProductLookupService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EpdVisualizationConfig }, { type: i2.SceneConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtbm9kZS10by1wcm9kdWN0LWxvb2t1cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9jb3JlL3NlcnZpY2VzL3NjZW5lLW5vZGUtdG8tcHJvZHVjdC1sb29rdXAvc2NlbmUtbm9kZS10by1wcm9kdWN0LWxvb2t1cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQWdCNUMsTUFBTSxPQUFPLCtCQUErQjtJQUMxQyxZQUNZLHNCQUE4QyxFQUM5QyxjQUE4QjtRQUQ5QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQTRCbEMsNkJBQXdCLEdBQUcsSUFBSSxlQUFlLENBQ3BELElBQUksR0FBRyxFQUFFLENBQ1YsQ0FBQztRQUNNLDZCQUF3QixHQUFHLElBQUksZUFBZSxDQUNwRCxJQUFJLEdBQUcsRUFBRSxDQUNWLENBQUM7UUEvQkEsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCO2FBQ2pELGdCQUErQyxDQUFDO1FBQ25ELE1BQU0sYUFBYSxHQUFHLGdCQUFnQixDQUFDLFFBQXlCLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDO0lBQzlDLENBQUM7SUFJRDs7OztPQUlHO0lBQ0ksb0JBQW9CLENBQUMsT0FBZTtRQUN6QyxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDO2FBQ3hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNi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V0FBVyxDQUFDLElBQUksRUFBRSxDQUNoRSxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGFBQWEsQ0FBQyxZQUFzQjtRQUN6QyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQ3ZDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsRUFBRSxZQUFZLENBQUMsQ0FDM0QsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLGlCQUFpQixDQUFDLFlBQXNCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FDeEIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxFQUN4QyxZQUFZLENBQ2IsQ0FBQztJQUNKLENBQUM7OzRIQXhNVSwrQkFBK0I7Z0lBQS9CLCtCQUErQixjQUY5QixNQUFNOzJGQUVQLCtCQUErQjtrQkFIM0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBFcGRWaXN1YWxpemF0aW9uQ29uZmlnLFxuICBFcGRWaXN1YWxpemF0aW9uSW5uZXJDb25maWcsXG4gIFVzYWdlSWRDb25maWcsXG59IGZyb20gJ0BzcGFydGFjdXMvZXBkLXZpc3VhbGl6YXRpb24vcm9vdCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0LCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBNZXRhZGF0dW0sXG4gIE5vZGVzUmVzcG9uc2UsXG4gIFRyZWVOb2RlLFxufSBmcm9tICcuLi8uLi9jb25uZWN0b3JzL3NjZW5lL25vZGVzLXJlc3BvbnNlJztcbmltcG9ydCB7IFNjZW5lQ29ubmVjdG9yIH0gZnJvbSAnLi4vLi4vY29ubmVjdG9ycy9zY2VuZS9zY2VuZS5jb25uZWN0b3InO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVJZFByb2R1Y3RDb2RlcyB7XG4gIG5vZGVJZDogc3RyaW5nO1xuICBwcm9kdWN0Q29kZXM6IHN0cmluZ1tdO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2NlbmVOb2RlVG9Qcm9kdWN0TG9va3VwU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBlcGRWaXN1YWxpemF0aW9uQ29uZmlnOiBFcGRWaXN1YWxpemF0aW9uQ29uZmlnLFxuICAgIHByb3RlY3RlZCBzY2VuZUNvbm5lY3RvcjogU2NlbmVDb25uZWN0b3JcbiAgKSB7XG4gICAgY29uc3QgZXBkVmlzdWFsaXphdGlvbiA9IHRoaXMuZXBkVmlzdWFsaXphdGlvbkNvbmZpZ1xuICAgICAgLmVwZFZpc3VhbGl6YXRpb24gYXMgRXBkVmlzdWFsaXphdGlvbklubmVyQ29uZmlnO1xuICAgIGNvbnN0IHVzYWdlSWRDb25maWcgPSBlcGRWaXN1YWxpemF0aW9uLnVzYWdlSWRzIGFzIFVzYWdlSWRDb25maWc7XG4gICAgdGhpcy51c2FnZUlkID0gdXNhZ2VJZENvbmZpZy5wcm9kdWN0VXNhZ2VJZDtcbiAgfVxuXG4gIHByaXZhdGUgdXNhZ2VJZDtcblxuICAvKipcbiAgICogQ2FsbGVkIHRvIHBvcHVsYXRlIHRoZSBtYXBzIHdpdGggdGhlIGRhdGEgZm9yIHRoZSBnaXZlbiBzY2VuZS5cbiAgICogVGhpcyBjYW4gYmUgZG9uZSBiZWZvcmUgdGhlIHNjZW5lIGhhcyBiZWVuIGxvYWRlZCBzaW5jZSB0aGlzIGp1c3QgaW52b2x2ZXMgYSBzdG9yYWdlIHNlcnZpY2UgQVBJIGNhbGxcbiAgICogQHBhcmFtIHNjZW5lSWQgVGhlIHNjZW5lIGlkIG9mIHRoZSBsb2FkZWQgc2NlbmUuXG4gICAqL1xuICBwdWJsaWMgcG9wdWxhdGVNYXBzRm9yU2NlbmUoc2NlbmVJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5nZXROb2RlSWRQcm9kdWN0Q29kZXNGb3JTY2VuZShzY2VuZUlkKVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoKG5vZGVJZFByb2R1Y3RDb2RlczogTm9kZUlkUHJvZHVjdENvZGVzW10pID0+IHtcbiAgICAgICAgdGhpcy5wcm9kdWN0Q29kZXNCeU5vZGVJZE1hcCQubmV4dChcbiAgICAgICAgICB0aGlzLmdldFByb2R1Y3RDb2Rlc0J5Tm9kZUlkTWFwKG5vZGVJZFByb2R1Y3RDb2RlcylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5ub2RlSWRzQnlQcm9kdWN0Q29kZU1hcCQubmV4dChcbiAgICAgICAgICB0aGlzLmdldE5vZGVJZHNCeVByb2R1Y3RDb2RlTWFwKG5vZGVJZFByb2R1Y3RDb2RlcylcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9kdWN0Q29kZXNCeU5vZGVJZE1hcCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1hcDxzdHJpbmcsIHN0cmluZ1tdPj4oXG4gICAgbmV3IE1hcCgpXG4gICk7XG4gIHByaXZhdGUgbm9kZUlkc0J5UHJvZHVjdENvZGVNYXAkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxNYXA8c3RyaW5nLCBzdHJpbmdbXT4+KFxuICAgIG5ldyBNYXAoKVxuICApO1xuXG4gIHByaXZhdGUgZ2V0Tm9kZUlkUHJvZHVjdENvZGVzRm9yU2NlbmUoXG4gICAgc2NlbmVJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Tm9kZUlkUHJvZHVjdENvZGVzW10+IHtcbiAgICByZXR1cm4gdGhpcy5zY2VuZUNvbm5lY3RvclxuICAgICAgLmdldE5vZGVzKFxuICAgICAgICBzY2VuZUlkLFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIFtcbiAgICAgICAgICAnaG90c3BvdCcsXG4gICAgICAgICAgYG1ldGFkYXRhWyR7dGhpcy51c2FnZUlkLnNvdXJjZX1dLiR7dGhpcy51c2FnZUlkLmNhdGVnb3J5fS4ke3RoaXMudXNhZ2VJZC5rZXlOYW1lfWAsXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICBgbWV0YWRhdGFbJHt0aGlzLnVzYWdlSWQuc291cmNlfV0uJHt0aGlzLnVzYWdlSWQuY2F0ZWdvcnl9LiR7dGhpcy51c2FnZUlkLmtleU5hbWV9YCxcbiAgICAgICAgXSxcbiAgICAgICAgJyonXG4gICAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChkYXRhOiBOb2Rlc1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChkYXRhLm5vZGVzIGFzIFRyZWVOb2RlW10pXG4gICAgICAgICAgICAuZmlsdGVyKChub2RlOiBUcmVlTm9kZSkgPT4gbm9kZS5tZXRhZGF0YSAmJiBub2RlLm1ldGFkYXRhLmxlbmd0aClcbiAgICAgICAgICAgIC5tYXAoKG5vZGU6IFRyZWVOb2RlKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiA8Tm9kZUlkUHJvZHVjdENvZGVzPntcbiAgICAgICAgICAgICAgICBub2RlSWQ6IG5vZGUuc2lkLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RDb2RlczogKG5vZGUubWV0YWRhdGEgYXMgTWV0YWRhdHVtW10pLm1hcChcbiAgICAgICAgICAgICAgICAgIChtZXRhZGF0YTogYW55KSA9PiBtZXRhZGF0YS52YWx1ZVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldFByb2R1Y3RDb2Rlc0J5Tm9kZUlkTWFwKFxuICAgIG5vZGVJZFByb2R1Y3RDb2RlczogTm9kZUlkUHJvZHVjdENvZGVzW11cbiAgKTogTWFwPHN0cmluZywgc3RyaW5nW10+IHtcbiAgICByZXR1cm4gbm9kZUlkUHJvZHVjdENvZGVzLnJlZHVjZShcbiAgICAgIChcbiAgICAgICAgcHJvZHVjdENvZGVCeU5vZGVJZE1hcDogTWFwPHN0cmluZywgc3RyaW5nW10+LFxuICAgICAgICBub2RlSWRQcm9kdWN0Q29kZVR1cGxlOiBOb2RlSWRQcm9kdWN0Q29kZXNcbiAgICAgICkgPT4ge1xuICAgICAgICBwcm9kdWN0Q29kZUJ5Tm9kZUlkTWFwLnNldChcbiAgICAgICAgICBub2RlSWRQcm9kdWN0Q29kZVR1cGxlLm5vZGVJZCxcbiAgICAgICAgICBub2RlSWRQcm9kdWN0Q29kZVR1cGxlLnByb2R1Y3RDb2Rlc1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcHJvZHVjdENvZGVCeU5vZGVJZE1hcDtcbiAgICAgIH0sXG4gICAgICBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXROb2RlSWRzQnlQcm9kdWN0Q29kZU1hcChcbiAgICBub2RlSWRQcm9kdWN0Q29kZXM6IE5vZGVJZFByb2R1Y3RDb2Rlc1tdXG4gICk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIG5vZGVJZFByb2R1Y3RDb2Rlcy5yZWR1Y2UoXG4gICAgICAoXG4gICAgICAgIG5vZGVJZEJ5UHJvZHVjdENvZGVNYXA6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPixcbiAgICAgICAgbm9kZUlkUHJvZHVjdENvZGVUdXBsZTogTm9kZUlkUHJvZHVjdENvZGVzXG4gICAgICApID0+IHtcbiAgICAgICAgbm9kZUlkUHJvZHVjdENvZGVUdXBsZS5wcm9kdWN0Q29kZXMuZm9yRWFjaCgocHJvZHVjdENvZGUpID0+IHtcbiAgICAgICAgICBjb25zdCBub2RlSWRzID0gbm9kZUlkQnlQcm9kdWN0Q29kZU1hcC5nZXQocHJvZHVjdENvZGUpO1xuICAgICAgICAgIGlmIChub2RlSWRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5vZGVJZHMucHVzaChub2RlSWRQcm9kdWN0Q29kZVR1cGxlLm5vZGVJZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGVJZEJ5UHJvZHVjdENvZGVNYXAuc2V0KHByb2R1Y3RDb2RlLCBbXG4gICAgICAgICAgICAgIG5vZGVJZFByb2R1Y3RDb2RlVHVwbGUubm9kZUlkLFxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGVJZEJ5UHJvZHVjdENvZGVNYXA7XG4gICAgICB9LFxuICAgICAgbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGlzdGluY3QgdmFsdWVzIHdoaWxlIHJldGFpbmluZyBvcmRlcmluZy5cbiAgICovXG4gIHByaXZhdGUgZGlzdGluY3QodmFsdWVzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IHVuaXF1ZUFycmF5OiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IHZhbHVlU2V0ID0gbmV3IFNldCgpO1xuICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKCF2YWx1ZVNldC5oYXModmFsdWUpKSB7XG4gICAgICAgIHZhbHVlU2V0LmFkZCh2YWx1ZSk7XG4gICAgICAgIHVuaXF1ZUFycmF5LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB1bmlxdWVBcnJheTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvb2t1cFByb2R1Y3RDb2RlcyhcbiAgICBwcm9kdWN0Q29kZXNCeU5vZGVJZE1hcDogTWFwPHN0cmluZywgc3RyaW5nW10+LFxuICAgIG5vZGVJZHM6IHN0cmluZ1tdXG4gICk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5kaXN0aW5jdChcbiAgICAgIG5vZGVJZHMuZmxhdE1hcCgobm9kZUlkKSA9PiBwcm9kdWN0Q29kZXNCeU5vZGVJZE1hcC5nZXQobm9kZUlkKSB8fCBbXSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSBwcm9kdWNpbmcgYW4gYXJyYXkgb2YgcHJvZHVjdCBjb2RlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBzcGVjaWZpZWQgc2NlbmUgbm9kZSBpZHMgaW4gdGhlIGN1cnJlbnRseSBsb2FkZWQgc2NlbmUuXG4gICAqIEBwYXJhbSBub2RlSWRzIFRoZSBzY2VuZSBub2RlIGlkcy5cbiAgICogQHJldHVybnMgQW4gT2JzZXJ2YWJsZSBwcm9kdWNpbmcgYW4gYXJyYXkgb2YgcHJvZHVjdCBjb2RlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBzcGVjaWZpZWQgc2NlbmUgbm9kZSBpZHMgaW4gdGhlIGN1cnJlbnRseSBsb2FkZWQgc2NlbmUuXG4gICAqL1xuICBwdWJsaWMgbG9va3VwUHJvZHVjdENvZGVzKG5vZGVJZHM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLnByb2R1Y3RDb2Rlc0J5Tm9kZUlkTWFwJC5waXBlKFxuICAgICAgZmlyc3QoKSxcbiAgICAgIG1hcCgocHJvZHVjdENvZGVzQnlOb2RlSWRNYXApID0+XG4gICAgICAgIHRoaXMuX2xvb2t1cFByb2R1Y3RDb2Rlcyhwcm9kdWN0Q29kZXNCeU5vZGVJZE1hcCwgbm9kZUlkcylcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgcHJvZHVjdCBjb2RlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBzcGVjaWZpZWQgc2NlbmUgbm9kZSBpZHMgaW4gdGhlIGN1cnJlbnRseSBsb2FkZWQgc2NlbmUuXG4gICAqIFJldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgdGhlIG1hcCBvZiBwcm9kdWN0IGNvZGVzIGJ5IG5vZGUgaWQgaGFzIG5vdCB5ZXQgYmVlbiBwb3B1bGF0ZWQuXG4gICAqIEZvciBjYXNlcyB3aGVyZSB0aGUgY29kZSBtdXN0IGV4ZWN1dGUgc3luY2hyb25vdXNseS5cbiAgICogQHBhcmFtIG5vZGVJZHMgVGhlIHNjZW5lIG5vZGUgaWRzLlxuICAgKiBAcmV0dXJucyBBbiBhcnJheSBvZiBwcm9kdWN0IGNvZGVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHNwZWNpZmllZCBzY2VuZSBub2RlIGlkcyBpbiB0aGUgY3VycmVudGx5IGxvYWRlZCBzY2VuZS5cbiAgICovXG4gIHB1YmxpYyBzeW5jTG9va3VwUHJvZHVjdENvZGVzKG5vZGVJZHM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9sb29rdXBQcm9kdWN0Q29kZXMoXG4gICAgICB0aGlzLnByb2R1Y3RDb2Rlc0J5Tm9kZUlkTWFwJC5nZXRWYWx1ZSgpLFxuICAgICAgbm9kZUlkc1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9sb29rdXBOb2RlSWRzKFxuICAgIG5vZGVJZHNCeVByb2R1Y3RDb2RlTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4sXG4gICAgcHJvZHVjdENvZGVzOiBzdHJpbmdbXVxuICApOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzdGluY3QoXG4gICAgICBwcm9kdWN0Q29kZXMuZmxhdE1hcChcbiAgICAgICAgKHByb2R1Y3RDb2RlKSA9PiBub2RlSWRzQnlQcm9kdWN0Q29kZU1hcC5nZXQocHJvZHVjdENvZGUpIHx8IFtdXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgcHJvZHVjaW5nIGFuIGFycmF5IG9mIHNjZW5lIG5vZGUgaWRzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHNwZWNpZmllZCBwcm9kdWN0IGNvZGVzIGluIHRoZSBjdXJyZW50bHkgbG9hZGVkIHNjZW5lLlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGVzIFRoZSBwcm9kdWN0IGNvZGVzLlxuICAgKiBAcmV0dXJucyBBbiBPYnNlcnZhYmxlIHByb2R1Y2luZyBhbiBhcnJheSBvZiBzY2VuZSBub2RlIGlkcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBzcGVjaWZpZWQgcHJvZHVjdCBjb2RlcyBpbiB0aGUgY3VycmVudGx5IGxvYWRlZCBzY2VuZS5cbiAgICovXG4gIHB1YmxpYyBsb29rdXBOb2RlSWRzKHByb2R1Y3RDb2Rlczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubm9kZUlkc0J5UHJvZHVjdENvZGVNYXAkLnBpcGUoXG4gICAgICBtYXAoKG5vZGVJZHNCeVByb2R1Y3RDb2RlTWFwKSA9PlxuICAgICAgICB0aGlzLl9sb29rdXBOb2RlSWRzKG5vZGVJZHNCeVByb2R1Y3RDb2RlTWFwLCBwcm9kdWN0Q29kZXMpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHNjZW5lIG5vZGUgaWRzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHNwZWNpZmllZCBwcm9kdWN0IGNvZGVzIGluIHRoZSBjdXJyZW50bHkgbG9hZGVkIHNjZW5lLlxuICAgKiBSZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIHRoZSBtYXAgb2Ygbm9kZSBpZHMgYnkgcHJvZHVjdCBjb2RlIGhhcyBub3QgeWV0IGJlZW4gcG9wdWxhdGVkLlxuICAgKiBGb3IgY2FzZXMgd2hlcmUgdGhlIGNvZGUgbXVzdCBleGVjdXRlIHN5bmNocm9ub3VzbHkuXG4gICAqIEBwYXJhbSBwcm9kdWN0Q29kZXMgVGhlIHByb2R1Y3QgY29kZXMuXG4gICAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHNjZW5lIG5vZGUgaWRzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHNwZWNpZmllZCBwcm9kdWN0IGNvZGVzIGluIHRoZSBjdXJyZW50bHkgbG9hZGVkIHNjZW5lLlxuICAgKi9cbiAgcHVibGljIHN5bmNMb29rdXBOb2RlSWRzKHByb2R1Y3RDb2Rlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb2t1cE5vZGVJZHMoXG4gICAgICB0aGlzLm5vZGVJZHNCeVByb2R1Y3RDb2RlTWFwJC5nZXRWYWx1ZSgpLFxuICAgICAgcHJvZHVjdENvZGVzXG4gICAgKTtcbiAgfVxufVxuIl19