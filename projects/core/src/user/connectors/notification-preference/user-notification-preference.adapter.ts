import { Observable } from 'rxjs';
import { NotificationPreference } from '../../../model/notification-preference.model';

export abstract class UserNotificationPreferenceAdapter {
  abstract loadAll(userId: string): Observable<NotificationPreference[]>;

  abstract update(
    userId: string,
    preferences: NotificationPreference[]
  ): Observable<{}>;
}
