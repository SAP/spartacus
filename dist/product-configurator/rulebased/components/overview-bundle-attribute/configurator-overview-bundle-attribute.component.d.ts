import { OnInit } from '@angular/core';
import { ImageGroup, Product, ProductService, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorOverviewBundleAttributeComponent implements OnInit {
    protected productService: ProductService;
    protected translation: TranslationService;
    product$: Observable<Product>;
    attributeOverview: Configurator.AttributeOverview;
    constructor(productService: ProductService, translation: TranslationService);
    ngOnInit(): void;
    /**
     * Returns primary image from product object
     *
     * @param {Product} product
     * @returns {(ImageGroup | ImageGroup[] | undefined)} - primary image. View can handle an undefined image
     */
    getProductPrimaryImage(product: Product): ImageGroup | ImageGroup[] | undefined;
    /**
     * Extract corresponding price formula parameters
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions;
    /**
     * Verifies whether the quantity should be displayed.
     *
     * @return {boolean} - 'true' if the quantity should be displayed, otherwise 'false'
     */
    displayQuantity(): boolean;
    /**
     * Verifies whether the item price should be displayed.
     *
     * @return {boolean} - 'true' if the item price price should be displayed, otherwise 'false'
     */
    displayPrice(): boolean;
    getAriaLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorOverviewBundleAttributeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorOverviewBundleAttributeComponent, "cx-configurator-cpq-overview-attribute", never, { "attributeOverview": "attributeOverview"; }, {}, never, never, false, never>;
}
