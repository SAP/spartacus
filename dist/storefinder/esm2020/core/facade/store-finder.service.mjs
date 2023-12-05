/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { select } from '@ngrx/store';
import { GlobalMessageType, } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { StoreFinderActions } from '../store/actions/index';
import { StoreFinderSelectors } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
export class StoreFinderService {
    constructor(store, winRef, globalMessageService, routingService, platformId) {
        this.store = store;
        this.winRef = winRef;
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.platformId = platformId;
        this.geolocationWatchId = null;
        this.subscription = new Subscription();
        this.reloadStoreEntitiesOnContextChange();
    }
    /**
     * Returns boolean observable for store's loading state
     */
    getStoresLoading() {
        return this.store.pipe(select(StoreFinderSelectors.getStoresLoading));
    }
    /**
     * Returns boolean observable for store's success state
     */
    getStoresLoaded() {
        return this.store.pipe(select(StoreFinderSelectors.getStoresSuccess));
    }
    /**
     * Returns observable for store's entities
     * CXSPA-4871: The return value of this method signature is wrong, should be StoreFinderSearchPage.
     */
    getFindStoresEntities() {
        return this.store.pipe(select(StoreFinderSelectors.getFindStoresEntities), map((data) => data.findStoresEntities));
    }
    /**
     * Returns observable for a single store by Id
     */
    getFindStoreEntityById() {
        return this.store.pipe(select(StoreFinderSelectors.getFindStoresEntities), map((data) => data.findStoreEntityById));
    }
    /**
     * Returns boolean observable for view all store's loading state
     */
    getViewAllStoresLoading() {
        return this.store.pipe(select(StoreFinderSelectors.getViewAllStoresLoading));
    }
    /**
     * Returns observable for view all store's entities
     */
    getViewAllStoresEntities() {
        return this.store.pipe(select(StoreFinderSelectors.getViewAllStoresEntities), map((data) => data.viewAllStoresEntities));
    }
    /**
     * Store finding action functionality
     * @param queryText text query
     * @param searchConfig search configuration
     * @param longitudeLatitude longitude and latitude coordinates
     * @param countryIsoCode country ISO code
     * @param useMyLocation current location coordinates
     * @param radius radius of the scope from the center point
     */
    findStoresAction(queryText, searchConfig, longitudeLatitude, countryIsoCode, useMyLocation, radius) {
        if (useMyLocation && this.winRef.nativeWindow) {
            this.clearWatchGeolocation(new StoreFinderActions.FindStoresOnHold());
            this.geolocationWatchId =
                this.winRef.nativeWindow.navigator.geolocation.watchPosition((pos) => {
                    const position = {
                        longitude: pos.coords.longitude,
                        latitude: pos.coords.latitude,
                    };
                    this.clearWatchGeolocation(new StoreFinderActions.FindStores({
                        queryText: queryText,
                        searchConfig: searchConfig,
                        longitudeLatitude: position,
                        countryIsoCode: countryIsoCode,
                        radius: radius,
                    }));
                }, () => {
                    this.globalMessageService.add({ key: 'storeFinder.geolocationNotEnabled' }, GlobalMessageType.MSG_TYPE_ERROR);
                    this.routingService.go(['/store-finder']);
                });
        }
        else {
            this.clearWatchGeolocation(new StoreFinderActions.FindStores({
                queryText: queryText,
                searchConfig: searchConfig,
                longitudeLatitude: longitudeLatitude,
                countryIsoCode: countryIsoCode,
                radius: radius,
            }));
        }
    }
    /**
     * View all stores
     */
    viewAllStores() {
        this.clearWatchGeolocation(new StoreFinderActions.ViewAllStores());
    }
    /**
     * View all stores by id
     * @param storeId store id
     */
    viewStoreById(storeId) {
        this.clearWatchGeolocation(new StoreFinderActions.FindStoreById({ storeId }));
    }
    clearWatchGeolocation(callbackAction) {
        if (this.geolocationWatchId !== null) {
            this.winRef.nativeWindow?.navigator.geolocation.clearWatch(this.geolocationWatchId);
            this.geolocationWatchId = null;
        }
        this.store.dispatch(callbackAction);
    }
    isEmpty(store) {
        return (!store || (typeof store === 'object' && Object.keys(store).length === 0));
    }
    /**
     * Reload store data when store entities are empty because of the context change
     */
    reloadStoreEntitiesOnContextChange() {
        if (isPlatformBrowser(this.platformId) || !this.platformId) {
            this.subscription = this.getFindStoresEntities()
                .pipe(filter((data) => this.isEmpty(data)), withLatestFrom(this.getStoresLoading(), this.getStoresLoaded(), this.routingService.getParams()))
                .subscribe(([, loading, loaded, routeParams]) => {
                if (!loading && !loaded) {
                    if (routeParams.country && !routeParams.store) {
                        this.callFindStoresAction(routeParams);
                    }
                    if (routeParams.store) {
                        this.viewStoreById(routeParams.store);
                    }
                }
            });
        }
    }
    callFindStoresAction(routeParams) {
        this.findStoresAction('', {
            pageSize: -1,
        }, undefined, routeParams.country);
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    /**
     * Returns store latitude
     * @param location store location
     */
    getStoreLatitude(location) {
        return location?.geoPoint?.latitude;
    }
    /**
     * Returns store longitude
     * @param location store location
     */
    getStoreLongitude(location) {
        return location?.geoPoint?.longitude;
    }
    /**
     * Generates a link leading to the directions of the given store location
     * @param location store location
     * @returns URL for directions to the store
     */
    getDirections(location) {
        const url = 'https://www.google.com/maps/dir/Current+Location/';
        const latitude = this.getStoreLatitude(location);
        const longitude = this.getStoreLongitude(location);
        return url + latitude + ',' + longitude;
    }
}
StoreFinderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderService, deps: [{ token: i1.Store }, { token: i2.WindowRef }, { token: i2.GlobalMessageService }, { token: i2.RoutingService }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
StoreFinderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.WindowRef }, { type: i2.GlobalMessageService }, { type: i2.RoutingService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtZmluZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvc3RvcmVmaW5kZXIvY29yZS9mYWNhZGUvc3RvcmUtZmluZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQVUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBQ3BELE9BQU8sRUFHTCxpQkFBaUIsR0FLbEIsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBTWhFLE1BQU0sT0FBTyxrQkFBa0I7SUFJN0IsWUFDWSxLQUFrQyxFQUNsQyxNQUFpQixFQUNqQixvQkFBMEMsRUFDMUMsY0FBOEIsRUFDVCxVQUFlO1FBSnBDLFVBQUssR0FBTCxLQUFLLENBQTZCO1FBQ2xDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDVCxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBUnhDLHVCQUFrQixHQUFrQixJQUFJLENBQUM7UUFDdkMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBUzFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFD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dEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILGlCQUFpQixDQUFDLFFBQXdCO1FBQ3hDLE9BQU8sUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxhQUFhLENBQUMsUUFBd0I7UUFDcEMsTUFBTSxHQUFHLEdBQUcsbURBQW1ELENBQUM7UUFDaEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxPQUFPLEdBQUcsR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQztJQUMxQyxDQUFDOzsrR0FuT1Usa0JBQWtCLGtJQVNuQixXQUFXO21IQVRWLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQVVJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uLCBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHtcbiAgR2VvUG9pbnQsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgUG9pbnRPZlNlcnZpY2UsXG4gIFJvdXRpbmdTZXJ2aWNlLFxuICBTZWFyY2hDb25maWcsXG4gIFdpbmRvd1JlZixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN0b3JlRW50aXRpZXMgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZmluZGVyL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgd2l0aExhdGVzdEZyb20gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdG9yZUZpbmRlckFjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFN0b3JlRmluZGVyU2VsZWN0b3JzIH0gZnJvbSAnLi4vc3RvcmUvc2VsZWN0b3JzL2luZGV4JztcbmltcG9ydCB7IFN0YXRlV2l0aFN0b3JlRmluZGVyIH0gZnJvbSAnLi4vc3RvcmUvc3RvcmUtZmluZGVyLXN0YXRlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlRmluZGVyU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZ2VvbG9jYXRpb25XYXRjaElkOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aFN0b3JlRmluZGVyPixcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWYsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkOiBhbnlcbiAgKSB7XG4gICAgdGhpcy5yZWxvYWRTdG9yZUVudGl0aWVzT25Db250ZXh0Q2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBib29sZWFuIG9ic2VydmFibGUgZm9yIHN0b3JlJ3MgbG9hZGluZyBzdGF0ZVxuICAgKi9cbiAgZ2V0U3RvcmVzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKHNlbGVjdChTdG9yZUZpbmRlclNlbGVjdG9ycy5nZXRTdG9yZXNMb2FkaW5nKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBib29sZWFuIG9ic2VydmFibGUgZm9yIHN0b3JlJ3Mgc3VjY2VzcyBzdGF0ZVxuICAgKi9cbiAgZ2V0U3RvcmVzTG9hZGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoc2VsZWN0KFN0b3JlRmluZGVyU2VsZWN0b3JzLmdldFN0b3Jlc1N1Y2Nlc3MpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG9ic2VydmFibGUgZm9yIHN0b3JlJ3MgZW50aXRpZXNcbiAgICogQ1hTUEEtNDg3MTogVGhlIHJldHVybiB2YWx1ZSBvZiB0aGlzIG1ldGhvZCBzaWduYXR1cmUgaXMgd3JvbmcsIHNob3VsZCBiZSBTdG9yZUZpbmRlclNlYXJjaFBhZ2UuXG4gICAqL1xuICBnZXRGaW5kU3RvcmVzRW50aXRpZXMoKTogT2JzZXJ2YWJsZTxTdG9yZUVudGl0aWVzPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChTdG9yZUZpbmRlclNlbGVjdG9ycy5nZXRGaW5kU3RvcmVzRW50aXRpZXMpLFxuICAgICAgbWFwKChkYXRhKSA9PiBkYXRhLmZpbmRTdG9yZXNFbnRpdGllcylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgb2JzZXJ2YWJsZSBmb3IgYSBzaW5nbGUgc3RvcmUgYnkgSWRcbiAgICovXG4gIGdldEZpbmRTdG9yZUVudGl0eUJ5SWQoKTogT2JzZXJ2YWJsZTxTdG9yZUVudGl0aWVzPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChTdG9yZUZpbmRlclNlbGVjdG9ycy5nZXRGaW5kU3RvcmVzRW50aXRpZXMpLFxuICAgICAgbWFwKChkYXRhKSA9PiBkYXRhLmZpbmRTdG9yZUVudGl0eUJ5SWQpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGJvb2xlYW4gb2JzZXJ2YWJsZSBmb3IgdmlldyBhbGwgc3RvcmUncyBsb2FkaW5nIHN0YXRlXG4gICAqL1xuICBnZXRWaWV3QWxsU3RvcmVzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFN0b3JlRmluZGVyU2VsZWN0b3JzLmdldFZpZXdBbGxTdG9yZXNMb2FkaW5nKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBvYnNlcnZhYmxlIGZvciB2aWV3IGFsbCBzdG9yZSdzIGVudGl0aWVzXG4gICAqL1xuICBnZXRWaWV3QWxsU3RvcmVzRW50aXRpZXMoKTogT2JzZXJ2YWJsZTxTdG9yZUVudGl0aWVzPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChTdG9yZUZpbmRlclNlbGVjdG9ycy5nZXRWaWV3QWxsU3RvcmVzRW50aXRpZXMpLFxuICAgICAgbWFwKChkYXRhKSA9PiBkYXRhLnZpZXdBbGxTdG9yZXNFbnRpdGllcylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlIGZpbmRpbmcgYWN0aW9uIGZ1bmN0aW9uYWxpdHlcbiAgICogQHBhcmFtIHF1ZXJ5VGV4dCB0ZXh0IHF1ZXJ5XG4gICAqIEBwYXJhbSBzZWFyY2hDb25maWcgc2VhcmNoIGNvbmZpZ3VyYXRpb25cbiAgICogQHBhcmFtIGxvbmdpdHVkZUxhdGl0dWRlIGxvbmdpdHVkZSBhbmQgbGF0aXR1ZGUgY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIGNvdW50cnlJc29Db2RlIGNvdW50cnkgSVNPIGNvZGVcbiAgICogQHBhcmFtIHVzZU15TG9jYXRpb24gY3VycmVudCBsb2NhdGlvbiBjb29yZGluYXRlc1xuICAgKiBAcGFyYW0gcmFkaXVzIHJhZGl1cyBvZiB0aGUgc2NvcGUgZnJvbSB0aGUgY2VudGVyIHBvaW50XG4gICAqL1xuICBmaW5kU3RvcmVzQWN0aW9uKFxuICAgIHF1ZXJ5VGV4dDogc3RyaW5nLFxuICAgIHNlYXJjaENvbmZpZz86IFNlYXJjaENvbmZpZyxcbiAgICBsb25naXR1ZGVMYXRpdHVkZT86IEdlb1BvaW50LFxuICAgIGNvdW50cnlJc29Db2RlPzogc3RyaW5nLFxuICAgIHVzZU15TG9jYXRpb24/OiBib29sZWFuLFxuICAgIHJhZGl1cz86IG51bWJlclxuICApIHtcbiAgICBpZiAodXNlTXlMb2NhdGlvbiAmJiB0aGlzLndpblJlZi5uYXRpdmVXaW5kb3cpIHtcbiAgICAgIHRoaXMuY2xlYXJXYXRjaEdlb2xvY2F0aW9uKG5ldyBTdG9yZUZpbmRlckFjdGlvbnMuRmluZFN0b3Jlc09uSG9sZCgpKTtcbiAgICAgIHRoaXMuZ2VvbG9jYXRpb25XYXRjaElkID1cbiAgICAgICAgdGhpcy53aW5SZWYubmF0aXZlV2luZG93Lm5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKFxuICAgICAgICAgIChwb3M6IEdlb2xvY2F0aW9uUG9zaXRpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uOiBHZW9Qb2ludCA9IHtcbiAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBwb3MuY29vcmRzLmxvbmdpdHVkZSxcbiAgICAgICAgICAgICAgbGF0aXR1ZGU6IHBvcy5jb29yZHMubGF0aXR1ZGUsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFyV2F0Y2hHZW9sb2NhdGlvbihcbiAgICAgICAgICAgICAgbmV3IFN0b3JlRmluZGVyQWN0aW9ucy5GaW5kU3RvcmVzKHtcbiAgICAgICAgICAgICAgICBxdWVyeVRleHQ6IHF1ZXJ5VGV4dCxcbiAgICAgICAgICAgICAgICBzZWFyY2hDb25maWc6IHNlYXJjaENvbmZpZyxcbiAgICAgICAgICAgICAgICBsb25naXR1ZGVMYXRpdHVkZTogcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgY291bnRyeUlzb0NvZGU6IGNvdW50cnlJc29Db2RlLFxuICAgICAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgICAgICB7IGtleTogJ3N0b3JlRmluZGVyLmdlb2xvY2F0aW9uTm90RW5hYmxlZCcgfSxcbiAgICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKFsnL3N0b3JlLWZpbmRlciddKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xlYXJXYXRjaEdlb2xvY2F0aW9uKFxuICAgICAgICBuZXcgU3RvcmVGaW5kZXJBY3Rpb25zLkZpbmRTdG9yZXMoe1xuICAgICAgICAgIHF1ZXJ5VGV4dDogcXVlcnlUZXh0LFxuICAgICAgICAgIHNlYXJjaENvbmZpZzogc2VhcmNoQ29uZmlnLFxuICAgICAgICAgIGxvbmdpdHVkZUxhdGl0dWRlOiBsb25naXR1ZGVMYXRpdHVkZSxcbiAgICAgICAgICBjb3VudHJ5SXNvQ29kZTogY291bnRyeUlzb0NvZGUsXG4gICAgICAgICAgcmFkaXVzOiByYWRpdXMsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGFsbCBzdG9yZXNcbiAgICovXG4gIHZpZXdBbGxTdG9yZXMoKSB7XG4gICAgdGhpcy5jbGVhcldhdGNoR2VvbG9jYXRpb24obmV3IFN0b3JlRmluZGVyQWN0aW9ucy5WaWV3QWxsU3RvcmVzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXcgYWxsIHN0b3JlcyBieSBpZFxuICAgKiBAcGFyYW0gc3RvcmVJZCBzdG9yZSBpZFxuICAgKi9cbiAgdmlld1N0b3JlQnlJZChzdG9yZUlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNsZWFyV2F0Y2hHZW9sb2NhdGlvbihcbiAgICAgIG5ldyBTdG9yZUZpbmRlckFjdGlvbnMuRmluZFN0b3JlQnlJZCh7IHN0b3JlSWQgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcldhdGNoR2VvbG9jYXRpb24oY2FsbGJhY2tBY3Rpb246IEFjdGlvbikge1xuICAgIGlmICh0aGlzLmdlb2xvY2F0aW9uV2F0Y2hJZCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy53aW5SZWYubmF0aXZlV2luZG93Py5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChcbiAgICAgICAgdGhpcy5nZW9sb2NhdGlvbldhdGNoSWRcbiAgICAgICk7XG4gICAgICB0aGlzLmdlb2xvY2F0aW9uV2F0Y2hJZCA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goY2FsbGJhY2tBY3Rpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0VtcHR5KHN0b3JlOiBTdG9yZUVudGl0aWVzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICFzdG9yZSB8fCAodHlwZW9mIHN0b3JlID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhzdG9yZSkubGVuZ3RoID09PSAwKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVsb2FkIHN0b3JlIGRhdGEgd2hlbiBzdG9yZSBlbnRpdGllcyBhcmUgZW1wdHkgYmVjYXVzZSBvZiB0aGUgY29udGV4dCBjaGFuZ2VcbiAgICovXG4gIHByb3RlY3RlZCByZWxvYWRTdG9yZUVudGl0aWVzT25Db250ZXh0Q2hhbmdlKCk6IHZvaWQge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpIHx8ICF0aGlzLnBsYXRmb3JtSWQpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5nZXRGaW5kU3RvcmVzRW50aXRpZXMoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKGRhdGEpID0+IHRoaXMuaXNFbXB0eShkYXRhKSksXG4gICAgICAgICAgd2l0aExhdGVzdEZyb20oXG4gICAgICAgICAgICB0aGlzLmdldFN0b3Jlc0xvYWRpbmcoKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0U3RvcmVzTG9hZGVkKCksXG4gICAgICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdldFBhcmFtcygpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKFssIGxvYWRpbmcsIGxvYWRlZCwgcm91dGVQYXJhbXNdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb2FkaW5nICYmICFsb2FkZWQpIHtcbiAgICAgICAgICAgIGlmIChyb3V0ZVBhcmFtcy5jb3VudHJ5ICYmICFyb3V0ZVBhcmFtcy5zdG9yZSkge1xuICAgICAgICAgICAgICB0aGlzLmNhbGxGaW5kU3RvcmVzQWN0aW9uKHJvdXRlUGFyYW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyb3V0ZVBhcmFtcy5zdG9yZSkge1xuICAgICAgICAgICAgICB0aGlzLnZpZXdTdG9yZUJ5SWQocm91dGVQYXJhbXMuc3RvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2FsbEZpbmRTdG9yZXNBY3Rpb24ocm91dGVQYXJhbXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pOiB2b2lkIHtcbiAgICB0aGlzLmZpbmRTdG9yZXNBY3Rpb24oXG4gICAgICAnJyxcbiAgICAgIHtcbiAgICAgICAgcGFnZVNpemU6IC0xLFxuICAgICAgfSxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHJvdXRlUGFyYW1zLmNvdW50cnlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBzdG9yZSBsYXRpdHVkZVxuICAgKiBAcGFyYW0gbG9jYXRpb24gc3RvcmUgbG9jYXRpb25cbiAgICovXG4gIGdldFN0b3JlTGF0aXR1ZGUobG9jYXRpb246IFBvaW50T2ZTZXJ2aWNlKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gbG9jYXRpb24/Lmdlb1BvaW50Py5sYXRpdHVkZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHN0b3JlIGxvbmdpdHVkZVxuICAgKiBAcGFyYW0gbG9jYXRpb24gc3RvcmUgbG9jYXRpb25cbiAgICovXG4gIGdldFN0b3JlTG9uZ2l0dWRlKGxvY2F0aW9uOiBQb2ludE9mU2VydmljZSk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGxvY2F0aW9uPy5nZW9Qb2ludD8ubG9uZ2l0dWRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIGxpbmsgbGVhZGluZyB0byB0aGUgZGlyZWN0aW9ucyBvZiB0aGUgZ2l2ZW4gc3RvcmUgbG9jYXRpb25cbiAgICogQHBhcmFtIGxvY2F0aW9uIHN0b3JlIGxvY2F0aW9uXG4gICAqIEByZXR1cm5zIFVSTCBmb3IgZGlyZWN0aW9ucyB0byB0aGUgc3RvcmVcbiAgICovXG4gIGdldERpcmVjdGlvbnMobG9jYXRpb246IFBvaW50T2ZTZXJ2aWNlKTogc3RyaW5nIHtcbiAgICBjb25zdCB1cmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL2Rpci9DdXJyZW50K0xvY2F0aW9uLyc7XG4gICAgY29uc3QgbGF0aXR1ZGUgPSB0aGlzLmdldFN0b3JlTGF0aXR1ZGUobG9jYXRpb24pO1xuICAgIGNvbnN0IGxvbmdpdHVkZSA9IHRoaXMuZ2V0U3RvcmVMb25naXR1ZGUobG9jYXRpb24pO1xuICAgIHJldHVybiB1cmwgKyBsYXRpdHVkZSArICcsJyArIGxvbmdpdHVkZTtcbiAgfVxufVxuIl19