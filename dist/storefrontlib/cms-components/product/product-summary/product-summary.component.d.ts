import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { ProductDetailOutlets } from '../product-outlets.model';
import * as i0 from "@angular/core";
export declare class ProductSummaryComponent {
    protected currentProductService: CurrentProductService;
    outlets: typeof ProductDetailOutlets;
    product$: Observable<Product | null>;
    constructor(currentProductService: CurrentProductService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductSummaryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductSummaryComponent, "cx-product-summary", never, {}, {}, never, never, false, never>;
}
