import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { TicketDetails, TicketEvent } from '@spartacus/customer-ticketing/root';

export const CUSTOMER_TICKETING_NORMALIZER = new InjectionToken<
  Converter<any, TicketDetails>
>('CustomerTicketingNormalizer');

export const CUSTOMER_TICKETING_SERIALIZER = new InjectionToken<
  Converter<TicketEvent, any>
>('CustomerTicketingSerializer');
