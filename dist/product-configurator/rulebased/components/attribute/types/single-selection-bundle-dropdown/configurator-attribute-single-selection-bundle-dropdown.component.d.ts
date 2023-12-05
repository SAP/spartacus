import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeSingleSelectionBundleDropdownComponent extends ConfiguratorAttributeSingleSelectionBaseComponent implements OnInit {
    protected quantityService: ConfiguratorAttributeQuantityService;
    protected translation: TranslationService;
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorStorefrontUtilsService?: ConfiguratorStorefrontUtilsService | undefined;
    readonly RETRACT_VALUE_CODE = "###RETRACT_VALUE_CODE###";
    attributeDropDownForm: UntypedFormControl;
    selectionValue?: Configurator.Value;
    group: string;
    constructor(quantityService: ConfiguratorAttributeQuantityService, translation: TranslationService, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService, configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService);
    /**
     * @deprecated since 6.2
     */
    constructor(quantityService: ConfiguratorAttributeQuantityService, translation: TranslationService, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService);
    ngOnInit(): void;
    /**
     * Returns selected value. We assume that when this method is called,
     * a selection has been made before. In case this assumption is false,
     * an error is thrown
     * @returns selected value
     */
    get selectedValue(): Configurator.Value;
    /**
     * Extract corresponding product card parameters
     *
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters(): ConfiguratorAttributeProductCardComponentOptions;
    /**
     * Verifies whether a selection value is defined and its value code is not a retract one.
     *
     * @returns {boolean} - 'True' if a selection value is defined and its value code is not a retract one, otherwise 'false'.
     */
    isNotRetractValue(): boolean;
    /**
     * Verifies whether a value code is a retract one.
     *
     * @param {string} valueCode - Value code
     * @returns {boolean} - 'True' if a value code is a retract one, otherwise 'false'.
     */
    isRetractValue(valueCode: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeSingleSelectionBundleDropdownComponent, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeSingleSelectionBundleDropdownComponent, "cx-configurator-attribute-single-selection-bundle-dropdown", never, {}, {}, never, never, false, never>;
}
