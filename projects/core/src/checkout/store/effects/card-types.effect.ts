import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CheckoutPaymentConnector } from '../../connectors/payment/checkout-payment.connector';
import * as fromAction from '../actions/card-types.action';

@Injectable()
export class CardTypesEffects {
  @Effect()
  loadCardTypes$: Observable<
    fromAction.LoadCardTypesSuccess | fromAction.LoadCardTypesFail
  > = this.actions$.pipe(
    ofType(fromAction.LOAD_CARD_TYPES),
    switchMap(() => {
      return this.checkoutPaymentConnector.getCardTypes().pipe(
        map(cardTypes => new fromAction.LoadCardTypesSuccess(cardTypes)),
        catchError(error =>
          of(new fromAction.LoadCardTypesFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private checkoutPaymentConnector: CheckoutPaymentConnector
  ) {}
}
