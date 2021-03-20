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

export const facadeProviders = [
  UserEmailService,
  UserPasswordService,
  UserProfileService,
  UserRegisterService,
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
    useExisting: UserRegisterService,
  },
];
