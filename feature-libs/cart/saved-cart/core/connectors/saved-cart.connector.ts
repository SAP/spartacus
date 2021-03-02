import { Injectable } from '@angular/core';
import { Cart } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SavedCartAdapter } from './saved-cart.adapter';

@Injectable({
  providedIn: 'root',
})
export class SavedCartConnector {
  constructor(protected adapter: SavedCartAdapter) {}

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
}
