import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as fromAuthActions from '../../../auth/store/actions/index';
import { CheckoutDetails } from '../../../checkout/models/checkout.model';
import { AddMessage } from '../../../global-message/index';
import * as fromSiteContextActions from '../../../site-context/store/actions/index';
import * as fromUserActions from '../../../user/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CheckoutConnector } from '../../connectors/checkout/checkout.connector';
import { CheckoutDeliveryConnector } from '../../connectors/delivery/checkout-delivery.connector';
import { CheckoutPaymentConnector } from '../../connectors/payment/checkout-payment.connector';
import * as fromActions from '../actions/index';
import * as fromCartActions from './../../../cart/store/actions/index';

@Injectable()
export class CheckoutEffects {
  @Effect()
  addDeliveryAddress$: Observable<
    | fromUserActions.LoadUserAddresses
    | fromActions.SetDeliveryAddress
    | fromActions.AddDeliveryAddressFail
  > = this.actions$.pipe(
    ofType(fromActions.ADD_DELIVERY_ADDRESS),
    map((action: fromActions.AddDeliveryAddress) => action.payload),
    mergeMap(payload =>
      this.checkoutDeliveryConnector
        .createAddress(payload.userId, payload.cartId, payload.address)
        .pipe(
          mergeMap(address => {
            address['titleCode'] = payload.address.titleCode;
            return [
              new fromUserActions.LoadUserAddresses(payload.userId),
              new fromActions.SetDeliveryAddress({
                userId: payload.userId,
                cartId: payload.cartId,
                address: address,
              }),
            ];
          }),
          catchError(error =>
            of(
              new fromActions.AddDeliveryAddressFail(
                makeErrorSerializable(error)
              )
            )
          )
        )
    )
  );

