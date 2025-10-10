/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, signal, WritableSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  SubscriptionBillingFacade,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { switchMap } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';
import {
  SortingComponent,
  PaginationComponent,
  SpinnerComponent,
} from '@spartacus/storefront';
import { RouterLink } from '@angular/router';
import { TranslatePipe, CxDatePipe, UrlPipe } from '@spartacus/core';

@Component({
  selector: 'cx-subscription-list',
  templateUrl: './subscription-list.component.html',
  imports: [
    NgIf,
    SortingComponent,
    NgFor,
    RouterLink,
    PaginationComponent,
    SpinnerComponent,
    TranslatePipe,
    CxDatePipe,
    UrlPipe,
  ],
})
export class SubscriptionListComponent {
  protected subscriptionBillingFacade = inject(SubscriptionBillingFacade);

  PAGE_SIZE = 5;

  listParams: WritableSignal<{
    sortCode: string | undefined;
    currentPage: number;
  }> = signal({
    sortCode: undefined,
    currentPage: 0,
  });

  subscriptions$ = toObservable(this.listParams).pipe(
    switchMap((params) =>
      this.subscriptionBillingFacade.getSubscriptionList(
        this.PAGE_SIZE,
        params.currentPage,
        params.sortCode
      )
    )
  );

  subscriptions = toSignal<SubscriptionList | null | undefined>(
    this.subscriptions$
  );

  changeSortCode(sortCode: string): void {
    this.listParams.update(() => ({
      currentPage: 0,
      sortCode,
    }));
  }

  pageChange(page: number): void {
    this.listParams.update((params) => ({
      ...params,
      currentPage: page,
    }));
  }
}
