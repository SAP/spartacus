import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SaveForLaterAdapter } from './save-for-later.adapter';
import { Cart } from '../../../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class SaveForLaterConnector {
  constructor(protected adapter: SaveForLaterAdapter) {}

  public load(userId: string, cartId: string): Observable<Cart> {
    return this.adapter.load(userId, cartId);
  }

  public create(userId: string, cartId?: string): Observable<Cart> {
    return this.adapter.create(userId, cartId);
  }
}
