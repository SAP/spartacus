import {
  Address,
  CxEvent,
  Order,
  PaymentDetails,
  ReplenishmentOrder,
} from '@spartacus/core';

/**
 * An abstract event for all the checkout events.
 */
export abstract class CheckoutEvent extends CxEvent {
  userId: string;
  cartId: string;
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
 * Indicates that a user has scheduled replenishment order.
 */
export class ReplenishmentOrderScheduledEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'ReplenishmentOrderScheduledEvent';
  /**
   * Replenishment Order
   */
  replenishmentOrder: ReplenishmentOrder;
}

/**
 * Fired when the user sets a delivery address during checkout.
 */
export class DeliveryAddressSetEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeliveryAddressSetEvent';
  /**
   * The address.
   */
  address: Address;
}

export class DeliveryModeSetEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeliveryModeSetEvent';
  /**
   * Delivery mode code.
   */
  deliveryModeCode: string;
}

export class DeliveryAddressClearedEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeliveryAddressClearedEvent';
}

export class DeliveryModeClearedEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeliveryModeClearedEvent';
}

export class PaymentDetailsSetEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'PaymentDetailsSetEvent';
  /**
   * Payment details id
   */
  paymentDetailsId: string;
}

export class PaymentDetailsCreatedEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'PaymentDetailsCreatedEvent';
  /**
   * Payment details
   */
  paymentDetails: PaymentDetails;
}
