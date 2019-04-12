import { InjectionToken } from '@angular/core';
import {
  ProductSearchPage,
  SuggestionList,
} from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';

export const PRODUCT_SEARCH_NORMALIZER = new InjectionToken<
  Converter<any, ProductSearchPage>
>('ProductSearchNormalizer');

export const PRODUCT_SUGGESTIONS_LIST_NORMALIZER = new InjectionToken<
  Converter<any, SuggestionList>
>('ProductSuggestionsListNormalizer');
