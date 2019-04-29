import { InjectionToken } from '@angular/core';
import { Suggestion } from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';
import { UIProductSearchPage } from '../../model/product-search-page';

export const PRODUCT_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, UIProductSearchPage>
>('ProductSearchPageNormalizer');

export const PRODUCT_SUGGESTION_NORMALIZER = new InjectionToken<
  Converter<any, Suggestion>
>('ProductSuggestionNormalizer');
