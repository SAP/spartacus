import { Provider } from '@angular/core';
import { CustomerTicketingFacade } from '@spartacus/customer-ticketing/root';
import { CustomerTicketingService } from './customer-ticketing.service';

export const facadeProviders: Provider[] = [
  CustomerTicketingService,
  {
    provide: CustomerTicketingFacade,
    useExisting: CustomerTicketingService,
  },
];
