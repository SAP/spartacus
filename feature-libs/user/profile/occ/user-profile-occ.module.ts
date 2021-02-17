import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserProfileAdapter } from '@spartacus/user/profile/core';
import { defaultOccUserProfileConfig } from './adapters/config/default-occ-user-profile-endpoint.config';
import { OccUserProfileAdapter } from './adapters/occ-user-profile.adapter';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccUserProfileConfig),
    { provide: UserProfileAdapter, useClass: OccUserProfileAdapter },
  ],
})
export class UserProfileOccModule {}
