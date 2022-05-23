import { Provider } from '@angular/core';
import { CdcAuthFacade } from '@spartacus/cdc/root';
import { UserRegisterFacade } from 'feature-libs/user/profile/root';
import { CDCUserRegisterService } from '../services/user-authentication/cdc-user-register.service';
import { CdcAuthService } from './cdc-auth.service';

export const facadeProviders: Provider[] = [
  CdcAuthService,
  {
    provide: CdcAuthFacade,
    useExisting: CdcAuthService,
  },
  {
    provide: UserRegisterFacade,
    useExisting: CDCUserRegisterService,
  },
];
