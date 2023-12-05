import { OnChanges, SimpleChanges } from '@angular/core';
import { ProductListOutlets } from '../../product-outlets.model';
import { ProductListItemContextSource } from '../model/product-list-item-context-source.model';
import * as i0 from "@angular/core";
export declare class ProductListItemComponent implements OnChanges {
    protected productListItemContextSource: ProductListItemContextSource;
    readonly ProductListOutlets: typeof ProductListOutlets;
    product: any;
    constructor(productListItemContextSource: ProductListItemContextSource);
    ngOnChanges(changes?: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductListItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductListItemComponent, "cx-product-list-item", never, { "product": "product"; }, {}, never, never, false, never>;
}
