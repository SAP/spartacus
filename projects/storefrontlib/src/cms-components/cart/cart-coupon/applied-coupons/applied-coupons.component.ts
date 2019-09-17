import { Component, Input, OnInit } from '@angular/core';
import { CartService, Voucher } from '@spartacus/core';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';

@Component({
  selector: 'cx-applied-coupons',
  templateUrl: './applied-coupons.component.html',
})
export class AppliedCouponsComponent implements OnInit {
  @Input()
  vouchers: Voucher[];
  @Input()
  cartIsLoading = false;
  @Input()
  isReadOnly = false;

  iconTypes = ICON_TYPE;

  constructor(private cartService: CartService) {}

  public get sortedVouchers(): Voucher[] {
    this.vouchers = this.vouchers || [];
    return this.vouchers.slice().sort((a, b) => {
      return a.code.localeCompare(b.code);
    });
  }

  removeVoucher(voucherId: string) {
    this.cartService.removeVoucher(voucherId);
  }

  ngOnInit() {}
}
