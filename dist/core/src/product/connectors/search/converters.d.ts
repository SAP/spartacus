import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Suggestion, ProductSearchPage } from '../../../model/product-search.model';
export declare const PRODUCT_SEARCH_PAGE_NORMALIZER: InjectionToken<Converter<any, ProductSearchPage>>;
export declare const PRODUCT_SUGGESTION_NORMALIZER: InjectionToken<Converter<any, Suggestion>>;
