import { Configurator } from '../../../../core/model/configurator.model';
/**
 * Service to provide unique keys for elements on the UI and for sending to configurator
 */
export declare class ConfiguratorAttributeBaseComponent {
    private static SEPERATOR;
    private static PREFIX;
    private static PREFIX_LABEL;
    private static PREFIX_OPTION_PRICE_VALUE;
    private static PREFIX_DDLB_OPTION_PRICE_VALUE;
    /**
     * Creates unique key for config value on the UI
     * @param prefix for key depending on usage (e.g. uiType, label)
     * @param attributeId
     * @param valueId
     */
    createValueUiKey(prefix: string, attributeId: string, valueId: string): string;
    /**
     * Creates unique key for config value to be sent to configurator
     * @param currentAttribute
     * @param value
     */
    createAttributeValueIdForConfigurator(currentAttribute: Configurator.Attribute, value: string): string;
    protected getUiType(attribute: Configurator.Attribute): string;
    /**
     * Creates unique key for config attribute on the UI
     * @param prefix for key depending on usage (e.g. uiType, label)
     * @param attributeId
     */
    createAttributeUiKey(prefix: string, attributeId: string): string;
    /**
     * Creates unique key for config attribute to be sent to configurator
     * @param currentAttribute
     */
    createAttributeIdForConfigurator(currentAttribute: Configurator.Attribute): string;
    /**
     * Creates unique key for attribute 'aria-labelledby'
     * @param prefix
     * @param attributeId
     * @param valueId
     * @param hasQuantity
     */
    createAriaLabelledBy(prefix: string, attributeId: string, valueId?: string, hasQuantity?: boolean): string;
    /**
     * Creates a unique key for focus handling for the given attribute and value
     * @param attributeId
     * @param valueCode
     * @returns focus key
     */
    createFocusId(attributeId: string, valueCode: string): string;
    /**
     * Retrieves label with or without technical name depending whether the expert mode is set or not.
     *
     * @param expMode - Is expert mode set?
     * @param label - value label
     * @param techName - value technical name
     * @param value - Configurator value
     */
    getLabel(expMode: boolean, label: string | undefined, techName: string | undefined, value?: Configurator.Value): string;
    /**
     * Fetches the first image for a given value
     * @param value Value
     * @returns Image
     */
    getImage(value: Configurator.Value): Configurator.Image | undefined;
    protected getValuePrice(value: Configurator.Value | undefined): string;
    /**
     * Get code from attribute.
     * The code is not a mandatory attribute (since not available for VC flavour),
     * still it is mandatory in the context of CPQ. Calling this method therefore only
     * makes sense when CPQ is active. In case the method is called in the wrong context, an exception will
     * be thrown
     *
     * @param {Configurator.Attribute} Attribute
     * @returns {number} Attribute code
     */
    protected getAttributeCode(attribute: Configurator.Attribute): number;
    /**
     * Checks if attribute type allows additional values
     * @param attribute Attribute
     * @returns true if attribute type allows to enter additional values
     */
    protected isWithAdditionalValues(attribute: Configurator.Attribute): boolean;
    protected isRequiredErrorMsg(attribute: Configurator.Attribute): boolean;
    protected isUserInput(attribute: Configurator.Attribute): boolean;
    protected isDropDown(attribute: Configurator.Attribute): boolean;
    protected getSelectedValue(attribute: Configurator.Attribute): Configurator.Value | undefined;
    protected isNoValueSelected(attribute: Configurator.Attribute): boolean;
}
