/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CartVoucherFacade, Voucher } from '@spartacus/cart/base/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { NgIf, NgFor } from '@angular/common';
import { IconComponent } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-applied-coupons',
  templateUrl: './applied-coupons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, IconComponent, TranslatePipe, MockTranslatePipe],
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
      return a.code && b.code ? a.code.localeCompare(b.code) : 0;
    });
  }

  removeVoucher(voucherId: string) {
    this.cartVoucherService.removeVoucher(voucherId);
  }
}
