/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CartModificationList } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CartValidationAdapter } from './cart-validation.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartValidationConnector {
  constructor(protected adapter: CartValidationAdapter) {}

  validate(cartId: string, userId: string): Observable<CartModificationList> {
    return this.adapter.validate(cartId, userId);
  }
}
