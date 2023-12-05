import { Observable } from 'rxjs';
import { Review } from '../../../model/product.model';
export declare abstract class ProductReviewsAdapter {
    /**
     * Abstract method used to load reviews for a given product.
     * Reviews can be loaded from alternative sources, as long as the structure
     * converts to the `Review[]`.
     *
     * @param productCode The `productCode` for given product
     * @param maxCount Maximum number of review to load
     */
    abstract load(productCode: string, maxCount?: number): Observable<Review[]>;
    /**
     * Abstract method used to post review for a given product.
     *
     * @param productCode The `productCode` for given product
     * @param review Review to post
     */
    abstract post(productCode: string, review: any): Observable<Review>;
}
