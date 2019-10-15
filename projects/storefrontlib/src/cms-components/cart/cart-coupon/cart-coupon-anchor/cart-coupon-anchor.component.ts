import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CartCouponComponentService } from '../cart-coupon.component.service';

@Component({
  selector: 'cx-cart-coupon-anchor',
  templateUrl: './cart-coupon-anchor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartCouponAnchorComponent implements OnInit {
  constructor(private cartCouponComponentService: CartCouponComponentService) {}

  ngOnInit() {}

  sendScrollEvent() {
    this.cartCouponComponentService.scrollIn();
  }
}
