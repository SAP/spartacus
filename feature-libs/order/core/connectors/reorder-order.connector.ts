/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReorderOrderAdapter } from './reorder-order.adapter';
import { CartModificationList } from '@spartacus/cart/base/root';

@Injectable()
export class ReorderOrderConnector {
  constructor(protected adapter: ReorderOrderAdapter) {}

  public reorder(
    orderId: string,
    userId: string
  ): Observable<CartModificationList> {
    return this.adapter.reorder(orderId, userId);
  }
}
