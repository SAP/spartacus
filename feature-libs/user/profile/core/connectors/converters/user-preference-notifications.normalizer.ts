import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { NotificationPreference } from '@spartacus/user/profile/root';

@Injectable({ providedIn: 'root' })
export class OccNotificationPreferenceNormalizer
  implements
    Converter<NotificationPreference, NotificationPreference | undefined> {
  convert(
    source: NotificationPreference,
    _target?: NotificationPreference
  ): NotificationPreference | undefined {
    return !!source.visible ? source : undefined;
  }
}
