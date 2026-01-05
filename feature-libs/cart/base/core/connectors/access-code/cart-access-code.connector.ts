/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CartAccessCodeAdapter } from './cart-access-code.adapter';

@Injectable()
export class CartAccessCodeConnector {
  protected adapter = inject(CartAccessCodeAdapter);

  public getCartAccessCode(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    return this.adapter.getCartAccessCode(userId, cartId);
  }
}
