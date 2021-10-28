import { Injectable } from '@angular/core';
import { CardType, PaymentDetails } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutPaymentAdapter } from './checkout-payment.adapter';

@Injectable()
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
