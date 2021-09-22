import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CartVoucherFacade } from '@spartacus/cart/main/root';
import { Voucher } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
@Component({
  selector: 'cx-applied-coupons',
  templateUrl: './applied-coupons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppliedCouponsComponent {
  @Input()
  vouchers: Voucher[];
  @Input()
  cartIsLoading = false;
  @Input()
  isReadOnly = false;

  iconTypes = ICON_TYPE;

  constructor(protected cartVoucherService: CartVoucherFacade) {}

  public get sortedVouchers(): Voucher[] {
    this.vouchers = this.vouchers || [];
    return this.vouchers.slice().sort((a, b) => {
      return a.code.localeCompare(b.code);
    });
  }

  removeVoucher(voucherId: string) {
    this.cartVoucherService.removeVoucher(voucherId);
  }
}
