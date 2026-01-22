/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SubscriptionBill,
  SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';
import { Observable } from 'rxjs';

export abstract class SubscriptionBillingAdapter {
  abstract getSubscriptionBillsList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string,
    filters?: string
  ): Observable<SubscriptionBillsList>;
  abstract getSubscriptionBillByCode(
    userId: string,
    billId: string
  ): Observable<SubscriptionBill>;
}
