import { UserAccountService } from './user-account.service';
import { UserAccountFacade } from '@spartacus/user/account/root';

export const facadeProviders = [
  UserAccountService,
  {
    provide: UserAccountFacade,
    useExisting: UserAccountService,
  },
];
