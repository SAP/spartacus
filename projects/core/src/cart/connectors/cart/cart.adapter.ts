import { Observable } from 'rxjs';
import { Cart } from '../../../occ/occ-models/occ.models';

export abstract class CartAdapter {
  abstract loadAll(userId: string, details?: boolean): Observable<Cart[]>;

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
