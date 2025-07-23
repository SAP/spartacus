/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SubscriptionList,
  SubscriptionDetail,
  SubscriptionExtensionEffectiveDate,
} from '@spartacus/subscription-billing/root';
import { Observable } from 'rxjs';

export abstract class SubscriptionBillingAdapter {
  abstract getSubscriptionByCode(
    userId: string,
    subscriptionCode: string
  ): Observable<SubscriptionDetail>;
  abstract getSubscriptionList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<SubscriptionList>;
  abstract getSubscriptionExtensionEffectiveDate(
    userId: string,
    subscriptionCode: string,
    extendDuration: number,
    isUnlimitedDuration: boolean
  ): Observable<SubscriptionExtensionEffectiveDate>;
  abstract extendSubscription(
    userId: string, 
    subscriptionCode: string,
    extendDuration: number,
    isUnlimitedDuration: boolean
  ): Observable<any>;
}
