import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { concatMap, switchMap, map, catchError } from 'rxjs/operators';
import { GlobalMessageType, AddMessage } from '../../../global-message/index';

import * as fromActions from '../actions/index';
import { OccUserService } from '../../occ/user.service';

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
      return this.occUserService
        .requestForgotPasswordEmail(userEmailAddress)
        .pipe(
          switchMap(() => [
            new fromActions.ForgotPasswordEmailRequestSuccess(),
            new AddMessage({
              text:
                'Password reset instructions have been sent to your e-mail address. ' +
                'Please contact customer support if you require additional assistance.',
              type: GlobalMessageType.MSG_TYPE_CONFIRMATION
            })
          ]),
          catchError(error =>
            of(new fromActions.ForgotPasswordEmailRequestFail(error))
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}
}
