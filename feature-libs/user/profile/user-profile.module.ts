import { NgModule } from '@angular/core';
import { UserProfileComponentsModule } from '@spartacus/user/profile/components';
import { UserProfileCoreModule } from '@spartacus/user/profile/core';
import { UserProfileOccModule } from '@spartacus/user/profile/occ';

@NgModule({
  imports: [
    UserProfileCoreModule,
    UserProfileOccModule,
    UserProfileComponentsModule,
  ],
})
export class UserProfileModule {}
