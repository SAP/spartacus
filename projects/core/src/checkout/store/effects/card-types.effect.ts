import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromAction from '../actions/card-types.action';
import { CheckoutPaymentConnector } from '../../connectors/payment/cart-payment.connector';

@Injectable()
export class CardTypesEffects {
  @Effect()
  loadCardTypes$: Observable<
    fromAction.LoadCardTypesSuccess | fromAction.LoadCardTypesFail
  > = this.actions$.pipe(
    ofType(fromAction.LOAD_CARD_TYPES),
    switchMap(() => {
      return this.cartPaymentConnector.getCardTypes().pipe(
        map(cardTypes => new fromAction.LoadCardTypesSuccess(cardTypes)),
        catchError(error => of(new fromAction.LoadCardTypesFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private cartPaymentConnector: CheckoutPaymentConnector
  ) {}
}
