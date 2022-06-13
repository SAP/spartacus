import { Provider } from '@angular/core';
import { CommerceQuotesFacade } from '@spartacus/commerce-quotes/root';
import { CommerceQuotesService } from './commerce-quotes.service';

export const facadeProviders: Provider[] = [
  CommerceQuotesService,
  {
    provide: CommerceQuotesFacade,
    useExisting: CommerceQuotesService,
  },
  CommerceQuotesService,
];
