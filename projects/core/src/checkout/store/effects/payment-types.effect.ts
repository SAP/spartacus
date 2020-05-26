import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { PaymentTypeConnector } from '../../connectors/payment-type/payment-type.connector';
import { CheckoutActions } from '../actions/index';
import { CartActions } from '../../../cart/store/actions/index';

@Injectable()
export class PaymentTypesEffects {
  @Effect()
  loadPaymentTypes$: Observable<
    | CheckoutActions.LoadPaymentTypesSuccess
    | CheckoutActions.LoadPaymentTypesFail
  > = this.actions$.pipe(
    ofType(CheckoutActions.LOAD_PAYMENT_TYPES),
    switchMap(() => {
      return this.paymentTypeConnector.getPaymentTypes().pipe(
        map(
          (paymentTypes) =>
            new CheckoutActions.LoadPaymentTypesSuccess(paymentTypes)
        ),
        catchError((error) =>
          of(
            new CheckoutActions.LoadPaymentTypesFail(
              makeErrorSerializable(error)
            )
          )
        )
      );
    })
  );

  @Effect()
  setPaymentType$: Observable<
    | CheckoutActions.SetPaymentTypeSuccess
    | CheckoutActions.SetPaymentTypeFail
    | CartActions.LoadCart
  > = this.actions$.pipe(
    ofType(CheckoutActions.SET_PAYMENT_TYPE),
    map((action: CheckoutActions.SetPaymentType) => action.payload),
    switchMap((payload) => {
      return this.paymentTypeConnector
        .setPaymentType(
          payload.userId,
          payload.cartId,
          payload.typeCode,
          payload.poNumber
        )
        .pipe(
          mergeMap((data) => {
            return [
              new CheckoutActions.SetPaymentTypeSuccess(data),
              new CartActions.LoadCart({
                userId: payload.userId,
                cartId: payload.cartId,
              }),
            ];
          }),
          catchError((error) =>
            of(
              new CheckoutActions.SetPaymentTypeFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private paymentTypeConnector: PaymentTypeConnector
  ) {}
}
