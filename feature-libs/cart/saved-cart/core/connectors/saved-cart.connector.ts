import { Injectable } from '@angular/core';
import { Cart } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SavedCartAdapter } from './saved-cart.adapter';

@Injectable()
export class SavedCartConnector {
  constructor(protected adapter: SavedCartAdapter) {}

  get(userId: string, cartId: string): Observable<Cart> {
    return this.adapter.load(userId, cartId);
  }

  getList(userId: string): Observable<Cart[]> {
    return this.adapter.loadList(userId);
  }

  restoreSavedCart(userId: string, cartId: string): Observable<Cart> {
    return this.adapter.restoreSavedCart(userId, cartId);
  }

  saveCart(
    userId: string,
    cartId: string,
    saveCartName?: string,
    saveCartDescription?: string
  ): Observable<Cart> {
    return this.adapter.saveCart(
      userId,
      cartId,
      saveCartName,
      saveCartDescription
    );
  }

  cloneSavedCart(
    userId: string,
    cartId: string,
    saveCartName?: string
  ): Observable<Cart> {
    return this.adapter.cloneSavedCart(userId, cartId, saveCartName);
  }
}
