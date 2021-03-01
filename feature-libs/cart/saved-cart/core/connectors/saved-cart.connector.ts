import { Injectable } from '@angular/core';
import { Cart, EntitiesModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SavedCartAdapter } from './saved-cart.adapter';

@Injectable({
  providedIn: 'root',
})
export class SavedCartConnector {
  constructor(protected adapter: SavedCartAdapter) {}

  getList(userId: string): Observable<EntitiesModel<Cart>> {
    return this.adapter.loadList(userId);
  }

  restoreSavedCart(userId: string, cartId: string): Observable<Cart> {
    return this.adapter.restoreSavedCart(userId, cartId);
  }
}
