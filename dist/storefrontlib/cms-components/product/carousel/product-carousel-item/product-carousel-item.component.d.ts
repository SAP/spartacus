import { OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '@spartacus/core';
import { ProductListItemContextSource } from '../../product-list';
import * as i0 from "@angular/core";
export declare class ProductCarouselItemComponent implements OnChanges {
    protected productListItemContextSource: ProductListItemContextSource;
    item: Product;
    constructor(productListItemContextSource: ProductListItemContextSource);
    ngOnChanges(changes?: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductCarouselItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductCarouselItemComponent, "cx-product-carousel-item", never, { "item": "item"; }, {}, never, never, false, never>;
}
