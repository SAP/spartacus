import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CheckoutPaymentConnector } from '../../connectors/payment/checkout-payment.connector';
import { CheckoutActions } from '../actions/index';

@Injectable()
export class PaymentTypesEffects {
  @Effect()
  loadPaymentTypes$: Observable<
    | CheckoutActions.LoadPaymentTypesSuccess
    | CheckoutActions.LoadPaymentTypesFail
  > = this.actions$.pipe(
    ofType(CheckoutActions.LOAD_PAYMENT_TYPES),
    switchMap(() => {
      return this.checkoutPaymentConnector.getPaymentTypes().pipe(
        map(
          paymentTypes =>
            new CheckoutActions.LoadPaymentTypesSuccess(paymentTypes)
        ),
        catchError(error =>
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
    CheckoutActions.SetPaymentTypeSuccess | CheckoutActions.SetPaymentTypeFail
  > = this.actions$.pipe(
    ofType(CheckoutActions.SET_PAYMENT_TYPE),
    map((action: any) => action.payload),
    switchMap(payload => {
      return this.checkoutPaymentConnector
        .setPaymentType(
          payload.userId,
          payload.cartId,
          payload.typeCode,
          payload.poNumber
        )
        .pipe(
          map(data => new CheckoutActions.SetPaymentTypeSuccess(data)),
          catchError(error =>
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
    private checkoutPaymentConnector: CheckoutPaymentConnector
  ) {}
}
