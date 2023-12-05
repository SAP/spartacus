import { BaseOption, OccConfig, ProductService, RoutingService, VariantOptionQualifier, VariantQualifier } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class ProductVariantStyleSelectorComponent {
    private config;
    private productService;
    private routingService;
    constructor(config: OccConfig, productService: ProductService, routingService: RoutingService);
    variantQualifier: typeof VariantQualifier;
    variants: BaseOption;
    getVariantOptionValue(qualifiers: VariantOptionQualifier[]): string | undefined;
    getVariantThumbnailUrl(variantOptionQualifiers: VariantOptionQualifier[]): string;
    changeStyle(code: string): null;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductVariantStyleSelectorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductVariantStyleSelectorComponent, "cx-product-variant-style-selector", never, { "variants": "variants"; }, {}, never, never, false, never>;
}
