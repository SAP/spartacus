import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { TicketDetails, TicketList } from '@spartacus/customer-ticketing/root';

export const CUSTOMER_TICKETING_NORMALIZER = new InjectionToken<
  Converter<any, TicketDetails>
>('CustomerTicketingNormalizer');

export const CUSTOMER_TICKETING_LIST_NORMALIZER = new InjectionToken<
  Converter<any, TicketList>
>('CustomerTicketingListNormalizer');
