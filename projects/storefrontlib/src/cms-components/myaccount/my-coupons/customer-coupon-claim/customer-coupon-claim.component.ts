import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  RoutingService,
  UserService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './customer-coupon-claim.component.html',
  selector: 'cx-customer-coupon-claim',
})
export class CustomerCouponClaimComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private routingService: RoutingService,
    private messageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.routingService
      .getRouterState()
      .subscribe(k =>
        this.userService.claimCustomerCoupon(k.state.params.couponCode)
      )
      .unsubscribe();

    this.subscription = this.userService
      .getClaimCustomerCouponResultSuccess()
      .subscribe(success => {
        if (success) {
          this.messageService.add(
            { key: 'myCoupons.claimCustomerCoupon' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        }
      });

    this.routingService.go('/my-account/coupons');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
