import { InjectionToken } from '@angular/core';

import { Review } from '../../../model/product.model';
import { Converter } from '../../../util/converter.service';

export const PRODUCT_REVIEW_NORMALIZER = new InjectionToken<
  Converter<any, Review>
>('ProductReviewNormalizer');

export const PRODUCT_REVIEW_SERIALIZER = new InjectionToken<
  Converter<Review, any>
>('ProductReviewSerializer');
