/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { SubscriptionBillingAdapter } from '@spartacus/subscription-billing/core';
import { SubscriptionBill, SubscriptionBillsList } from '@spartacus/subscription-billing/root';
import { Observable } from 'rxjs';

@Injectable()
export class OccSubscriptionBillingAdapter implements SubscriptionBillingAdapter {
    
    getSubscriptionBillsList(userId: string, pageSize?: number, currentPage?: number, sort?: string, filter?: string): Observable<SubscriptionBillsList> {
        throw new Error('Method not implemented.');
    }

    getSubscriptionBillByCode(userId: string, billCode: string): Observable<SubscriptionBill> {
        throw new Error('Method not implemented.');
    }

}
