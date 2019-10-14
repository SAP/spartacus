import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CartCouponAnchorService } from './cart-coupon-anchor.service';

@Component({
  selector: 'cx-cart-coupon-anchor',
  templateUrl: './cart-coupon-anchor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartCouponAnchorComponent implements OnInit {
  constructor(private cartCouponAnchorService: CartCouponAnchorService) {}

  ngOnInit() {}

  sendScrollEvent() {
    this.cartCouponAnchorService.getEventEmit().emit();
  }
}
