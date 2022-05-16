import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import {
  Comment,
  Quote,
  QuoteAction,
  QuoteDiscount,
  QuoteList,
  QuoteMetadata,
  QuoteStarter,
} from '../model/commerce-quotes.model';

export const QUOTE_LIST_NORMALIZER = new InjectionToken<
  Converter<any, QuoteList>
>('QuoteListNormalizer');

export const QUOTE_NORMALIZER = new InjectionToken<Converter<any, Quote>>(
  'QuoteNormalizer'
);

export const QUOTE_STARTER_SERIALIZER = new InjectionToken<
  Converter<any, QuoteStarter>
>('QuoteStarterSerializer');

export const QUOTE_METADATA_SERIALIZER = new InjectionToken<
  Converter<any, QuoteMetadata>
>('QuoteMetadataSerializer');

export const QUOTE_ACTION_SERIALIZER = new InjectionToken<
  Converter<any, QuoteAction>
>('QuoteActionSerializer');

export const QUOTE_COMMENT_SERIALIZER = new InjectionToken<
  Converter<any, Comment>
>('QuoteCommentSerializer');

export const QUOTE_DISCOUNT_SERIALIZER = new InjectionToken<
  Converter<any, QuoteDiscount>
>('QuoteDiscountSerializer');
