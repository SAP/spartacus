import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SavedCartAdapter } from './saved-cart.adapter';

@Injectable({
  providedIn: 'root',
})
export class SavedCartConnector {
  constructor(protected adapter: SavedCartAdapter) {}

  create(
    userId: string,
    cartId: string,
    cartDescription: string,
    cartName: string
  ): Observable<void> {
    return this.adapter.create(userId, cartId, cartDescription, cartName);
  }
}
