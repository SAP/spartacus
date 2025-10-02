/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { MyAccountV2OrderHistoryService } from '@spartacus/order/core';
import { OrderHistoryListView } from '@spartacus/order/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderHistoryComponent } from '../order-history.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MyAccountV2OrderConsolidatedInformationComponent } from './consolidated-information/my-account-v2-order-consolidated-information.component';
import { PaginationComponent } from '../../../../../projects/storefrontlib/shared/components/list-navigation/pagination/pagination.component';
import { SpinnerComponent } from '../../../../../projects/storefrontlib/shared/components/spinner/spinner.component';
import { UrlPipe } from '../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { CxDatePipe } from '../../../../../projects/core/src/i18n/date.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';
import { MockDatePipe } from '../../../../../projects/core/src/i18n/testing/mock-date.pipe';

@Component({
  selector: 'cx-my-account-v2-order-history',
  templateUrl: './my-account-v2-order-history.component.html',
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    MyAccountV2OrderConsolidatedInformationComponent,
    PaginationComponent,
    RouterLinkActive,
    SpinnerComponent,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
    CxDatePipe,
    MockTranslatePipe,
    MockDatePipe,
  ],
})
export class MyAccountV2OrderHistoryComponent extends OrderHistoryComponent {
  protected service = inject(MyAccountV2OrderHistoryService);
  protected readonly ITEMS_PER_PAGE = 5;
  isLoaded$ = new BehaviorSubject<boolean>(false);
  orders$: Observable<OrderHistoryListView | undefined> = this.service
    .getOrderHistoryList(this.ITEMS_PER_PAGE)
    .pipe(
      tap((orders: OrderHistoryListView | undefined) => {
        this.isLoaded$.next(true);
        super.setOrderHistoryParams(orders);
      })
    );
  pageChange(page: number): void {
    this.isLoaded$.next(false);
    this.service.clearOrderList();
    super.pageChange(page);
  }
}
