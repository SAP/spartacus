import { Provider } from '@angular/core';
import { AsmCustomerListFacade } from '@spartacus/asm/root';
import { AsmCustomerListService } from './asm-customer-list.service';

export const facadeProviders: Provider[] = [
  AsmCustomerListService,
  {
    provide: AsmCustomerListFacade,
    useExisting: AsmCustomerListService,
  },
];
