import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Review } from '../../model/product.model';
import { StateWithProduct } from '../store/product-state';
import * as i0 from "@angular/core";
export declare class ProductReviewService {
    protected store: Store<StateWithProduct>;
    constructor(store: Store<StateWithProduct>);
    getByProductCode(productCode: string): Observable<Review[]>;
    add(productCode: string, review: Review): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductReviewService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductReviewService>;
}
