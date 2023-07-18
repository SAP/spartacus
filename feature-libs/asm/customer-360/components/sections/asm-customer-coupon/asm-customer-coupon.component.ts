/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Customer360CouponList } from '@spartacus/asm/customer-360/root';
// import { UrlCommand } from '@spartacus/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
  showErrorAlert$ = new BehaviorSubject<boolean>(false);
  // showErrorAlert$ = false;
  entries$: Observable<Array<CouponEntry>>;
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
        // throw new Error("Error");
        });
        return entries;
      }),
      catchError(() => {
        this.showErrorAlert$.next(true);
        return of([]);
      })
    );
  }

  get errorAlert$(): Observable<boolean> {
    return this.showErrorAlert$.asObservable();
  }

  closeErrorAlert(): void {
    this.showErrorAlert$.next(false);
  }
}
