/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import {
  AssociatedObject,
  Category,
  TicketDetails,
  TicketEvent,
  TicketList,
  TicketStarter,
} from '@spartacus/customer-ticketing/root';

export const CUSTOMER_TICKETING_DETAILS_NORMALIZER = new InjectionToken<
  Converter<any, TicketDetails>
>('CustomerTicketingDetailsNormalizer');

export const CUSTOMER_TICKETING_EVENT_NORMALIZER = new InjectionToken<
  Converter<any, TicketEvent>
>('CustomerTicketingEventNormalizer');

export const CUSTOMER_TICKETING_FILE_NORMALIZER = new InjectionToken<
  Converter<any, File>
>('CustomerTicketingFileNormalizer');

export const CUSTOMER_TICKETING_LIST_NORMALIZER = new InjectionToken<
  Converter<any, TicketList>
>('CustomerTicketingListNormalizer');

export const CUSTOMER_TICKETING_CATEGORY_NORMALIZER = new InjectionToken<
  Converter<any, Category>
>('CustomerTicketingCategoryNormalizer');

export const CUSTOMER_TICKETING_ASSOCIATED_OBJECTS_NORMALIZER =
  new InjectionToken<Converter<any, AssociatedObject>>(
    'CustomerTicketingAssociatedObjectsNormalizer'
  );

export const CUSTOMER_TICKETING_CREATE_NORMALIZER = new InjectionToken<
  Converter<any, TicketStarter>
>('CustomerTicketingCreateNormalizer');
