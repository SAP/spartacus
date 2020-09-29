import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../../model/order.model';
import { CheckoutDetails } from '../../models/checkout.model';
import { CheckoutAdapter } from './checkout.adapter';

@Injectable({
  providedIn: 'root',
})
export class CheckoutConnector {
  constructor(protected adapter: CheckoutAdapter) {}

  public placeOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order> {
    return this.adapter.placeOrder(userId, cartId, termsChecked);
  }

  public loadCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutDetails> {
    return this.adapter.loadCheckoutDetails(userId, cartId);
  }

  public clearCheckoutDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<any> {
    return this.adapter.clearCheckoutDeliveryAddress(userId, cartId);
  }

  public clearCheckoutDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<any> {
    return this.adapter.clearCheckoutDeliveryMode(userId, cartId);
  }
}
