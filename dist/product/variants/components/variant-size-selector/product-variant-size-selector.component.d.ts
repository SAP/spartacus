import { BaseOption, Product, ProductService, RoutingService, VariantOptionQualifier } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class ProductVariantSizeSelectorComponent {
    private productService;
    private routingService;
    constructor(productService: ProductService, routingService: RoutingService);
    product: Product;
    variants: BaseOption;
    changeSize(code: string): null;
    getVariantOptionValue(qualifiers: VariantOptionQualifier[]): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductVariantSizeSelectorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductVariantSizeSelectorComponent, "cx-product-variant-size-selector", never, { "product": "product"; "variants": "variants"; }, {}, never, never, false, never>;
}
