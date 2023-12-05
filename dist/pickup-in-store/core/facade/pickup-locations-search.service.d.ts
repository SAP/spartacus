import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PointOfService, PointOfServiceStock, Stock } from '@spartacus/core';
import { PickupLocationsSearchFacade, StockLocationSearchParams } from '@spartacus/pickup-in-store/root';
import { Observable, Subscription } from 'rxjs';
import { StateWithPickupLocations, StateWithStock } from '../store/index';
import * as i0 from "@angular/core";
export declare class PickupLocationsSearchService implements PickupLocationsSearchFacade, OnDestroy {
    protected store: Store<StateWithStock & StateWithPickupLocations>;
    subscription: Subscription;
    constructor(store: Store<StateWithStock & StateWithPickupLocations>);
    stockLevelAtStore(productCode: string, storeName: string): void;
    getStockLevelAtStore(productCode: string, storeName: string): Observable<Stock | undefined>;
    startSearch(searchParams: StockLocationSearchParams): void;
    hasSearchStarted(productCode: string): Observable<boolean>;
    isSearchRunning(): Observable<boolean>;
    getSearchResults(productCode: string): Observable<PointOfServiceStock[]>;
    clearSearchResults(): void;
    getHideOutOfStock(): Observable<boolean>;
    setBrowserLocation(latitude: number, longitude: number): void;
    toggleHideOutOfStock(): void;
    loadStoreDetails(storeName: string): void;
    getStoreDetails(name: string): Observable<PointOfService>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickupLocationsSearchService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PickupLocationsSearchService>;
}
