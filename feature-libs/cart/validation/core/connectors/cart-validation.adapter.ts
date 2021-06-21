import { Observable } from 'rxjs';
import { CartModification } from '@spartacus/core';

export abstract class CartValidationAdapter {
  abstract validate(
    cartId: string,
    userId: string
  ): Observable<CartModification>;
}
