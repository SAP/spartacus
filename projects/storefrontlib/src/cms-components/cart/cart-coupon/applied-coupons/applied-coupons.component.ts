import { Component, Input, OnInit } from '@angular/core';
import { CartService, Voucher } from '@spartacus/core';

@Component({
  selector: 'cx-applied-coupons',
  templateUrl: './applied-coupons.component.html',
})
export class AppliedCouponsComponent implements OnInit {
  userId: string;

  @Input()
  vouchers: Voucher[];
  @Input()
  isReadOnly = false;
  @Input()
  cartIsLoading = false;

  constructor(private cartService: CartService) {}

  removeVoucher(voucherId: string) {
    this.cartService.removeVoucher(voucherId);
  }

  ngOnInit() {}
}
