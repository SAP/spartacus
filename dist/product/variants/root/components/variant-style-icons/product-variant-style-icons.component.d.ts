import { OnDestroy, OnInit } from '@angular/core';
import { OccConfig, Product, VariantOption, VariantOptionQualifier } from '@spartacus/core';
import { ProductListItemContext, ProductListOutlets } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ProductVariantStyleIconsComponent implements OnInit, OnDestroy {
    private config;
    protected productListItemContext?: ProductListItemContext | undefined;
    constructor(config: OccConfig, productListItemContext?: ProductListItemContext | undefined);
    protected subscriptions: Subscription;
    readonly ProductListOutlets: typeof ProductListOutlets;
    readonly product$: Observable<Product>;
    variants: VariantOption[];
    variantNames: {
        [key: string]: string;
    };
    ngOnInit(): void;
    private setVariantsNames;
    getVariantThumbnailUrl(variantOptionQualifiers: VariantOptionQualifier[]): string;
    private getVariantName;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductVariantStyleIconsComponent, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductVariantStyleIconsComponent, "cx-variant-style-icons", never, { "variants": "variants"; }, {}, never, never, false, never>;
}
