import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartPaymentAdapter } from './cart-payment.adapter';
import { PaymentDetails } from '../../../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartPaymentConnector {
  constructor(private adapter: CartPaymentAdapter) {}

  public create(
    userId: string,
    cartId: string,
    paymentDetails: PaymentDetails
  ): Observable<PaymentDetails> {
    return this.adapter.create(userId, cartId, paymentDetails);
  }

  public set(
    userId: string,
    cartId: string,
    paymentDetailsId: string
  ): Observable<any> {
    return this.adapter.set(userId, cartId, paymentDetailsId);
  }
}
