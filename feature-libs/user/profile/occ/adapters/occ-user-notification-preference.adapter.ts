import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import {
  NOTIFICATION_PREFERENCE_NORMALIZER,
  NOTIFICATION_PREFERENCE_SERIALIZER,
  UserNotificationPreferenceAdapter,
} from '@spartacus/user/profile/core';
import {
  NotificationPreference,
  NotificationPreferenceList,
} from '@spartacus/user/profile/root';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable()
export class OccUserNotificationPreferenceAdapter
  implements UserNotificationPreferenceAdapter {
  constructor(
    protected http: HttpClient,
    protected converter: ConverterService,
    protected occEndpoints: OccEndpointsService
  ) {}

  loadAll(userId: string): Observable<NotificationPreference[]> {
    return this.http
      .get<NotificationPreferenceList>(
        this.occEndpoints.getUrl('notificationPreference', { userId }),
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
        this.occEndpoints.getUrl('notificationPreference', { userId }),
        { preferences: preferences },
        { headers }
      )
      .pipe(catchError((error: any) => throwError(error)));
  }
}
