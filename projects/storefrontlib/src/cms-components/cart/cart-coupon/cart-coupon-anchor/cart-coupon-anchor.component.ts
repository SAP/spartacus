import { Component, Input, OnInit } from '@angular/core';
import { Voucher } from '@spartacus/core';

@Component({
  selector: 'cx-cart-coupon-anchor',
  templateUrl: './cart-coupon-anchor.component.html',
})
export class CartCouponAnchorComponent implements OnInit {
  @Input()
  vouchers: Voucher[];

  constructor() {}

  ngOnInit() {}
  scrollToAnchor(anchor: string) {
    const element = document.querySelector(anchor);
    console.log(element);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
