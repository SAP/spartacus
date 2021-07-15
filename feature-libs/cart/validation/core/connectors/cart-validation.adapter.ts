import { Observable } from 'rxjs';
import { CartModificationList } from '@spartacus/cart/validation/root';

export abstract class CartValidationAdapter {
  abstract load(
    cartId: string,
    userId: string
  ): Observable<CartModificationList>;
}
