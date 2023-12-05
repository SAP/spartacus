import { PaymentDetails } from '@spartacus/cart/base/root';
import { Address, CxEvent } from '@spartacus/core';
/**
 * Emit this event to force checkout details reload
 */
export declare class CheckoutQueryReloadEvent extends CxEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutQueryReloadEvent";
}
/**
 * Emit this event to force checkout details reset
 */
export declare class CheckoutQueryResetEvent extends CxEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutQueryResetEvent";
}
/**
 * An abstract event for all the checkout events.
 */
export declare abstract class CheckoutEvent extends CxEvent {
    userId?: string;
    /**
     * Usually set via `getCartIdByUserId()` util method,
     * It is an abstraction over the different properties
     * used for anonymous and logged-in users' carts:
     * - `code` for logged-in users
     * - `guid` for anonymous users
     */
    cartId?: string;
    /**
     * All carts have the `code` property assigned to them,
     * regardless of whether they are anonymous or logged-in.
     * In case of logged-in users, the `cartCode` and `cartId` are the same.
     */
    cartCode?: string;
}
/**
 * An abstract event for all the delivery address related events.
 */
export declare abstract class CheckoutDeliveryAddressEvent extends CheckoutEvent {
}
/**
 * Fired when the delivery address is create cleared.
 */
export declare class CheckoutDeliveryAddressCreatedEvent extends CheckoutDeliveryAddressEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutDeliveryAddressCreatedEvent";
    /**
     * The address.
     */
    address: Address;
}
/**
 * Fired when the user sets a delivery address during checkout.
 */
export declare class CheckoutDeliveryAddressSetEvent extends CheckoutDeliveryAddressEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutDeliveryAddressSetEvent";
    /**
     * The address.
     */
    address: Address;
}
/**
 * Fired when the delivery address has to be cleared.
 */
export declare class CheckoutDeliveryAddressClearedEvent extends CheckoutDeliveryAddressEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutDeliveryAddressClearedEvent";
}
/**
 * An abstract event for all the delivery mode related events.
 */
export declare abstract class CheckoutDeliveryModeEvent extends CheckoutEvent {
}
/**
 * Fired when the delivery mode was set.
 */
export declare class CheckoutDeliveryModeSetEvent extends CheckoutDeliveryModeEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutDeliveryModeSetEvent";
    /**
     * Delivery mode code.
     */
    deliveryModeCode: string;
}
/**
 * Fired when the delivery mode has been cleared.
 */
export declare class CheckoutDeliveryModeClearedEvent extends CheckoutDeliveryModeEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutDeliveryModeClearedEvent";
}
/**
 * Fired when the delivery mode has an error when trying to be cleared.
 */
export declare class CheckoutDeliveryModeClearedErrorEvent extends CheckoutDeliveryModeEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutDeliveryModeClearedErrorEvent";
}
/**
 * Emit this event to force delivery modes reload
 */
export declare class CheckoutSupportedDeliveryModesQueryReloadEvent extends CheckoutDeliveryModeEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutSupportedDeliveryModesQueryReloadEvent";
}
/**
 * Emit this event to force delivery modes reset
 */
export declare class CheckoutSupportedDeliveryModesQueryResetEvent extends CheckoutDeliveryModeEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutSupportedDeliveryModesQueryResetEvent";
}
/**
 * An abstract event for all the payment details related events.
 */
export declare abstract class CheckoutPaymentDetailsEvent extends CheckoutEvent {
}
/**
 * Fired when the payment details have been created.
 */
export declare class CheckoutPaymentDetailsCreatedEvent extends CheckoutPaymentDetailsEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutPaymentDetailsCreatedEvent";
    /**
     * Payment details
     */
    paymentDetails: PaymentDetails;
}
/**
 * Fired when the payment details have been set.
 */
export declare class CheckoutPaymentDetailsSetEvent extends CheckoutPaymentDetailsEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutPaymentDetailsSetEvent";
    /**
     * Payment details id
     */
    paymentDetailsId: string;
}
/**
 * Emit this event to force payment card types reload
 */
export declare class CheckoutPaymentCardTypesQueryReloadEvent extends CheckoutPaymentDetailsEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutPaymentCardTypesQueryReloadEvent";
}
/**
 * Emit this event to force payment card types reset
 */
export declare class CheckoutPaymentCardTypesQueryResetEvent extends CheckoutPaymentDetailsEvent {
    /**
     * Event's type
     */
    static readonly type = "CheckoutPaymentCardTypesQueryResetEvent";
}
