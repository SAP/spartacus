import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeMultiSelectionImageComponent extends ConfiguratorAttributeBaseComponent implements OnInit {
    protected configUtilsService: ConfiguratorStorefrontUtilsService;
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    attribute: Configurator.Attribute;
    ownerKey: string;
    expMode: boolean;
    constructor(configUtilsService: ConfiguratorStorefrontUtilsService, attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService);
    attributeCheckBoxForms: UntypedFormControl[];
    ngOnInit(): void;
    /**
     * Fired when a value has been selected
     * @param index Index of selected value
     */
    onSelect(index: number): void;
    extractValuePriceFormulaParameters(value: Configurator.Value): ConfiguratorPriceComponentOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeMultiSelectionImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeMultiSelectionImageComponent, "cx-configurator-attribute-multi-selection-image", never, {}, {}, never, never, false, never>;
}
