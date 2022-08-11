import { Injectable } from '@angular/core';
import {
  CustomerCoupon,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyCouponsComponentService {
  sortLabels: Observable<{
    byStartDateAsc: string;
    byStartDateDesc: string;
    byEndDateAsc: string;
    byEndDateDesc: string;
  }>;

  protected readonly RELEVANCE = ':relevance';
  protected readonly CUSTOMER_COUPON_CODE = ':customerCouponCode:';

  constructor(
    protected routingService: RoutingService,
    protected translation: TranslationService
  ) {}

  launchSearchPage(coupon: CustomerCoupon): void {
    this.routingService.go(
      {
        cxRoute: 'search',
        params: { query: this.buildSearchParam(coupon) },
      },
      {
        queryParams: {
          couponcode: coupon.couponId,
        },
      }
    );
  }

  private buildSearchParam(coupon: CustomerCoupon): string {
    return coupon.allProductsApplicable
      ? this.RELEVANCE
      : this.RELEVANCE + this.CUSTOMER_COUPON_CODE + coupon.couponId;
  }

  getSortLabels(): Observable<{
    byStartDateAsc: string;
    byStartDateDesc: string;
    byEndDateAsc: string;
    byEndDateDesc: string;
  }> {
    return combineLatest([
      this.translation.translate('myCoupons.startDateAsc'),
      this.translation.translate('myCoupons.startDateDesc'),
      this.translation.translate('myCoupons.endDateAsc'),
      this.translation.translate('myCoupons.endDateDesc'),
    ]).pipe(
      map(
        ([
          textByStartDateAsc,
          textByStartDateDesc,
          textByEndDateAsc,
          textByEndDateDesc,
        ]) => {
          return {
            byStartDateAsc: textByStartDateAsc,
            byStartDateDesc: textByStartDateDesc,
            byEndDateAsc: textByEndDateAsc,
            byEndDateDesc: textByEndDateDesc,
          };
        }
      )
    );
  }
}
