import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
import { OccEndpointsService } from '../../services/occ-endpoints.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable()
export class OccUserNotificationPreferenceAdapter
  implements UserNotificationPreferenceAdapter
{
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
        map((list) => list.preferences),
        this.converter.pipeableMany(NOTIFICATION_PREFERENCE_NORMALIZER),
        catchError((error: any) => throwError(error))
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
      .pipe(catchError((error: any) => throwError(error)));
  }
}
