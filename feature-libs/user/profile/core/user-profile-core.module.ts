import { NgModule } from '@angular/core';
import {
  NOTIFICATION_PREFERENCE_NORMALIZER,
  UserNotificationPreferenceConnector,
} from './connectors';
import { OccNotificationPreferenceNormalizer } from './connectors/converters/user-preference-notifications.normalizer';
import { UserProfileConnector } from './connectors/user-profile.connector';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [
    UserProfileConnector,
    UserNotificationPreferenceConnector,
    ...facadeProviders,
    {
      provide: NOTIFICATION_PREFERENCE_NORMALIZER,
      useExisting: OccNotificationPreferenceNormalizer,
      multi: true,
    },
  ],
})
export class UserProfileCoreModule {}
