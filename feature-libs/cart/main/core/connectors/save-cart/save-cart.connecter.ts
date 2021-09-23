import { Injectable } from '@angular/core';
import { SaveCartResult } from '@spartacus/cart/main/root';
import { Observable } from 'rxjs';
import { SaveCartAdapter } from './save-cart.adapter';

@Injectable({
  providedIn: 'root',
})
export class SaveCartConnector {
  constructor(protected adapter: SaveCartAdapter) {}

  public saveCart(
    userId: string,
    cartId: string,
    saveCartName?: string,
    saveCartDescription?: string
  ): Observable<SaveCartResult> {
    return this.adapter.saveCart(
      userId,
      cartId,
      saveCartName,
      saveCartDescription
    );
  }
}
