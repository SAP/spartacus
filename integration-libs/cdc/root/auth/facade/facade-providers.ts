import { Provider } from '@angular/core';
import { CdcAuthFacade } from '../../facade/cdc-auth.facade';
import { CdcAuthService } from './cdc-auth.service';

export const facadeProviders: Provider[] = [
  CdcAuthService,
  {
    provide: CdcAuthFacade,
    useExisting: CdcAuthService,
  },
];
