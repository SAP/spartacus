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
  AsmCustomer360Coupon,
  AsmCustomer360CouponList,
  AsmCustomer360Facade,
  AsmCustomer360Type,
} from '@spartacus/asm/customer-360/root';
import { UserIdService } from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActiveCartFacade, CartVoucherFacade } from '@spartacus/cart/base/root';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360-coupon',
  templateUrl: './asm-customer-360-coupon.component.html',
})
export class AsmCustomer360CouponComponent implements OnInit, OnDestroy {
  showErrorAlert$ = new BehaviorSubject<boolean>(false);
  showErrorAlertForApplyAction$ = new BehaviorSubject<boolean>(false);
  currentCartId: string | undefined;
  userId: string;
  entries$: Observable<Array<AsmCustomer360Coupon>>;
  subscription = new Subscription();

  constructor(
    protected context: AsmCustomer360SectionContext<AsmCustomer360CouponList>,
    protected cartVoucherService: CartVoucherFacade,
    protected userIdService: UserIdService,
    protected activeCartFacade: ActiveCartFacade,
    protected asmCustomer360Facade: AsmCustomer360Facade
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
      })
    );
    this.subscription.add(
      this.cartVoucherService.getAddVoucherResultError().subscribe((error) => {
        if (error) {
          this.refreshComponent();
          this.showErrorAlertForApplyAction$.next(true);
        }
      })
    );
    this.showErrorAlert$.next(false);
    this.showErrorAlertForApplyAction$.next(false);
    this.fetchCoupons();
  }

  public fetchCoupons(): void {
    this.entries$ = this.context.data$.pipe(
      map((data) => {
        const entries: Array<AsmCustomer360Coupon> = [];
        data.coupons.forEach((coupon) => {
          entries.push({
            ...coupon,
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

  public closeErrorAlert(): void {
    this.showErrorAlert$.next(false);
  }

  public closeErrorAlertForApplyAction(): void {
    this.showErrorAlertForApplyAction$.next(false);
  }

  public refreshComponent(): void {
    this.entries$ = this.asmCustomer360Facade
      .get360Data([
        {
          requestData: { type: AsmCustomer360Type.COUPON_LIST },
        },
      ])
      .pipe(
        map((response) => {
          const couponList = response?.value?.find(
            (item) => item.type === AsmCustomer360Type.COUPON_LIST
          ) as AsmCustomer360CouponList;
          const newEntries: Array<AsmCustomer360Coupon> = [];
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

  public applyCouponToCustomer(entry: AsmCustomer360Coupon): void {
    this.cartVoucherService.addVoucher(entry?.code, this.currentCartId);
    this.refreshActionButton(true, entry?.code);
  }

  public removeCouponToCustomer(entry: AsmCustomer360Coupon): void {
    this.cartVoucherService.removeVoucher(entry?.code, this.currentCartId);
    this.refreshActionButton(false, entry?.code);
  }

  public refreshActionButton(state: boolean, voucherCode: string): void {
    this.entries$ = this.entries$.pipe(
      map((entries) => {
        entries.forEach((item) => {
          if (item.code === voucherCode) {
            item.applied = state;
          }
        });
        return entries;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
