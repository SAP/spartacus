import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserProfileActions } from '../actions/index';

@Injectable()
export class UpdateProfileEffects {
  @Effect()
  updateUserProfiles$: Observable<
    | UserProfileActions.UpdateUserProfileSuccess
    | UserProfileActions.UpdateUserProfileFail
  > = this.actions$.pipe(
    ofType(UserProfileActions.UPDATE_USER_PROFILE),
    map((action: UserProfileActions.UpdateUserProfile) => action.payload),
    concatMap((payload) =>
      this.userProfileConnector.update(payload.uid, payload.details).pipe(
        map(
          () => new UserProfileActions.UpdateUserProfileSuccess(payload.details)
        ),
        catchError((error) =>
          of(
            new UserProfileActions.UpdateUserProfileFail(
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
