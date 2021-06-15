import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { normalizeHttpError } from '@spartacus/core';
import { DigitalPaymentActions } from '../actions/index';
import { DigitalPaymentsAdapter } from '../../adapters/digital-payments.adapter';

@Injectable()
export class DpCheckoutEffects {
  @Effect()
  loadPaymentRequest$: Observable<
    | DigitalPaymentActions.CheckoutPaymentRequestSuccess
    | DigitalPaymentActions.CheckoutPaymentRequestFail
  > = this.actions$.pipe(
    ofType(DigitalPaymentActions.LOAD_CHECKOUT_PAYMENT_REQUEST),
    switchMap(() => {
      return this.dpAdapter.createPaymentRequest().pipe(
        map((data) => {
          return new DigitalPaymentActions.CheckoutPaymentRequestSuccess(data);
        }),
        catchError((error) =>
          of(new DigitalPaymentActions.CheckoutPaymentRequestFail(error))
        )
      );
    })
  );

  @Effect()
  loadCheckoutPaymentDetails$: Observable<
    | DigitalPaymentActions.CheckoutPaymentDetailsSuccess
    | DigitalPaymentActions.CheckoutPaymentDetailsFail
  > = this.actions$.pipe(
    ofType(DigitalPaymentActions.LOAD_CHECKOUT_PAYMENT_DETAILS),
    map(
      (action: DigitalPaymentActions.LoadCheckoutPaymentDetails) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.dpAdapter
        .createPaymentDetails(payload.sessionId, payload.signature)
        .pipe(
          map((data) => {
            return new DigitalPaymentActions.CheckoutPaymentDetailsSuccess(
              data
            );
          }),
          catchError((error) =>
            of(
              new DigitalPaymentActions.CheckoutPaymentDetailsFail(
                normalizeHttpError(error)
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private dpAdapter: DigitalPaymentsAdapter
  ) {}
}
