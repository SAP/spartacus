import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { GlobalMessageActions } from '../../../global-message/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class ResetPasswordEffects {
  @Effect()
  resetPassword$: Observable<
    | UserActions.ResetPasswordSuccess
    | GlobalMessageActions.AddMessage
    | UserActions.ResetPasswordFail
  > = this.actions$.pipe(
    ofType(UserActions.RESET_PASSWORD),
    map((action: UserActions.ResetPassword) => action.payload),
    switchMap(({ token, password }) => {
      return this.userAccountConnector.resetPassword(token, password).pipe(
        switchMap(() => [
          new UserActions.ResetPasswordSuccess(),
          new GlobalMessageActions.AddMessage({
            text: { key: 'forgottenPassword.passwordResetSuccess' },
            type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
          }),
        ]),
        catchError(error =>
          of(new UserActions.ResetPasswordFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userAccountConnector: UserConnector
  ) {}
}
