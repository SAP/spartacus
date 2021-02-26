import { Injectable } from '@angular/core';
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
    cartDescription: string,
    cartName: string
  ): Observable<void> {
    return this.adapter.saveCart(userId, cartId, cartDescription, cartName);
  }
}
