import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeCheckBoxComponent extends ConfiguratorAttributeBaseComponent implements OnInit {
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    attribute: Configurator.Attribute;
    group: string;
    ownerKey: string;
    expMode: boolean;
    attributeValue: Configurator.Value;
    attributeCheckBoxForm: UntypedFormControl;
    constructor(attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService);
    ngOnInit(): void;
    /**
     * Fired when a check box has been selected i.e. when a value has been set
     */
    onSelect(): void;
    protected getValueFromAttribute(): Configurator.Value;
    protected assembleSingleValue(): Configurator.Value[];
    /**
     * Extract corresponding value price formula parameters.
     * For the multi-selection attribute types the complete price formula should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value: Configurator.Value): ConfiguratorPriceComponentOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeCheckBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeCheckBoxComponent, "cx-configurator-attribute-checkbox", never, {}, {}, never, never, false, never>;
}
