import { PaymentDetails } from '@spartacus/cart/base/root';
import { Address, CxEvent } from '@spartacus/core';

/**
 * Emit this event to force checkout details reload
 */
export class CheckoutReloadQueryEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutReloadQueryEvent';
}

/**
 * Emit this event to force checkout details reset
 */
export class CheckoutResetQueryEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutResetQueryEvent';
}

/**
 * An abstract event for all the checkout events.
 */
export abstract class CheckoutEvent extends CxEvent {
  userId?: string;
  cartId?: string;
}

/**
 * An abstract event for all the delivery mode related events.
 */
export abstract class CheckoutDeliveryModeEvent extends CheckoutEvent {}

/**
 * Emit this event to force delivery modes reload
 */
export class CheckoutReloadDeliveryModesEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutReloadDeliveryModesEvent';
}

/**
 * Emit this event to force delivery modes reset
 */
export class CheckoutResetDeliveryModesEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutResetDeliveryModesEvent';
}

/**
 * Fired when the delivery mode was set.
 */
export class CheckoutDeliveryModeSetEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutDeliveryModeSetEvent';
  /**
   * Delivery mode code.
   */
  deliveryModeCode: string;
}

/**
 * Fired when the delivery mode has been cleared.
 */
export class CheckoutDeliveryModeClearedEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutDeliveryModeClearedEvent';
}

/**
 * An abstract event for all the payment details related events.
 */
export abstract class CheckoutPaymentDetailsEvent extends CheckoutEvent {}

/**
 * Fired when the payment details have been set.
 */
export class CheckoutPaymentDetailsSetEvent extends CheckoutPaymentDetailsEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutPaymentDetailsSetEvent';
  /**
   * Payment details id
   */
  paymentDetailsId: string;
}

/**
 * Fired when the payment details have been created.
 */
export class CheckoutPaymentDetailsCreatedEvent extends CheckoutPaymentDetailsEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutPaymentDetailsCreatedEvent';
  /**
   * Payment details
   */
  paymentDetails: PaymentDetails;
}

// new events to discuss for delivery address

/**
 * An abstract event for all the delivery address related events.
 */
export abstract class CheckoutDeliveryAddressEvent extends CheckoutEvent {}

/**
 * Fired when the delivery address is create cleared.
 */
export class CheckoutCreateDeliveryAddressEvent extends CheckoutDeliveryAddressEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutCreateDeliveryAddressEvent';
  /**
   * The address.
   */
  address: Address;
}

/**
 * Fired when the user sets a delivery address during checkout.
 */
export class CheckoutSetDeliveryAddressEvent extends CheckoutDeliveryAddressEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutSetDeliveryAddressEvent';
  /**
   * The address.
   */
  address: Address;
}

/**
 * Fired when the delivery address has to be cleared.
 */
export class CheckoutClearDeliveryAddressEvent extends CheckoutDeliveryAddressEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutClearDeliveryAddressEvent';
}
