import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PaymentDetails } from '../../../model/cart.model';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserPaymentConnector } from '../../connectors/payment/user-payment.connector';
import * as fromUserPaymentMethodsAction from '../actions/payment-methods.action';

@Injectable()
export class UserPaymentMethodsEffects {
  @Effect()
  loadUserPaymentMethods$: Observable<Action> = this.actions$.pipe(
    ofType(fromUserPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS),
    map(
      (action: fromUserPaymentMethodsAction.LoadUserPaymentMethods) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.userPaymentMethodConnector.getAll(payload).pipe(
        map((payments: PaymentDetails[]) => {
          return new fromUserPaymentMethodsAction.LoadUserPaymentMethodsSuccess(
            payments
          );
        }),
        catchError(error =>
          of(
            new fromUserPaymentMethodsAction.LoadUserPaymentMethodsFail(
              makeErrorSerializable(error)
            )
          )
        )
      );
    })
  );

  @Effect()
  setDefaultUserPaymentMethod$: Observable<Action> = this.actions$.pipe(
    ofType(fromUserPaymentMethodsAction.SET_DEFAULT_USER_PAYMENT_METHOD),
    map(
      (action: fromUserPaymentMethodsAction.SetDefaultUserPaymentMethod) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.userPaymentMethodConnector
        .setDefault(payload.userId, payload.paymentMethodId)
        .pipe(
          switchMap(data => [
            new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethodSuccess(
              data
            ),
            new fromUserPaymentMethodsAction.LoadUserPaymentMethods(
              payload.userId
            ),
          ]),
          catchError(error =>
            of(
              new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethodFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );
  @Effect()
  deleteUserPaymentMethod$: Observable<Action> = this.actions$.pipe(
    ofType(fromUserPaymentMethodsAction.DELETE_USER_PAYMENT_METHOD),
    map(
      (action: fromUserPaymentMethodsAction.DeleteUserPaymentMethod) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.userPaymentMethodConnector
        .delete(payload.userId, payload.paymentMethodId)
        .pipe(
          switchMap(data => [
            new fromUserPaymentMethodsAction.DeleteUserPaymentMethodSuccess(
              data
            ),
            new fromUserPaymentMethodsAction.LoadUserPaymentMethods(
              payload.userId
            ),
          ]),
          catchError(error =>
            of(
              new fromUserPaymentMethodsAction.DeleteUserPaymentMethodFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private userPaymentMethodConnector: UserPaymentConnector
  ) {}
}
