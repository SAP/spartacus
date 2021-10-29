import { Address, CxEvent, Order, PaymentDetails } from '@spartacus/core';

/**
 * Emit this event to force checkout details reload
 */
export class ReloadCheckoutQueryEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'ReloadCheckoutQueryEvent';
}

/**
 * Emit this event to force checkout details reset
 */
export class ResetCheckoutQueryEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'ResetCheckoutQueryEvent';
}

/**
 * An abstract event for all the checkout events.
 */
export abstract class CheckoutEvent extends CxEvent {
  userId?: string;
  cartId?: string;
}

/**
 * Indicates that a user has successfully placed an order.
 */
export class OrderPlacedEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'OrderPlacedEvent';
  /**
   * Order
   */
  order: Order;
}

/**
 * An abstract event for all the delivery address related events.
 */
export abstract class CheckoutDeliveryAddressEvent extends CheckoutEvent {}

/**
 * Fired when the user sets a delivery address during checkout.
 */
export class DeliveryAddressSetEvent extends CheckoutDeliveryAddressEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeliveryAddressSetEvent';
  /**
   * The address.
   */
  address: Address;
}

/**
 * Fired when the delivery address has to be cleared.
 */
export class ClearCheckoutDeliveryAddressEvent extends CheckoutDeliveryAddressEvent {
  /**
   * Event's type
   */
  static readonly type = 'ClearCheckoutDeliveryAddressEvent';
}

/**
 * Fired when the delivery address was cleared.
 */
export class DeliveryAddressClearedEvent extends CheckoutDeliveryAddressEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeliveryAddressClearedEvent';
}

/**
 * An abstract event for all the delivery mode related events.
 */
export abstract class CheckoutDeliveryModeEvent extends CheckoutEvent {}

/**
 * Emit this event to force delivery modes reload
 */
export class ReloadDeliveryModesEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'ReloadDeliveryModesEvent';
}

/**
 * Emit this event to force delivery modes reset
 */
export class ResetDeliveryModesEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'ResetDeliveryModesEvent';
}

/**
 * Fired when the delivery mode was set.
 */
export class DeliveryModeSetEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeliveryModeSetEvent';
  /**
   * Delivery mode code.
   */
  deliveryModeCode: string;
}

/**
 * Fired when the delivery mode has been cleared.
 */
export class DeliveryModeClearedEvent extends CheckoutDeliveryModeEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeliveryModeClearedEvent';
}

/**
 * An abstract event for all the payment details related events.
 */
export abstract class CheckoutPaymentDetailsEvent extends CheckoutEvent {}

/**
 * Fired when the payment details have been set.
 */
export class PaymentDetailsSetEvent extends CheckoutPaymentDetailsEvent {
  /**
   * Event's type
   */
  static readonly type = 'PaymentDetailsSetEvent';
  /**
   * Payment details id
   */
  paymentDetailsId: string;
}

/**
 * Fired when the payment details have been created.
 */
export class PaymentDetailsCreatedEvent extends CheckoutPaymentDetailsEvent {
  /**
   * Event's type
   */
  static readonly type = 'PaymentDetailsCreatedEvent';
  /**
   * Payment details
   */
  paymentDetails: PaymentDetails;
}
