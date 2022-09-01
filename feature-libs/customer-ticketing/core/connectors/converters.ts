import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { TicketDetails } from '@spartacus/customer-ticketing/root';

export const CUSTOMER_TICKETING_NORMALIZER = new InjectionToken<
  Converter<any, TicketDetails>
>('CustomerTicketingNormalizer');
