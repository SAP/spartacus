import { Product } from '@spartacus/core';
import { CurrentProductService, ProductListItemContext } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import * as i0 from "@angular/core";
export declare class ConfigureProductComponent {
    protected productListItemContext: ProductListItemContext;
    protected currentProductService: CurrentProductService;
    nonConfigurable: Product;
    product$: Observable<Product>;
    ownerTypeProduct: CommonConfigurator.OwnerType;
    constructor(productListItemContext: ProductListItemContext, // when on PLP
    currentProductService: CurrentProductService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigureProductComponent, [{ optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfigureProductComponent, "cx-configure-product", never, {}, {}, never, never, false, never>;
}
