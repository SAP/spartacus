import { ReplenishmentOrder } from '../model/replenishment-order.model';
import { CheckoutEvent } from './unnamed.events';

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
