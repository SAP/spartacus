import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cart, CartList } from '../../../occ/occ-models/occ.models';
import { CartAdapter } from './cart.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartConnector {
  constructor(private adapter: CartAdapter) {}

  public loadAllCarts(userId: string, details?: boolean): Observable<CartList> {
    return this.adapter.loadAllCarts(userId, details);
  }

  public loadCart(
    userId: string,
    cartId: string,
    details?: boolean
  ): Observable<Cart> {
    return this.adapter.loadCart(userId, cartId, details);
  }

  public createCart(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart> {
    return this.adapter.createCart(userId, oldCartId, toMergeCartGuid);
  }
}
