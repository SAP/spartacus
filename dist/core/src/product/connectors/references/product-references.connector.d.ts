import { Observable } from 'rxjs';
import { ProductReference } from '../../../model/product.model';
import { ProductReferencesAdapter } from './product-references.adapter';
import * as i0 from "@angular/core";
export declare class ProductReferencesConnector {
    protected adapter: ProductReferencesAdapter;
    constructor(adapter: ProductReferencesAdapter);
    get(productCode: string, referenceType?: string, pageSize?: number): Observable<ProductReference[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductReferencesConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductReferencesConnector>;
}
