import { CartModificationList } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

export abstract class CartValidationAdapter {
  abstract validate(
    cartId: string,
    userId: string
  ): Observable<CartModificationList>;
}
