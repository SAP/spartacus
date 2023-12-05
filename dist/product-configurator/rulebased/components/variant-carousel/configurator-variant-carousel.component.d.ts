import { Product, ProductService, TranslationService } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorVariantCarouselComponent {
    protected productService: ProductService;
    protected translationService: TranslationService;
    protected configuratorRouterExtractorService: ConfiguratorRouterExtractorService;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    configuration$: Observable<Configurator.Configuration>;
    title$: Observable<string | undefined>;
    items$: Observable<Observable<Product | undefined>[]>;
    constructor(productService: ProductService, translationService: TranslationService, configuratorRouterExtractorService: ConfiguratorRouterExtractorService, configuratorCommonsService: ConfiguratorCommonsService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorVariantCarouselComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorVariantCarouselComponent, "cx-configurator-variant-carousel", never, {}, {}, never, never, false, never>;
}
