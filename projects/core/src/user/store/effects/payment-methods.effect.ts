import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { OccUserService } from '../../occ';
import * as fromUserPaymentMethodsAction from '../actions/payment-methods.action';
import { PaymentDetailsList } from '../../../occ-models';

@Injectable()
export class UserPaymentMethodsEffects {
  @Effect()
  loadUserPaymentMethods$: Observable<any> = this.actions$.pipe(
    ofType(fromUserPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS),
    map(
      (action: fromUserPaymentMethodsAction.LoadUserPaymentMethods) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.occUserService.loadUserPaymentMethods(payload).pipe(
        map((paymentsList: PaymentDetailsList) => {
          return new fromUserPaymentMethodsAction.LoadUserPaymentMethodsSuccess(
            paymentsList.payments
          );
        }),
        catchError(error =>
          of(new fromUserPaymentMethodsAction.LoadUserPaymentMethodsFail(error))
        )
      );
    })
  );

  @Effect()
  setDefaultUserPaymentMethod$: Observable<any> = this.actions$.pipe(
    ofType(fromUserPaymentMethodsAction.SET_DEFAULT_USER_PAYMENT_METHOD),
    map(
      (action: fromUserPaymentMethodsAction.SetDefaultUserPaymentMethod) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.occUserService
        .setDefaultUserPaymentMethod(payload.userId, payload.paymentMethodId)
        .pipe(
          switchMap((data: any) => {
            return [
              new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethodSuccess(
                data
              ),
              new fromUserPaymentMethodsAction.LoadUserPaymentMethods(
                payload.userId
              )
            ];
          }),
          catchError(error =>
            of(
              new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethodFail(
                error
              )
            )
          )
        );
    })
  );
  @Effect()
  deleteUserPaymentMethod$: Observable<any> = this.actions$.pipe(
    ofType(fromUserPaymentMethodsAction.DELETE_USER_PAYMENT_METHOD),
    map(
      (action: fromUserPaymentMethodsAction.DeleteUserPaymentMethod) =>
        action.payload
    ),
    mergeMap(payload => {
      return this.occUserService
        .deleteUserPaymentMethod(payload.userId, payload.paymentMethodId)
        .pipe(
          switchMap((data: any) => {
            return [
              new fromUserPaymentMethodsAction.DeleteUserPaymentMethodSuccess(
                data
              ),
              new fromUserPaymentMethodsAction.LoadUserPaymentMethods(
                payload.userId
              )
            ];
          }),
          catchError(error =>
            of(
              new fromUserPaymentMethodsAction.DeleteUserPaymentMethodFail(
                error
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}
}
