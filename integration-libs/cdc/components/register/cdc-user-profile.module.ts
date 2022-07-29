import { NgModule } from '@angular/core';
import { UserProfileModule } from '@spartacus/user';
import {
  UserRegisterFacade
} from '@spartacus/user/profile/root';
import { CDCRegisterComponentService } from './facade/cdc-register-component.service';

@NgModule({
  imports: [
    UserProfileModule,
  ],
  providers: [

    CDCRegisterComponentService,
    {
      provide: UserRegisterFacade,
      useExisting: CDCRegisterComponentService,
    },
  ],
})
export class CDCUserProfileModule {}
