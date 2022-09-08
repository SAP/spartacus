/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  AddEntryConnectorOptions,
  CartModification,
  RemoveEntryConnectorOptions,
  UpdateEntryConnectorOptions,
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
   * Instead, use `add(options: AddEntryConnectorOptions)`.
   */
  public add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity?: number
  ): Observable<CartModification>;
  // TODO:#object-extensibility-deprecation - remove
  public add(options: AddEntryConnectorOptions): Observable<CartModification>;
  add(
    options:
      | AddEntryConnectorOptions
      // TODO:#object-extensibility-deprecation - remove the "| string" part, and everything that follows it.
      | string,
    cartId?: string,
    productCode?: string,
    quantity?: number
  ): Observable<CartModification> {
    // TODO:#object-extensibility-deprecation - remove the 'if' part, but leave the if's body
    if (typeof options !== 'string') {
      return this.adapter.add(options);
    }
    // TODO:#object-extensibility-deprecation - remove
    return this.adapter.add(options, cartId ?? '', productCode ?? '', quantity);
  }

  /**
   *
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `update(options: UpdateEntryConnectorOptions)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  public update(
    userId: string,
    cartId: string,
    entryNumber: string | number,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification>;
  // TODO:#object-extensibility-deprecation - remove
  public update(
    options: UpdateEntryConnectorOptions
  ): Observable<CartModification>;
  public update(
    options:
      | UpdateEntryConnectorOptions
      // TODO:#object-extensibility-deprecation - remove the "| string" part, and everything that follows it.
      | string,
    cartId?: string,
    entryNumber?: string | number,
    quantity?: number
  ): Observable<CartModification> {
    // TODO:#object-extensibility-deprecation - remove the 'if' part, but leave the if's body
    if (typeof options !== 'string') {
      return this.adapter.update(options);
    }
    // TODO:#object-extensibility-deprecation - remove
    return this.adapter.update(
      options,
      cartId ?? '',
      entryNumber || 0,
      quantity || 1
    );
  }

  /**
   *
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `remove(options: RemoveEntryConnectorOptions)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  public remove(
    userId: string,
    cartId: string,
    entryNumber: string | number
  ): Observable<any>;
  // TODO:#object-extensibility-deprecation - remove
  public remove(
    options: RemoveEntryConnectorOptions
  ): Observable<CartModification>;
  public remove(
    options:
      | RemoveEntryConnectorOptions
      // TODO:#object-extensibility-deprecation - remove the "| string" part, and everything that follows it.
      | string,
    cartId?: string,
    entryNumber?: string | number
  ): Observable<any> {
    // TODO:#object-extensibility-deprecation - remove the 'if' part, but leave the if's body
    if (typeof options !== 'string') {
      return this.adapter.remove(options);
    }

    // TODO:#object-extensibility-deprecation - remove
    return this.adapter.remove(options, cartId ?? '', entryNumber || 0);
  }
}
