import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserActions as UserProfileActions } from '../actions/index';

@Injectable()
export class UpdateProfileEffects {
  @Effect()
  updateUserDetails$: Observable<
    | UserProfileActions.UpdateUserDetailsSuccess
    | UserProfileActions.UpdateUserDetailsFail
  > = this.actions$.pipe(
    ofType(UserProfileActions.UPDATE_USER_DETAILS),
    map((action: UserProfileActions.UpdateUserDetails) => action.payload),
    concatMap((payload) =>
      this.userProfileConnector
        .update(payload.username, payload.userDetails)
        .pipe(
          map(
            () =>
              new UserProfileActions.UpdateUserDetailsSuccess(
                payload.userDetails
              )
          ),
          catchError((error) =>
            of(
              new UserProfileActions.UpdateUserDetailsFail(
                normalizeHttpError(error)
              )
            )
          )
        )
    )
  );

  constructor(
    private actions$: Actions,
    private userProfileConnector: UserProfileConnector
  ) {}
}
