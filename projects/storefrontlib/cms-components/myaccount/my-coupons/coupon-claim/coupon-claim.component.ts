import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  RoutingService,
  CustomerCouponService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Subscription } from 'rxjs';

@Component({
  template: '',
  selector: 'cx-coupon-claim',
})
export class CouponClaimComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    protected couponService: CustomerCouponService,
    protected routingService: RoutingService,
    protected messageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.routingService
      .getRouterState()
      .subscribe((k) => {
        const couponCode = k.state.params.couponCode;
        if (couponCode) {
          this.couponService.claimCustomerCoupon(couponCode);
          this.subscription = this.couponService
            .getClaimCustomerCouponResultSuccess()
            .subscribe((success) => {
              if (success) {
                this.messageService.add(
                  { key: 'myCoupons.claimCustomerCoupon' },
                  GlobalMessageType.MSG_TYPE_CONFIRMATION
                );
              }
              this.routingService.go({ cxRoute: 'coupons' });
            });
        } else {
          this.routingService.go({ cxRoute: 'notFound' });
        }
      })
      .unsubscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
