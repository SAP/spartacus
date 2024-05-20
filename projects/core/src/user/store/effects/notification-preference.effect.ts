/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { LoggerService } from '../../../logger';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserNotificationPreferenceConnector } from '../../connectors/notification-preference/user-notification-preference.connector';
import { UserActions } from '../actions/index';

@Injectable()
export class NotificationPreferenceEffects {
  protected logger = inject(LoggerService);

  loadPreferences$: Observable<UserActions.NotificationPreferenceAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.LOAD_NOTIFICATION_PREFERENCES),
        map(
          (action: UserActions.LoadNotificationPreferences) => action.payload
        ),
        switchMap((payload) =>
          this.connector.loadAll(payload).pipe(
            map(
              (preferences) =>
                new UserActions.LoadNotificationPreferencesSuccess(preferences)
            ),
            catchError((error) =>
              of(
                new UserActions.LoadNotificationPreferencesFail(
                  normalizeHttpError(error, this.logger)
                )
              )
            )
          )
        )
      )
    );

  updatePreferences$: Observable<UserActions.NotificationPreferenceAction> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.UPDATE_NOTIFICATION_PREFERENCES),
        map(
          (action: UserActions.UpdateNotificationPreferences) => action.payload
        ),
        mergeMap((payload) =>
          this.connector.update(payload.userId, payload.preferences).pipe(
            map(
              () =>
                new UserActions.UpdateNotificationPreferencesSuccess(
                  payload.preferences
                )
            ),
            catchError((error) =>
              of(
                new UserActions.UpdateNotificationPreferencesFail(
                  normalizeHttpError(error, this.logger)
                )
              )
            )
          )
        )
      )
    );

  constructor(
    private actions$: Actions,
    private connector: UserNotificationPreferenceConnector
  ) {}
}
