import { Product, ProductService } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorProductTitleComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected productService: ProductService;
    protected configExpertModeService: ConfiguratorExpertModeService;
    ghostStyle: boolean;
    configuration$: Observable<Configurator.Configuration>;
    product$: Observable<Product | undefined>;
    showMore: boolean;
    iconTypes: typeof ICON_TYPE;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configRouterExtractorService: ConfiguratorRouterExtractorService, productService: ProductService, configExpertModeService: ConfiguratorExpertModeService);
    triggerDetails(): void;
    get expMode(): Observable<boolean> | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorProductTitleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorProductTitleComponent, "cx-configurator-product-title", never, {}, {}, never, never, false, never>;
}
