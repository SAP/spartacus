import { GeoPoint, PointOfService, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { StoreEntities } from '../model/store-entities.model';
import * as i0 from "@angular/core";
/**
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
export declare abstract class StoreFinderFacade {
    abstract getStoresLoading(): Observable<boolean>;
    abstract getStoresLoaded(): Observable<boolean>;
    abstract getFindStoresEntities(): Observable<StoreEntities>;
    abstract getViewAllStoresLoading(): Observable<boolean>;
    abstract getViewAllStoresEntities(): Observable<StoreEntities>;
    abstract findStoresAction(queryText: string, searchConfig?: SearchConfig, longitudeLatitude?: GeoPoint, countryIsoCode?: string, useMyLocation?: boolean, radius?: number): void;
    abstract viewAllStores(): void;
    abstract viewStoreById(storeId: string): void;
    abstract callFindStoresAction(routeParams: {
        [key: string]: string;
    }): void;
    abstract getStoreLatitude(location: PointOfService): number | undefined;
    abstract getStoreLongitude(location: PointOfService): number | undefined;
    abstract getDirections(location: PointOfService): string;
    abstract getFindStoreEntityById(): Observable<StoreEntities>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StoreFinderFacade>;
}
