import { Injectable } from '@angular/core';
import {
  AddEntryOptions,
  BaseCartOptions,
  CartModification,
} from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CartEntryAdapter } from './cart-entry.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartEntryConnector {
  constructor(protected adapter: CartEntryAdapter) {}

  // TODO:#object-extensibility-deprecation - remove
  /**
   *
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `add(options: BaseCartOptions<AddEntryOptions>)`.
   */
  public add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number
  ): Observable<CartModification>;
  // TODO:#object-extensibility-deprecation - remove
  public add(
    options: BaseCartOptions<AddEntryOptions>
  ): Observable<CartModification>;
  add(
    options:
      | BaseCartOptions<AddEntryOptions>
      // TODO:#object-extensibility-deprecation - remove the "| string" part, and everything that follows it.
      | string,
    cartId?: string,
    productCode?: string,
    quantity?: number
  ): Observable<CartModification> {
    // TODO:#object-extensibility-deprecation - remove the 'if' part
    if (typeof options !== 'string') {
      return this.adapter.add(options);
    }
    // TODO:#object-extensibility-deprecation - remove this return statement
    return this.adapter.add(options, cartId ?? '', productCode ?? '', quantity);
  }

  public update(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification> {
    return this.adapter.update(userId, cartId, entryNumber, qty, pickupStore);
  }

  public remove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    return this.adapter.remove(userId, cartId, entryNumber);
  }
}
