import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import {
  AssociatedObject,
  Category,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';

export const CUSTOMER_TICKETING_DETAILS_NORMALIZER = new InjectionToken<
  Converter<any, TicketDetails>
>('CustomerTicketingDetailsNormalizer');

export const CUSTOMER_TICKETING_EVENT_NORMALIZER = new InjectionToken<
  Converter<any, TicketDetails>
>('CustomerTicketingEventNormalizer');

export const CUSTOMER_TICKETING_FILE_NORMALIZER = new InjectionToken<
  Converter<any, File>
>('CustomerTicketingFileNormalizer');

export const CUSTOMER_TICKETING_CATEGORY_NORMALIZER = new InjectionToken<
  Converter<any, Category>
>('CustomerTicketingCategoryNormalizer');

export const CUSTOMER_TICKETING_ASSOCIATED_OBJECTS_NORMALIZER =
  new InjectionToken<Converter<any, AssociatedObject>>(
    'CustomerTicketingAssociatedObjectsNormalizer'
  );
