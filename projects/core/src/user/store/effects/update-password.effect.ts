import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserConnector } from '../../connectors/user/user.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class UpdatePasswordEffects {
  constructor(
    private actions$: Actions,
    private userAccountConnector: UserConnector
  ) {}

  @Effect()
  updatePassword$: Observable<
    UserActions.UpdatePasswordSuccess | UserActions.UpdatePasswordFail
  > = this.actions$.pipe(
    ofType(UserActions.UPDATE_PASSWORD),
    map((action: UserActions.UpdatePassword) => action.payload),
    concatMap((payload) =>
      this.userAccountConnector
        .updatePassword(
          payload.userId,
          payload.oldPassword,
          payload.newPassword
        )
        .pipe(
          map(() => new UserActions.UpdatePasswordSuccess()),
          catchError((error) =>
            of(new UserActions.UpdatePasswordFail(normalizeHttpError(error)))
          )
        )
    )
  );
}
