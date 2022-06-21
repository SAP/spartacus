import { Provider } from '@angular/core';
import { UserEmailService, UserPasswordService, UserProfileService } from '@spartacus/user/profile/core';
import {
  UserEmailFacade,
  UserPasswordFacade,
  UserProfileFacade,
  UserRegisterFacade
} from '@spartacus/user/profile/root';
import { CDCRegisterComponentService } from 'integration-libs/cdc/components/register/facade/cdc-register-component.service';
export const facadeProviders: Provider[] = [
  UserEmailService,
  UserPasswordService,
  UserProfileService,
  CDCRegisterComponentService,
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
    useExisting: CDCRegisterComponentService,
  },
];
