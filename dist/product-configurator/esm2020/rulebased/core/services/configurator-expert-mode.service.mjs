/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * This implementation is OCC specific.
 * Different backend might have completely different need regarding expert mode.
 * To implement custom solution provide your own implementation and customize services that use ConfiguratorExpertModeService
 */
export class ConfiguratorExpertModeService {
    constructor() {
        this._expModeRequested = new ReplaySubject(1);
        this._expModeActive = new ReplaySubject(1);
    }
    /**
     * Sets requested expert mode.
     *
     * @param expMode
     */
    setExpModeRequested(expMode) {
        this._expModeRequested.next(expMode);
    }
    /**
     * This function provides the requested expert mode the OCC calls should use, depending
     * on whether there is an active storefront session or not.
     */
    getExpModeRequested() {
        return this._expModeRequested;
    }
    /**
     * Sets requested expert mode.
     *
     * @param expMode
     */
    setExpModeActive(expMode) {
        this._expModeActive.next(expMode);
    }
    /**
     * This function provides the requested expert mode the OCC calls should use, depending
     * on whether there is an active storefront session or not.
     */
    getExpModeActive() {
        return this._expModeActive;
    }
}
ConfiguratorExpertModeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExpertModeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorExpertModeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExpertModeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExpertModeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWV4cGVydC1tb2RlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvcmUvc2VydmljZXMvY29uZmlndXJhdG9yLWV4cGVydC1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFFakQ7Ozs7R0FJRztBQUlILE1BQU0sT0FBTyw2QkFBNkI7SUFIMUM7UUFJVSxzQkFBaUIsR0FBd0IsSUFBSSxhQUFhLENBQ2hFLENBQUMsQ0FDRixDQUFDO1FBQ00sbUJBQWMsR0FBd0IsSUFBSSxhQUFhLENBQVUsQ0FBQyxDQUFDLENBQUM7S0FtQzdFO0lBakNDOzs7O09BSUc7SUFDSSxtQkFBbUIsQ0FBQyxPQUFnQjtRQUN4QyxJQUFJLENBQUMsaUJBQTRDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7O09BR0c7SUFDSSxtQkFBbUI7UUFDeEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxnQkFBZ0IsQ0FBQyxPQUFnQjtRQUNyQyxJQUFJLENBQUMsY0FBeUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGdCQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQzs7MEhBdENVLDZCQUE2Qjs4SEFBN0IsNkJBQTZCLGNBRjVCLE1BQU07MkZBRVAsNkJBQTZCO2tCQUh6QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBUaGlzIGltcGxlbWVudGF0aW9uIGlzIE9DQyBzcGVjaWZpYy5cbiAqIERpZmZlcmVudCBiYWNrZW5kIG1pZ2h0IGhhdmUgY29tcGxldGVseSBkaWZmZXJlbnQgbmVlZCByZWdhcmRpbmcgZXhwZXJ0IG1vZGUuXG4gKiBUbyBpbXBsZW1lbnQgY3VzdG9tIHNvbHV0aW9uIHByb3ZpZGUgeW91ciBvd24gaW1wbGVtZW50YXRpb24gYW5kIGN1c3RvbWl6ZSBzZXJ2aWNlcyB0aGF0IHVzZSBDb25maWd1cmF0b3JFeHBlcnRNb2RlU2VydmljZVxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yRXhwZXJ0TW9kZVNlcnZpY2Uge1xuICBwcml2YXRlIF9leHBNb2RlUmVxdWVzdGVkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gbmV3IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4oXG4gICAgMVxuICApO1xuICBwcml2YXRlIF9leHBNb2RlQWN0aXZlOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gbmV3IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4oMSk7XG5cbiAgLyoqXG4gICAqIFNldHMgcmVxdWVzdGVkIGV4cGVydCBtb2RlLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwTW9kZVxuICAgKi9cbiAgcHVibGljIHNldEV4cE1vZGVSZXF1ZXN0ZWQoZXhwTW9kZTogYm9vbGVhbik6IHZvaWQge1xuICAgICh0aGlzLl9leHBNb2RlUmVxdWVzdGVkIGFzIFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4pLm5leHQoZXhwTW9kZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBwcm92aWRlcyB0aGUgcmVxdWVzdGVkIGV4cGVydCBtb2RlIHRoZSBPQ0MgY2FsbHMgc2hvdWxkIHVzZSwgZGVwZW5kaW5nXG4gICAqIG9uIHdoZXRoZXIgdGhlcmUgaXMgYW4gYWN0aXZlIHN0b3JlZnJvbnQgc2Vzc2lvbiBvciBub3QuXG4gICAqL1xuICBwdWJsaWMgZ2V0RXhwTW9kZVJlcXVlc3RlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fZXhwTW9kZVJlcXVlc3RlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHJlcXVlc3RlZCBleHBlcnQgbW9kZS5cbiAgICpcbiAgICogQHBhcmFtIGV4cE1vZGVcbiAgICovXG4gIHB1YmxpYyBzZXRFeHBNb2RlQWN0aXZlKGV4cE1vZGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAodGhpcy5fZXhwTW9kZUFjdGl2ZSBhcyBSZXBsYXlTdWJqZWN0PGJvb2xlYW4+KS5uZXh0KGV4cE1vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gcHJvdmlkZXMgdGhlIHJlcXVlc3RlZCBleHBlcnQgbW9kZSB0aGUgT0NDIGNhbGxzIHNob3VsZCB1c2UsIGRlcGVuZGluZ1xuICAgKiBvbiB3aGV0aGVyIHRoZXJlIGlzIGFuIGFjdGl2ZSBzdG9yZWZyb250IHNlc3Npb24gb3Igbm90LlxuICAgKi9cbiAgcHVibGljIGdldEV4cE1vZGVBY3RpdmUoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cE1vZGVBY3RpdmU7XG4gIH1cbn1cbiJdfQ==