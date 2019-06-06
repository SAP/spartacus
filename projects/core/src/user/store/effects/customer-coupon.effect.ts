import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromCustomerCouponsAction from '../actions/customer-coupon.action';
import { CustomerCouponConnector } from '../../connectors/customer-coupon/customer-coupon.connector';
import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';

@Injectable()
export class CustomerCouponEffects {
  @Effect()
  loadCustomerCoupons$: Observable<
    fromCustomerCouponsAction.CustomerCouponAction
  > = this.actions$.pipe(
    ofType(fromCustomerCouponsAction.LOAD_CUSTOMER_COUPONS),
    map(
      (action: fromCustomerCouponsAction.LoadCustomerCoupons) => action.payload
    ),
    mergeMap(payload => {
      return this.customerCouponConnector
        .getMyCoupons(
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
          catchError(error =>
            of(new fromCustomerCouponsAction.LoadCustomerCouponsFail(error))
          )
        );
    })
  );

  @Effect()
  subscribeCustomerCoupon$: Observable<
    fromCustomerCouponsAction.CustomerCouponAction
  > = this.actions$.pipe(
    ofType(fromCustomerCouponsAction.SUBSCRIBE_CUSTOMER_COUPON),
    map(
      (action: fromCustomerCouponsAction.SubscribeCustomerCoupon) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.customerCouponConnector
        .turnOnNotification(payload.userId, payload.couponCode)
        .pipe(
          map((data: any) => {
            return new fromCustomerCouponsAction.SubscribeCustomerCouponSuccess(
              data
            );
          }),
          catchError(error =>
            of(new fromCustomerCouponsAction.SubscribeCustomerCouponFail(error))
          )
        );
    })
  );

  @Effect()
  unsubscribeCustomerCoupon$: Observable<
    fromCustomerCouponsAction.CustomerCouponAction
  > = this.actions$.pipe(
    ofType(fromCustomerCouponsAction.UNSUBSCRIBE_CUSTOMER_COUPON),
    map(
      (action: fromCustomerCouponsAction.UnsubscribeCustomerCoupon) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.customerCouponConnector
        .turnOffNotification(payload.userId, payload.couponCode)
        .pipe(
          map((data: any) => {
            return new fromCustomerCouponsAction.UnsubscribeCustomerCouponSuccess(
              data
            );
          }),
          catchError(error =>
            of(
              new fromCustomerCouponsAction.UnsubscribeCustomerCouponFail(error)
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
