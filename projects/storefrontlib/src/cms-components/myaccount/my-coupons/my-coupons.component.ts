import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UserService,
  CustomerCouponSearchResult,
  PaginationModel,
} from '@spartacus/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-my-coupons',
  templateUrl: './my-coupons.component.html',
})
export class MyCouponsComponent implements OnInit {
  couponResult$: Observable<CustomerCouponSearchResult>;
  couponsStateLoaded$: Observable<boolean>;

  couponsSubscribeLoading$: Observable<boolean>;
  couponsUnsubscribeLoading$: Observable<boolean>;

  private PAGE_SIZE = 5;
  private sortMapping = {
    byStartDateAsc: 'startDate:asc',
    byStartDateDesc: 'startDate:desc',
    byEndDateAsc: 'endDate:asc',
    byEndDateDesc: 'endDate:desc',
  };
  sort = 'byStartDateAsc';
  sortLabels = {
    byStartDateAsc: 'StartDate(ASCENDING)',
    byStartDateDesc: 'StartDate(DESCENDING)',
    byEndDateAsc: 'EndDate(ASCENDING)',
    byEndDateDesc: 'EndDate(DESCENDING)',
  };
  sortOptions = [
    {
      code: 'byStartDateAsc',
      selected: false,
    },
    {
      code: 'byStartDateDesc',
      selected: false,
    },
    {
      code: 'byEndDateAsc',
      selected: false,
    },
    {
      code: 'byEndDateDesc',
      selected: false,
    },
  ];

  pagination: PaginationModel;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.couponResult$ = this.userService
      .getCustomerCoupons(this.PAGE_SIZE)
      .pipe(
        tap(
          coupons =>
            (this.pagination = {
              currentPage: coupons.pagination.page,
              pageSize: coupons.pagination.count,
              totalPages: coupons.pagination.totalPages,
              totalResults: coupons.pagination.totalCount,
              sort: this.sort,
            })
        )
      );
    this.couponsStateLoaded$ = this.userService.getCustomerCouponsLoaded();

    this.couponsSubscribeLoading$ = this.userService.getSubscribeCustomerCouponResultLoading();
    this.couponsUnsubscribeLoading$ = this.userService.getUnsubscribeCustomerCouponResultLoading();
  }

  sortChange(sort: string): void {
    this.sort = sort;

    this.userService.loadCustomerCoupons(
      this.PAGE_SIZE,
      this.pagination.currentPage,
      this.sortMapping[sort]
    );
  }

  pageChange(page: number): void {
    this.userService.loadCustomerCoupons(
      this.PAGE_SIZE,
      page,
      this.sortMapping[this.sort]
    );
  }

  onNotificationChange({
    couponId,
    notification,
  }: {
    couponId: string;
    notification: boolean;
  }): void {
    if (notification) {
      this.userService.subscribeCustomerCoupon(couponId);
    } else {
      this.userService.unsubscribeCustomerCoupon(couponId);
    }
  }
}
