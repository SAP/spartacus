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
  Customer360Response,
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
import { ICON_TYPE } from '@spartacus/storefront';

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
  iconTypes = ICON_TYPE;
  activeTab = 0;

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
            this.changeTab(true);
            this.showErrorAlertForApplyAction$.next(true);
          }
        })
    );
    this.subscription.add(
      this.customerCouponService
        .getDisclaimCustomerCouponResultError()
        .subscribe((error) => {
          if (error) {
            this.changeTab(false);
            this.showErrorAlertForApplyAction$.next(true);
          }
        })
    );
    this.fetchCustomerCoupons();
    this.currentTabIsAssignable = true;
    this.hideAllErrorAlert();
  }

  public fetchCustomerCoupons(): void {
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

  public changeTab(assignable: boolean): void {
    this.currentTabIsAssignable = assignable;
    this.hideAllErrorAlert();
    this.entries$ = this.customer360Facade
      .get360Data([
        {
          requestData: {
            type: Customer360Type.CUSTOMER_COUPON_LIST,
            additionalRequestParameters: {
              assignable: assignable,
              searchQuery: undefined,
            },
          },
        },
      ])
      .pipe(
        map((response) => {
          return this.mapParams(assignable, response);
        }),
        catchError(() => {
          this.showErrorAlert$.next(true);
          return of([]);
        })
      );
  }

  public searchCustomerCoupon(searchQuery: string): void {
    this.hideAllErrorAlert();
    this.entries$ = this.customer360Facade
      .get360Data([
        {
          requestData: {
            type: Customer360Type.CUSTOMER_COUPON_LIST,
            additionalRequestParameters: {
              assignable: this.currentTabIsAssignable,
              searchQuery: searchQuery,
            },
          },
        },
      ])
      .pipe(
        map((response) => {
          return this.mapParams(this.currentTabIsAssignable, response);
        }),
        catchError(() => {
          this.showErrorAlert$.next(true);
          return of([]);
        })
      );
  }

  private hideAllErrorAlert(): void {
    this.showErrorAlert$.next(false);
    this.showErrorAlertForApplyAction$.next(false);
  }

  private mapParams(
    applied: boolean,
    response: Customer360Response | undefined
  ): Array<CustomerCouponEntry> {
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
          applied: !applied,
        });
      });
    }
    return newEntries;
  }

  public closeErrorAlert(): void {
    this.showErrorAlert$.next(false);
  }

  public closeErrorAlertForApplyAction(): void {
    this.showErrorAlertForApplyAction$.next(false);
  }

  public claimCouponToCustomer(entry: CustomerCouponEntry): void {
    this.customerCouponService.claimCustomerCoupon(entry.codeForApplyAction);
    this.refreshActionButton(entry?.codeForApplyAction);
  }

  public disclaimCouponToCustomer(entry: CustomerCouponEntry): void {
    this.customerCouponService.disclaimCustomerCoupon(entry.codeForApplyAction);
    this.refreshActionButton(entry?.codeForApplyAction);
  }

  public refreshActionButton(couponCode: string): void {
    this.entries$ = this.entries$.pipe(
      map((entries) => {
        return entries.filter((item) => item.codeForApplyAction !== couponCode);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
