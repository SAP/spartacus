/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { isNotUndefined, TranslationService } from '@spartacus/core';
import {
  OrderReturnRequestFacade,
  ReturnRequestList,
} from '@spartacus/order/root';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { SortingComponent } from '../../../../projects/storefrontlib/shared/components/list-navigation/sorting/sorting.component';
import { PaginationComponent } from '../../../../projects/storefrontlib/shared/components/list-navigation/pagination/pagination.component';
import { FeatureDirective } from '../../../../projects/core/src/features-config/directives/feature.directive';
import { RouterLink } from '@angular/router';
import { UrlPipe } from '../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { TranslatePipe } from '../../../../projects/core/src/i18n/translate.pipe';
import { CxDatePipe } from '../../../../projects/core/src/i18n/date.pipe';
import { MockTranslatePipe } from '../../../../projects/core/src/i18n/testing/mock-translate.pipe';
import { MockDatePipe } from '../../../../projects/core/src/i18n/testing/mock-date.pipe';

@Component({
    selector: 'cx-order-return-request-list',
    templateUrl: './order-return-request-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        SortingComponent,
        PaginationComponent,
        FeatureDirective,
        NgFor,
        RouterLink,
        AsyncPipe,
        UrlPipe,
        TranslatePipe,
        CxDatePipe,
        MockTranslatePipe,
        MockDatePipe,
    ],
})
export class OrderReturnRequestListComponent implements OnDestroy {
  constructor(
    private returnRequestService: OrderReturnRequestFacade,
    private translation: TranslationService
  ) {}

  private PAGE_SIZE = 5;
  sortType: string;

  returnRequests$: Observable<ReturnRequestList | undefined> =
    this.returnRequestService.getOrderReturnRequestList(this.PAGE_SIZE).pipe(
      tap((requestList: ReturnRequestList | undefined) => {
        if (requestList?.pagination?.sort) {
          this.sortType = requestList.pagination.sort;
        }
      })
    );

  /**
   * When "Order Return" feature is enabled, this component becomes one tab in
   * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
   */
  tabTitleParam$: Observable<number> = this.returnRequests$.pipe(
    map((returnRequests) => returnRequests?.pagination?.totalResults),
    filter(isNotUndefined),
    take(1)
  );

  ngOnDestroy(): void {
    this.returnRequestService.clearOrderReturnRequestList();
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchReturnRequests(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    this.fetchReturnRequests(event);
  }

  getSortLabels(): Observable<{ byDate: string; byRMA: string }> {
    return combineLatest([
      this.translation.translate('sorting.date'),
      this.translation.translate('sorting.rma'),
    ]).pipe(
      map(([textByDate, textByRma]) => {
        return {
          byDate: textByDate,
          byRMA: textByRma,
        };
      })
    );
  }

  private fetchReturnRequests(event: {
    sortCode: string;
    currentPage: number;
  }): void {
    this.returnRequestService.loadOrderReturnRequestList(
      this.PAGE_SIZE,
      event.currentPage,
      event.sortCode
    );
  }
}
