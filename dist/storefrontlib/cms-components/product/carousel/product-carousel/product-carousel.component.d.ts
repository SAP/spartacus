import { CmsProductCarouselComponent as model, Product, ProductScope, ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import * as i0 from "@angular/core";
export declare class ProductCarouselComponent {
    protected componentData: CmsComponentData<model>;
    protected productService: ProductService;
    protected readonly PRODUCT_SCOPE: ProductScope[];
    private componentData$;
    /**
     * returns an Observable string for the title.
     */
    title$: Observable<string | undefined>;
    /**
     * Observable that holds an Array of Observables. This is done, so that
     * the component UI could consider to lazy load the UI components when they're
     * in the viewpoint.
     */
    items$: Observable<Observable<Product | undefined>[]>;
    constructor(componentData: CmsComponentData<model>, productService: ProductService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductCarouselComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductCarouselComponent, "cx-product-carousel", never, {}, {}, never, never, false, never>;
}
