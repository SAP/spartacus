import { UserAccountService } from './user-account.service';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Provider } from '@angular/core';

export const facadeProviders: Provider[] = [
  UserAccountService,
  {
    provide: UserAccountFacade,
    useExisting: UserAccountService,
  },
];
