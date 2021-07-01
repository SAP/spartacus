import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { USER_PROFILE_CORE_FEATURE } from '../feature-name';
import { NotificationPreference } from '../model/user-profile.model';

export function UserNotificationPreferenceFacadeFactory() {
  return facadeFactory({
    facade: UserNotificationPreferenceFacade,
    feature: USER_PROFILE_CORE_FEATURE,
    methods: ['loadAll', 'update'],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: UserNotificationPreferenceFacadeFactory,
})
export abstract class UserNotificationPreferenceFacade {
  /**
   * Loads all the user preferences.
   */
  abstract loadAll(): Observable<NotificationPreference[]>;

  /**
   * Updates the user's notification preference.
   */
  abstract update(preferences: NotificationPreference[]): Observable<unknown>;
}
