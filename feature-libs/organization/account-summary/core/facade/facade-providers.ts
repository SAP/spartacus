import { Provider } from '@angular/core';
import { AccountSummaryFacade } from '../../root/facade';
import { AccountSummaryService } from './account-summary.service';

export const facadeProviders: Provider[] = [
  AccountSummaryService,
  {
    provide: AccountSummaryFacade,
    useExisting: AccountSummaryService,
  },
];
