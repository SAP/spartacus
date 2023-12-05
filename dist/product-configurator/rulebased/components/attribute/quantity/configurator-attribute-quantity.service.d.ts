import { Configurator } from '../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeQuantityService {
    /**
     * Checks if the interaction with the quantity control needs
     * to be disabled
     * @param {any} value Selected value
     * @returns {boolean} Quantity actions disabled?
     */
    disableQuantityActions(value: any): boolean;
    /**
     * Checks if the interaction with the quantity control needs for multiselection components
     * to be disabled
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @returns {boolean} Quantity actions disabled?
     */
    disableQuantityActionsMultiSelection(attribute: Configurator.Attribute): boolean;
    /**
     * Checks if it is supposed to render a quantity control on attribute level
     *
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @return {boolean} - Display quantity picker on attribute level?
     */
    withQuantityOnAttributeLevel(attribute: Configurator.Attribute): boolean;
    /**
     * Checks if an attribute needs to be equipped with the option to select
     * a quantity
     * @param {Configurator.DataType} dataType Attribute data type
     * @param {Configurator.UiType} uiType Attribute ui type, refers to how an attribute must be rendered
     * @returns  {boolean} Render a quantity component?
     */
    withQuantity(dataType: Configurator.DataType, uiType: Configurator.UiType): boolean;
    /**
     * Checks if the zero quantity is allowed
     *
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @return {boolean} - true when zero quantity is allowed
     */
    allowZeroValueQuantity(attribute: Configurator.Attribute): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeQuantityService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorAttributeQuantityService>;
}
