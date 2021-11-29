import {
  Order,
  OrderDetailsSource,
  ReplenishmentOrder,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';

/**
 * An interface for context which determinate get order details destination
 */
export interface GetOrderDetailsContext {
  /**
   * Designates the type of order details that we handle in the context.
   * It allows for recognize used service in better way than instanceof - will works also with overridden services.
   */
  readonly type: OrderDetailsSource;

  /**
   * get order details
   */
  getOrderDetails(): Observable<Order | ReplenishmentOrder>;
}
