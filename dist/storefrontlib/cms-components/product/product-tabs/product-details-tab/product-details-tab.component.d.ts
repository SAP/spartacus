import { OnInit } from '@angular/core';
import { CmsComponentWithChildren, CmsService, Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CurrentProductService } from '../../current-product.service';
import * as i0 from "@angular/core";
export declare class ProductDetailsTabComponent implements OnInit {
    protected currentProductService: CurrentProductService;
    protected componentData: CmsComponentData<CmsComponentWithChildren>;
    protected cmsService: CmsService;
    product$: Observable<Product | null>;
    constructor(currentProductService: CurrentProductService, componentData: CmsComponentData<CmsComponentWithChildren>, cmsService: CmsService);
    children$: Observable<any[]>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductDetailsTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductDetailsTabComponent, "cx-product-details-tab", never, {}, {}, never, never, false, never>;
}
