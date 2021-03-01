import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EventService, normalizeHttpError } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { UserProfileConnector } from '../../connectors/user-profile.connector';
import { UserProfileActions } from '../actions/index';
import { UserAccountChangedEvent } from '@spartacus/user/account/events';

@Injectable()
export class UpdateProfileEffects {
  @Effect()
  updateUserProfile$: Observable<
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
        tap(() => {
          this.eventService.dispatch(
            { user: payload.details },
            UserAccountChangedEvent
          );
        }),
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
    private userProfileConnector: UserProfileConnector,
    private eventService: EventService
  ) {}
}
