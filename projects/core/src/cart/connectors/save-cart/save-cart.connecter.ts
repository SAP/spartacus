import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaveCartResult } from '../../../model/cart.model';
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
