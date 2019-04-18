import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaymentDetails } from '../../../occ/occ-models/occ.models';
import { CartPaymentAdapter } from './cart-payment.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartPaymentConnector {
  constructor(private adapter: CartPaymentAdapter) {}

  public getPaymentProviderSubInfo(
    userId: string,
    cartId: string
  ): Observable<any> {
    return this.adapter.getPaymentProviderSubInfo(userId, cartId);
  }

  public createSubWithPaymentProvider(
    postUrl: string,
    parameters: any
  ): Observable<any> {
    return this.adapter.createSubWithPaymentProvider(postUrl, parameters);
  }

  public createPaymentDetails(
    userId: string,
    cartId: string,
    parameters: any
  ): Observable<PaymentDetails> {
    return this.adapter.createPaymentDetails(userId, cartId, parameters);
  }

  public setPaymentDetails(
    userId: string,
    cartId: string,
    paymentDetailsId: any
  ): Observable<any> {
    return this.adapter.setPaymentDetails(userId, cartId, paymentDetailsId);
  }
}
