import { BaseOption, Product, RoutingService, VariantOptionQualifier } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class ProductVariantColorSelectorComponent {
    private routingService;
    constructor(routingService: RoutingService);
    product: Product;
    variants: BaseOption;
    changeColor(code: string, name: string): null;
    getVariantOptionValue(qualifiers: VariantOptionQualifier[]): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductVariantColorSelectorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductVariantColorSelectorComponent, "cx-product-variant-color-selector", never, { "product": "product"; "variants": "variants"; }, {}, never, never, false, never>;
}
