import { EventEmitter } from '@angular/core';
import { LocationSearchParams } from '@spartacus/pickup-in-store/root';
import { CurrentLocationService } from '../../services/current-location.service';
import * as i0 from "@angular/core";
/**
 * The search box and find my location button for finding points of
 * service to pickup from. Also with controls for toggling the display of
 * locations without stock.
 */
export declare class StoreSearchComponent {
    protected currentLocationService: CurrentLocationService;
    /** Whether the hide out of stock checkbox appears checked */
    hideOutOfStock: boolean;
    /** Whether out of stock locations should be hidden in the search list */
    eventHideOutOfStock: EventEmitter<boolean>;
    /** The search parameters used to find pickup stores */
    findStores: EventEmitter<LocationSearchParams>;
    /** Whether the loading spinner should be displayed */
    showSpinner: EventEmitter<boolean>;
    constructor(currentLocationService: CurrentLocationService);
    /** Initiate a free text location search */
    onFindStores(location: string): boolean;
    /** Toggle whether locations without stock should be displayed */
    onHideOutOfStock(): void;
    /** Initiate a latitude and longitude search using the current browser location */
    useMyLocation(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreSearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreSearchComponent, "cx-store-search", never, { "hideOutOfStock": "hideOutOfStock"; }, { "eventHideOutOfStock": "eventHideOutOfStock"; "findStores": "findStores"; "showSpinner": "showSpinner"; }, never, never, false, never>;
}
