import { Provider } from '@angular/core';
import {
  UserEmailFacade,
  UserNotificationPreferenceFacade,
  UserPasswordFacade,
  UserProfileFacade,
  UserRegisterFacade,
} from '@spartacus/user/profile/root';
import { UserEmailService } from './user-email.service';
import { UserNotificationPreferenceService } from './user-notification-preference.service';
import { UserPasswordService } from './user-password.service';
import { UserProfileService } from './user-profile.service';
import { UserRegisterService } from './user-register.service';

export const facadeProviders: Provider[] = [
  UserEmailService,
  UserPasswordService,
  UserProfileService,
  UserRegisterService,
  UserNotificationPreferenceService,
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
  {
    provide: UserNotificationPreferenceFacade,
    useExisting: UserNotificationPreferenceService,
  },
];
