/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoggerService } from '../../../logger';
import {
  NotificationPreference,
  NotificationPreferenceList,
} from '../../../model/notification-preference.model';
import {
  NOTIFICATION_PREFERENCE_NORMALIZER,
  NOTIFICATION_PREFERENCE_SERIALIZER,
} from '../../../user/connectors/notification-preference';
import { UserNotificationPreferenceAdapter } from '../../../user/connectors/notification-preference/user-notification-preference.adapter';
import { ConverterService } from '../../../util/converter.service';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable()
export class OccUserNotificationPreferenceAdapter
  implements UserNotificationPreferenceAdapter
{
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected converter: ConverterService,
    protected occEndpoints: OccEndpointsService
  ) {}

  loadAll(userId: string): Observable<NotificationPreference[]> {
    return this.http
      .get<NotificationPreferenceList>(
        this.occEndpoints.buildUrl('notificationPreference', {
          urlParams: { userId },
        }),
        {
          headers,
        }
      )
      .pipe(
        map((list) => list.preferences ?? []),
        this.converter.pipeableMany(NOTIFICATION_PREFERENCE_NORMALIZER),
        catchError((error: any) => {
          throw normalizeHttpError(error, this.logger);
        })
      );
  }

  update(
    userId: string,
    preferences: NotificationPreference[]
  ): Observable<{}> {
    preferences = this.converter.convert(
      preferences,
      NOTIFICATION_PREFERENCE_SERIALIZER
    );
    return this.http
      .patch(
        this.occEndpoints.buildUrl('notificationPreference', {
          urlParams: { userId },
        }),
        { preferences: preferences },
        { headers }
      )
      .pipe(
        catchError((error: any) => {
          throw normalizeHttpError(error, this.logger);
        })
      );
  }
}
