/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { resolveApplicable } from '../../../util';
import { I18nextBackendInitializer } from './i18next-backend.initializer';
import * as i0 from "@angular/core";
/**
 * Configures an i18next backend plugin, to allow for loading translations from external resources.
 *
 * By default it configures and uses the `I18nextHttpBackendService`.
 *
 * It's an extension point to allow for providing potentially different i18next backend plugins.
 * See the list of available plugins: https://www.i18next.com/overview/plugins-and-utils#backends
 */
export class I18nextBackendService {
    constructor(backendInitializers) {
        this.backendInitializers = backendInitializers;
    }
    /**
     * Configures an i18next backend plugin, to allow for loading translations from external resources.
     *
     * @returns Additional configuration to be used when initializing the i18next instance.
     */
    initialize() {
        const backendInitializer = resolveApplicable(this.backendInitializers ?? []);
        return backendInitializer?.initialize() ?? {};
    }
}
I18nextBackendService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextBackendService, deps: [{ token: I18nextBackendInitializer, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
I18nextBackendService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextBackendService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nextBackendService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [I18nextBackendInitializer]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC1iYWNrZW5kLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9pMThuL2kxOG5leHQvaTE4bmV4dC1iYWNrZW5kL2kxOG5leHQtYmFja2VuZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUUxRTs7Ozs7OztHQU9HO0FBRUgsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUdZLG1CQUF1RDtRQUF2RCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9DO0lBQ2hFLENBQUM7SUFFSjs7OztPQUlHO0lBQ0gsVUFBVTtRQUNSLE1BQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQzFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQy9CLENBQUM7UUFDRixPQUFPLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNoRCxDQUFDOztrSEFqQlUscUJBQXFCLGtCQUd0Qix5QkFBeUI7c0hBSHhCLHFCQUFxQixjQURSLE1BQU07MkZBQ25CLHFCQUFxQjtrQkFEakMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzBCQUc3QixRQUFROzswQkFDUixNQUFNOzJCQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB0eXBlIHsgSW5pdE9wdGlvbnMgfSBmcm9tICdpMThuZXh0JztcbmltcG9ydCB7IHJlc29sdmVBcHBsaWNhYmxlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbCc7XG5pbXBvcnQgeyBJMThuZXh0QmFja2VuZEluaXRpYWxpemVyIH0gZnJvbSAnLi9pMThuZXh0LWJhY2tlbmQuaW5pdGlhbGl6ZXInO1xuXG4vKipcbiAqIENvbmZpZ3VyZXMgYW4gaTE4bmV4dCBiYWNrZW5kIHBsdWdpbiwgdG8gYWxsb3cgZm9yIGxvYWRpbmcgdHJhbnNsYXRpb25zIGZyb20gZXh0ZXJuYWwgcmVzb3VyY2VzLlxuICpcbiAqIEJ5IGRlZmF1bHQgaXQgY29uZmlndXJlcyBhbmQgdXNlcyB0aGUgYEkxOG5leHRIdHRwQmFja2VuZFNlcnZpY2VgLlxuICpcbiAqIEl0J3MgYW4gZXh0ZW5zaW9uIHBvaW50IHRvIGFsbG93IGZvciBwcm92aWRpbmcgcG90ZW50aWFsbHkgZGlmZmVyZW50IGkxOG5leHQgYmFja2VuZCBwbHVnaW5zLlxuICogU2VlIHRoZSBsaXN0IG9mIGF2YWlsYWJsZSBwbHVnaW5zOiBodHRwczovL3d3dy5pMThuZXh0LmNvbS9vdmVydmlldy9wbHVnaW5zLWFuZC11dGlscyNiYWNrZW5kc1xuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEkxOG5leHRCYWNrZW5kU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChJMThuZXh0QmFja2VuZEluaXRpYWxpemVyKVxuICAgIHByb3RlY3RlZCBiYWNrZW5kSW5pdGlhbGl6ZXJzOiBJMThuZXh0QmFja2VuZEluaXRpYWxpemVyW10gfCBudWxsXG4gICkge31cblxuICAvKipcbiAgICogQ29uZmlndXJlcyBhbiBpMThuZXh0IGJhY2tlbmQgcGx1Z2luLCB0byBhbGxvdyBmb3IgbG9hZGluZyB0cmFuc2xhdGlvbnMgZnJvbSBleHRlcm5hbCByZXNvdXJjZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiB0byBiZSB1c2VkIHdoZW4gaW5pdGlhbGl6aW5nIHRoZSBpMThuZXh0IGluc3RhbmNlLlxuICAgKi9cbiAgaW5pdGlhbGl6ZSgpOiBJbml0T3B0aW9ucyB7XG4gICAgY29uc3QgYmFja2VuZEluaXRpYWxpemVyID0gcmVzb2x2ZUFwcGxpY2FibGUoXG4gICAgICB0aGlzLmJhY2tlbmRJbml0aWFsaXplcnMgPz8gW11cbiAgICApO1xuICAgIHJldHVybiBiYWNrZW5kSW5pdGlhbGl6ZXI/LmluaXRpYWxpemUoKSA/PyB7fTtcbiAgfVxufVxuIl19