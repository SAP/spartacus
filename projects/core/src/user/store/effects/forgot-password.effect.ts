import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { AddMessage, GlobalMessageType } from '../../../global-message/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserConnector } from '../../connectors/user/user.connector';
import * as fromActions from '../actions/index';

@Injectable()
export class ForgotPasswordEffects {
  @Effect()
  requestForgotPasswordEmail$: Observable<
    | fromActions.ForgotPasswordEmailRequestSuccess
    | AddMessage
    | fromActions.ForgotPasswordEmailRequestFail
  > = this.actions$.pipe(
    ofType(fromActions.FORGOT_PASSWORD_EMAIL_REQUEST),
    map((action: fromActions.ForgotPasswordEmailRequest) => {
      return action.payload;
    }),
    concatMap(userEmailAddress => {
      return this.userAccountConnector
        .requestForgotPasswordEmail(userEmailAddress)
        .pipe(
          switchMap(() => [
            new fromActions.ForgotPasswordEmailRequestSuccess(),
            new AddMessage({
              text: { key: 'forgottenPassword.passwordResetEmailSent' },
              type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
            }),
          ]),
          catchError(error =>
            of(
              new fromActions.ForgotPasswordEmailRequestFail(
                makeErrorSerializable(error)
              )
            )
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private userAccountConnector: UserConnector
  ) {}
}
