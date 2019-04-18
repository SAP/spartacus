import { Observable } from 'rxjs';
import { CartModification } from '../../../occ/occ-models/occ.models';

export abstract class CartEntryAdapter {
  abstract addEntry(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number
  ): Observable<CartModification>;
  abstract updateEntry(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification>;
  abstract removeEntry(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any>;
}
