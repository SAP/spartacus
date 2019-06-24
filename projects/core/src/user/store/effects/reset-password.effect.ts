import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AddMessage, GlobalMessageType } from '../../../global-message/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserConnector } from '../../connectors/user/user.connector';
import * as fromActions from '../actions/index';

@Injectable()
export class ResetPasswordEffects {
  @Effect()
  resetPassword$: Observable<
    | fromActions.ResetPasswordSuccess
    | AddMessage
    | fromActions.ResetPasswordFail
  > = this.actions$.pipe(
    ofType(fromActions.RESET_PASSWORD),
    map((action: fromActions.ResetPassword) => action.payload),
    switchMap(({ token, password }) => {
      return this.userAccountConnector.resetPassword(token, password).pipe(
        switchMap(() => [
          new fromActions.ResetPasswordSuccess(),
          new AddMessage({
            text: { key: 'forgottenPassword.passwordResetSuccess' },
            type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
          }),
        ]),
        catchError(error =>
          of(new fromActions.ResetPasswordFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userAccountConnector: UserConnector
  ) {}
}
