import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Review } from '../../../occ/occ-models/occ.models';

export const PRODUCT_REVIEWS_LIST_NORMALIZE = new InjectionToken<
  Converter<any, Review[]>
>('ProductReviewsListNormalize');

export const PRODUCT_REVIEW_ADD_SERIALIZE = new InjectionToken<
  Converter<Review, any>
>('ProductReviewsAddSerialize');
