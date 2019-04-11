import { Observable } from 'rxjs';
import { Review } from '../../../occ/occ-models/occ.models';

export abstract class ProductReviewsAdapter {
  abstract load(productCode: string, maxCount?: number): Observable<Review[]>;
  abstract post(productCode: string, review: any): Observable<Review>;
}
