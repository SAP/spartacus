import { Observable } from 'rxjs';

export abstract class ProductReviewsAdapter {
  abstract loadList(productCode: string, maxCount?: number): Observable<any>;
  abstract post(productCode: string, review: any): Observable<any>;
}
