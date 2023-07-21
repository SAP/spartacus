/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import {
  Customer360CouponList,
  Customer360Facade,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { UserIdService } from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription, combineLatest, of } from 'rxjs';
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
export class AsmCustomerCouponComponent implements OnInit,OnDestroy {
  showErrorAlert$ = new BehaviorSubject<boolean>(false);
  currentCartId: string | undefined;
  userId = '';
  createcart: string | undefined;
  entries$: Observable<Array<CouponEntry>>;
  subscription = new Subscription();
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
    protected activeCartFacade: ActiveCartFacade,
    protected customer360Facade: Customer360Facade,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userIdService.getUserId().subscribe((user) => {
        this.userId = user ?? '';
      })
    );
    this.subscription.add(
    this.activeCartFacade.requireLoadedCart().subscribe((cart) => {
      this.currentCartId = cart?.code;
    }));
    this.fetchCoupons();

  }

  get errorAlert$(): Observable<boolean> {
    return this.showErrorAlert$.asObservable();
  }

  fetchCoupons() {
    this.entries$ = combineLatest([this.context.data$]).pipe(
      map(([data]) => {
        let entries: Array<CouponEntry> = [];
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

  refreshComponent() {
    this.entries$ = this.customer360Facade
      .get360Data([
        {
          requestData: { type: Customer360Type.COUPON_LIST }
        },
      ])
      .pipe(
        map((response) => {
          const couponList = response?.value?.find(
            (item) => item.type === Customer360Type.COUPON_LIST
          ) as Customer360CouponList;
          const newEntries: Array<CouponEntry> = [];
          if (couponList.coupons) {
            couponList.coupons.forEach((coupon) => {
              newEntries.push({
                ...coupon,
                applied: coupon.applied,
                code: coupon.code,
                name: coupon.name,
              });
            });
          }
          return newEntries;
        }),
        catchError(() => {
          this.showErrorAlert$.next(true);
          return of([]);
        })
      );
  }

  refreshComponentAfterCouponApplied(){
  const subscriptionForCouponApplied = new Subscription();
  subscriptionForCouponApplied.add(
    this.cartVoucherService.getAddVoucherResultSuccess().subscribe((status)=>{
      if(status){
        this.refreshComponent();
        subscriptionForCouponApplied.unsubscribe();
      }
    })
  );
}

refreshComponentAfterCouponRemoved(){
  const subscriptionForCouponRemoved = new Subscription();
  subscriptionForCouponRemoved.add(
    this.cartVoucherService.getRemoveVoucherResultSuccess().subscribe((status)=>{
      if(status){
        this.refreshComponent();
        subscriptionForCouponRemoved.unsubscribe();
      }
    })
  );
}

  applyCouponToCustomer(entry: CouponEntry) {
    this.cartVoucherService.addVoucher(entry?.code, this.currentCartId);
    this.refreshComponentAfterCouponApplied();
  }

  removeCouponToCustomer(entry: CouponEntry) {
    this.cartVoucherService.removeVoucher(entry?.code, this.currentCartId);
    this.refreshComponentAfterCouponRemoved();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
