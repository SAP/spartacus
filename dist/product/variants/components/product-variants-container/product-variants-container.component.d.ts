import { OnInit } from '@angular/core';
import { BaseOption, Product, VariantType } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ProductVariantsContainerComponent implements OnInit {
    private currentProductService;
    constructor(currentProductService: CurrentProductService);
    variants: {
        [key: string]: BaseOption;
    };
    variantType: typeof VariantType;
    product$: Observable<Product | null>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductVariantsContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductVariantsContainerComponent, "cx-product-variants-container", never, {}, {}, never, never, false, never>;
}
