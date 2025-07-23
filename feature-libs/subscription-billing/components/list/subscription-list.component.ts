/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { combineLatest, map } from 'rxjs';

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
  listParams: Signal<{
    sortCode: string | undefined;
    currentPage: number;
  }> = computed(() => {
    return { sortCode: undefined, currentPage: 0 };
  });
  subscriptions = toSignal<SubscriptionList | null | undefined>(
    this.subscriptionBillingFacade.getSubscriptionList(
      this.PAGE_SIZE,
      this.listParams().currentPage,
      this.listParams().sortCode
    )
  );
  sortCode: Signal<string> = computed(() => {
    return this.subscriptions()?.pagination?.sort || '';
  });

  sortLabels: Signal<{ byId: string } | undefined> = toSignal(
    combineLatest([
      this.translationService.translate('subscriptionList.id'),
      // can add more sort orders based on API
    ]).pipe(
      map(([textById]) => {
        return {
          byId: textById,
        };
      })
    )
  );
  changeSortCode(sortCode: string): void {
    this.listParams = computed(() => {
      return {
        currentPage: 0,
        sortCode: sortCode,
      };
    });
  }
  pageChange(page: number): void {
    this.listParams = computed(() => {
      return {
        currentPage: page,
        sortCode: this.sortCode(),
      };
    });
  }
}
