import { Observable } from 'rxjs';
import { CartModificationList } from '../../../model/cart.model';

export abstract class CartValidationAdapter {
  abstract validate(
    cartId: string,
    userId: string
  ): Observable<CartModificationList>;
}
