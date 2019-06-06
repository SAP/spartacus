import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService, CustomerCouponSearchResult } from '@spartacus/core';

@Component({
  selector: 'cx-my-coupons',
  templateUrl: './my-coupons.component.html',
})
export class MyCouponsComponent implements OnInit {
  couponResult$: Observable<CustomerCouponSearchResult>;
  couponsStateLoading$: Observable<boolean>;

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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.couponResult$ = this.userService.getCustomerCoupons(10);
    this.couponsStateLoading$ = this.userService.getCustomerCouponsLoaded();
  }

  sortChange(sort: string): void {
    this.sort = sort;

    // this.interestsService.loadProductInterests(
    //   this.userId,
    //   this.PAGE_SIZE,
    //   0,
    //   this.sortMapping[sort]
    // );
  }

  pageChange(page: number): void {
    page = page + 1;
    // this.interestsService.loadProductInterests(
    //   this.userId,
    //   this.PAGE_SIZE,
    //   page,
    //   this.sortMapping[this.sort]
    // );
  }
}
