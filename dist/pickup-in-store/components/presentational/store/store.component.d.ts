import { EventEmitter, OnInit } from '@angular/core';
import { PointOfServiceStock } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import * as i0 from "@angular/core";
/**
 * A store in the store list including address, opening times, stock level, and
 * distance from the search location.
 */
export declare class StoreComponent implements OnInit {
    /** The details of the store to be displayed */
    storeDetails: PointOfServiceStock;
    /** An event emitter triggered when this store is selected for pickup */
    storeSelected: EventEmitter<PointOfServiceStock>;
    isInStock: boolean;
    openHoursOpen: boolean;
    readonly ICON_TYPE: typeof ICON_TYPE;
    ngOnInit(): void;
    /**
     * Select the current store for pickup.
     */
    selectStore(): boolean;
    /**
     * Toggle whether the store's opening hours are visible.
     */
    toggleOpenHours(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreComponent, "cx-store", never, { "storeDetails": "storeDetails"; }, { "storeSelected": "storeSelected"; }, never, never, false, never>;
}
