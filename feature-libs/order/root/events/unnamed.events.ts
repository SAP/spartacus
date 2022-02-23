import { CxEvent } from '@spartacus/core';
import { Order } from '../model/order.model';

// TODO: BRIAN issue
/**
 * An abstract event for all the checkout events.
 */
export abstract class CheckoutEvent extends CxEvent {
  userId?: string;
  cartId?: string;
}

// TODO: BRIAN issue
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
 * Indicates that a user has successfully placed an order.
 */
export class CheckoutOrderPlacedEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'CheckoutOrderPlacedEvent';
  /**
   * Order
   */
  order: Order;
}
