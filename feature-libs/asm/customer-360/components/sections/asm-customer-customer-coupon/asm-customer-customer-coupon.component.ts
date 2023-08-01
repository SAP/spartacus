/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Customer360CouponList,
  Customer360CustomerCouponList,
  Customer360Facade,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { CustomerCouponService, UserIdService } from '@spartacus/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  of,
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActiveCartFacade, CartVoucherFacade } from '@spartacus/cart/base/root';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { CustomerCouponEntry } from './asm-customer-customer-coupon.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-coupon',
  templateUrl: './asm-customer-customer-coupon.component.html',
})
export class AsmCustomerCustomerCouponComponent implements OnInit, OnDestroy {
  showErrorAlert$ = new BehaviorSubject<boolean>(false);
  showErrorAlertForApplyAction$ = new BehaviorSubject<boolean>(false);
  currentCartId: string | undefined;
  userId: string;
  entries$: Observable<Array<CustomerCouponEntry>>;
  subscription = new Subscription();
  currentTabIsAssignable = true;

  constructor(
    protected context: Customer360SectionContext<Customer360CustomerCouponList>,
    protected cartVoucherService: CartVoucherFacade,
    protected userIdService: UserIdService,
    protected activeCartFacade: ActiveCartFacade,
    protected customer360Facade: Customer360Facade,
    protected customerCouponService: CustomerCouponService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userIdService.getUserId().subscribe((user) => {
        this.userId = user ?? '';
      })
    );
    this.fetchCustomerCoupons();
    this.currentTabIsAssignable = true;
  }

  fetchCustomerCoupons() {
    this.entries$ = combineLatest([this.context.data$]).pipe(
      map(([data]) => {
        const entries: Array<CustomerCouponEntry> = [];
        data.customerCoupons.forEach((customerCoupon) => {
          entries.push({
            code:customerCoupon.name,
            name:customerCoupon.description,
            codeForApplyAction:customerCoupon.code,
            applied:false,
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

  changeTab(assignable: boolean|undefined, searchQuery: string|undefined){
    if (assignable===undefined){
      assignable = this.currentTabIsAssignable;
    }else{
      this.currentTabIsAssignable = assignable;
    }
    this.entries$ = this.customer360Facade
      .get360Data([
        {
          requestData: { type: Customer360Type.CUSTOMER_COUPON_LIST ,
            additionalRequestParameters: {
              assignable: assignable,
              searchQuery: searchQuery,
            },},

        }
      ])
      .pipe(
        map((response) => {
          const couponList = response?.value?.find(
            (item) => item.type === Customer360Type.CUSTOMER_COUPON_LIST
          ) as Customer360CustomerCouponList;
          const newEntries: Array<CustomerCouponEntry> = [];
          if (couponList.customerCoupons) {
            couponList.customerCoupons.forEach((customerCoupon) => {
              newEntries.push({
                code:customerCoupon.name,
                name:customerCoupon.description,
                codeForApplyAction:customerCoupon.code,
                applied: !assignable,
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

  closeErrorAlert(): void {
    this.showErrorAlert$.next(false);
  }

  closeErrorAlertForApplyAction(): void {
    this.showErrorAlertForApplyAction$.next(false);
  }

  refreshComponent() {
    this.entries$ = this.customer360Facade
      .get360Data([
        {
          requestData: { type: Customer360Type.COUPON_LIST },
        },
      ])
      .pipe(
        map((response) => {
          const couponList = response?.value?.find(
            (item) => item.type === Customer360Type.COUPON_LIST
          ) as Customer360CouponList;
          const newEntries: Array<CustomerCouponEntry> = [];
          if (couponList.coupons) {
            couponList.coupons.forEach((coupon) => {
              newEntries.push({
                ...coupon,
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

  claimCouponToCustomer(entry: CustomerCouponEntry){
    if(entry?.codeForApplyAction){
      this.customerCouponService.claimCustomerCoupon(entry.codeForApplyAction);
      this.changeTab(this.currentTabIsAssignable,undefined);
    }
  }

  disclaimCouponToCustomer(entry: CustomerCouponEntry){
    if(entry?.codeForApplyAction){
      this.customerCouponService.disclaimCustomerCoupon(entry.codeForApplyAction);
      this.changeTab(this.currentTabIsAssignable,undefined);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
