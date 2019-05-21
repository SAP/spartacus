import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Review } from '../../../model/product.model';

export const PRODUCT_REVIEW_NORMALIZER = new InjectionToken<
  Converter<any, Review>
>('ProductReviewNormalizer');

export const PRODUCT_REVIEW_SERIALIZER = new InjectionToken<
  Converter<Review, any>
>('ProductReviewSerializer');
