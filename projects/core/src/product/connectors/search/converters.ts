import { InjectionToken } from '@angular/core';

import {
  ProductSearchPage,
  Suggestion,
} from '../../../model/product-search.model';
import { Converter } from '../../../util/converter.service';

export const PRODUCT_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, ProductSearchPage>
>('ProductSearchPageNormalizer');

export const PRODUCT_SUGGESTION_NORMALIZER = new InjectionToken<
  Converter<any, Suggestion>
>('ProductSuggestionNormalizer');
