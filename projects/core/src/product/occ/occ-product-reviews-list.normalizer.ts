import { ReviewList, Review } from '../../occ/occ-models/occ.models';
import { Normalizer } from '../../util/normalizers.service';

export class OccProductReviewsListNormalizer extends Normalizer<
  ReviewList,
  Review[]
> {
  normalize(sources: ReviewList, targets: Review[] = []): Review[] {
    return sources.reviews.map((review, index) => ({
      ...targets[index],
      ...review,
    }));
  }
}
