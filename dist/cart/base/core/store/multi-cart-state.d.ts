import { Cart } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
export declare const MULTI_CART_FEATURE = "cart";
export declare const MULTI_CART_DATA = "[Multi Cart] Multi Cart Data";
/**
 * Add voucher process const
 */
export declare const ADD_VOUCHER_PROCESS_ID = "addVoucher";
export interface StateWithMultiCart {
    [MULTI_CART_FEATURE]: MultiCartState;
}
export interface MultiCartState {
    carts: StateUtils.EntityProcessesLoaderState<Cart | undefined>;
    index: {
        [cartType: string]: string;
    };
}
