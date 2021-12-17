import { UserEmailService } from './user-email.service';
import { UserPasswordService } from './user-password.service';
import { UserProfileService } from './user-profile.service';
import { UserRegisterService } from './user-register.service';
import {
  UserEmailFacade,
  UserPasswordFacade,
  UserProfileFacade,
  UserRegisterFacade,
} from '@spartacus/user/profile/root';
import { Provider } from '@angular/core';
import { CDCUserRegisterService } from 'integration-libs/cdc/core/auth/services/user-authentication/cdc-user-register.service';
import { environment } from 'projects/storefrontapp/src/environments/environment';

export const facadeProviders: Provider[] = [
  UserEmailService,
  UserPasswordService,
  UserProfileService,
  UserRegisterService,
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
    useExisting: environment.cdc? CDCUserRegisterService: UserRegisterService,
  },
];
