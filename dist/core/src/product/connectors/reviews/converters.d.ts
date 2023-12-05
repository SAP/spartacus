import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Review } from '../../../model/product.model';
export declare const PRODUCT_REVIEW_NORMALIZER: InjectionToken<Converter<any, Review>>;
export declare const PRODUCT_REVIEW_SERIALIZER: InjectionToken<Converter<Review, any>>;
