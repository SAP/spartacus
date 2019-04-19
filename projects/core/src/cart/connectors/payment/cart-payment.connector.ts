import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaymentDetails } from '../../../occ/occ-models/occ.models';
import { CartPaymentAdapter } from './cart-payment.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartPaymentConnector {
  constructor(private adapter: CartPaymentAdapter) {}

  public createDetails(
    userId: string,
    cartId: string,
    paymentDetails: PaymentDetails
  ): Observable<PaymentDetails> {
    return this.adapter.createDetails(userId, cartId, paymentDetails);
  }

  public setDetails(
    userId: string,
    cartId: string,
    paymentDetailsId: string
  ): Observable<any> {
    return this.adapter.setDetails(userId, cartId, paymentDetailsId);
  }
}
