import { OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CartItemComponentOptions, CartOutlets, OrderEntry, PromotionLocation } from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { CartItemContextSource } from './model/cart-item-context-source.model';
import * as i0 from "@angular/core";
export declare class CartItemComponent implements OnChanges {
    protected cartItemContextSource: CartItemContextSource;
    compact: boolean;
    item: OrderEntry;
    readonly: boolean;
    quantityControl: UntypedFormControl;
    promotionLocation: PromotionLocation;
    options: CartItemComponentOptions;
    iconTypes: typeof ICON_TYPE;
    readonly CartOutlets: typeof CartOutlets;
    constructor(cartItemContextSource: CartItemContextSource);
    ngOnChanges(changes?: SimpleChanges): void;
    isProductOutOfStock(product: any): boolean;
    removeItem(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CartItemComponent, "cx-cart-item", never, { "compact": "compact"; "item": "item"; "readonly": "readonly"; "quantityControl": "quantityControl"; "promotionLocation": "promotionLocation"; "options": "options"; }, {}, never, never, false, never>;
}
