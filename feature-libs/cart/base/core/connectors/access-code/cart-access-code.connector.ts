/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartAccessCodeAdapter } from './cart-access-code.adapter';

@Injectable()
export class CartAccessCodeConnector {
  constructor(protected adapter: CartAccessCodeAdapter) {}

  public getCartAccessCode(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    return this.adapter.getCartAccessCode(userId, cartId);
  }
}
