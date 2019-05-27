import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutAdapter } from './checkout.adapter';
import { Order } from '../../../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutConnector {
  constructor(protected adapter: CheckoutAdapter) {}

  public placeOrder(userId: string, cartId: string): Observable<Order> {
    return this.adapter.placeOrder(userId, cartId);
  }
}
