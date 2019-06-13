import { Component, OnInit } from '@angular/core';
import {
  RoutingService,
  UserService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';

@Component({
  templateUrl: './customer-coupon-claim.component.html',
  selector: 'cx-customer-coupon-claim',
})
export class CustomerCouponClaimComponent implements OnInit {
  couponCode: string;

  constructor(
    private userService: UserService,
    private routingService: RoutingService,
    private messageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.routingService
      .getRouterState()
      .subscribe(k => (this.couponCode = k.state.params.couponCode));

    if (this.couponCode) {
      this.userService.claimCustomerCoupon(this.couponCode);
      this.userService
        .getClaimCustomerCouponResultSuccess()
        .subscribe(success => {
          if (success && this.couponCode) {
            this.messageService.add(
              { key: 'myCoupons.claimCustomerCoupon' },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
          }
        });

      this.routingService.go('/my-account/coupons');
    } else {
      this.routingService.go('/not-found');
    }
  }
}