  @Effect()
  setDeliveryAddress$: Observable<
    | fromActions.SetDeliveryAddressSuccess
    | fromActions.LoadSupportedDeliveryModes
    | fromActions.SetDeliveryAddressFail
  > = this.actions$.pipe(
    ofType(fromActions.SET_DELIVERY_ADDRESS),
    map((action: any) => action.payload),
    mergeMap(payload => {
      return this.checkoutDeliveryConnector
        .setAddress(payload.userId, payload.cartId, payload.address.id)
        .pipe(
          mergeMap(() => [
            new fromActions.SetDeliveryAddressSuccess(payload.address),
            new fromActions.LoadSupportedDeliveryModes({
              userId: payload.userId,
              cartId: payload.cartId,
            }),
          ]),
          catchError(error =>
            of(
              new fromActions.SetDeliveryAddressFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  loadSupportedDeliveryModes$: Observable<
    | fromActions.LoadSupportedDeliveryModesSuccess
    | fromActions.LoadSupportedDeliveryModesFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_SUPPORTED_DELIVERY_MODES),
    map((action: any) => action.payload),
    mergeMap(payload => {
      return this.checkoutDeliveryConnector
        .getSupportedModes(payload.userId, payload.cartId)
        .pipe(
          map(data => {
            return new fromActions.LoadSupportedDeliveryModesSuccess(data);
          }),
          catchError(error =>
            of(
              new fromActions.LoadSupportedDeliveryModesFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  clearCheckoutMiscsDataOnLanguageChange$: Observable<
    fromActions.CheckoutClearMiscsData
  > = this.actions$.pipe(
    ofType(fromSiteContextActions.LANGUAGE_CHANGE),
    map(() => new fromActions.CheckoutClearMiscsData())
  );

  @Effect()
  clearDeliveryModesOnCurrencyChange$: Observable<
    fromActions.ClearSupportedDeliveryModes
  > = this.actions$.pipe(
    ofType(fromSiteContextActions.CURRENCY_CHANGE),
    map(() => new fromActions.ClearSupportedDeliveryModes())
  );

  @Effect()
  clearCheckoutDataOnLogout$: Observable<
    fromActions.ClearCheckoutData
  > = this.actions$.pipe(
    ofType(fromAuthActions.LOGOUT),
    map(() => new fromActions.ClearCheckoutData())
  );

  @Effect()
  setDeliveryMode$: Observable<
    | fromActions.SetDeliveryModeSuccess
    | fromActions.SetDeliveryModeFail
    | fromCartActions.LoadCart
  > = this.actions$.pipe(
    ofType(fromActions.SET_DELIVERY_MODE),
    map((action: any) => action.payload),
    mergeMap(payload => {
      return this.checkoutDeliveryConnector
        .setMode(payload.userId, payload.cartId, payload.selectedModeId)
        .pipe(
          mergeMap(() => {
            return [
              new fromActions.SetDeliveryModeSuccess(payload.selectedModeId),
              new fromCartActions.LoadCart({
                userId: payload.userId,
                cartId: payload.cartId,
                details: true,
              }),
            ];
          }),
          catchError(error =>
            of(
              new fromActions.SetDeliveryModeFail(makeErrorSerializable(error))
            )
          )
        );
    })
  );

  @Effect()
  createPaymentDetails$: Observable<
    | fromUserActions.LoadUserPaymentMethods
    | fromActions.CreatePaymentDetailsSuccess
    | fromActions.CreatePaymentDetailsFail
  > = this.actions$.pipe(
    ofType(fromActions.CREATE_PAYMENT_DETAILS),
    map((action: any) => action.payload),
    mergeMap(payload => {
      // get information for creating a subscription directly with payment provider
      return this.checkoutPaymentConnector
        .create(payload.userId, payload.cartId, payload.paymentDetails)
        .pipe(
          mergeMap(details => [
            new fromUserActions.LoadUserPaymentMethods(payload.userId),
            new fromActions.CreatePaymentDetailsSuccess(details),
          ]),
          catchError(error =>
            of(
              new fromActions.CreatePaymentDetailsFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  setPaymentDetails$: Observable<
    fromActions.SetPaymentDetailsSuccess | fromActions.SetPaymentDetailsFail
  > = this.actions$.pipe(
    ofType(fromActions.SET_PAYMENT_DETAILS),
    map((action: any) => action.payload),
    mergeMap(payload => {
      return this.checkoutPaymentConnector
        .set(payload.userId, payload.cartId, payload.paymentDetails.id)
        .pipe(
          map(
            () =>
              new fromActions.SetPaymentDetailsSuccess(payload.paymentDetails)
          ),
          catchError(error =>
            of(
              new fromActions.SetPaymentDetailsFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  placeOrder$: Observable<
    fromActions.PlaceOrderSuccess | AddMessage | fromActions.PlaceOrderFail
  > = this.actions$.pipe(
    ofType(fromActions.PLACE_ORDER),
    map((action: any) => action.payload),
    mergeMap(payload => {
      return this.checkoutConnector
        .placeOrder(payload.userId, payload.cartId)
        .pipe(
          switchMap(data => [new fromActions.PlaceOrderSuccess(data)]),
          catchError(error =>
            of(new fromActions.PlaceOrderFail(makeErrorSerializable(error)))
          )
        );
    })
  );

  @Effect()
  loadCheckoutDetails$: Observable<
    fromActions.LoadCheckoutDetailsSuccess | fromActions.LoadCheckoutDetailsFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_CHECKOUT_DETAILS),
    map((action: fromActions.LoadCheckoutDetails) => action.payload),
    mergeMap(payload => {
      return this.checkoutConnector
        .loadCheckoutDetails(payload.userId, payload.cartId)
        .pipe(
          map(
            (data: CheckoutDetails) =>
              new fromActions.LoadCheckoutDetailsSuccess(data)
          ),
          catchError(error =>
            of(
              new fromActions.LoadCheckoutDetailsFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  @Effect()
  reloadDetailsOnMergeCart$: Observable<
    fromActions.LoadCheckoutDetails
  > = this.actions$.pipe(
    ofType(fromCartActions.MERGE_CART_SUCCESS),
    map((action: fromCartActions.MergeCartSuccess) => action.payload),
    map(payload => {
      return new fromActions.LoadCheckoutDetails({
        userId: payload.userId,
        cartId: payload.cartId ? payload.cartId : 'current',
      });
    })
  );

  constructor(
    private actions$: Actions,
    private checkoutDeliveryConnector: CheckoutDeliveryConnector,
    private checkoutPaymentConnector: CheckoutPaymentConnector,
    private checkoutConnector: CheckoutConnector
  ) {}
}
