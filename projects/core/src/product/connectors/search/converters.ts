import { InjectionToken } from '@angular/core';
import { SuggestionList } from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';
import { UIProductSearchPage } from '../../model/product-search-page';

export const PRODUCT_SEARCH_NORMALIZER = new InjectionToken<
  Converter<any, UIProductSearchPage>
>('ProductSearchNormalizer');

export const PRODUCT_SUGGESTIONS_LIST_NORMALIZER = new InjectionToken<
  Converter<any, SuggestionList>
>('ProductSuggestionsListNormalizer');
