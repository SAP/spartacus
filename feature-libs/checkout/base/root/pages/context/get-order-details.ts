import { Order, ReplenishmentOrder } from '@spartacus/order/root';
import { Observable } from 'rxjs';

/**
 * An interface for context which determinate get order details destination
 */
export interface GetOrderDetailsContext {
  /**
   * get order details
   */
  getOrder(): Observable<Order | ReplenishmentOrder>;
}
