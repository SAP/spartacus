import { Injectable } from '@angular/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { UnnamedAdapter } from './unnamed.adapter';

@Injectable()
export class UnnamedConnector {
  constructor(protected adapter: UnnamedAdapter) {}

  public placeOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order> {
    return this.adapter.placeOrder(userId, cartId, termsChecked);
  }
}
