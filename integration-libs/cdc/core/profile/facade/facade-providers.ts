import { Provider } from '@angular/core';
import { UserEmailService, UserPasswordService, UserProfileService } from '@spartacus/user/profile/core';
import {
  UserEmailFacade,
  UserPasswordFacade,
  UserProfileFacade,
  UserRegisterFacade
} from '@spartacus/user/profile/root';
import { CDCUserRegisterService } from 'integration-libs/cdc/core/profile/facade/cdc-user-register.service';
export const facadeProviders: Provider[] = [
  UserEmailService,
  UserPasswordService,
  UserProfileService,
  CDCUserRegisterService,
  {
    provide: UserEmailFacade,
    useExisting: UserEmailService,
  },
  {
    provide: UserPasswordFacade,
    useExisting: UserPasswordService,
  },
  {
    provide: UserProfileFacade,
    useExisting: UserProfileService,
  },
  {
    provide: UserRegisterFacade,
    useExisting: CDCUserRegisterService,
  },
];
