import { StateUtils } from '@spartacus/core';
export declare const CART_ADD_VOUCHER = "[Cart-voucher] Add Cart Vouchers";
export declare const CART_ADD_VOUCHER_FAIL = "[Cart-voucher] Add Cart Voucher Fail";
export declare const CART_ADD_VOUCHER_SUCCESS = "[Cart-voucher] Add Cart Voucher Success";
export declare const CART_RESET_ADD_VOUCHER = "[Cart-voucher] Reset Add Cart Voucher";
export declare const CART_REMOVE_VOUCHER = "[Cart-voucher] Remove Cart Voucher";
export declare const CART_REMOVE_VOUCHER_FAIL = "[Cart-voucher] Remove Cart Voucher Fail";
export declare const CART_REMOVE_VOUCHER_SUCCESS = "[Cart-voucher] Remove Cart Voucher Success";
export declare class CartAddVoucher extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        cartId: string;
        voucherId: string;
    };
    readonly type = "[Cart-voucher] Add Cart Vouchers";
    constructor(payload: {
        userId: string;
        cartId: string;
        voucherId: string;
    });
}
export declare class CartAddVoucherFail extends StateUtils.EntityFailAction {
    payload: {
        userId: string;
        cartId: string;
        voucherId: string;
        error: any;
    };
    readonly type = "[Cart-voucher] Add Cart Voucher Fail";
    constructor(payload: {
        userId: string;
        cartId: string;
        voucherId: string;
        error: any;
    });
}
export declare class CartAddVoucherSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        userId: string;
        cartId: string;
        voucherId: string;
    };
    readonly type = "[Cart-voucher] Add Cart Voucher Success";
    constructor(payload: {
        userId: string;
        cartId: string;
        voucherId: string;
    });
}
/**
 * Resets add voucher process
 */
export declare class CartResetAddVoucher extends StateUtils.EntityLoaderResetAction {
    readonly type = "[Cart-voucher] Reset Add Cart Voucher";
    constructor();
}
export declare class CartRemoveVoucher extends StateUtils.EntityProcessesIncrementAction {
    payload: {
        userId: string;
        cartId: string;
        voucherId: string;
    };
    readonly type = "[Cart-voucher] Remove Cart Voucher";
    constructor(payload: {
        userId: string;
        cartId: string;
        voucherId: string;
    });
}
export declare class CartRemoveVoucherFail extends StateUtils.EntityProcessesDecrementAction {
    payload: {
        error: any;
        cartId: string;
        userId: string;
        voucherId: string;
    };
    readonly type = "[Cart-voucher] Remove Cart Voucher Fail";
    constructor(payload: {
        error: any;
        cartId: string;
        userId: string;
        voucherId: string;
    });
}
export declare class CartRemoveVoucherSuccess extends StateUtils.EntityProcessesDecrementAction {
    payload: {
        userId: string;
        cartId: string;
        voucherId: string;
    };
    readonly type = "[Cart-voucher] Remove Cart Voucher Success";
    constructor(payload: {
        userId: string;
        cartId: string;
        voucherId: string;
    });
}
export type CartVoucherAction = CartAddVoucher | CartAddVoucherFail | CartAddVoucherSuccess | CartResetAddVoucher | CartRemoveVoucher | CartRemoveVoucherFail | CartRemoveVoucherSuccess;
