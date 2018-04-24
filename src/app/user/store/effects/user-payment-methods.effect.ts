import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { OccUserService } from '../../../occ/user/user.service';
import * as fromUserPaymentMethodsAction from '../actions/user-payment-methods.action';

@Injectable()
export class UserPaymentMethodsEffects {
  @Effect()
  loadUserPaymentMethods$: Observable<any> = this.actions$
    .ofType(fromUserPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS)
    .pipe(
      map(
        (action: fromUserPaymentMethodsAction.LoadUserPaymentMethods) =>
          action.payload
      ),
      mergeMap(payload => {
        return this.occUserService.loadUserPaymentMethods(payload).pipe(
          map((paymentsList: any) => {
            return new fromUserPaymentMethodsAction.LoadUserPaymentMethodsSuccess(
              paymentsList.payments
            );
          }),
          catchError(error =>
            of(
              new fromUserPaymentMethodsAction.LoadUserPaymentMethodsFail(error)
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
