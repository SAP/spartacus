import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import {
  CustomerCouponService,
  CustomerCouponSearchResult,
  PaginationModel,
  TranslationService,
} from '@spartacus/core';
import { tap, map } from 'rxjs/operators';


@Component({
  selector: 'cx-my-coupons',
  templateUrl: './my-coupons.component.html',
})
export class MyCouponsComponent implements OnInit {
  couponResult$: Observable<CustomerCouponSearchResult>;
  couponsStateLoading$: Observable<boolean>;

  couponsSubscribeLoading$: Observable<boolean>;
  couponsUnsubscribeLoading$: Observable<boolean>;

  private PAGE_SIZE = 10;
  private sortMapping = {
    byStartDateAsc: 'startDate:asc',
    byStartDateDesc: 'startDate:desc',
    byEndDateAsc: 'endDate:asc',
    byEndDateDesc: 'endDate:desc',
  };
  sort = 'byStartDateAsc';

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

  constructor(private couponService: CustomerCouponService, private translation: TranslationService) {}

  ngOnInit() {
    this.couponService.loadCustomerCoupons(this.PAGE_SIZE);
    this.couponResult$ = this.couponService
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
    this.couponsStateLoading$ = this.couponService.getCustomerCouponsLoading();
    this.couponsSubscribeLoading$ = this.couponService.getSubscribeCustomerCouponResultLoading();
    this.couponsUnsubscribeLoading$ = this.couponService.getUnsubscribeCustomerCouponResultLoading();
  }

  getSortLabels(): Observable<{ byStartDateAsc: string; byStartDateDesc: string; byEndDateAsc: string; byEndDateDesc: string }> {
    return combineLatest([
      this.translation.translate('myCoupons.startDateAsc'),
      this.translation.translate('myCoupons.startDateDesc'),
      this.translation.translate('myCoupons.endDateAsc'),
      this.translation.translate('myCoupons.endDateDesc'),
    ]).pipe(
      map(([textByStartDateAsc, textByStartDateDesc,textByEndDateAsc,textByEndDateDesc]) => {
        return {
          byStartDateAsc: textByStartDateAsc,
          byStartDateDesc: textByStartDateDesc,
          byEndDateAsc: textByEndDateAsc,
          byEndDateDesc: textByEndDateDesc,
        };
      })
    );
  }

  sortChange(sort: string): void {
    this.sort = sort;

    this.couponService.loadCustomerCoupons(
      this.PAGE_SIZE,
      this.pagination.currentPage,
      this.sortMapping[sort]
    );
  }

  pageChange(page: number): void {
    this.couponService.loadCustomerCoupons(
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
      this.couponService.subscribeCustomerCoupon(couponId);
    } else {
      this.couponService.unsubscribeCustomerCoupon(couponId);
    }
  }
}
