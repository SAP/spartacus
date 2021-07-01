import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  UserNotificationPreferenceAdapter,
  UserProfileAdapter,
} from '@spartacus/user/profile/core';
import { defaultOccUserProfileConfig } from './adapters/config/default-occ-user-profile-endpoint.config';
import { OccUserNotificationPreferenceAdapter } from './adapters/occ-user-notification-preference.adapter';
import { OccUserProfileAdapter } from './adapters/occ-user-profile.adapter';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccUserProfileConfig),
    { provide: UserProfileAdapter, useClass: OccUserProfileAdapter },
    {
      provide: UserNotificationPreferenceAdapter,
      useClass: OccUserNotificationPreferenceAdapter,
    },
  ],
})
export class UserProfileOccModule {}
