/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DefaultRoutePageMetaResolver, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../links/addresses/services/current-unit-address.service";
export class UnitAddressRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
UnitAddressRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressRoutePageMetaResolver, deps: [{ token: i1.TranslationService }, { token: i2.CurrentUnitAddressService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitAddressRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }, { type: i2.CurrentUnitAddressService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1hZGRyZXNzLXJvdXRlLXBhZ2UtbWV0YS5yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L3NlcnZpY2VzL3VuaXQtYWRkcmVzcy1yb3V0ZS1wYWdlLW1ldGEucmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLDRCQUE0QixHQUU3QixNQUFNLGlCQUFpQixDQUFDOzs7O0FBS3pCLE1BQU0sT0FBTyxnQ0FBaUMsU0FBUSw0QkFBNEI7SUFDaEYsWUFDRSxXQUErQixFQUNyQixrQkFBNkM7UUFFdkQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRlQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUEyQjtJQUd6RCxDQUFDO0lBRVMsU0FBUztRQUNqQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7SUFDdkMsQ0FBQzs7NkhBVlUsZ0NBQWdDO2lJQUFoQyxnQ0FBZ0MsY0FEbkIsTUFBTTsyRkFDbkIsZ0NBQWdDO2tCQUQ1QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFkZHJlc3MsXG4gIERlZmF1bHRSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXIsXG4gIFRyYW5zbGF0aW9uU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEN1cnJlbnRVbml0QWRkcmVzc1NlcnZpY2UgfSBmcm9tICcuLi9saW5rcy9hZGRyZXNzZXMvc2VydmljZXMvY3VycmVudC11bml0LWFkZHJlc3Muc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVW5pdEFkZHJlc3NSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXIgZXh0ZW5kcyBEZWZhdWx0Um91dGVQYWdlTWV0YVJlc29sdmVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY3VycmVudEl0ZW1TZXJ2aWNlOiBDdXJyZW50VW5pdEFkZHJlc3NTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHRyYW5zbGF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQYXJhbXMoKTogT2JzZXJ2YWJsZTxBZGRyZXNzIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEl0ZW1TZXJ2aWNlLml0ZW0kO1xuICB9XG59XG4iXX0=