import { Component, OnInit } from '@angular/core';
import { CartCouponAnchorService } from './cart-coupon-anchor.service';

@Component({
  selector: 'cx-cart-coupon-anchor',
  templateUrl: './cart-coupon-anchor.component.html',
})
export class CartCouponAnchorComponent implements OnInit {
  constructor(private cartCouponAnchorService: CartCouponAnchorService) {}

  ngOnInit() {}

  sendScrollEvent(anchor: string) {
    this.cartCouponAnchorService.getEventEmit().emit(anchor);
  }
}
