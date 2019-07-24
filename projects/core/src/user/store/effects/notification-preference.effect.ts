import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserNotificationPreferenceConnector } from '../../connectors/notification-preference';
import { UserNotificationPreferenceService } from '../../facade';
import { UserActions } from '../actions/index';

@Injectable()
export class NotificationPreferenceEffects {
  @Effect()
  loadPreferences$: Observable<
    UserActions.NotificationPreferenceAction
  > = this.actions$.pipe(
    ofType(UserActions.LOAD_NOTIFICATION_PREFERENCES),
    map((action: UserActions.LoadNotificationPreferences) => action.payload),
    mergeMap(payload =>
      this.connector.loadAll(payload).pipe(
        map(
          preferences =>
            new UserActions.LoadNotificationPreferencesSuccess(preferences)
        ),
        catchError(error =>
          of(
            new UserActions.LoadNotificationPreferencesFail(
              makeErrorSerializable(error)
            )
          )
        )
      )
    )
  );

  @Effect()
  updatePreferences$: Observable<
    UserActions.NotificationPreferenceAction
  > = this.actions$.pipe(
    ofType(UserActions.UPDATE_NOTIFICATION_PREFERENCES),
    map((action: UserActions.UpdateNotificationPreferences) => action.payload),
    mergeMap(payload =>
      this.connector.update(payload.userId, payload.preferences).pipe(
        map(
          () =>
            new UserActions.UpdateNotificationPreferencesSuccess(
              payload.preferences
            )
        ),
        catchError(error =>
          of(
            new UserActions.UpdateNotificationPreferencesFail(
              makeErrorSerializable(error)
            )
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  refreshPreferences: Observable<
    UserActions.NotificationPreferenceAction
  > = this.actions$.pipe(
    ofType(UserActions.UPDATE_NOTIFICATION_PREFERENCES_FAIL),
    tap(() => {
      this.notificationPreferenceService.resetUpdatePreferencesProcessState();
      this.notificationPreferenceService.loadPreferences();
    })
  );

  constructor(
    private actions$: Actions,
    private connector: UserNotificationPreferenceConnector,
    private notificationPreferenceService: UserNotificationPreferenceService
  ) {}
}
