import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';
export declare const PRODUCT_INTERESTS_NORMALIZER: InjectionToken<Converter<any, ProductInterestSearchResult>>;
