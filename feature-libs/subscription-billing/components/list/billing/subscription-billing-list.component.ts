/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  CxDatePipe,
  EventService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  CustomFormValidators,
  DatePickerService,
  ICON_TYPE,
  IconComponent,
  LAUNCH_CALLER,
  LaunchDialogService,
  PaginationComponent,
  SortingComponent,
  SpinnerComponent,
} from '@spartacus/storefront';
import {
  GetSubscriptionBillsListReloadEvent,
  SubscriptionBill,
  SubscriptionBillingFacade,
  SubscriptionBillsList,
} from '@spartacus/subscription-billing/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-billing-list',
  templateUrl: './subscription-billing-list.component.html',
  imports: [
    NgIf,
    NgFor,
    SpinnerComponent,
    TranslatePipe,
    PaginationComponent,
    UrlPipe,
    RouterLink,
    CxDatePipe,
    AsyncPipe,
    SortingComponent,
    IconComponent,
  ],
  providers: [CxDatePipe],
})
export class SubscriptionBillingListComponent {
  protected subscriptionBillsFacade = inject(SubscriptionBillingFacade);
  protected datePickerService = inject(DatePickerService);
  protected launchDialogService = inject(LaunchDialogService);
  protected eventService = inject(EventService);
  protected cxDatePipe = inject(CxDatePipe);

  minDate: string | null = null;
  maxDate: string | null = null;
  DATE_FILTER_PARAM = 'startAt:%s:endAt:%s';
  PAGE_SIZE = 5;
  listParams: {
    sortCode?: string;
    pageNumber?: number;
    dateFilter?: string;
  } = {
    sortCode: undefined,
    pageNumber: 0,
    dateFilter: undefined,
  };
  iconTypes = ICON_TYPE;

  constructor() {
    this.billsDateFilterForm.addValidators(
      CustomFormValidators.dateRange('from', 'to', (value: string) =>
        this.datePickerService.getDate(value)
      ) as ValidatorFn
    );
    this.launchDialogService.dialogClose.subscribe((data) => {
      if (typeof data === 'object' && data !== null) {
        this.minDate = data.minDate;
        this.maxDate = data.maxDate;
        this.onDateRangeSelection();
      }
    });
  }

  billingList$: Observable<SubscriptionBillsList | undefined> =
    this.subscriptionBillsFacade.getSubscriptionBillsList(this.PAGE_SIZE);

  billsDateFilterForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
  });

  onSortCodeChange(sortCode: string): void {
    this.listParams = {
      ...this.listParams,
      sortCode,
      pageNumber: 0,
    };
    this.getSubscriptionBillsList();
  }

  onPageChange(pageNumber: string): void {
    this.listParams = {
      ...this.listParams,
      pageNumber: Number(pageNumber),
    };
    this.getSubscriptionBillsList();
  }

  /**
   * @deprecated - Selection of date range and relevant methods have been moved to DateRangeModalComponent
   */
  onFilterDateChange(): void {
    this.minDate = this.billsDateFilterForm.controls.from.value;
    this.maxDate = this.billsDateFilterForm.controls.to.value;

    this.billsDateFilterForm.controls['from'].updateValueAndValidity();
    this.billsDateFilterForm.controls['to'].updateValueAndValidity();
  }

  private getSubscriptionBillsList(): void {
    const { pageNumber, sortCode, dateFilter } = this.listParams;
    this.billingList$ = this.subscriptionBillsFacade.getSubscriptionBillsList(
      this.PAGE_SIZE,
      pageNumber,
      sortCode,
      dateFilter
    );
  }

  /**
   * @deprecated - Selection of date range and relevant methods have been moved to DateRangeModalComponent
   */
  onResetFilterDate(): void {
    if (this.minDate || this.maxDate) {
      this.billsDateFilterForm.reset();
      this.minDate = null;
      this.maxDate = null;
      this.listParams = {
        ...this.listParams,
        dateFilter: undefined,
        pageNumber: 0,
      };
      this.getSubscriptionBillsList();
    }
  }

  /**
   * @deprecated - Selection of date range and relevant methods have been moved to DateRangeModalComponent
   */
  onDateFilterSubmit(): void {
    if (this.minDate && this.maxDate && this.billsDateFilterForm.valid) {
      const dateFilterParam = this.buildDateFilter(this.minDate, this.maxDate);
      this.listParams = {
        ...this.listParams,
        dateFilter: dateFilterParam,
        pageNumber: 0,
      };
      this.getSubscriptionBillsList();
    }
  }

  private buildDateFilter(startDate: string, endDate: string): string {
    return this.DATE_FILTER_PARAM.replace('%s', startDate).replace(
      '%s',
      endDate
    );
  }

  onResetDateRange(): void {
    if (this.minDate || this.maxDate) {
      this.minDate = null;
      this.maxDate = null;
      this.listParams = {
        ...this.listParams,
        dateFilter: undefined,
        pageNumber: 0,
      };
      this.getSubscriptionBillsList();
    }
  }

  onDateRangeSelection(): void {
    if (this.minDate && this.maxDate) {
      const dateFilterParam = this.buildDateFilter(this.minDate, this.maxDate);
      this.listParams = {
        ...this.listParams,
        dateFilter: dateFilterParam,
        pageNumber: 0,
      };
    } else {
      this.listParams = {
        ...this.listParams,
        dateFilter: undefined,
        pageNumber: 0,
      };
    }
    this.eventService.dispatch({}, GetSubscriptionBillsListReloadEvent);
    this.getSubscriptionBillsList();
  }

  getDateRangeFieldValue(): string {
    if (this.minDate && this.maxDate) {
      const fromDate = this.cxDatePipe.transform(this.minDate);
      const toDate = this.cxDatePipe.transform(this.maxDate);
      return `${fromDate} - ${toDate}`;
    } else {
      return '';
    }
  }

  launchDateRangeModal(): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.DATE_RANGE_MODAL,
      undefined,
      {
        minDate: this.minDate,
        maxDate: this.maxDate,
      }
    );
  }

  getTrailingSubscriptionItems(result: SubscriptionBill) {
    let billItems = '';
    result.items?.slice(1).forEach((bill, index) => {
      billItems = billItems + bill.productName;
      if (result?.items?.length && index !== result.items.length - 2) {
        billItems = billItems + ', ';
      }
    });
    return billItems;
  }
}
