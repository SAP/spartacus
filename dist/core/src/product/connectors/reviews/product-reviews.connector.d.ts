import { Observable } from 'rxjs';
import { ProductReviewsAdapter } from './product-reviews.adapter';
import { Review } from '../../../model/product.model';
import * as i0 from "@angular/core";
export declare class ProductReviewsConnector {
    protected adapter: ProductReviewsAdapter;
    constructor(adapter: ProductReviewsAdapter);
    get(productCode: string, maxCount?: number): Observable<Review[]>;
    add(productCode: string, review: any): Observable<Review>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductReviewsConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductReviewsConnector>;
}
