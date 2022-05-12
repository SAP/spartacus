import { Provider } from '@angular/core';
import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationFacade } from '../../root/facade/user-registration.facade';

export const facadeProviders: Provider[] = [
  UserRegistrationService,
  {
    provide: UserRegistrationFacade,
    useExisting: UserRegistrationService,
  },
];
