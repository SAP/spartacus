import { CxEvent } from '@spartacus/core';
import { Order } from '../model/order.model';
import { ReplenishmentOrder } from '../model/replenishment-order.model';

/**
 * An abstract event for all the order events.
 */
export abstract class OrderEvent extends CxEvent {
  userId?: string;
  cartId?: string;
}

/**
 * Indicates that a user has successfully placed an order.
 */
export class OrderPlacedEvent extends OrderEvent {
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
 * Indicates that a user has successfully placed scheduled an order.
 */
export class ReplenishmentOrderScheduledEvent extends OrderEvent {
  /**
   * Event's type
   */
  static readonly type = 'ReplenishmentOrderScheduledEvent';
  /**
   * Replenishment Order
   */
  replenishmentOrder: ReplenishmentOrder;
}
