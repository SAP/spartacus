import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { TranslationService } from '@spartacus/core';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeReadOnlyComponent extends ConfiguratorAttributeBaseComponent {
    protected translationService: TranslationService;
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext;
    attribute: Configurator.Attribute;
    group: string;
    expMode: boolean;
    constructor(translationService: TranslationService, attributeComponentContext: ConfiguratorAttributeCompositionContext);
    protected getCurrentValueName(attribute: Configurator.Attribute, value?: Configurator.Value): string;
    getAriaLabel(attribute: Configurator.Attribute, value?: Configurator.Value | undefined): string;
    protected translate(resourceKey: string, valueName: string, attribute: Configurator.Attribute, formattedPrice?: string): string;
    /**
     * Extract corresponding value price formula parameters.
     * For the read-only attribute types the complete price formula should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value: Configurator.Value): ConfiguratorPriceComponentOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeReadOnlyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeReadOnlyComponent, "cx-configurator-attribute-read-only", never, {}, {}, never, never, false, never>;
}
