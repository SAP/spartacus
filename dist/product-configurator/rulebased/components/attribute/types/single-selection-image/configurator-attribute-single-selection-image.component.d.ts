import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeSingleSelectionImageComponent extends ConfiguratorAttributeBaseComponent implements OnInit {
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    attributeRadioButtonForm: UntypedFormControl;
    attribute: Configurator.Attribute;
    ownerKey: string;
    expMode: boolean;
    constructor(attributeComponentContext: ConfiguratorAttributeCompositionContext, configuratorCommonsService: ConfiguratorCommonsService);
    ngOnInit(): void;
    /**
     * Submits a value.
     *
     * @param {string} value - Selected value
     */
    onClick(value: string): void;
    extractValuePriceFormulaParameters(value?: Configurator.Value): ConfiguratorPriceComponentOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeSingleSelectionImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeSingleSelectionImageComponent, "cx-configurator-attribute-single-selection-image", never, {}, {}, never, never, false, never>;
}
