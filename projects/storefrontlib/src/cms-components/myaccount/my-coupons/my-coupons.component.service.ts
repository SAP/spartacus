import { Injectable } from '@angular/core';
import { CustomerCoupon, RoutingService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class MyCouponsComponentService {
  protected readonly RELEVANCE = ':relevance';
  protected readonly CUSTOMER_COUPON_CODE = ':customerCouponCode:';
  constructor(protected routingService: RoutingService) {}

  launchSearchPage(coupon: CustomerCoupon): void {
    this.routingService.go(
      {
        cxRoute: 'search',
        params: { query: this.buildSearchParam(coupon) },
      },
      { couponcode: coupon.couponId }
    );
  }

  private buildSearchParam(coupon: CustomerCoupon): string {
    return coupon.allProductsApplicable
      ? this.RELEVANCE
      : this.RELEVANCE + this.CUSTOMER_COUPON_CODE + coupon.couponId;
  }
}
