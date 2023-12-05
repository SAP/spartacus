import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { ProductListItemContextSource } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class WishListItemComponent implements OnChanges {
    protected productListItemContextSource: ProductListItemContextSource;
    isLoading: boolean;
    cartEntry: OrderEntry;
    remove: EventEmitter<OrderEntry>;
    constructor(productListItemContextSource: ProductListItemContextSource);
    ngOnChanges(changes?: SimpleChanges): void;
    removeEntry(item: OrderEntry): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WishListItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WishListItemComponent, "[cx-wish-list-item], cx-wish-list-item", never, { "isLoading": "isLoading"; "cartEntry": "cartEntry"; }, { "remove": "remove"; }, never, never, false, never>;
}
