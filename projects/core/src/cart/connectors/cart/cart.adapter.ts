import { Observable } from 'rxjs';
import { Cart, CartList } from '../../../occ/occ-models/occ.models';

export abstract class CartAdapter {
  // cart
  abstract loadAllCarts(userId: string, details: boolean): Observable<CartList>;
  abstract loadAllCarts(
    userId: string,
    details?: boolean
  ): Observable<CartList>;
  abstract loadCart(
    userId: string,
    cartId: string,
    details?: boolean
  ): Observable<Cart>;
  abstract createCart(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<Cart>;
}
