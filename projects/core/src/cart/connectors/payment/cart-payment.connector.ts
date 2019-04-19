import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaymentDetails } from '../../../occ/occ-models/occ.models';
import { CartPaymentAdapter } from './cart-payment.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartPaymentConnector {
  constructor(private adapter: CartPaymentAdapter) {}

  public getProviderSubInfo(userId: string, cartId: string): Observable<any> {
    return this.adapter.getProviderSubInfo(userId, cartId);
  }

  public createSubWithProvider(
    postUrl: string,
    parameters: any
  ): Observable<any> {
    return this.adapter.createSubWithProvider(postUrl, parameters);
  }

  public createDetails(
    userId: string,
    cartId: string,
    parameters: any
  ): Observable<PaymentDetails> {
    return this.adapter.createDetails(userId, cartId, parameters);
  }

  public setDetails(
    userId: string,
    cartId: string,
    paymentDetailsId: any
  ): Observable<any> {
    return this.adapter.setDetails(userId, cartId, paymentDetailsId);
  }
}
