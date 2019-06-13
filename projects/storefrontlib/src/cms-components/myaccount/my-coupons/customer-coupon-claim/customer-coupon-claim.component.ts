import { Component, OnInit } from '@angular/core';
import { RoutingService, UserService } from '@spartacus/core';

@Component({
  templateUrl: './customer-coupon-claim.component.html',
  selector: 'cx-customer-coupon-claim',
})
export class CustomerCouponClaimComponent implements OnInit {
  couponCode: string;

  constructor(
    private userService: UserService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.routingService
      .getRouterState()
      .subscribe(k => (this.couponCode = k.state.params.couponCode));
    this.userService.claimCustomerCoupon(this.couponCode);
    this.userService
      .getClaimCustomerCouponResultSuccess()
      .subscribe(success => {
        if (success) {
          this.routingService.go('/my-account/coupons');
        }
      });
  }
}
