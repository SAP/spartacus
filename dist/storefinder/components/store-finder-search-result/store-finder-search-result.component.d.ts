import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeoPoint, SearchConfig } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { StoreFinderSearchQuery, StoreFinderService, StoreFinderConfig } from '@spartacus/storefinder/core';
import * as i0 from "@angular/core";
export declare class StoreFinderSearchResultComponent implements OnInit, OnDestroy {
    private storeFinderService;
    private route;
    protected config: StoreFinderConfig;
    locations: any;
    subscription: Subscription;
    useMyLocation: boolean;
    countryCode: string;
    searchConfig: SearchConfig;
    radius: number;
    searchQuery: StoreFinderSearchQuery;
    geolocation: GeoPoint;
    locations$: Observable<any>;
    isLoading$: Observable<any>;
    constructor(storeFinderService: StoreFinderService, route: ActivatedRoute, config: StoreFinderConfig);
    ngOnInit(): void;
    ngOnDestroy(): void;
    viewPage(pageNumber: number): void;
    private initialize;
    private parseParameters;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderSearchResultComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreFinderSearchResultComponent, "cx-store-finder-search-result", never, {}, {}, never, never, false, never>;
}
