import { Observable } from 'rxjs';
import { Cart, CartList } from '../../../occ/occ-models/occ.models';

export abstract class CartAdapter {
  // cart
  abstract loadAll(userId: string, details: boolean): Observable<CartList>;
  abstract loadAll(
    userId: string,
    details?: boolean
  ): Observable<CartList>;
  abstract load(
    userId: string,
    cartId: string,
    details?: boolean
  ): Observable<Cart>;
  abstract create(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart>;
}
