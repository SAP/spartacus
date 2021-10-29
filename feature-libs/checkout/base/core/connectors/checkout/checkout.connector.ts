import { Injectable } from '@angular/core';
import { CheckoutState } from '@spartacus/checkout/base/root';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutAdapter } from './checkout.adapter';

@Injectable()
export class CheckoutConnector {
  constructor(protected adapter: CheckoutAdapter) {}

  public placeOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order> {
    return this.adapter.placeOrder(userId, cartId, termsChecked);
  }

  public getCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutState> {
    return this.adapter.getCheckoutDetails(userId, cartId);
  }
}
