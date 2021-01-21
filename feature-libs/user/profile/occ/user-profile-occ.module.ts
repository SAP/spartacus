import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserProfileAdapter } from '@spartacus/user/profile/core';
import { OccUserProfileAdapter } from './adapters/occ-user-profile.adapter';
import { defaultOccUserProfileConfig } from './config/default-occ-user-profile-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccUserProfileConfig),
    { provide: UserProfileAdapter, useExisting: OccUserProfileAdapter },
  ],
})
export class UserProfileOccModule {}
