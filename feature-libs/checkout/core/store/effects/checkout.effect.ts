import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AuthActions,
  CartActions,
  GlobalMessageActions,
  normalizeHttpError,
  OCC_USER_ID_ANONYMOUS,
  SiteContextActions,
  UserActions,
  withdrawOn,
} from '@spartacus/core';
import { CheckoutDeliveryFacade } from 'feature-libs/checkout/root';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CheckoutConnector } from '../../connectors/checkout/checkout.connector';
import { CheckoutCostCenterConnector } from '../../connectors/cost-center/checkout-cost-center.connector';
import { CheckoutPaymentConnector } from '../../connectors/payment/checkout-payment.connector';
import { CheckoutDetails } from '../../models/checkout.model';
import { CheckoutActions } from '../actions/index';

@Injectable()
export class CheckoutEffects {
  private contextChange$ = this.actions$.pipe(
    ofType(
      SiteContextActions.CURRENCY_CHANGE,
      SiteContextActions.LANGUAGE_CHANGE
    )
  );

  @Effect()
  clearCheckoutMiscsDataOnLanguageChange$: Observable<
    | CheckoutActions.CheckoutClearMiscsData
    | CheckoutActions.ResetLoadPaymentTypesProcess
  > = this.actions$.pipe(
    ofType(SiteContextActions.LANGUAGE_CHANGE),
    mergeMap(() => [
      new CheckoutActions.ResetLoadPaymentTypesProcess(),
      new CheckoutActions.CheckoutClearMiscsData(),
    ])
  );

  @Effect()
  clearCheckoutDataOnLogout$: Observable<
    | CheckoutActions.ClearCheckoutData
    | CheckoutActions.ResetLoadPaymentTypesProcess
  > = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    mergeMap(() => [
      new CheckoutActions.ClearCheckoutData(),
      new CheckoutActions.ResetLoadPaymentTypesProcess(),
    ])
  );

  @Effect()
  clearCheckoutDataOnLogin$: Observable<CheckoutActions.ClearCheckoutData> = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    map(() => new CheckoutActions.ClearCheckoutData())
  );

  @Effect()
  createPaymentDetails$: Observable<
    | UserActions.LoadUserPaymentMethods
    | CheckoutActions.CreatePaymentDetailsSuccess
    | CheckoutActions.CreatePaymentDetailsFail
  > = this.actions$.pipe(
    ofType(CheckoutActions.CREATE_PAYMENT_DETAILS),
    map((action: any) => action.payload),
    mergeMap((payload) => {
      // get information for creating a subscription directly with payment provider
      return this.checkoutPaymentConnector
        .create(payload.userId, payload.cartId, payload.paymentDetails)
        .pipe(
          mergeMap((details) => {
            if (payload.userId === OCC_USER_ID_ANONYMOUS) {
              return [new CheckoutActions.CreatePaymentDetailsSuccess(details)];
            } else {
              return [
                new UserActions.LoadUserPaymentMethods(payload.userId),
                new CheckoutActions.CreatePaymentDetailsSuccess(details),
              ];
            }
          }),
          catchError((error) =>
            of(
              new CheckoutActions.CreatePaymentDetailsFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    }),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  setPaymentDetails$: Observable<
    | CheckoutActions.SetPaymentDetailsSuccess
    | CheckoutActions.SetPaymentDetailsFail
  > = this.actions$.pipe(
    ofType(CheckoutActions.SET_PAYMENT_DETAILS),
    map((action: any) => action.payload),
    mergeMap((payload) => {
      return this.checkoutPaymentConnector
        .set(payload.userId, payload.cartId, payload.paymentDetails.id)
        .pipe(
          map(
            () =>
              new CheckoutActions.SetPaymentDetailsSuccess(
                payload.paymentDetails
              )
          ),
          catchError((error) =>
            of(
              new CheckoutActions.SetPaymentDetailsFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    }),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  placeOrder$: Observable<
    | CheckoutActions.PlaceOrderSuccess
    | GlobalMessageActions.AddMessage
    | CheckoutActions.PlaceOrderFail
    | CartActions.RemoveCart
  > = this.actions$.pipe(
    ofType(CheckoutActions.PLACE_ORDER),
    map((action: any) => action.payload),
    mergeMap((payload) => {
      return this.checkoutConnector
        .placeOrder(payload.userId, payload.cartId, payload.termsChecked)
        .pipe(
          switchMap((data) => [
            new CartActions.RemoveCart({ cartId: payload.cartId }),
            new CheckoutActions.PlaceOrderSuccess(data),
          ]),
          catchError((error) =>
            of(new CheckoutActions.PlaceOrderFail(normalizeHttpError(error)))
          )
        );
    }),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  loadCheckoutDetails$: Observable<
    | CheckoutActions.LoadCheckoutDetailsSuccess
    | CheckoutActions.LoadCheckoutDetailsFail
  > = this.actions$.pipe(
    ofType(CheckoutActions.LOAD_CHECKOUT_DETAILS),
    map((action: CheckoutActions.LoadCheckoutDetails) => action.payload),
    mergeMap((payload) => {
      return this.checkoutConnector
        .loadCheckoutDetails(payload.userId, payload.cartId)
        .pipe(
          map(
            (data: CheckoutDetails) =>
              new CheckoutActions.LoadCheckoutDetailsSuccess(data)
          ),
          catchError((error) =>
            of(
              new CheckoutActions.LoadCheckoutDetailsFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    }),
    withdrawOn(this.contextChange$)
  );

  @Effect()
  reloadDetailsOnMergeCart$: Observable<CheckoutActions.LoadCheckoutDetails> = this.actions$.pipe(
    ofType(CartActions.MERGE_CART_SUCCESS),
    map((action: CartActions.MergeCartSuccess) => action.payload),
    map((payload) => {
      return new CheckoutActions.LoadCheckoutDetails({
        userId: payload.userId,
        cartId: payload.cartId,
      });
    })
  );

  @Effect()
  setCostCenter$: Observable<
    | CheckoutActions.SetCostCenterSuccess
    | CheckoutActions.SetCostCenterFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CheckoutActions.SET_COST_CENTER),
    map((action: CheckoutActions.SetCostCenter) => action.payload),
    switchMap((payload) => {
      return this.checkoutCostCenterConnector
        .setCostCenter(payload.userId, payload.cartId, payload.costCenterId)
        .pipe(
          mergeMap((_data) => {
            this.checkoutDeliveryService.clearCheckoutDeliveryAddress();
            return [
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
              new CheckoutActions.SetCostCenterSuccess(payload.costCenterId),
            ];
          }),
          catchError((error) =>
            of(new CheckoutActions.SetCostCenterFail(normalizeHttpError(error)))
          )
        );
    }),
    withdrawOn(this.contextChange$)
  );

  constructor(
    private actions$: Actions,
    private checkoutPaymentConnector: CheckoutPaymentConnector,
    private checkoutCostCenterConnector: CheckoutCostCenterConnector,
    private checkoutConnector: CheckoutConnector,
    private checkoutDeliveryService: CheckoutDeliveryFacade
  ) {}
}
