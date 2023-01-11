/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { CustomerCouponConnector } from '../../connectors/customer-coupon/customer-coupon.connector';
import * as fromCustomerCouponsAction from '../actions/customer-coupon.action';

@Injectable()
export class CustomerCouponEffects {
  loadCustomerCoupons$: Observable<fromCustomerCouponsAction.CustomerCouponAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(fromCustomerCouponsAction.LOAD_CUSTOMER_COUPONS),
        map(
          (action: fromCustomerCouponsAction.LoadCustomerCoupons) =>
            action.payload
        ),
        mergeMap((payload) => {
          return this.customerCouponConnector
            .getCustomerCoupons(
              payload.userId,
              payload.pageSize,
              payload.currentPage,
              payload.sort
            )
            .pipe(
              map((coupons: CustomerCouponSearchResult) => {
                return new fromCustomerCouponsAction.LoadCustomerCouponsSuccess(
                  coupons
                );
              }),
              catchError((error) =>
                of(
                  new fromCustomerCouponsAction.LoadCustomerCouponsFail(
                    normalizeHttpError(error)
                  )
                )
              )
            );
        })
      )
    );

  subscribeCustomerCoupon$: Observable<fromCustomerCouponsAction.CustomerCouponAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(fromCustomerCouponsAction.SUBSCRIBE_CUSTOMER_COUPON),
        map(
          (action: fromCustomerCouponsAction.SubscribeCustomerCoupon) =>
            action.payload
        ),
        mergeMap((payload) => {
          return this.customerCouponConnector
            .turnOnNotification(payload.userId, payload.couponCode)
            .pipe(
              map((data: any) => {
                return new fromCustomerCouponsAction.SubscribeCustomerCouponSuccess(
                  data
                );
              }),
              catchError((error) =>
                of(
                  new fromCustomerCouponsAction.SubscribeCustomerCouponFail(
                    normalizeHttpError(error)
                  )
                )
              )
            );
        })
      )
    );

  unsubscribeCustomerCoupon$: Observable<fromCustomerCouponsAction.CustomerCouponAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(fromCustomerCouponsAction.UNSUBSCRIBE_CUSTOMER_COUPON),
        map(
          (action: fromCustomerCouponsAction.UnsubscribeCustomerCoupon) =>
            action.payload
        ),
        mergeMap((payload) => {
          return this.customerCouponConnector
            .turnOffNotification(payload.userId, payload.couponCode)
            .pipe(
              map(() => {
                return new fromCustomerCouponsAction.UnsubscribeCustomerCouponSuccess(
                  payload.couponCode
                );
              }),
              catchError((error) =>
                of(
                  new fromCustomerCouponsAction.UnsubscribeCustomerCouponFail(
                    normalizeHttpError(error)
                  )
                )
              )
            );
        })
      )
    );

  claimCustomerCoupon$: Observable<fromCustomerCouponsAction.CustomerCouponAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(fromCustomerCouponsAction.CLAIM_CUSTOMER_COUPON),
        map(
          (action: fromCustomerCouponsAction.ClaimCustomerCoupon) =>
            action.payload
        ),
        mergeMap((payload) => {
          return this.customerCouponConnector
            .claimCustomerCoupon(payload.userId, payload.couponCode)
            .pipe(
              map((data) => {
                return new fromCustomerCouponsAction.ClaimCustomerCouponSuccess(
                  data
                );
              }),
              catchError((error) =>
                of(
                  new fromCustomerCouponsAction.ClaimCustomerCouponFail(
                    normalizeHttpError(error)
                  )
                )
              )
            );
        })
      )
    );

  constructor(
    private actions$: Actions,
    private customerCouponConnector: CustomerCouponConnector
  ) {}
}
