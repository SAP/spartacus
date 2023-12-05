import { EventEmitter, OnInit } from '@angular/core';
import { PointOfServiceStock } from '@spartacus/core';
import { IntendedPickupLocationFacade, PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * The list of stores with their stock level and distance from a searched location.
 * Used in the PickupOptionDialog component for selecting a pickup location.
 */
export declare class StoreListComponent implements OnInit {
    protected intendedPickupLocationService: IntendedPickupLocationFacade;
    protected pickupLocationsSearchService: PickupLocationsSearchFacade;
    /** The product code for the stock levels at each location */
    productCode: string;
    /** Event emitter triggered when a store is selected for pickup */
    storeSelected: EventEmitter<null>;
    stores$: Observable<PointOfServiceStock[]>;
    hasSearchStarted$: Observable<boolean>;
    isSearchRunning$: Observable<boolean>;
    constructor(intendedPickupLocationService: IntendedPickupLocationFacade, pickupLocationsSearchService: PickupLocationsSearchFacade);
    ngOnInit(): void;
    /**
     * Select the store to pickup from. This also sets the user's preferred store
     * the selected point of service.
     *
     * @param store Store to pickup from
     */
    onSelectStore(store: PointOfServiceStock): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreListComponent, "cx-store-list", never, { "productCode": "productCode"; }, { "storeSelected": "storeSelected"; }, never, never, false, never>;
}
