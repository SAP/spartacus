import { Observable } from 'rxjs';
import { Review, ReviewList } from '../../occ/occ-models/occ.models';

export abstract class ProductReviewsAdapter {
  abstract loadList(productCode: string, maxCount?: number): Observable<ReviewList>;
  abstract post(productCode: string, review: any): Observable<Review>;
}
