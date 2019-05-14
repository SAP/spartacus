import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import {
  Suggestion,
  ProductSearchPage,
} from '../../../model/product-search.model';

export const PRODUCT_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, ProductSearchPage>
>('ProductSearchPageNormalizer');

export const PRODUCT_SUGGESTION_NORMALIZER = new InjectionToken<
  Converter<any, Suggestion>
>('ProductSuggestionNormalizer');
