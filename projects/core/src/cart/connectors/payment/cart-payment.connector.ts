import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaymentDetails } from '../../../occ/occ-models/occ.models';
import { CartPaymentAdapter } from './cart-payment.adapter';

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
