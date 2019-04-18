import { Observable } from 'rxjs';
import { CartModification } from '../../../occ/occ-models/occ.models';

export abstract class CartEntryAdapter {
  abstract add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number
  ): Observable<CartModification>;
  abstract update(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification>;
  abstract remove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any>;
}
