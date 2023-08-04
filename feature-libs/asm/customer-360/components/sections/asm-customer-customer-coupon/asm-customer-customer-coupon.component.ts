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
  Customer360CustomerCouponList,
  Customer360Facade,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { CustomerCouponService } from '@spartacus/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  of,
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
  entries$: Observable<Array<CustomerCouponEntry>>;
  subscription = new Subscription();
  currentTabIsAssignable = true;

  constructor(
    protected context: Customer360SectionContext<Customer360CustomerCouponList>,
    protected customer360Facade: Customer360Facade,
    protected customerCouponService: CustomerCouponService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.customerCouponService
        .getClaimCustomerCouponResultError()
        .subscribe((error) => {
          if (error) {
            this.changeTab(undefined, undefined);
            this.showErrorAlertForApplyAction$.next(true);
          }
        })
    );
    this.subscription.add(
      this.customerCouponService
        .getDisclaimCustomerCouponResultError()
        .subscribe((error) => {
          if (error) {
            this.changeTab(undefined, undefined);
            this.showErrorAlertForApplyAction$.next(true);
          }
        })
    );
    this.fetchCustomerCoupons();
    this.currentTabIsAssignable = true;
    this.showErrorAlert$.next(false);
    this.showErrorAlertForApplyAction$.next(false);
  }

  fetchCustomerCoupons() {
    this.entries$ = combineLatest([this.context.data$]).pipe(
      map(([data]) => {
        const entries: Array<CustomerCouponEntry> = [];
        data.customerCoupons.forEach((customerCoupon) => {
          entries.push({
            code: customerCoupon.name,
            name: customerCoupon.description,
            codeForApplyAction: customerCoupon.code,
            applied: false,
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

  changeTab(assignable: boolean | undefined, searchQuery: string | undefined) {
    this.showErrorAlert$.next(false);
    this.showErrorAlertForApplyAction$.next(false);
    if (assignable === undefined) {
      assignable = this.currentTabIsAssignable;
    } else {
      this.currentTabIsAssignable = assignable;
    }
    this.entries$ = this.customer360Facade
      .get360Data([
        {
          requestData: {
            type: Customer360Type.CUSTOMER_COUPON_LIST,
            additionalRequestParameters: {
              assignable: assignable,
              searchQuery: searchQuery,
            },
          },
        },
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
                code: customerCoupon.name,
                name: customerCoupon.description,
                codeForApplyAction: customerCoupon.code,
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

  claimCouponToCustomer(entry: CustomerCouponEntry) {
    this.customerCouponService.claimCustomerCoupon(entry.codeForApplyAction);
    this.refreshActionButton(entry?.codeForApplyAction);
  }

  disclaimCouponToCustomer(entry: CustomerCouponEntry) {
    this.customerCouponService.disclaimCustomerCoupon(entry.codeForApplyAction);
    this.refreshActionButton(entry?.codeForApplyAction);
  }

  refreshActionButton(couponCode: string) {
    this.entries$ = this.entries$.pipe(
      map((entries) => {
        const filteredEntries = entries.filter(
          (item) => item.codeForApplyAction !== couponCode
        );
        return filteredEntries;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
