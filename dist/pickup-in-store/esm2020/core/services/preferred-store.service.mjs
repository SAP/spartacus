/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { PREFERRED_STORE_LOCAL_STORAGE_KEY, } from '@spartacus/pickup-in-store/root';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { DefaultPointOfServiceSelectors, } from '../store';
import { LoadDefaultPointOfService, SetDefaultPointOfService, } from '../store/actions/default-point-of-service-name.action';
import { isInStock } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "../config";
import * as i2 from "@spartacus/pickup-in-store/root";
import * as i3 from "@spartacus/core";
import * as i4 from "@ngrx/store";
/**
 * Service to store the user's preferred store for Pickup in Store in local storage.
 */
export class PreferredStoreService {
    constructor(config, pickupLocationsSearchService, winRef, store) {
        this.config = config;
        this.pickupLocationsSearchService = pickupLocationsSearchService;
        this.winRef = winRef;
        this.store = store;
        this.store.dispatch(LoadDefaultPointOfService());
    }
    /**
     * Gets the user's preferred store for Pickup in Store.
     * @returns the preferred store from the store
     */
    getPreferredStore$() {
        return this.store.pipe(select(DefaultPointOfServiceSelectors.getPreferredStore));
    }
    /**
     * Sets the user's preferred store for Pickup in Store.
     * @param preferredStore the preferred store to set
     */
    setPreferredStore(preferredStore) {
        this.store.dispatch(SetDefaultPointOfService({ payload: preferredStore }));
    }
    /**
     * Clears the user's preferred store for Pickup in Store.
     */
    clearPreferredStore() {
        this.winRef.localStorage?.removeItem(PREFERRED_STORE_LOCAL_STORAGE_KEY);
    }
    /**
     * Get the user's preferred store from local storage and only return it if it
     * has stock for the given product.
     * @param productCode The product code to check the stock level of
     */
    getPreferredStoreWithProductInStock(productCode) {
        return this.getPreferredStore$().pipe(filter((store) => !!store), tap((preferredStore) => {
            this.pickupLocationsSearchService.stockLevelAtStore(productCode, preferredStore.name);
        }), switchMap((store) => this.pickupLocationsSearchService
            .getStockLevelAtStore(productCode, store.name)
            .pipe(filter(isInStock), map((_) => store), tap((preferredStore) => ({
            name: preferredStore.name,
            displayName: preferredStore.name,
        })))));
    }
}
PreferredStoreService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreService, deps: [{ token: i1.PickupInStoreConfig }, { token: i2.PickupLocationsSearchFacade }, { token: i3.WindowRef }, { token: i4.Store }], target: i0.ɵɵFactoryTarget.Injectable });
PreferredStoreService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.PickupInStoreConfig }, { type: i2.PickupLocationsSearchFacade }, { type: i3.WindowRef }, { type: i4.Store }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVycmVkLXN0b3JlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGlja3VwLWluLXN0b3JlL2NvcmUvc2VydmljZXMvcHJlZmVycmVkLXN0b3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUU1QyxPQUFPLEVBSUwsaUNBQWlDLEdBQ2xDLE1BQU0saUNBQWlDLENBQUM7QUFFekMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdELE9BQU8sRUFDTCw4QkFBOEIsR0FFL0IsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUNMLHlCQUF5QixFQUN6Qix3QkFBd0IsR0FDekIsTUFBTSx1REFBdUQsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7Ozs7QUFFckM7O0dBRUc7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQ1ksTUFBMkIsRUFDM0IsNEJBQXlELEVBQ3pELE1BQWlCLEVBQ2pCLEtBQXNDO1FBSHRDLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBQzNCLGlDQUE0QixHQUE1Qiw0QkFBNEIsQ0FBNkI7UUFDekQsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixVQUFLLEdBQUwsS0FBSyxDQUFpQztRQUVoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7T0FHRztJQUNILGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNwQixNQUFNLENBQUMsOEJBQThCLENBQUMsaUJBQWlCLENBQUMsQ0FDekQsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxpQkFBaUIsQ0FBQyxjQUFtQztRQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsbUNBQW1DLENBQ2pDLFdBQW1CO1FBRW5CLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUNuQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQWdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQ3hELEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxpQkFBaUIsQ0FDakQsV0FBVyxFQUNYLGNBQWMsQ0FBQyxJQUFJLENBQ3BCLENBQUM7UUFDSixDQUFDLENBQUMsRUFDRixTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNsQixJQUFJLENBQUMsNEJBQTRCO2FBQzlCLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQzdDLElBQUksQ0FDSCxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQ2pCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQ2pCLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QixJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUk7WUFDekIsV0FBVyxFQUFFLGNBQWMsQ0FBQyxJQUFJO1NBQ2pDLENBQUMsQ0FBQyxDQUNKLENBQ0osQ0FDRixDQUFDO0lBQ0osQ0FBQzs7a0hBaEVVLHFCQUFxQjtzSEFBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFBpY2t1cExvY2F0aW9uc1NlYXJjaEZhY2FkZSxcbiAgUG9pbnRPZlNlcnZpY2VOYW1lcyxcbiAgUHJlZmVycmVkU3RvcmVGYWNhZGUsXG4gIFBSRUZFUlJFRF9TVE9SRV9MT0NBTF9TVE9SQUdFX0tFWSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9waWNrdXAtaW4tc3RvcmUvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQaWNrdXBJblN0b3JlQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7XG4gIERlZmF1bHRQb2ludE9mU2VydmljZVNlbGVjdG9ycyxcbiAgU3RhdGVXaXRoUGlja3VwTG9jYXRpb25zLFxufSBmcm9tICcuLi9zdG9yZSc7XG5pbXBvcnQge1xuICBMb2FkRGVmYXVsdFBvaW50T2ZTZXJ2aWNlLFxuICBTZXREZWZhdWx0UG9pbnRPZlNlcnZpY2UsXG59IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvZGVmYXVsdC1wb2ludC1vZi1zZXJ2aWNlLW5hbWUuYWN0aW9uJztcbmltcG9ydCB7IGlzSW5TdG9jayB9IGZyb20gJy4uL3V0aWxzJztcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIHN0b3JlIHRoZSB1c2VyJ3MgcHJlZmVycmVkIHN0b3JlIGZvciBQaWNrdXAgaW4gU3RvcmUgaW4gbG9jYWwgc3RvcmFnZS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFByZWZlcnJlZFN0b3JlU2VydmljZSBpbXBsZW1lbnRzIFByZWZlcnJlZFN0b3JlRmFjYWRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogUGlja3VwSW5TdG9yZUNvbmZpZyxcbiAgICBwcm90ZWN0ZWQgcGlja3VwTG9jYXRpb25zU2VhcmNoU2VydmljZTogUGlja3VwTG9jYXRpb25zU2VhcmNoRmFjYWRlLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aFBpY2t1cExvY2F0aW9ucz5cbiAgKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChMb2FkRGVmYXVsdFBvaW50T2ZTZXJ2aWNlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHVzZXIncyBwcmVmZXJyZWQgc3RvcmUgZm9yIFBpY2t1cCBpbiBTdG9yZS5cbiAgICogQHJldHVybnMgdGhlIHByZWZlcnJlZCBzdG9yZSBmcm9tIHRoZSBzdG9yZVxuICAgKi9cbiAgZ2V0UHJlZmVycmVkU3RvcmUkKCk6IE9ic2VydmFibGU8UG9pbnRPZlNlcnZpY2VOYW1lcyB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KERlZmF1bHRQb2ludE9mU2VydmljZVNlbGVjdG9ycy5nZXRQcmVmZXJyZWRTdG9yZSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHVzZXIncyBwcmVmZXJyZWQgc3RvcmUgZm9yIFBpY2t1cCBpbiBTdG9yZS5cbiAgICogQHBhcmFtIHByZWZlcnJlZFN0b3JlIHRoZSBwcmVmZXJyZWQgc3RvcmUgdG8gc2V0XG4gICAqL1xuICBzZXRQcmVmZXJyZWRTdG9yZShwcmVmZXJyZWRTdG9yZTogUG9pbnRPZlNlcnZpY2VOYW1lcyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goU2V0RGVmYXVsdFBvaW50T2ZTZXJ2aWNlKHsgcGF5bG9hZDogcHJlZmVycmVkU3RvcmUgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgdXNlcidzIHByZWZlcnJlZCBzdG9yZSBmb3IgUGlja3VwIGluIFN0b3JlLlxuICAgKi9cbiAgY2xlYXJQcmVmZXJyZWRTdG9yZSgpOiB2b2lkIHtcbiAgICB0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2U/LnJlbW92ZUl0ZW0oUFJFRkVSUkVEX1NUT1JFX0xPQ0FMX1NUT1JBR0VfS0VZKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVzZXIncyBwcmVmZXJyZWQgc3RvcmUgZnJvbSBsb2NhbCBzdG9yYWdlIGFuZCBvbmx5IHJldHVybiBpdCBpZiBpdFxuICAgKiBoYXMgc3RvY2sgZm9yIHRoZSBnaXZlbiBwcm9kdWN0LlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGUgVGhlIHByb2R1Y3QgY29kZSB0byBjaGVjayB0aGUgc3RvY2sgbGV2ZWwgb2ZcbiAgICovXG4gIGdldFByZWZlcnJlZFN0b3JlV2l0aFByb2R1Y3RJblN0b2NrKFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxQb2ludE9mU2VydmljZU5hbWVzPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJlZmVycmVkU3RvcmUkKCkucGlwZShcbiAgICAgIGZpbHRlcigoc3RvcmUpOiBzdG9yZSBpcyBQb2ludE9mU2VydmljZU5hbWVzID0+ICEhc3RvcmUpLFxuICAgICAgdGFwKChwcmVmZXJyZWRTdG9yZSkgPT4ge1xuICAgICAgICB0aGlzLnBpY2t1cExvY2F0aW9uc1NlYXJjaFNlcnZpY2Uuc3RvY2tMZXZlbEF0U3RvcmUoXG4gICAgICAgICAgcHJvZHVjdENvZGUsXG4gICAgICAgICAgcHJlZmVycmVkU3RvcmUubmFtZVxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXAoKHN0b3JlKSA9PlxuICAgICAgICB0aGlzLnBpY2t1cExvY2F0aW9uc1NlYXJjaFNlcnZpY2VcbiAgICAgICAgICAuZ2V0U3RvY2tMZXZlbEF0U3RvcmUocHJvZHVjdENvZGUsIHN0b3JlLm5hbWUpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXNJblN0b2NrKSxcbiAgICAgICAgICAgIG1hcCgoXykgPT4gc3RvcmUpLFxuICAgICAgICAgICAgdGFwKChwcmVmZXJyZWRTdG9yZSkgPT4gKHtcbiAgICAgICAgICAgICAgbmFtZTogcHJlZmVycmVkU3RvcmUubmFtZSxcbiAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IHByZWZlcnJlZFN0b3JlLm5hbWUsXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuIl19