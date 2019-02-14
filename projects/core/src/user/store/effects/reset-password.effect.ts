import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromActions from '../actions/index';
import { OccUserService } from '../../occ/user.service';
import { GlobalMessageType, AddMessage } from '../../../global-message/index';

@Injectable()
export class ResetPasswordEffects {
  @Effect()
  resetPassword$: Observable<
    | fromActions.ResetPasswordSuccess
    | AddMessage
    | fromActions.ResetPasswordFail
  > = this.actions$.pipe(
    ofType(fromActions.RESET_PASSWORD),
    map((action: fromActions.ResetPassword) => {
      return action.payload;
    }),
    switchMap(({ token, password }) => {
      return this.occUserService.resetPassword(token, password).pipe(
        switchMap(() => [
          new fromActions.ResetPasswordSuccess(),
          new AddMessage({
            text: 'Success! You can now login using your new password.',
            type: GlobalMessageType.MSG_TYPE_CONFIRMATION
          })
        ]),
        catchError(error => of(new fromActions.ResetPasswordFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}
}
