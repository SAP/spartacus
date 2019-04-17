import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OccUserService } from '../../occ/user.service';
import * as fromAction from '../actions/notification-preference.action';

@Injectable()
export class NotificationPreferenceEffects {
  @Effect()
  loadNotificationPreferences$: Observable<
    fromAction.NotificationPreferenceAction
  > = this.actions$.pipe(
    ofType(fromAction.LOAD_NOTIFICATION_PREFERENCES),
    map((action: fromAction.LoadNotificationPreferences) => action.payload),
    switchMap(payload => {
      return this.occUserService.getNotificationPreference(payload.userId).pipe(
        map(
          (preferences: any) =>
            new fromAction.LoadNotificationPreferencesSuccess(preferences)
        ),
        catchError(error =>
          of(new fromAction.LoadNotificationPreferencesFail(error))
        )
      );
    })
  );

  @Effect()
  updateNotificationPreferences$: Observable<
    fromAction.NotificationPreferenceAction
  > = this.actions$.pipe(
    ofType(fromAction.UPDATE_NOTIFICATION_PREFERENCES),
    map((action: fromAction.UpdateNotificationPreferences) => action.payload),
    switchMap(payload => {
      return this.occUserService
        .updateNotificationPreference(payload.userId, payload.preference)
        .pipe(
          map((data: any) => {
            return new fromAction.UpdateNotificationPreferencesSuccess(data);
          }),
          catchError(error =>
            of(new fromAction.UpdateNotificationPreferencesFail(error))
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private occUserService: OccUserService
  ) {}
}
