/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import {
  I18nModule,
  PaginationModel,
  RoutingService,
  SortModel,
  TranslationService,
  UrlModule,
} from '@spartacus/core';
import { ListNavigationModule, SpinnerModule } from '@spartacus/storefront';
import {
  SubscriptionBillingFacade,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { combineLatest, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'cx-subscription-list',
  templateUrl: './subscription-list.component.html',
  standalone: true,
  imports: [
    I18nModule,
    UrlModule,
    ListNavigationModule,
    RouterModule,
    SpinnerModule,
    CommonModule,
  ],
})
export class SubscriptionListComponent {
  protected subscriptionBillingFacade = inject(SubscriptionBillingFacade);
  protected translationService = inject(TranslationService);
  protected routingService = inject(RoutingService);
  protected sortMapping: { [key: string]: string } = {
    byDocumentNumberDesc: 'documentNumber',
    byDocumentNumberAsc: 'documentNumber:asc',
  };
  PAGE_SIZE = 5;
  sortOptions: SortModel[];
  sort = 'byDocumentNumberDesc';
  pagination: PaginationModel;

  listParams: WritableSignal<{
    sortCode: string | undefined;
    currentPage: number;
  }> = signal({
    sortCode: this.sortMapping[this.sort],
    currentPage: 0,
  });

  getSortOptions() {
    this.sortOptions = [];
    Object.keys(this.sortMapping).forEach((sortKey) =>
      this.sortOptions.push({ code: sortKey, selected: false })
    );

    const translations = this.sortOptions.map((sort) =>
      this.translationService.translate(`subscriptionList.sorts.${sort.code}`)
    );

    combineLatest(translations)
      .pipe(take(1))
      .subscribe((translated) =>
        this.sortOptions.forEach(
          (sort, index) => (sort.name = translated[index])
        )
      );
  }

  subscriptions$ = toObservable(this.listParams).pipe(
    switchMap((listParams) => {
      return this.subscriptionBillingFacade.getSubscriptionList(
        this.PAGE_SIZE,
        listParams.currentPage,
        listParams.sortCode
      );
    }),
    tap((list) => {
      this.getSortOptions();
      this.pagination = {
        currentPage: list?.pagination?.page,
        pageSize: list?.pagination?.count,
        totalPages: list?.pagination?.totalPages,
        totalResults: list?.pagination?.totalCount,
        sort: this.sortMapping[this.sort],
      };
    })
  );

  subscriptions = toSignal<SubscriptionList | null | undefined>(
    this.subscriptions$
  );

  changeSortCode(sortCode: string): void {
    this.listParams.update(() => ({
      currentPage: 0,
      sortCode: this.sortMapping[sortCode],
    }));
  }

  pageChange(page: number): void {
    this.listParams.update((prev) => ({
      ...prev,
      currentPage: page,
    }));
  }
}
