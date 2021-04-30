import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CheckoutPaymentAdapter } from './checkout-payment.adapter';
import { CardType, PaymentDetails } from '../../../model/cart.model';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
@Injectable({
  providedIn: 'root',
})
export class CheckoutPaymentConnector {
  constructor(protected adapter: CheckoutPaymentAdapter) {}

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

  getCardTypes(): Observable<CardType[]> {
    return this.adapter.loadCardTypes();
  }
}
