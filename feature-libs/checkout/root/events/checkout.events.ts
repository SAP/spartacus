import { Address, CxEvent } from '@spartacus/core';

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
// TODO:#13888 before 5.0 - extend CheckoutEvent
export class OrderPlacedEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'OrderPlacedEvent';
  /**
   * Order code
   */
  code: string;
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

export class DeliveryAddressClearedEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeliveryAddressClearedEvent';
}
