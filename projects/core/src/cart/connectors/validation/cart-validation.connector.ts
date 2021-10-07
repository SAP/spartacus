import { Injectable } from '@angular/core';
import { CartValidationAdapter } from './cart-validation.adapter';
import { Observable } from 'rxjs';
import { CartModificationList } from '../../../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartValidationConnector {
  constructor(protected adapter: CartValidationAdapter) {}

  validate(cartId: string, userId: string): Observable<CartModificationList> {
    return this.adapter.validate(cartId, userId);
  }
}
