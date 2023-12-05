/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class MyCouponsComponentService {
    constructor(routingService, translation) {
        this.routingService = routingService;
        this.translation = translation;
        this.RELEVANCE = ':relevance';
        this.CUSTOMER_COUPON_CODE = ':customerCouponCode:';
    }
    launchSearchPage(coupon) {
        this.routingService.go({
            cxRoute: 'search',
            params: { query: this.buildSearchParam(coupon) },
        }, {
            queryParams: {
                couponcode: coupon.couponId,
            },
        });
    }
    buildSearchParam(coupon) {
        return coupon.allProductsApplicable
            ? this.RELEVANCE
            : this.RELEVANCE + this.CUSTOMER_COUPON_CODE + coupon.couponId;
    }
    getSortLabels() {
        return combineLatest([
            this.translation.translate('myCoupons.startDateAsc'),
            this.translation.translate('myCoupons.startDateDesc'),
            this.translation.translate('myCoupons.endDateAsc'),
            this.translation.translate('myCoupons.endDateDesc'),
        ]).pipe(map(([textByStartDateAsc, textByStartDateDesc, textByEndDateAsc, textByEndDateDesc,]) => {
            return {
                byStartDateAsc: textByStartDateAsc,
                byStartDateDesc: textByStartDateDesc,
                byEndDateAsc: textByEndDateAsc,
                byEndDateDesc: textByEndDateDesc,
            };
        }));
    }
}
MyCouponsComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyCouponsComponentService, deps: [{ token: i1.RoutingService }, { token: i1.TranslationService }], target: i0.ɵɵFactoryTarget.Injectable });
MyCouponsComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyCouponsComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyCouponsComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1.TranslationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktY291cG9ucy5jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbXlhY2NvdW50L215LWNvdXBvbnMvbXktY291cG9ucy5jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU0zQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQzs7O0FBS2pELE1BQU0sT0FBTyx5QkFBeUI7SUFXcEMsWUFDWSxjQUE4QixFQUM5QixXQUErQjtRQUQvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBTHhCLGNBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIseUJBQW9CLEdBQUcsc0JBQXNCLENBQUM7SUFLOUQsQ0FBQztJQUVKLGdCQUFnQixDQUFDLE1BQXNCO1FBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUNwQjtZQUNFLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUU7U0FDakQsRUFDRDtZQUNFLFdBQVcsRUFBRTtnQkFDWCxVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVE7YUFDNUI7U0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRU8sZ0JBQWdCLENBQUMsTUFBc0I7UUFDN0MsT0FBTyxNQUFNLENBQUMscUJBQXFCO1lBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUztZQUNoQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNuRSxDQUFDO0lBRUQsYUFBYTtRQU1YLE9BQU8sYUFBYSxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDO1lBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDO1lBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDO1lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDO1NBQ3BELENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUNELENBQUMsQ0FDQyxrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDbEIsRUFBRSxFQUFFO1lBQ0gsT0FBTztnQkFDTCxjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxlQUFlLEVBQUUsbUJBQW1CO2dCQUNwQyxZQUFZLEVBQUUsZ0JBQWdCO2dCQUM5QixhQUFhLEVBQUUsaUJBQWlCO2FBQ2pDLENBQUM7UUFDSixDQUFDLENBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7c0hBaEVVLHlCQUF5QjswSEFBekIseUJBQXlCLGNBRnhCLE1BQU07MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEN1c3RvbWVyQ291cG9uLFxuICBSb3V0aW5nU2VydmljZSxcbiAgVHJhbnNsYXRpb25TZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTXlDb3Vwb25zQ29tcG9uZW50U2VydmljZSB7XG4gIHNvcnRMYWJlbHM6IE9ic2VydmFibGU8e1xuICAgIGJ5U3RhcnREYXRlQXNjOiBzdHJpbmc7XG4gICAgYnlTdGFydERhdGVEZXNjOiBzdHJpbmc7XG4gICAgYnlFbmREYXRlQXNjOiBzdHJpbmc7XG4gICAgYnlFbmREYXRlRGVzYzogc3RyaW5nO1xuICB9PjtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgUkVMRVZBTkNFID0gJzpyZWxldmFuY2UnO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgQ1VTVE9NRVJfQ09VUE9OX0NPREUgPSAnOmN1c3RvbWVyQ291cG9uQ29kZTonO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2VcbiAgKSB7fVxuXG4gIGxhdW5jaFNlYXJjaFBhZ2UoY291cG9uOiBDdXN0b21lckNvdXBvbik6IHZvaWQge1xuICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oXG4gICAgICB7XG4gICAgICAgIGN4Um91dGU6ICdzZWFyY2gnLFxuICAgICAgICBwYXJhbXM6IHsgcXVlcnk6IHRoaXMuYnVpbGRTZWFyY2hQYXJhbShjb3Vwb24pIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgIGNvdXBvbmNvZGU6IGNvdXBvbi5jb3Vwb25JZCxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFNlYXJjaFBhcmFtKGNvdXBvbjogQ3VzdG9tZXJDb3Vwb24pOiBzdHJpbmcge1xuICAgIHJldHVybiBjb3Vwb24uYWxsUHJvZHVjdHNBcHBsaWNhYmxlXG4gICAgICA/IHRoaXMuUkVMRVZBTkNFXG4gICAgICA6IHRoaXMuUkVMRVZBTkNFICsgdGhpcy5DVVNUT01FUl9DT1VQT05fQ09ERSArIGNvdXBvbi5jb3Vwb25JZDtcbiAgfVxuXG4gIGdldFNvcnRMYWJlbHMoKTogT2JzZXJ2YWJsZTx7XG4gICAgYnlTdGFydERhdGVBc2M6IHN0cmluZztcbiAgICBieVN0YXJ0RGF0ZURlc2M6IHN0cmluZztcbiAgICBieUVuZERhdGVBc2M6IHN0cmluZztcbiAgICBieUVuZERhdGVEZXNjOiBzdHJpbmc7XG4gIH0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnRyYW5zbGF0aW9uLnRyYW5zbGF0ZSgnbXlDb3Vwb25zLnN0YXJ0RGF0ZUFzYycpLFxuICAgICAgdGhpcy50cmFuc2xhdGlvbi50cmFuc2xhdGUoJ215Q291cG9ucy5zdGFydERhdGVEZXNjJyksXG4gICAgICB0aGlzLnRyYW5zbGF0aW9uLnRyYW5zbGF0ZSgnbXlDb3Vwb25zLmVuZERhdGVBc2MnKSxcbiAgICAgIHRoaXMudHJhbnNsYXRpb24udHJhbnNsYXRlKCdteUNvdXBvbnMuZW5kRGF0ZURlc2MnKSxcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKFxuICAgICAgICAoW1xuICAgICAgICAgIHRleHRCeVN0YXJ0RGF0ZUFzYyxcbiAgICAgICAgICB0ZXh0QnlTdGFydERhdGVEZXNjLFxuICAgICAgICAgIHRleHRCeUVuZERhdGVBc2MsXG4gICAgICAgICAgdGV4dEJ5RW5kRGF0ZURlc2MsXG4gICAgICAgIF0pID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnlTdGFydERhdGVBc2M6IHRleHRCeVN0YXJ0RGF0ZUFzYyxcbiAgICAgICAgICAgIGJ5U3RhcnREYXRlRGVzYzogdGV4dEJ5U3RhcnREYXRlRGVzYyxcbiAgICAgICAgICAgIGJ5RW5kRGF0ZUFzYzogdGV4dEJ5RW5kRGF0ZUFzYyxcbiAgICAgICAgICAgIGJ5RW5kRGF0ZURlc2M6IHRleHRCeUVuZERhdGVEZXNjLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG59XG4iXX0=