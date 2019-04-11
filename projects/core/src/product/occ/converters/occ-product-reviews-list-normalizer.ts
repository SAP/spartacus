import { ReviewList, Review } from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';

export class OccProductReviewsListNormalizer
  implements Converter<ReviewList, Review[]> {
  convert(sources: ReviewList, targets: Review[] = []): Review[] {
    return sources.reviews.map((review, index) => ({
      ...targets[index],
      ...review,
    }));
  }
}
