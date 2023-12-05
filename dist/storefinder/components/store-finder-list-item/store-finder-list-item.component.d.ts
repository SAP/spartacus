import { EventEmitter } from '@angular/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { StoreFinderOutlets } from '@spartacus/storefinder/root';
import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';
import * as i0 from "@angular/core";
export declare class StoreFinderListItemComponent extends AbstractStoreItemComponent {
    protected storeFinderService: StoreFinderService;
    locationIndex: number | null;
    listOrderLabel: any;
    displayDistance: boolean;
    useClickEvent: boolean;
    storeItemClick: EventEmitter<number>;
    readonly StoreFinderOutlets: typeof StoreFinderOutlets;
    constructor(storeFinderService: StoreFinderService);
    handleStoreItemClick(): void;
    onKey(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderListItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreFinderListItemComponent, "cx-store-finder-list-item", never, { "locationIndex": "locationIndex"; "listOrderLabel": "listOrderLabel"; "displayDistance": "displayDistance"; "useClickEvent": "useClickEvent"; }, { "storeItemClick": "storeItemClick"; }, never, never, false, never>;
}
