import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartModification } from '../../../occ/occ-models/occ.models';
import { CartEntryAdapter } from './cart-entry.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartEntryConnector {
  constructor(private adapter: CartEntryAdapter) {}

  public addEntry(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number
  ): Observable<CartModification> {
    return this.adapter.addEntry(userId, cartId, productCode, quantity);
  }

  public updateEntry(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification> {
    return this.adapter.updateEntry(
      userId,
      cartId,
      entryNumber,
      qty,
      pickupStore
    );
  }

  public removeEntry(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    return this.adapter.removeEntry(userId, cartId, entryNumber);
  }
}
