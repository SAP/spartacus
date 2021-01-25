import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserProfileActions } from '../actions/index';

@Injectable()
export class UpdatePasswordEffects {
  constructor(
    private actions$: Actions,
    private userAccountConnector: UserProfileConnector
  ) {}

  @Effect()
  updatePassword$: Observable<
    | UserProfileActions.UpdatePasswordSuccess
    | UserProfileActions.UpdatePasswordFail
  > = this.actions$.pipe(
    ofType(UserProfileActions.UPDATE_PASSWORD),
    map((action: UserProfileActions.UpdatePassword) => action.payload),
    concatMap((payload) =>
      this.userAccountConnector
        .updatePassword(payload.uid, payload.oldPassword, payload.newPassword)
        .pipe(
          map(() => new UserProfileActions.UpdatePasswordSuccess()),
          catchError((error) =>
            of(
              new UserProfileActions.UpdatePasswordFail(
                normalizeHttpError(error)
              )
            )
          )
        )
    )
  );
}
