import { Component, OnInit } from '@angular/core';
import {
  RoutingService,
  CustomerCouponService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  templateUrl: './coupon-claim.component.html',
  selector: 'cx-coupon-claim',
})
export class CouponClaimComponent implements OnInit {
  subscription: Subscription;

  constructor(
    private couponService: CustomerCouponService,
    private routingService: RoutingService,
    private messageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.routingService.getRouterState(),
      this.couponService.getClaimCustomerCouponResultSuccess(),
    ])
      .subscribe(([routingState, claimSucccess]) => {
        const couponCode = routingState.state.params.couponCode;
        if (couponCode) {
          this.couponService.claimCustomerCoupon(couponCode);
          if (claimSucccess) {
            this.messageService.add(
              { key: 'myCoupons.claimCustomerCoupon' },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
          }
          this.routingService.go({ cxRoute: 'coupons' });
        } else {
          this.routingService.go({ cxRoute: 'notFound' });
        }
      })
      .unsubscribe();
  }
}
