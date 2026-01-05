/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { SubscriptionAdapter } from './subscription.adapter';
import { Observable } from 'rxjs';
import {
  SubscriptionDetail,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';

@Injectable()
export class SubscriptionConnector {
  protected adapter = inject(SubscriptionAdapter);
  public getSubscriptionByCode(
    userId: string,
    subscriptionCode: string
  ): Observable<SubscriptionDetail> {
    return this.adapter.getSubscriptionByCode(userId, subscriptionCode);
  }
  public getSubscriptionList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<SubscriptionList> {
    return this.adapter.getSubscriptionList(
      userId,
      pageSize,
      currentPage,
      sort
    );
  }
}
