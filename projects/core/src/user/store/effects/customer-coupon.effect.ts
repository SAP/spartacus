import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromCustomerCouponsAction from '../actions/customer-coupon.action';
import { CustomerCouponConnector } from '../../connectors/customer-coupon/customer-coupon.connector';
import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';
import { normalizeHttpError } from '../../../util/normalize-http-error';

@Injectable()
export class CustomerCouponEffects {
  @Effect()
  loadCustomerCoupons$: Observable<fromCustomerCouponsAction.CustomerCouponAction> =
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
    );

  @Effect()
  subscribeCustomerCoupon$: Observable<fromCustomerCouponsAction.CustomerCouponAction> =
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
    );

  @Effect()
  unsubscribeCustomerCoupon$: Observable<fromCustomerCouponsAction.CustomerCouponAction> =
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
    );

  @Effect()
  claimCustomerCoupon$: Observable<fromCustomerCouponsAction.CustomerCouponAction> =
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
    );

  constructor(
    private actions$: Actions,
    private customerCouponConnector: CustomerCouponConnector
  ) {}
}
