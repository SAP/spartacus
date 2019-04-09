import { InjectionToken } from '@angular/core';
import { Normalizer } from '../../../util/normalizers.service';
import { Review } from '../../../occ/occ-models/occ.models';

export const PRODUCT_REVIEWS_LIST_NORMALIZER = new InjectionToken<
  Normalizer<any, Review[]>
>('ProductReviewsList Normalizer');

export const PRODUCT_REVIEW_ADD_NORMALIZER = new InjectionToken<
  Normalizer<Review, any>
>('ProductReviewsAdd Normalizer');
