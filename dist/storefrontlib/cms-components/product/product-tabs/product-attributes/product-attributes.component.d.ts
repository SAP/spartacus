import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';
import * as i0 from "@angular/core";
export declare class ProductAttributesComponent {
    protected currentProductService: CurrentProductService;
    product$: Observable<Product | null>;
    constructor(currentProductService: CurrentProductService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductAttributesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductAttributesComponent, "cx-product-attributes", never, {}, {}, never, never, false, never>;
}
