/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isNotUndefined, } from '@spartacus/core';
import { of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class CurrentProductService {
    constructor(routingService, productService) {
        this.routingService = routingService;
        this.productService = productService;
        this.DEFAULT_PRODUCT_SCOPE = "details" /* ProductScope.DETAILS */;
    }
    /**
     * Returns an observable for the current product
     * @returns Product
     * @returns null if product can't be found
     *
     * @param scopes
     */
    getProduct(scopes) {
        return this.getCode().pipe(distinctUntilChanged(), switchMap((productCode) => {
            return productCode
                ? this.productService.get(productCode, scopes || this.DEFAULT_PRODUCT_SCOPE)
                : of(null);
        }), filter(isNotUndefined));
    }
    getCode() {
        return this.routingService
            .getRouterState()
            .pipe(map((state) => state.state.params['productCode']));
    }
}
CurrentProductService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentProductService, deps: [{ token: i1.RoutingService }, { token: i1.ProductService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentProductService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentProductService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentProductService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1.ProductService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1wcm9kdWN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3Byb2R1Y3QvY3VycmVudC1wcm9kdWN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGNBQWMsR0FLZixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUs5RSxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQ1UsY0FBOEIsRUFDOUIsY0FBOEI7UUFEOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUdyQiwwQkFBcUIsd0NBQXdCO0lBRjdELENBQUM7SUFJSjs7Ozs7O09BTUc7SUFDSCxVQUFVLENBQ1IsTUFBMEQ7UUFFMUQsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUN4QixvQkFBb0IsRUFBRSxFQUN0QixTQUFTLENBQUMsQ0FBQyxXQUFtQixFQUFFLEVBQUU7WUFDaEMsT0FBTyxXQUFXO2dCQUNoQixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLFdBQVcsRUFDWCxNQUFNLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUNyQztnQkFDSCxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLEVBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUN2QixDQUFDO0lBQ0osQ0FBQztJQUVTLE9BQU87UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjO2FBQ3ZCLGNBQWMsRUFBRTthQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7a0hBcENVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLE1BQU07MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIGlzTm90VW5kZWZpbmVkLFxuICBQcm9kdWN0LFxuICBQcm9kdWN0U2NvcGUsXG4gIFByb2R1Y3RTZXJ2aWNlLFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbnRQcm9kdWN0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9QUk9EVUNUX1NDT1BFID0gUHJvZHVjdFNjb3BlLkRFVEFJTFM7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSBmb3IgdGhlIGN1cnJlbnQgcHJvZHVjdFxuICAgKiBAcmV0dXJucyBQcm9kdWN0XG4gICAqIEByZXR1cm5zIG51bGwgaWYgcHJvZHVjdCBjYW4ndCBiZSBmb3VuZFxuICAgKlxuICAgKiBAcGFyYW0gc2NvcGVzXG4gICAqL1xuICBnZXRQcm9kdWN0KFxuICAgIHNjb3Blcz86IChQcm9kdWN0U2NvcGUgfCBzdHJpbmcpW10gfCBQcm9kdWN0U2NvcGUgfCBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxQcm9kdWN0IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLmdldENvZGUoKS5waXBlKFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHN3aXRjaE1hcCgocHJvZHVjdENvZGU6IHN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4gcHJvZHVjdENvZGVcbiAgICAgICAgICA/IHRoaXMucHJvZHVjdFNlcnZpY2UuZ2V0KFxuICAgICAgICAgICAgICBwcm9kdWN0Q29kZSxcbiAgICAgICAgICAgICAgc2NvcGVzIHx8IHRoaXMuREVGQVVMVF9QUk9EVUNUX1NDT1BFXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBvZihudWxsKTtcbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKGlzTm90VW5kZWZpbmVkKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q29kZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnJvdXRpbmdTZXJ2aWNlXG4gICAgICAuZ2V0Um91dGVyU3RhdGUoKVxuICAgICAgLnBpcGUobWFwKChzdGF0ZSkgPT4gc3RhdGUuc3RhdGUucGFyYW1zWydwcm9kdWN0Q29kZSddKSk7XG4gIH1cbn1cbiJdfQ==