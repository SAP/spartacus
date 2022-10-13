import { Provider } from '@angular/core';
import { AccountSummaryFacade } from '@spartacus/organization/account-summary/root';
import { AccountSummaryService } from './account-summary.service';

export const facadeProviders: Provider[] = [
  AccountSummaryService,
  {
    provide: AccountSummaryFacade,
    useExisting: AccountSummaryService,
  },
];
