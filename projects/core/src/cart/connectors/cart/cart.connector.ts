import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../../model/cart.model';
import { CartAdapter } from './cart.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartConnector {
  constructor(protected adapter: CartAdapter) {}

  public loadAll(userId: string): Observable<Cart[]> {
    return this.adapter.loadAll(userId);
  }

  public load(userId: string, cartId: string): Observable<Cart> {
    return this.adapter.load(userId, cartId);
  }

  public create(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart> {
    return this.adapter.create(userId, oldCartId, toMergeCartGuid);
  }

  public delete(userId: string, cartId: string): Observable<{}> {
    return this.adapter.delete(userId, cartId);
  }

  public addEmail(
    userId: string,
    cartId: string,
    email: string
  ): Observable<{}> {
    return this.adapter.addEmail(userId, cartId, email);
  }
}
