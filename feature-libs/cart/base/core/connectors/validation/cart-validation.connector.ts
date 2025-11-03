/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CartModificationList } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CartValidationAdapter } from './cart-validation.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartValidationConnector {
  protected adapter = inject(CartValidationAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  validate(cartId: string, userId: string): Observable<CartModificationList> {
    return this.adapter.validate(cartId, userId);
  }
}
