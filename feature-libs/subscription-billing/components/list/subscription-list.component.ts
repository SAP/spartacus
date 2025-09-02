/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import {
  I18nModule,
  RoutingService,
  TranslationService,
  UrlModule,
} from '@spartacus/core';
import { ListNavigationModule, SpinnerModule } from '@spartacus/storefront';
import {
  SubscriptionBillingFacade,
  SubscriptionList,
} from '@spartacus/subscription-billing/root';
import { combineLatest, map, Observable, switchMap } from 'rxjs';

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

  PAGE_SIZE = 5;

  listParams: WritableSignal<{
    sortCode: string | undefined;
    currentPage: number;
  }> = signal({
    sortCode: undefined,
    currentPage: 0,
  });

  getSortLabels(): Observable<{ byDate: string; byOrderNumber: string }> {
    return combineLatest([
      this.translationService.translate(
        'subscriptionList.sorts.documentNumber'
      ),
      this.translationService.translate('sorting.orderNumber'),
    ]).pipe(
      map(([textByDate, textByOrderNumber]) => {
        return {
          byDate: textByDate,
          byOrderNumber: textByOrderNumber,
        };
      })
    );
  }

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

  sortCode: Signal<string> = computed(() => {
    return this.subscriptions()?.pagination?.sort || '';
  });
}
