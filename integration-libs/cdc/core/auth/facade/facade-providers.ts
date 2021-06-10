import { Provider } from '@angular/core';
import { CdcAuthFacade } from '@spartacus/cdc/root';
import { CdcAuthService } from './cdc-auth.service';

export const facadeProviders: Provider[] = [
  CdcAuthService,
  {
    provide: CdcAuthFacade,
    useExisting: CdcAuthService,
  },
];
