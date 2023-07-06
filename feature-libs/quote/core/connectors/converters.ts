/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import {
  Comment,
  OccQuote,
  Quote,
  QuoteActionType,
  QuoteDiscount,
  QuoteList,
  QuoteMetadata,
  QuoteStarter,
} from '@spartacus/quote/root';

export const QUOTE_NORMALIZER = new InjectionToken<Converter<OccQuote, Quote>>(
  'QuoteNormalizer'
);

export const QUOTE_LIST_NORMALIZER = new InjectionToken<
  Converter<any, QuoteList>
>('QuoteListNormalizer');

export const QUOTE_STARTER_SERIALIZER = new InjectionToken<
  Converter<any, QuoteStarter>
>('QuoteStarterSerializer');

export const QUOTE_METADATA_SERIALIZER = new InjectionToken<
  Converter<any, QuoteMetadata>
>('QuoteMetadataSerializer');

export const QUOTE_ACTION_SERIALIZER = new InjectionToken<
  Converter<any, QuoteActionType>
>('QuoteActionSerializer');

export const QUOTE_COMMENT_SERIALIZER = new InjectionToken<
  Converter<any, Comment>
>('QuoteCommentSerializer');

export const QUOTE_DISCOUNT_SERIALIZER = new InjectionToken<
  Converter<any, QuoteDiscount>
>('QuoteDiscountSerializer');
