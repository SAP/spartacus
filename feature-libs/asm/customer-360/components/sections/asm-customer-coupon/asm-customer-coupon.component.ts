/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Customer360CouponList } from '@spartacus/asm/customer-360/root';
// import { UrlCommand } from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CartVoucherFacade,
} from '@spartacus/cart/base/root';
// import {
//   CustomerTableColumn,
//   CustomerTableTextAlign,
// } from '../../asm-customer-table/asm-customer-table.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { CouponEntry } from './asm-customer-coupon.model';
import { CustomerTableColumn } from '../../asm-customer-table/asm-customer-table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-coupon',
  templateUrl: './asm-customer-coupon.component.html',
})
export class AsmCustomerCouponComponent implements OnInit {
  entries$: Observable<Array<CouponEntry>>;
  entryPages: Array<Array<CouponEntry>>;
  @Input() pageSize: number;
  columns: Array<CustomerTableColumn> = [
    {
      property: 'applied',
      i18nTextKey: 'customer360.coupons.applied',
    },
    {
      property: 'code',
      i18nTextKey: 'customer360.coupons.code',
    },
    {
      property: 'name',
      i18nTextKey: 'customer360.coupons.name',
    }
  ];

  constructor(
    protected context: Customer360SectionContext<Customer360CouponList>,
    protected cartVoucherService: CartVoucherFacade
  ) {}

  ngOnInit(): void {
    let entries: Array<CouponEntry> = [];

    this.entries$ = combineLatest([this.context.data$]).pipe(
      map(([data]) => {
        entries = [];
        data.coupons.forEach((coupon) => {
          entries.push({
            ...coupon,
            applied: coupon.applied,
            code: coupon.code,
            name: coupon.name,
          });
        });
        return entries;
      })
    );
  }

  applyCoupon(code: string,cartId: string){
    this.cartVoucherService.addVoucher(code,cartId);
  }

  removeCoupon(code: string,cartId: string){
    this.cartVoucherService.removeVoucher(code,cartId);
  }

  // itemSelected(entry: ActivityEntry | undefined): void {
  //   if (entry) {
  //     let urlCommand: UrlCommand;
  //     if (entry.type?.code === TypeCodes.SavedCart) {
  //       urlCommand = {
  //         cxRoute: 'savedCartsDetails',
  //         params: { savedCartId: entry?.associatedTypeId },
  //       };
  //     } else if (entry.type?.code === TypeCodes.Cart) {
  //       urlCommand = {
  //         cxRoute: 'cart',
  //       };
  //     } else if (entry.type?.code === TypeCodes.Order) {
  //       urlCommand = {
  //         cxRoute: 'orderDetails',
  //         params: { code: entry?.associatedTypeId },
  //       };
  //     } else if (entry.type?.code === TypeCodes.Ticket) {
  //       urlCommand = {
  //         cxRoute: 'supportTicketDetails',
  //         params: { ticketCode: entry?.associatedTypeId },
  //       };
  //     }
  //     if (urlCommand) {
  //       this.context.navigate$.next(urlCommand);
  //     }
  //   }
  // }
}
