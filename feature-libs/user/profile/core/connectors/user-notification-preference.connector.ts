import { Injectable } from '@angular/core';
import { NotificationPreference } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { UserNotificationPreferenceAdapter } from './user-notification-preference.adapter';

@Injectable()
export class UserNotificationPreferenceConnector {
  constructor(protected adapter: UserNotificationPreferenceAdapter) {}

  loadAll(userId: string): Observable<NotificationPreference[]> {
    return this.adapter.loadAll(userId);
  }

  update(userId: string, preferences: NotificationPreference[]) {
    return this.adapter.update(userId, preferences);
  }
}
