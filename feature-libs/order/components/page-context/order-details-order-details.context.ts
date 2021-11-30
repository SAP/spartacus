import { Injectable } from '@angular/core';
import {
  GetOrderDetailsContext,
  Order,
  OrderDetailsSource,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details/order-details.service';

/**
 * Get order details in Order Details Page
 */
@Injectable({
  providedIn: 'root',
})
export class OrderDetailsOrderDetailsContext implements GetOrderDetailsContext {
  readonly type = OrderDetailsSource.ORDER_DETAILS;

  constructor(protected orderDetailsService: OrderDetailsService) {}

  getOrderDetails(): Observable<Order> {
    return this.orderDetailsService.getOrderDetails();
  }
}
