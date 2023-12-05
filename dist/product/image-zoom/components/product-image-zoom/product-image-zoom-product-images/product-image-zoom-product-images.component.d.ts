import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentProductService, ProductImagesComponent } from '@spartacus/storefront';
import { Product } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class ProductImageZoomProductImagesComponent extends ProductImagesComponent {
    protected currentProductService: CurrentProductService;
    expandImage: BehaviorSubject<boolean>;
    selectedIndex: number | undefined;
    product$: Observable<Product>;
    constructor(currentProductService: CurrentProductService);
    openImage(item: any): void;
    /**
     * Opens image zoom dialog.
     */
    triggerZoom(value: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductImageZoomProductImagesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductImageZoomProductImagesComponent, "cx-product-images", never, {}, {}, never, never, false, never>;
}
