import { Injectable } from '@angular/core';
import {
  GetOrderDetailsContext,
  Order,
  OrderDetailsSource,
  OrderFacade,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';

/**
 * Get order details in Order Details Page
 */
@Injectable({
  providedIn: 'root',
})
export class OrderDetailsOrderDetailsContext implements GetOrderDetailsContext {
  readonly type = OrderDetailsSource.ORDER_DETAILS;

  constructor(protected orderFacade: OrderFacade) {}

  getOrderDetails(): Observable<Order> {
    return this.orderFacade.getOrderDetails();
  }
}
