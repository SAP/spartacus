/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ReorderOrderAdapter } from './reorder-order.adapter';
import { CartModificationList } from '@spartacus/cart/base/root';

@Injectable()
export class ReorderOrderConnector {
  protected adapter = inject(ReorderOrderAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  public reorder(
    orderId: string,
    userId: string
  ): Observable<CartModificationList> {
    return this.adapter.reorder(orderId, userId);
  }
}
