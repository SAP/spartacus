import { Component, Input, OnInit } from '@angular/core';
import { Voucher } from '@spartacus/core';
import { CartCouponAnchorService } from './cart-coupon-anchor.service';

@Component({
  selector: 'cx-cart-coupon-anchor',
  templateUrl: './cart-coupon-anchor.component.html',
})
export class CartCouponAnchorComponent implements OnInit {
  @Input()
  vouchers: Voucher[];

  constructor(private cartCouponAnchorService: CartCouponAnchorService) {}

  ngOnInit() {}

  sendScrollEvent(anchor: string) {
    this.cartCouponAnchorService.eventEmit.emit(anchor);
  }
}
