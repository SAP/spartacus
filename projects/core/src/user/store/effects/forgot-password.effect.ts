import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import { GlobalMessageActions } from '../../../global-message/store/actions/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class ForgotPasswordEffects {
  @Effect()
  requestForgotPasswordEmail$: Observable<
    | UserActions.ForgotPasswordEmailRequestSuccess
    | GlobalMessageActions.AddMessage
    | UserActions.ForgotPasswordEmailRequestFail
  > = this.actions$.pipe(
    ofType(UserActions.FORGOT_PASSWORD_EMAIL_REQUEST),
    map((action: UserActions.ForgotPasswordEmailRequest) => {
      return action.payload;
    }),
    concatMap((userEmailAddress) => {
      return this.userAccountConnector
        .requestForgotPasswordEmail(userEmailAddress)
        .pipe(
          switchMap(() => [
            new UserActions.ForgotPasswordEmailRequestSuccess(),
            new GlobalMessageActions.AddMessage({
              text: { key: 'forgottenPassword.passwordResetEmailSent' },
              type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
            }),
          ]),
          catchError((error) =>
            of(
              new UserActions.ForgotPasswordEmailRequestFail(
                normalizeHttpError(error)
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
