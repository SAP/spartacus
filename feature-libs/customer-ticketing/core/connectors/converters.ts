import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import {
  AssociatedObjects,
  Category,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';

export const CUSTOMER_TICKETING_NORMALIZER = new InjectionToken<
  Converter<any, TicketDetails>
>('CustomerTicketingNormalizer');

export const CUSTOMER_TICKETING_CATEGORY_NORMALIZER = new InjectionToken<
  Converter<any, Category>
>('CustomerTicketingCategoryNormalizer');

export const CUSTOMER_TICKETING_ASSOCIATED_OBJECTS_NORMALIZER =
  new InjectionToken<Converter<any, AssociatedObjects>>(
    'CustomerTicketingAssociatedObjectsNormalizer'
  );
