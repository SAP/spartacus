import { Component, OnInit } from '@angular/core';
import { RoutingService, UserService } from '@spartacus/core';

@Component({
  templateUrl: './customer-coupon-claim.component.html',
  selector: 'cx-customer-coupon-claim'
})
export class CustomerCouponClaimComponent implements OnInit {

  constructor(
    private userService: UserService,
    private routingService: RoutingService
  ) { }

  ngOnInit(): void {

    console.log(1111);
    this.routingService.getRouterState().subscribe(k => {
      this.userService.claimCustomerCoupon(k.state.params.couponCode);
    });
    this.userService.getClaimCustomerCouponResultSuccess().subscribe(success => {
      if (success) {
        this.routingService.go({ cxRoute: 'myCoupons' });
      }
    });

  }
}
