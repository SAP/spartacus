/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CartVoucherAdapter } from './cart-voucher.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartVoucherConnector {
  protected adapter = inject(CartVoucherAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  public add(
    userId: string,
    cartId: string,
    voucherId: string
  ): Observable<{}> {
    return this.adapter.add(userId, cartId, voucherId);
  }

  public remove(
    userId: string,
    cartId: string,
    voucherId: string
  ): Observable<{}> {
    return this.adapter.remove(userId, cartId, voucherId);
  }
}
