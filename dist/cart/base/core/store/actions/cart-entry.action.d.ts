import { OrderEntry } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
export declare const CART_ADD_ENTRY = "[Cart-entry] Add Entry";
export declare const CART_ADD_ENTRY_SUCCESS = "[Cart-entry] Add Entry Success";
export declare const CART_ADD_ENTRY_FAIL = "[Cart-entry] Add Entry Fail";
export declare const CART_REMOVE_ENTRY = "[Cart-entry] Remove Entry";
export declare const CART_REMOVE_ENTRY_SUCCESS = "[Cart-entry] Remove Entry Success";
export declare const CART_REMOVE_ENTRY_FAIL = "[Cart-entry] Remove Entry Fail";
export declare const CART_UPDATE_ENTRY = "[Cart-entry] Update Entry";
export declare const CART_UPDATE_ENTRY_SUCCESS = "[Cart-entry] Update Entry Success";
export declare const CART_UPDATE_ENTRY_FAIL = "[Cart-entry] Update Entry Fail";
export declare class CartAddEntry extends StateUtils.EntityProcessesIncrementAction {
    payload: {
        cartId: string;
        userId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
    };
    readonly type = "[Cart-entry] Add Entry";
    constructor(payload: {
        cartId: string;
        userId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
    });
}
export declare class CartAddEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
    payload: {
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
        deliveryModeChanged?: boolean;
        entry?: OrderEntry;
        quantityAdded?: number;
        statusCode?: string;
        statusMessage?: string;
    };
    readonly type = "[Cart-entry] Add Entry Success";
    constructor(payload: {
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
        deliveryModeChanged?: boolean;
        entry?: OrderEntry;
        quantityAdded?: number;
        statusCode?: string;
        statusMessage?: string;
    });
}
export declare class CartAddEntryFail extends StateUtils.EntityProcessesDecrementAction {
    payload: {
        error: any;
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
    };
    readonly type = "[Cart-entry] Add Entry Fail";
    constructor(payload: {
        error: any;
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
    });
}
export declare class CartRemoveEntry extends StateUtils.EntityProcessesIncrementAction {
    payload: {
        cartId: string;
        userId: string;
        entryNumber: string;
    };
    readonly type = "[Cart-entry] Remove Entry";
    constructor(payload: {
        cartId: string;
        userId: string;
        entryNumber: string;
    });
}
export declare class CartRemoveEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
    payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
    };
    readonly type = "[Cart-entry] Remove Entry Success";
    constructor(payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
    });
}
export declare class CartRemoveEntryFail extends StateUtils.EntityProcessesDecrementAction {
    payload: {
        error: any;
        cartId: string;
        userId: string;
        entryNumber: string;
    };
    readonly type = "[Cart-entry] Remove Entry Fail";
    constructor(payload: {
        error: any;
        cartId: string;
        userId: string;
        entryNumber: string;
    });
}
export declare class CartUpdateEntry extends StateUtils.EntityProcessesIncrementAction {
    payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    };
    readonly type = "[Cart-entry] Update Entry";
    constructor(payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    });
}
export declare class CartUpdateEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
    payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    };
    readonly type = "[Cart-entry] Update Entry Success";
    constructor(payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    });
}
export declare class CartUpdateEntryFail extends StateUtils.EntityProcessesDecrementAction {
    payload: {
        error: any;
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    };
    readonly type = "[Cart-entry] Update Entry Fail";
    constructor(payload: {
        error: any;
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    });
}
export type CartEntryAction = CartAddEntry | CartAddEntrySuccess | CartAddEntryFail | CartRemoveEntry | CartRemoveEntrySuccess | CartRemoveEntryFail | CartUpdateEntry | CartUpdateEntrySuccess | CartUpdateEntryFail;
