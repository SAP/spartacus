/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { SubscriptionBillingAdapter } from './subscription-billing.adapter';
import { Observable } from 'rxjs';
import {
  SubscriptionBill,
  SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';

@Injectable()
export class SubscriptionBillingConnector {
  protected adapter = inject(SubscriptionBillingAdapter);

  public getSubscriptionBillsList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    filters?: string
  ): Observable<SubscriptionBillsList> {
    return this.adapter.getSubscriptionBillsList(
      userId,
      pageSize,
      currentPage,
      sort,
      filters
    );
  }

  public getSubscriptionBillByCode(
    userId: string,
    billCode: string
  ): Observable<SubscriptionBill> {
    return this.adapter.getSubscriptionBillByCode(userId, billCode);
  }
}
