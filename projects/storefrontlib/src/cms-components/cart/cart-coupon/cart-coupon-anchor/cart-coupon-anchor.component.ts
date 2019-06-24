import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Voucher } from '@spartacus/core';

@Component({
  selector: 'cx-cart-coupon-anchor',
  templateUrl: './cart-coupon-anchor.component.html',
})
export class CartCouponAnchorComponent implements OnInit {
  @Input()
  vouchers: Voucher[];
  @Output()
  anchor = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
  scrollToAnchor(anchor: string) {
    this.anchor.emit(anchor);
    // const anchorElement = this.element.nativeElement.querySelector(anchor);
    // console.log(anchorElement);
    // console.log(this.element.nativeElement);
    // if (anchorElement) {
    //   anchorElement.scrollIntoView({ behavior: 'smooth' });
    // }
  }
}
