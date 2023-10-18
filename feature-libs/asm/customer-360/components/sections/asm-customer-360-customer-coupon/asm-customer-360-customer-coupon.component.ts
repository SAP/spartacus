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
  AsmCustomer360CustomerCouponList,
  AsmCustomer360Facade,
  AsmCustomer360Response,
  AsmCustomer360Type,
} from '@spartacus/asm/customer-360/root';
import { CustomerCouponService } from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { CustomerCouponEntry } from './asm-customer-360-customer-coupon.model';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360-customer-coupon',
  templateUrl: './asm-customer-360-customer-coupon.component.html',
})
export class AsmCustomer360CustomerCouponComponent
  implements OnInit, OnDestroy
{
  showErrorAlert$ = new BehaviorSubject<boolean>(false);
  showErrorAlertForApplyAction$ = new BehaviorSubject<boolean>(false);
  entries$: Observable<Array<CustomerCouponEntry>>;
  subscription = new Subscription();
  currentTabIsAssignable = true;
  iconTypes = ICON_TYPE;
  activeTab = 0;

  constructor(
    protected context: AsmCustomer360SectionContext<AsmCustomer360CustomerCouponList>,
    protected asmCustomer360Facade: AsmCustomer360Facade,
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
    this.entries$ = this.context.data$.pipe(
      map((data) => {
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
    this.entries$ = this.asmCustomer360Facade
      .get360Data([
        {
          requestData: {
            type: AsmCustomer360Type.CUSTOMER_COUPON_LIST,
            additionalRequestParameters: {
              assignable: assignable,
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
    this.entries$ = this.asmCustomer360Facade
      .get360Data([
        {
          requestData: {
            type: AsmCustomer360Type.CUSTOMER_COUPON_LIST,
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
    response: AsmCustomer360Response | undefined
  ): Array<CustomerCouponEntry> {
    const couponList = response?.value?.find(
      (item) => item.type === AsmCustomer360Type.CUSTOMER_COUPON_LIST
    ) as AsmCustomer360CustomerCouponList;
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
    this.activeTab = applied ? 0 : 1;
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
