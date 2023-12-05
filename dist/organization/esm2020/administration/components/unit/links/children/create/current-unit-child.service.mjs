/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CurrentUnitService } from '../../../services/current-unit.service';
import * as i0 from "@angular/core";
export class CurrentUnitChildService extends CurrentUnitService {
    getParamKey() {
        // We must come up with a fake param key, to avoid that the (parent) unit
        // code is loaded from the route parameter map.
        return 'childUnitCode';
    }
}
CurrentUnitChildService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitChildService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
CurrentUnitChildService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitChildService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitChildService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC11bml0LWNoaWxkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy9jaGlsZHJlbi9jcmVhdGUvY3VycmVudC11bml0LWNoaWxkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0FBSzVFLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxrQkFBa0I7SUFDbkQsV0FBVztRQUNuQix5RUFBeUU7UUFDekUsK0NBQStDO1FBQy9DLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7O29IQUxVLHVCQUF1Qjt3SEFBdkIsdUJBQXVCLGNBRnRCLE1BQU07MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEN1cnJlbnRVbml0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2N1cnJlbnQtdW5pdC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbnRVbml0Q2hpbGRTZXJ2aWNlIGV4dGVuZHMgQ3VycmVudFVuaXRTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGdldFBhcmFtS2V5KCk6IHN0cmluZyB7XG4gICAgLy8gV2UgbXVzdCBjb21lIHVwIHdpdGggYSBmYWtlIHBhcmFtIGtleSwgdG8gYXZvaWQgdGhhdCB0aGUgKHBhcmVudCkgdW5pdFxuICAgIC8vIGNvZGUgaXMgbG9hZGVkIGZyb20gdGhlIHJvdXRlIHBhcmFtZXRlciBtYXAuXG4gICAgcmV0dXJuICdjaGlsZFVuaXRDb2RlJztcbiAgfVxufVxuIl19