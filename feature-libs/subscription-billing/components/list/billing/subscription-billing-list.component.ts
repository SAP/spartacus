/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'cx-billing-list',
  templateUrl: './billing-list.component.html',
  standalone: false,
})
export class SubscriptionBillingListComponent {
  billingList$: Observable<{ id: string; date: string; status: string; totalAmount: string }[]> = of([
    { id: 'BILL00', date: '2024-01-15', status: '1', totalAmount: '$100.00' },
    { id: 'BILL0000000000000000', date: '2024-02-15', status: '2', totalAmount: '$150.00' },
    { id: 'BILL00', date: '2024-03-15', status: '3', totalAmount: '$200.00' },
    { id: 'BILL00', date: '2024-01-15', status: '3', totalAmount: '$100.00' },
  ]);

  pagination: PaginationModel = {
    currentPage: 15,
    pageSize: 10,
    totalResults: 25,
    totalPages: 36,
  };

  changeSortCode(sortCode: string): void {
    console.log(sortCode);
  }

  pageChange(page: number): void {
    console.log(page);
  }
}
