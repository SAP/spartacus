import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Review } from '../../../occ/occ-models/occ.models';

export const PRODUCT_REVIEWS_LIST_NORMALIZER = new InjectionToken<
  Converter<any, Review[]>
>('ProductReviewsList Normalizer');

export const PRODUCT_REVIEW_ADD_NORMALIZER = new InjectionToken<
  Converter<Review, any>
>('ProductReviewsAdd Normalizer');
