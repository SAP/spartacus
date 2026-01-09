/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from "@angular/core";
import { QueryState } from "@spartacus/core";
import { SubscriptionBill, SubscriptionBillingFacade, SubscriptionBillsList } from "@spartacus/subscription-billing/root";
import { Observable } from "rxjs";

@Injectable()
export class SubscriptionBillingService implements SubscriptionBillingFacade {
    
    getSubscriptionBillState(): Observable<QueryState<SubscriptionBill | undefined>> {
        throw new Error("Method not implemented.");
    }

    getSubscriptionBillByCode(code?: string): Observable<SubscriptionBill | undefined> {
        throw new Error("Method not implemented.");
    }

    getSubscriptionBillsListState(pageSize?: number, currentPage?: number, sort?: string, filter?: string): Observable<QueryState<SubscriptionBillsList | undefined>> {
        throw new Error("Method not implemented.");
    }

    getSubscriptionBillsList(pageSize?: number, currentPage?: number, sort?: string): Observable<SubscriptionBillsList | undefined> {
        throw new Error("Method not implemented.");
    }
  
    getSubscriptionBillCodeFromRoute(): Observable<string | undefined> {
        throw new Error("Method not implemented.");
    }
}
