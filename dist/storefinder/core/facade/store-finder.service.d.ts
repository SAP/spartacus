import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GeoPoint, GlobalMessageService, PointOfService, RoutingService, SearchConfig, WindowRef } from '@spartacus/core';
import { StoreEntities } from '@spartacus/storefinder/root';
import { Observable, Subscription } from 'rxjs';
import { StateWithStoreFinder } from '../store/store-finder-state';
import * as i0 from "@angular/core";
export declare class StoreFinderService implements OnDestroy {
    protected store: Store<StateWithStoreFinder>;
    protected winRef: WindowRef;
    protected globalMessageService: GlobalMessageService;
    protected routingService: RoutingService;
    protected platformId: any;
    private geolocationWatchId;
    protected subscription: Subscription;
    constructor(store: Store<StateWithStoreFinder>, winRef: WindowRef, globalMessageService: GlobalMessageService, routingService: RoutingService, platformId: any);
    /**
     * Returns boolean observable for store's loading state
     */
    getStoresLoading(): Observable<boolean>;
    /**
     * Returns boolean observable for store's success state
     */
    getStoresLoaded(): Observable<boolean>;
    /**
     * Returns observable for store's entities
     * CXSPA-4871: The return value of this method signature is wrong, should be StoreFinderSearchPage.
     */
    getFindStoresEntities(): Observable<StoreEntities>;
    /**
     * Returns observable for a single store by Id
     */
    getFindStoreEntityById(): Observable<StoreEntities>;
    /**
     * Returns boolean observable for view all store's loading state
     */
    getViewAllStoresLoading(): Observable<boolean>;
    /**
     * Returns observable for view all store's entities
     */
    getViewAllStoresEntities(): Observable<StoreEntities>;
    /**
     * Store finding action functionality
     * @param queryText text query
     * @param searchConfig search configuration
     * @param longitudeLatitude longitude and latitude coordinates
     * @param countryIsoCode country ISO code
     * @param useMyLocation current location coordinates
     * @param radius radius of the scope from the center point
     */
    findStoresAction(queryText: string, searchConfig?: SearchConfig, longitudeLatitude?: GeoPoint, countryIsoCode?: string, useMyLocation?: boolean, radius?: number): void;
    /**
     * View all stores
     */
    viewAllStores(): void;
    /**
     * View all stores by id
     * @param storeId store id
     */
    viewStoreById(storeId: string): void;
    private clearWatchGeolocation;
    private isEmpty;
    /**
     * Reload store data when store entities are empty because of the context change
     */
    protected reloadStoreEntitiesOnContextChange(): void;
    callFindStoresAction(routeParams: {
        [key: string]: string;
    }): void;
    ngOnDestroy(): void;
    /**
     * Returns store latitude
     * @param location store location
     */
    getStoreLatitude(location: PointOfService): number | undefined;
    /**
     * Returns store longitude
     * @param location store location
     */
    getStoreLongitude(location: PointOfService): number | undefined;
    /**
     * Generates a link leading to the directions of the given store location
     * @param location store location
     * @returns URL for directions to the store
     */
    getDirections(location: PointOfService): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StoreFinderService>;
}
