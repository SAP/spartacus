import { NgModule } from '@angular/core';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { CDCUserRegisterService } from './user-register/cdc-user-register.service';

@NgModule({
  providers: [
    // overwrite facade providers
    CDCUserRegisterService,
    {
      provide: UserRegisterFacade,
      useExisting: CDCUserRegisterService,
    },
  ],
})
export class CdcUserProfileCoreModule {}
