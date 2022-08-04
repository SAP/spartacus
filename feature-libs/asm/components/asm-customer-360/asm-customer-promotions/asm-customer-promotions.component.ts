import { Component } from "@angular/core";
import { CouponFragment, PromotionFragment, CustomerCouponFragment } from "./asm-customer-promotions.model";

@Component({
  selector: 'cx-asm-customer-promotions',
  templateUrl: './asm-customer-promotions.component.html',
})
export class AsmCustomerPromotionsComponent {
  rawCouponFragment = {
    type: 'coupons',
    items: [
      {
        code: 'This is a 20% off coupon',
        name: 'This is a 20% off coupon and you are gonna be so happy with these savings',
        couponApplied: false,
      },
      {
        code: 'This is a 1% off coupon',
        name: "This is a 1% off coupon and you won't really notice I'm here",
        couponApplied: true,
      },
    ],
  };

  rawPromotionFragment = {
    type: 'promotions',
    items: [
      {
        name: 'This is a 20% off coupon',
        firedMessage: 'This is a 20% off coupon and you are gonna be so happy with these savings',
        fired: true,
      },
      {
        name: 'This is a 1% off coupon',
        firedMessage: "This is a 1% off coupon and you won't really notice I'm here",
        fired: false,
      },
    ],
  };

  rawCustomerCouponFragment = {
    type: 'customerCoupons',
    items: [
      {
        code: 'This is a 20% off coupon',
        name: 'This is a 20% off coupon and you are gonna be so happy with these savings',
        couponApplied: true,
      },
      {
        code: 'This is a 1% off coupon',
        name: "This is a 1% off coupon and you won't really notice I'm here",
        couponApplied: false,
      },
      {
        code: 'This is a 500% off coupon',
        name: 'This is a 500% off coupon and you are gonna be so happy with these earnings',
        couponApplied: false,
      },
      {
        code: 'This is a 0% off coupon',
        name: "This is a 0% off coupon and you literally won't notice I'm here",
        couponApplied: true,
      },
      {
        code: 'This is a 100% off coupon',
        name: 'It\'s free, what else do you want?',
        couponApplied: false,
      },
      {
        code: 'This is a 66.666666% off coupon',
        name: "This is the devil\'s discount. By accepting this, you accept Satan as your lord and savior :)",
        couponApplied: true,
      },
    ],
  };

  uiFragments = [
    new CouponFragment(this.rawCouponFragment.items),
    new PromotionFragment(this.rawPromotionFragment.items),
    new CustomerCouponFragment(this.rawCustomerCouponFragment.items),
  ];
}
