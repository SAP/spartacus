/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  EntitiesModel,
  RoutingService,
  SearchConfig,
  TranslationService,
  useFeatureStyles,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderApproval } from '../../core/model/order-approval.model';
import { OrderApprovalService } from '../../core/services/order-approval.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FeatureDirective } from '@spartacus/core';
import { SortingComponent } from '../../../../../projects/storefrontlib/shared/components/list-navigation/sorting/sorting.component';
import { PaginationComponent } from '../../../../../projects/storefrontlib/shared/components/list-navigation/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { UrlPipe } from '@spartacus/core';
import { TranslatePipe } from '@spartacus/core';
import { CxDatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';
import { MockDatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-order-approval-list',
  templateUrl: './order-approval-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    FeatureDirective,
    SortingComponent,
    PaginationComponent,
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
export class OrderApprovalListComponent implements OnInit {
  constructor(
    protected routing: RoutingService,
    protected orderApprovalService: OrderApprovalService,
    protected translation: TranslationService
  ) {
    useFeatureStyles('a11yShowLabelOfSelect');
  }

  sortLabels$: Observable<{ byDate: string; byOrderNumber: string }>;
  protected PAGE_SIZE = 5;
  sortType: string;

  orderApprovals$: Observable<EntitiesModel<OrderApproval> | undefined>;

  ngOnInit(): void {
    this.fetchApprovalListPage({});
    this.sortLabels$ = combineLatest([
      this.translation.translate('sorting.date'),
      this.translation.translate('sorting.orderNumber'),
    ]).pipe(
      map(([textByDate, textByOrderNumber]) => {
        return {
          byDate: textByDate,
          byOrderNumber: textByOrderNumber,
        };
      })
    );
  }

  changeSortCode(sortCode: string): void {
    const fetchParams: SearchConfig = {
      sort: sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchApprovalListPage(fetchParams);
  }

  pageChange(page: number): void {
    const fetchParams: SearchConfig = {
      sort: this.sortType,
      currentPage: page,
    };
    this.fetchApprovalListPage(fetchParams);
  }

  protected fetchApprovalListPage(searchConfig: SearchConfig): void {
    searchConfig.pageSize = this.PAGE_SIZE;
    this.orderApprovalService.loadOrderApprovals(searchConfig);
    this.orderApprovals$ = this.orderApprovalService.getList(searchConfig);
  }

  goToApprovalDetails(event: any, orderApproval: OrderApproval): void {
    if (event?.target?.nodeName.toLowerCase() !== 'a') {
      this.routing.go({
        cxRoute: 'orderApprovalDetails',
        params: { approvalCode: orderApproval.code },
      });
    }
  }
}
