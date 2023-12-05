import { PointOfService, PointOfServiceStock, Stock } from '@spartacus/core';
import { Observable } from 'rxjs';
import { StockLocationSearchParams } from '../model';
import * as i0 from "@angular/core";
export declare abstract class PickupLocationsSearchFacade {
    abstract stockLevelAtStore(productCode: string, storeName: string): void;
    abstract getStockLevelAtStore(productCode: string, storeName: string): Observable<Stock | undefined>;
    abstract startSearch(searchParams: StockLocationSearchParams): void;
    abstract hasSearchStarted(productCode: string): Observable<boolean>;
    abstract isSearchRunning(): Observable<boolean>;
    abstract getSearchResults(productCode: string): Observable<PointOfServiceStock[]>;
    abstract clearSearchResults(): void;
    abstract getHideOutOfStock(): Observable<boolean>;
    abstract setBrowserLocation(latitude: number, longitude: number): void;
    abstract toggleHideOutOfStock(): void;
    abstract getStoreDetails(name: string): Observable<PointOfService>;
    abstract loadStoreDetails(name: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickupLocationsSearchFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PickupLocationsSearchFacade>;
}
