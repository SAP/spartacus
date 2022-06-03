import { Provider } from '@angular/core';
import { CommerceQuotesFacade } from '../../root/facade/commerce-quotes.facade';
import { CommerceQuotesService } from './commerce-quotes.service';

export const facadeProviders: Provider[] = [
  CommerceQuotesService,
  {
    provide: CommerceQuotesFacade,
    useExisting: CommerceQuotesService,
  },
];
