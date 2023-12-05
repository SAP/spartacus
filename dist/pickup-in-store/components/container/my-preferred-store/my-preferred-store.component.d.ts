import { OnInit } from '@angular/core';
import { CmsService, PointOfService, RoutingService } from '@spartacus/core';
import { PickupLocationsSearchFacade, PreferredStoreFacade } from '@spartacus/pickup-in-store/root';
import { StoreFinderFacade } from '@spartacus/storefinder/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MyPreferredStoreComponent implements OnInit {
    private preferredStoreFacade;
    protected pickupLocationsSearchService: PickupLocationsSearchFacade;
    protected routingService: RoutingService;
    protected storeFinderService: StoreFinderFacade;
    protected cmsService: CmsService;
    preferredStore$: Observable<PointOfService>;
    content: {
        header: string;
        actions: {
            event: string;
            name: string;
        }[];
    };
    openHoursOpen: boolean;
    readonly ICON_TYPE: typeof ICON_TYPE;
    pointOfService: PointOfService;
    isStoreFinder: boolean;
    constructor(preferredStoreFacade: PreferredStoreFacade, pickupLocationsSearchService: PickupLocationsSearchFacade, routingService: RoutingService, storeFinderService: StoreFinderFacade, cmsService: CmsService);
    ngOnInit(): void;
    /**
     * Toggle whether the store's opening hours are visible.
     */
    toggleOpenHours(): boolean;
    changeStore(): void;
    getDirectionsToStore(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyPreferredStoreComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyPreferredStoreComponent, "cx-my-preferred-store", never, {}, {}, never, never, false, never>;
}
