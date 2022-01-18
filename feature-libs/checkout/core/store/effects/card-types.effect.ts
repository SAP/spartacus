import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CheckoutPaymentConnector } from '../../connectors/payment/checkout-payment.connector';
import { CheckoutActions } from '../actions/index';

@Injectable()
export class CardTypesEffects {
  loadCardTypes$: Observable<
    CheckoutActions.LoadCardTypesSuccess | CheckoutActions.LoadCardTypesFail
  > = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.LOAD_CARD_TYPES),
      switchMap(() => {
        return this.checkoutPaymentConnector.getCardTypes().pipe(
          map(
            (cardTypes) => new CheckoutActions.LoadCardTypesSuccess(cardTypes)
          ),
          catchError((error) =>
            of(new CheckoutActions.LoadCardTypesFail(normalizeHttpError(error)))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private checkoutPaymentConnector: CheckoutPaymentConnector
  ) {}
}
