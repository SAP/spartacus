import { OnInit } from '@angular/core';
import { PointOfService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ICON_TYPE } from '@spartacus/storefront';
import { StoreFinderService } from '@spartacus/storefinder/core';
import * as i0 from "@angular/core";
export declare class StoreFinderStoreComponent implements OnInit {
    private storeFinderService;
    private route;
    private routingService;
    location$: Observable<any>;
    isLoading$: Observable<any>;
    iconTypes: typeof ICON_TYPE;
    location: PointOfService;
    disableMap: boolean;
    constructor(storeFinderService: StoreFinderService, route: ActivatedRoute, routingService: RoutingService);
    ngOnInit(): void;
    requestStoresData(): void;
    goBack(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderStoreComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreFinderStoreComponent, "cx-store-finder-store", never, { "location": "location"; "disableMap": "disableMap"; }, {}, never, never, false, never>;
}
