import { Injectable } from '@angular/core';
import { CartValidationAdapter } from './cart-validation.adapter';
import { Observable } from 'rxjs';
import { CartModification } from '@spartacus/core';

@Injectable()
export class CartValidationConnector {
  constructor(protected adapter: CartValidationAdapter) {}

  validate(cartId: string, userId: string): Observable<CartModification> {
    return this.adapter.validate(cartId, userId);
  }
}
