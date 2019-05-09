import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Suggestion, UIProductSearchPage } from '../../../model/product-search.model';


export const PRODUCT_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, UIProductSearchPage>
>('ProductSearchPageNormalizer');

export const PRODUCT_SUGGESTION_NORMALIZER = new InjectionToken<
  Converter<any, Suggestion>
>('ProductSuggestionNormalizer');
