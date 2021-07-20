import { Injectable } from '@angular/core';
import { CartValidationAdapter } from './cart-validation.adapter';
import { Observable } from 'rxjs';
import { CartModificationList } from '@spartacus/cart/validation/root';

@Injectable()
export class CartValidationConnector {
  constructor(protected adapter: CartValidationAdapter) {}

  get(cartId: string, userId: string): Observable<CartModificationList> {
    return this.adapter.load(cartId, userId);
  }
}
