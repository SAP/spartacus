/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Customer360CouponList } from '@spartacus/asm/customer-360/root';
import { UserIdService } from '@spartacus/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  ActiveCartFacade,
  CartVoucherFacade,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
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
  currentCartId: string | undefined;
  userId = '';
  createcart: string | undefined;
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
    },
  ];

  constructor(
    protected context: Customer360SectionContext<Customer360CouponList>,
    protected cartVoucherService: CartVoucherFacade,
    protected userIdService: UserIdService,
    protected multiCartFacade: MultiCartFacade,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  ngOnInit(): void {
    this.userIdService.getUserId().subscribe((user) => {
      this.userId = user ?? '';
    });
    this.activeCartFacade.requireLoadedCart().subscribe((cart) => {
      this.currentCartId = cart?.code;
    });
    this.fetchCoupons();
  }

  get errorAlert$(): Observable<boolean> {
    return this.showErrorAlert$.asObservable();
  }

  fetchCoupons() {
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
      }),
      catchError(() => {
        this.showErrorAlert$.next(true);
        return of([]);
      })
    );
  }
  closeErrorAlert(): void {
    this.showErrorAlert$.next(false);
  }

  applyCouponToCustomer(entry: CouponEntry) {
    this.cartVoucherService.addVoucher(entry?.code, this.currentCartId);
    this.fetchCoupons;
  }

  removeCouponToCustomer(entry: CouponEntry) {
    this.cartVoucherService.removeVoucher(entry?.code, this.currentCartId);
    this.fetchCoupons;
  }
}
