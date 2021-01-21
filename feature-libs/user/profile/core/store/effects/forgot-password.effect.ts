import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  GlobalMessageActions,
  GlobalMessageType,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
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
      return this.userProfileConnector
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
    private userProfileConnector: UserProfileConnector
  ) {}
}
