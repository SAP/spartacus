import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { StoreCount, StoreFinderSearchPage } from '../model/store-finder.model';
export declare const STORE_FINDER_SEARCH_PAGE_NORMALIZER: InjectionToken<Converter<any, StoreFinderSearchPage>>;
export declare const STORE_COUNT_NORMALIZER: InjectionToken<Converter<any, StoreCount>>;
