import { NgModule } from '@angular/core';
import { UserProfileComponentsModule } from '@spartacus/user/profile/components';
import { UserProfileOccModule } from '@spartacus/user/profile/occ';
import { CDCUserRegisterCoreModule } from './cdc-user-register-core.module';

@NgModule({
  imports: [
    CDCUserRegisterCoreModule, // replacing UserProfileCoreModule
    UserProfileOccModule,
    UserProfileComponentsModule,
  ],
})
export class CDCUserRegisterModule {}
