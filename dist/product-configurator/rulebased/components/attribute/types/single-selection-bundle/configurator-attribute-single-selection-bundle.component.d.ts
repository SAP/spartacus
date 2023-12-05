import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeSingleSelectionBundleComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
    /**
     * Extract corresponding product card parameters
     *
     * @param {Configurator.Value} value - Value
     * @param {number} index - index of current value in list of values of attribute
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters(value: Configurator.Value, index: number): ConfiguratorAttributeProductCardComponentOptions;
    protected getFocusIdOfNearestValue(currentValue: Configurator.Value): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeSingleSelectionBundleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeSingleSelectionBundleComponent, "cx-configurator-attribute-single-selection-bundle", never, {}, {}, never, never, false, never>;
}
