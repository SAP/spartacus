import { Observable } from 'rxjs';
import { CartModificationList } from '../model/index';

export abstract class CartValidationAdapter {
  abstract load(
    cartId: string,
    userId: string
  ): Observable<CartModificationList>;
}
