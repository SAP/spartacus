import { Injectable } from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import {
  GetOrderDetailsContext,
  Order,
  OrderDetailsSource,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';

/**
 * Get order details in Order Confirmation Page
 */
@Injectable({
  providedIn: 'root',
})
export class OrderConfirmationOrderDetailsContext
  implements GetOrderDetailsContext
{
  readonly type = OrderDetailsSource.ORDER_CONFIRMATION;

  constructor(protected checkoutFacade: CheckoutFacade) {}

  getOrderDetails(): Observable<Order> {
    return this.checkoutFacade.getOrderDetails();
  }
}
