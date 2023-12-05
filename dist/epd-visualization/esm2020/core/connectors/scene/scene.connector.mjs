/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./scene.adapter";
export class SceneConnector {
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
SceneConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneConnector, deps: [{ token: i1.SceneAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
SceneConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SceneConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.SceneAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUuY29ubmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9jb3JlL2Nvbm5lY3RvcnMvc2NlbmUvc2NlbmUuY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFRM0MsTUFBTSxPQUFPLGNBQWM7SUFDekIsWUFBc0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBRyxDQUFDO0lBRXBEOzs7Ozs7OztPQVFHO0lBQ0gsUUFBUSxDQUNOLE9BQWUsRUFDZixPQUFrQixFQUNsQixPQUFrQixFQUNsQixPQUFrQixFQUNsQixXQUFvQjtRQUVwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUMvQixPQUFPLEVBQ1AsT0FBTyxFQUNQLE9BQU8sRUFDUCxPQUFPLEVBQ1AsV0FBVyxDQUNaLENBQUM7SUFDSixDQUFDOzsyR0ExQlUsY0FBYzsrR0FBZCxjQUFjLGNBRmIsTUFBTTsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vZGVzUmVzcG9uc2UgfSBmcm9tICcuL25vZGVzLXJlc3BvbnNlJztcbmltcG9ydCB7IFNjZW5lQWRhcHRlciB9IGZyb20gJy4vc2NlbmUuYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTY2VuZUNvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzY2VuZUFkYXB0ZXI6IFNjZW5lQWRhcHRlcikge31cblxuICAvKipcbiAgICogVXNlZCBmb3IgaW52b2tpbmcgdGhlIEVQRCBWaXN1YWxpemF0aW9uIEFQSSBmb3IgcmV0cmlldmluZyBzY2VuZSBub2RlIGluZm9ybWF0aW9uLlxuICAgKiBAcGFyYW0gc2NlbmVJZCBUaGUgc2NlbmUgaWQgdG8gdXNlIGFzIHRoZSBzY2VuZUlkIHBhdGggcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0gbm9kZUlkcyBBbiBhcnJheSBvZiBzY2VuZSBub2RlIGlkcyB0byBwYXNzIGluIGlkIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSAkZXhwYW5kIEEgc2V0IG9mIHN0cmluZ3MgdG8gY29tYmluZSB0byBmb3JtIHRoZSAkZXhwYW5kIHF1ZXJ5IHBhcmFtZXRlci5cbiAgICogQHBhcmFtICRmaWx0ZXIgQSBzZXQgb2Ygc3RyaW5ncyB0byBjb21iaW5lIHRvIGZvcm0gdGhlICRmaWx0ZXIgcXVlcnkgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0gY29udGVudFR5cGUgVGhlIGNvbnRlbnRUeXBlIHF1ZXJ5IHBhcmFtZXRlci5cbiAgICogQHJldHVybnMgQW4gT2JzZXJ2YWJsZSBwcm9kdWNpbmcgYSBOb2Rlc1Jlc3BvbnNlIHdoaWNoIGNvbnRhaW5zIGFuIGFycmF5IG9mIG9iamVjdHMgZGVzY3JpYmluZyBzY2VuZSBub2Rlcy5cbiAgICovXG4gIGdldE5vZGVzKFxuICAgIHNjZW5lSWQ6IHN0cmluZyxcbiAgICBub2RlSWRzPzogc3RyaW5nW10sXG4gICAgJGV4cGFuZD86IHN0cmluZ1tdLFxuICAgICRmaWx0ZXI/OiBzdHJpbmdbXSxcbiAgICBjb250ZW50VHlwZT86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE5vZGVzUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5zY2VuZUFkYXB0ZXIuZ2V0Tm9kZXMoXG4gICAgICBzY2VuZUlkLFxuICAgICAgbm9kZUlkcyxcbiAgICAgICRleHBhbmQsXG4gICAgICAkZmlsdGVyLFxuICAgICAgY29udGVudFR5cGVcbiAgICApO1xuICB9XG59XG4iXX0=