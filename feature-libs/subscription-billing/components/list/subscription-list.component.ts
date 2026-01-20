/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CxDatePipe, TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  PaginationComponent,
  SortingComponent,
  SpinnerComponent,
} from '@spartacus/storefront';
import {
  SubscriptionFacade,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { switchMap } from 'rxjs';

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
  protected subscriptionFacade = inject(SubscriptionFacade);

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
      this.subscriptionFacade.getSubscriptionList(
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
