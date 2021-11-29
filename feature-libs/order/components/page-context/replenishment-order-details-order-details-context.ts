import { Injectable } from '@angular/core';
import {
  GetOrderDetailsContext,
  Order,
  OrderDetailsSource,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ReplenishmentOrderDetailsService } from '../replenishment-order-details/replenishment-order-details.service';

/**
 * Get order details in Order Details Page
 */
@Injectable({
  providedIn: 'root',
})
export class ReplenishmentOrderDetailsOrderDetailsContext
  implements GetOrderDetailsContext
{
  readonly type = OrderDetailsSource.REPLENISHMENT_ORDER_DETAILS;

  constructor(
    protected replenishmentOrderDetailsService: ReplenishmentOrderDetailsService
  ) {}

  getOrderDetails(): Observable<Order> {
    return this.replenishmentOrderDetailsService.getOrderDetails();
  }
}
