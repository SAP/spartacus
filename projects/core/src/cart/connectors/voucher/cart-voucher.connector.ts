import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartVoucherAdapter } from './cart-voucher.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartVoucherConnector {
  constructor(protected adapter: CartVoucherAdapter) {}

  public add(
    userId: string,
    cartId: string,
    voucherId: string
  ): Observable<{}> {
    return this.adapter.add(userId, cartId, voucherId);
  }

  public remove(
    userId: string,
    cartId: string,
    voucherId: string
  ): Observable<{}> {
    return this.adapter.remove(userId, cartId, voucherId);
  }
}
