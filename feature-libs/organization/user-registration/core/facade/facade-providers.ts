import { Provider } from '@angular/core';
import { UserRegistrationFacade } from '@spartacus/organization/user-registration/root';
import { UserRegistrationService } from './user-registration.service';

export const facadeProviders: Provider[] = [
  UserRegistrationService,
  {
    provide: UserRegistrationFacade,
    useExisting: UserRegistrationService,
  },
];
