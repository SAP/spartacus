import { CxEvent } from '@spartacus/core';
import { OrderEntry } from '../models/cart.model';
/**
 * Base cart event. Most cart events should have these properties.
 */
export declare abstract class CartEvent extends CxEvent {
    /**
     * Usually set via `getCartIdByUserId()` util method,
     * It is an abstraction over the different properties
     * used for anonymous and logged-in users' carts:
     * - `code` for logged-in users
     * - `guid` for anonymous users
     */
    cartId: string;
    /**
     * All carts have the `code` property assigned to them,
     * regardless of whether they are anonymous or logged-in.
     * In case of logged-in users, the `cartCode` and `cartId` are the same.
     */
    cartCode: string;
    /**
     * User ID.
     */
    userId: string;
}
export declare class CreateCartEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "CreateCartEvent";
}
export declare class CreateCartSuccessEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "CreateCartSuccessEvent";
}
export declare class CreateCartFailEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "CreateCartFailEvent";
    error: any;
}
export declare class CartAddEntryEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "CartAddEntryEvent";
    productCode: string;
    quantity: number;
}
export declare class CartAddEntrySuccessEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "CartAddEntrySuccessEvent";
    productCode: string;
    quantity: number;
    entry?: OrderEntry;
    quantityAdded?: number;
    deliveryModeChanged?: boolean;
}
export declare class CartAddEntryFailEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "CartAddEntryFailEvent";
    productCode: string;
    quantity: number;
    error?: unknown;
}
export declare class CartRemoveEntryFailEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "CartRemoveEntryFailEvent";
    entry: OrderEntry;
}
export declare class CartRemoveEntrySuccessEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "CartRemoveEntrySuccessEvent";
    entry: OrderEntry;
}
export declare class CartUpdateEntrySuccessEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "CartUpdateEntrySuccessEvent";
    quantity: number;
    entry: OrderEntry;
}
export declare class CartUpdateEntryFailEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "CartUpdateEntryFailEvent";
    quantity: number;
    entry: OrderEntry;
}
export declare class CartUiEventAddToCart extends CxEvent {
    /**
     * Event's type
     */
    static readonly type = "CartUiEventAddToCart";
    productCode: string;
    quantity: number;
    numberOfEntriesBeforeAdd: number;
    pickupStoreName?: string;
}
/**
 * Fired when the cart has been successfully merged.
 */
export declare class MergeCartSuccessEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "MergeCartSuccessEvent";
    /**
     * MergeCart actions triggers CreateCart which requires this parameter, so that's why it is required.
     */
    tempCartId: string;
    /**
     * Previous cart id which was merged with new/user cart.
     * Needed to know which obsolete entity should be removed.
     */
    oldCartId?: string;
    /** Extra data */
    extraData?: {
        active?: boolean;
    };
}
/**
 * Triggers the loading of the cart.
 */
export declare class LoadCartEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "LoadCartEvent";
}
/** Removes the cart. */
export declare class RemoveCartEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "RemoveCartEvent";
}
/**
 * Fired when the cart has been deleted.
 */
export declare class DeleteCartEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "DeleteCartEvent";
}
export declare class DeleteCartSuccessEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "DeleteCartSuccessEvent";
}
export declare class DeleteCartFailEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type = "DeleteCartFailEvent";
}
export declare class AddCartVoucherEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type: string;
    voucherId: string;
}
export declare class AddCartVoucherSuccessEvent extends AddCartVoucherEvent {
    /**
     * Event's type
     */
    static readonly type = "AddCartVoucherSuccessEvent";
}
export declare class AddCartVoucherFailEvent extends AddCartVoucherEvent {
    /**
     * Event's type
     */
    static readonly type = "AddCartVoucherFailEvent";
    error: unknown;
}
export declare class RemoveCartVoucherEvent extends CartEvent {
    /**
     * Event's type
     */
    static readonly type: string;
    voucherId: string;
}
export declare class RemoveCartVoucherSuccessEvent extends RemoveCartVoucherEvent {
    /**
     * Event's type
     */
    static readonly type: string;
}
export declare class RemoveCartVoucherFailEvent extends RemoveCartVoucherEvent {
    /**
     * Event's type
     */
    static readonly type = "RemoveCartVoucherFailEvent";
    error: unknown;
}
