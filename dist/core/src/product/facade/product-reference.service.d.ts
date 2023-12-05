import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductReference } from '../../model/product.model';
import { StateWithProduct } from '../store/product-state';
import * as i0 from "@angular/core";
export declare class ProductReferenceService {
    protected store: Store<StateWithProduct>;
    constructor(store: Store<StateWithProduct>);
    loadProductReferences(productCode: string, referenceType?: string, pageSize?: number): void;
    getProductReferences(productCode: string, referenceType: string): Observable<ProductReference[]>;
    cleanReferences(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductReferenceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductReferenceService>;
}
