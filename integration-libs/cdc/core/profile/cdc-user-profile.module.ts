import { NgModule } from '@angular/core';
import { UserProfileComponentsModule } from '@spartacus/user/profile/components';
import { UserProfileOccModule } from '@spartacus/user/profile/occ';
import { CDCUserProfileCoreModule } from './cdc-user-profile-core.module';

@NgModule({
  imports: [
    CDCUserProfileCoreModule,
    UserProfileOccModule,
    UserProfileComponentsModule,
  ],
})
export class CDCUserProfileModule {}
