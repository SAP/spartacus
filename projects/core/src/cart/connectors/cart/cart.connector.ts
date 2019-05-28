import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CartAdapter } from './cart.adapter';
import { Cart } from '../../../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartConnector {
  constructor(protected adapter: CartAdapter) {}

  public loadAll(userId: string, details?: boolean): Observable<Cart[]> {
    return this.adapter.loadAll(userId, details);
  }

  public load(
    userId: string,
    cartId: string,
    details?: boolean
  ): Observable<Cart> {
    return this.adapter.load(userId, cartId, details);
  }

  public create(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart> {
    return this.adapter.create(userId, oldCartId, toMergeCartGuid);
  }
}
