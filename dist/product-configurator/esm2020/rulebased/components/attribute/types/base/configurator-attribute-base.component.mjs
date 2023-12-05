/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Configurator } from '../../../../core/model/configurator.model';
/**
 * Service to provide unique keys for elements on the UI and for sending to configurator
 */
export class ConfiguratorAttributeBaseComponent {
    /**
     * Creates unique key for config value on the UI
     * @param prefix for key depending on usage (e.g. uiType, label)
     * @param attributeId
     * @param valueId
     */
    createValueUiKey(prefix, attributeId, valueId) {
        return (this.createAttributeUiKey(prefix, attributeId) +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            valueId);
    }
    /**
     * Creates unique key for config value to be sent to configurator
     * @param currentAttribute
     * @param value
     */
    createAttributeValueIdForConfigurator(currentAttribute, value) {
        return this.createValueUiKey(this.getUiType(currentAttribute), currentAttribute.name, value);
    }
    getUiType(attribute) {
        return attribute.uiType
            ? attribute.uiType
            : Configurator.UiType.NOT_IMPLEMENTED;
    }
    /**
     * Creates unique key for config attribute on the UI
     * @param prefix for key depending on usage (e.g. uiType, label)
     * @param attributeId
     */
    createAttributeUiKey(prefix, attributeId) {
        return (ConfiguratorAttributeBaseComponent.PREFIX +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            prefix +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            attributeId);
    }
    /**
     * Creates unique key for config attribute to be sent to configurator
     * @param currentAttribute
     */
    createAttributeIdForConfigurator(currentAttribute) {
        return this.createAttributeUiKey(this.getUiType(currentAttribute), currentAttribute.name);
    }
    /**
     * Creates unique key for attribute 'aria-labelledby'
     * @param prefix
     * @param attributeId
     * @param valueId
     * @param hasQuantity
     */
    createAriaLabelledBy(prefix, attributeId, valueId, hasQuantity) {
        let attributeUiKey = this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_LABEL, attributeId);
        if (valueId) {
            attributeUiKey +=
                ' ' +
                    this.createAttributeUiKey(prefix, attributeId) +
                    ConfiguratorAttributeBaseComponent.SEPERATOR +
                    valueId +
                    ' ';
            if (typeof hasQuantity === 'boolean' && !hasQuantity) {
                attributeUiKey +=
                    this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_DDLB_OPTION_PRICE_VALUE, attributeId) +
                        ConfiguratorAttributeBaseComponent.SEPERATOR +
                        valueId;
            }
            else {
                attributeUiKey +=
                    this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_OPTION_PRICE_VALUE, attributeId) +
                        ConfiguratorAttributeBaseComponent.SEPERATOR +
                        valueId;
            }
        }
        return attributeUiKey;
    }
    /**
     * Creates a unique key for focus handling for the given attribute and value
     * @param attributeId
     * @param valueCode
     * @returns focus key
     */
    createFocusId(attributeId, valueCode) {
        return `${attributeId}--${valueCode}--focus`;
    }
    /**
     * Retrieves label with or without technical name depending whether the expert mode is set or not.
     *
     * @param expMode - Is expert mode set?
     * @param label - value label
     * @param techName - value technical name
     * @param value - Configurator value
     */
    getLabel(expMode, label, techName, value) {
        let title = label ? label : '';
        if (expMode && techName) {
            title += ` / [${techName}]`;
        }
        title += this.getValuePrice(value);
        return title;
    }
    /**
     * Fetches the first image for a given value
     * @param value Value
     * @returns Image
     */
    getImage(value) {
        const images = value.images;
        return images ? images[0] : undefined;
    }
    getValuePrice(value) {
        if (value?.valuePrice?.value && !value.selected) {
            if (value.valuePrice.value < 0) {
                return ` [${value.valuePrice?.formattedValue}]`;
            }
            else if (value.valuePrice.value > 0) {
                return ` [+${value.valuePrice?.formattedValue}]`;
            }
        }
        return '';
    }
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
    getAttributeCode(attribute) {
        const code = attribute.attrCode;
        if (code) {
            return code;
        }
        else {
            throw new Error('No attribute code for: ' + attribute.name);
        }
    }
    /**
     * Checks if attribute type allows additional values
     * @param attribute Attribute
     * @returns true if attribute type allows to enter additional values
     */
    isWithAdditionalValues(attribute) {
        const uiType = attribute.uiType;
        return (uiType === Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT ||
            uiType === Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT);
    }
    isRequiredErrorMsg(attribute) {
        return (attribute.required && attribute.incomplete) || false;
    }
    isUserInput(attribute) {
        return (attribute.uiType === Configurator.UiType.STRING ||
            attribute.uiType === Configurator.UiType.NUMERIC);
    }
    isDropDown(attribute) {
        return (attribute.uiType === Configurator.UiType.DROPDOWN ||
            attribute.uiType === Configurator.UiType.DROPDOWN_PRODUCT);
    }
    getSelectedValue(attribute) {
        return attribute.values?.find((value) => value.selected);
    }
    isNoValueSelected(attribute) {
        const selectedValue = this.getSelectedValue(attribute);
        if (selectedValue) {
            return selectedValue.valueCode === Configurator.RetractValueCode;
        }
        return true;
    }
}
ConfiguratorAttributeBaseComponent.SEPERATOR = '--';
ConfiguratorAttributeBaseComponent.PREFIX = 'cx-configurator';
ConfiguratorAttributeBaseComponent.PREFIX_LABEL = 'label';
ConfiguratorAttributeBaseComponent.PREFIX_OPTION_PRICE_VALUE = 'price--optionsPriceValue';
ConfiguratorAttributeBaseComponent.PREFIX_DDLB_OPTION_PRICE_VALUE = 'option--price';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1iYXNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9hdHRyaWJ1dGUvdHlwZXMvYmFzZS9jb25maWd1cmF0b3ItYXR0cmlidXRlLWJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFekU7O0dBRUc7QUFFSCxNQUFNLE9BQU8sa0NBQWtDO0lBTzdDOzs7OztPQUtHO0lBQ0gsZ0JBQWdCLENBQ2QsTUFBYyxFQUNkLFdBQW1CLEVBQ25CLE9BQWU7UUFFZixPQUFPLENBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUM7WUFDOUMsa0NBQWtDLENBQUMsU0FBUztZQUM1QyxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gscUNBQXFDLENBQ25DLGdCQUF3QyxFQUN4QyxLQUFhO1FBRWIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsRUFDaEMsZ0JBQWdCLENBQUMsSUFBSSxFQUNyQixLQUFLLENBQ04sQ0FBQztJQUNKLENBQUM7SUFFUyxTQUFTLENBQUMsU0FBaUM7UUFDbkQsT0FBTyxTQUFTLENBQUMsTUFBTTtZQUNyQixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU07WUFDbEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsb0JBQW9CLENBQUMsTUFBYyxFQUFFLFdBQW1CO1FBQ3RELE9BQU8sQ0FDTCxrQ0FBa0MsQ0FBQyxNQUFNO1lB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Q0FBQztJQUVTLGlCQUFpQixDQUFDLFNBQWlDO1FBQzNELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxJQUFJLGFBQWEsRUFBRTtZQUNqQixPQUFPLGFBQWEsQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLGdCQUFnQixDQUFDO1NBQ2xFO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztBQTFPYyw0Q0FBUyxHQUFHLElBQUksQ0FBQztBQUNqQix5Q0FBTSxHQUFHLGlCQUFpQixDQUFDO0FBQzNCLCtDQUFZLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLDREQUF5QixHQUFHLDBCQUEwQixDQUFDO0FBQ3ZELGlFQUE4QixHQUFHLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIHByb3ZpZGUgdW5pcXVlIGtleXMgZm9yIGVsZW1lbnRzIG9uIHRoZSBVSSBhbmQgZm9yIHNlbmRpbmcgdG8gY29uZmlndXJhdG9yXG4gKi9cblxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQge1xuICBwcml2YXRlIHN0YXRpYyBTRVBFUkFUT1IgPSAnLS0nO1xuICBwcml2YXRlIHN0YXRpYyBQUkVGSVggPSAnY3gtY29uZmlndXJhdG9yJztcbiAgcHJpdmF0ZSBzdGF0aWMgUFJFRklYX0xBQkVMID0gJ2xhYmVsJztcbiAgcHJpdmF0ZSBzdGF0aWMgUFJFRklYX09QVElPTl9QUklDRV9WQUxVRSA9ICdwcmljZS0tb3B0aW9uc1ByaWNlVmFsdWUnO1xuICBwcml2YXRlIHN0YXRpYyBQUkVGSVhfRERMQl9PUFRJT05fUFJJQ0VfVkFMVUUgPSAnb3B0aW9uLS1wcmljZSc7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdW5pcXVlIGtleSBmb3IgY29uZmlnIHZhbHVlIG9uIHRoZSBVSVxuICAgKiBAcGFyYW0gcHJlZml4IGZvciBrZXkgZGVwZW5kaW5nIG9uIHVzYWdlIChlLmcuIHVpVHlwZSwgbGFiZWwpXG4gICAqIEBwYXJhbSBhdHRyaWJ1dGVJZFxuICAgKiBAcGFyYW0gdmFsdWVJZFxuICAgKi9cbiAgY3JlYXRlVmFsdWVVaUtleShcbiAgICBwcmVmaXg6IHN0cmluZyxcbiAgICBhdHRyaWJ1dGVJZDogc3RyaW5nLFxuICAgIHZhbHVlSWQ6IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmNyZWF0ZUF0dHJpYnV0ZVVpS2V5KHByZWZpeCwgYXR0cmlidXRlSWQpICtcbiAgICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQuU0VQRVJBVE9SICtcbiAgICAgIHZhbHVlSWRcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdW5pcXVlIGtleSBmb3IgY29uZmlnIHZhbHVlIHRvIGJlIHNlbnQgdG8gY29uZmlndXJhdG9yXG4gICAqIEBwYXJhbSBjdXJyZW50QXR0cmlidXRlXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgY3JlYXRlQXR0cmlidXRlVmFsdWVJZEZvckNvbmZpZ3VyYXRvcihcbiAgICBjdXJyZW50QXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlLFxuICAgIHZhbHVlOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVWYWx1ZVVpS2V5KFxuICAgICAgdGhpcy5nZXRVaVR5cGUoY3VycmVudEF0dHJpYnV0ZSksXG4gICAgICBjdXJyZW50QXR0cmlidXRlLm5hbWUsXG4gICAgICB2YWx1ZVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0VWlUeXBlKGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZS51aVR5cGVcbiAgICAgID8gYXR0cmlidXRlLnVpVHlwZVxuICAgICAgOiBDb25maWd1cmF0b3IuVWlUeXBlLk5PVF9JTVBMRU1FTlRFRDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHVuaXF1ZSBrZXkgZm9yIGNvbmZpZyBhdHRyaWJ1dGUgb24gdGhlIFVJXG4gICAqIEBwYXJhbSBwcmVmaXggZm9yIGtleSBkZXBlbmRpbmcgb24gdXNhZ2UgKGUuZy4gdWlUeXBlLCBsYWJlbClcbiAgICogQHBhcmFtIGF0dHJpYnV0ZUlkXG4gICAqL1xuICBjcmVhdGVBdHRyaWJ1dGVVaUtleShwcmVmaXg6IHN0cmluZywgYXR0cmlidXRlSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChcbiAgICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQuUFJFRklYICtcbiAgICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQuU0VQRVJBVE9SICtcbiAgICAgIHByZWZpeCArXG4gICAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50LlNFUEVSQVRPUiArXG4gICAgICBhdHRyaWJ1dGVJZFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB1bmlxdWUga2V5IGZvciBjb25maWcgYXR0cmlidXRlIHRvIGJlIHNlbnQgdG8gY29uZmlndXJhdG9yXG4gICAqIEBwYXJhbSBjdXJyZW50QXR0cmlidXRlXG4gICAqL1xuICBjcmVhdGVBdHRyaWJ1dGVJZEZvckNvbmZpZ3VyYXRvcihcbiAgICBjdXJyZW50QXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlXG4gICk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQXR0cmlidXRlVWlLZXkoXG4gICAgICB0aGlzLmdldFVpVHlwZShjdXJyZW50QXR0cmlidXRlKSxcbiAgICAgIGN1cnJlbnRBdHRyaWJ1dGUubmFtZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB1bmlxdWUga2V5IGZvciBhdHRyaWJ1dGUgJ2FyaWEtbGFiZWxsZWRieSdcbiAgICogQHBhcmFtIHByZWZpeFxuICAgKiBAcGFyYW0gYXR0cmlidXRlSWRcbiAgICogQHBhcmFtIHZhbHVlSWRcbiAgICogQHBhcmFtIGhhc1F1YW50aXR5XG4gICAqL1xuICBjcmVhdGVBcmlhTGFiZWxsZWRCeShcbiAgICBwcmVmaXg6IHN0cmluZyxcbiAgICBhdHRyaWJ1dGVJZDogc3RyaW5nLFxuICAgIHZhbHVlSWQ/OiBzdHJpbmcsXG4gICAgaGFzUXVhbnRpdHk/OiBib29sZWFuXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IGF0dHJpYnV0ZVVpS2V5ID0gdGhpcy5jcmVhdGVBdHRyaWJ1dGVVaUtleShcbiAgICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQuUFJFRklYX0xBQkVMLFxuICAgICAgYXR0cmlidXRlSWRcbiAgICApO1xuICAgIGlmICh2YWx1ZUlkKSB7XG4gICAgICBhdHRyaWJ1dGVVaUtleSArPVxuICAgICAgICAnICcgK1xuICAgICAgICB0aGlzLmNyZWF0ZUF0dHJpYnV0ZVVpS2V5KHByZWZpeCwgYXR0cmlidXRlSWQpICtcbiAgICAgICAgQ29uZmlndXJhdG9yQXR0cmlidXRlQmFzZUNvbXBvbmVudC5TRVBFUkFUT1IgK1xuICAgICAgICB2YWx1ZUlkICtcbiAgICAgICAgJyAnO1xuICAgICAgaWYgKHR5cGVvZiBoYXNRdWFudGl0eSA9PT0gJ2Jvb2xlYW4nICYmICFoYXNRdWFudGl0eSkge1xuICAgICAgICBhdHRyaWJ1dGVVaUtleSArPVxuICAgICAgICAgIHRoaXMuY3JlYXRlQXR0cmlidXRlVWlLZXkoXG4gICAgICAgICAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50LlBSRUZJWF9ERExCX09QVElPTl9QUklDRV9WQUxVRSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZUlkXG4gICAgICAgICAgKSArXG4gICAgICAgICAgQ29uZmlndXJhdG9yQXR0cmlidXRlQmFzZUNvbXBvbmVudC5TRVBFUkFUT1IgK1xuICAgICAgICAgIHZhbHVlSWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdHRyaWJ1dGVVaUtleSArPVxuICAgICAgICAgIHRoaXMuY3JlYXRlQXR0cmlidXRlVWlLZXkoXG4gICAgICAgICAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50LlBSRUZJWF9PUFRJT05fUFJJQ0VfVkFMVUUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVJZFxuICAgICAgICAgICkgK1xuICAgICAgICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQuU0VQRVJBVE9SICtcbiAgICAgICAgICB2YWx1ZUlkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXR0cmlidXRlVWlLZXk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHVuaXF1ZSBrZXkgZm9yIGZvY3VzIGhhbmRsaW5nIGZvciB0aGUgZ2l2ZW4gYXR0cmlidXRlIGFuZCB2YWx1ZVxuICAgKiBAcGFyYW0gYXR0cmlidXRlSWRcbiAgICogQHBhcmFtIHZhbHVlQ29kZVxuICAgKiBAcmV0dXJucyBmb2N1cyBrZXlcbiAgICovXG4gIGNyZWF0ZUZvY3VzSWQoYXR0cmlidXRlSWQ6IHN0cmluZywgdmFsdWVDb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHthdHRyaWJ1dGVJZH0tLSR7dmFsdWVDb2RlfS0tZm9jdXNgO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBsYWJlbCB3aXRoIG9yIHdpdGhvdXQgdGVjaG5pY2FsIG5hbWUgZGVwZW5kaW5nIHdoZXRoZXIgdGhlIGV4cGVydCBtb2RlIGlzIHNldCBvciBub3QuXG4gICAqXG4gICAqIEBwYXJhbSBleHBNb2RlIC0gSXMgZXhwZXJ0IG1vZGUgc2V0P1xuICAgKiBAcGFyYW0gbGFiZWwgLSB2YWx1ZSBsYWJlbFxuICAgKiBAcGFyYW0gdGVjaE5hbWUgLSB2YWx1ZSB0ZWNobmljYWwgbmFtZVxuICAgKiBAcGFyYW0gdmFsdWUgLSBDb25maWd1cmF0b3IgdmFsdWVcbiAgICovXG4gIGdldExhYmVsKFxuICAgIGV4cE1vZGU6IGJvb2xlYW4sXG4gICAgbGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICB0ZWNoTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHZhbHVlPzogQ29uZmlndXJhdG9yLlZhbHVlXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IHRpdGxlID0gbGFiZWwgPyBsYWJlbCA6ICcnO1xuICAgIGlmIChleHBNb2RlICYmIHRlY2hOYW1lKSB7XG4gICAgICB0aXRsZSArPSBgIC8gWyR7dGVjaE5hbWV9XWA7XG4gICAgfVxuICAgIHRpdGxlICs9IHRoaXMuZ2V0VmFsdWVQcmljZSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZXMgdGhlIGZpcnN0IGltYWdlIGZvciBhIGdpdmVuIHZhbHVlXG4gICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZVxuICAgKiBAcmV0dXJucyBJbWFnZVxuICAgKi9cbiAgZ2V0SW1hZ2UodmFsdWU6IENvbmZpZ3VyYXRvci5WYWx1ZSk6IENvbmZpZ3VyYXRvci5JbWFnZSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgaW1hZ2VzID0gdmFsdWUuaW1hZ2VzO1xuICAgIHJldHVybiBpbWFnZXMgPyBpbWFnZXNbMF0gOiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0VmFsdWVQcmljZSh2YWx1ZTogQ29uZmlndXJhdG9yLlZhbHVlIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgICBpZiAodmFsdWU/LnZhbHVlUHJpY2U/LnZhbHVlICYmICF2YWx1ZS5zZWxlY3RlZCkge1xuICAgICAgaWYgKHZhbHVlLnZhbHVlUHJpY2UudmFsdWUgPCAwKSB7XG4gICAgICAgIHJldHVybiBgIFske3ZhbHVlLnZhbHVlUHJpY2U/LmZvcm1hdHRlZFZhbHVlfV1gO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZS52YWx1ZVByaWNlLnZhbHVlID4gMCkge1xuICAgICAgICByZXR1cm4gYCBbKyR7dmFsdWUudmFsdWVQcmljZT8uZm9ybWF0dGVkVmFsdWV9XWA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY29kZSBmcm9tIGF0dHJpYnV0ZS5cbiAgICogVGhlIGNvZGUgaXMgbm90IGEgbWFuZGF0b3J5IGF0dHJpYnV0ZSAoc2luY2Ugbm90IGF2YWlsYWJsZSBmb3IgVkMgZmxhdm91ciksXG4gICAqIHN0aWxsIGl0IGlzIG1hbmRhdG9yeSBpbiB0aGUgY29udGV4dCBvZiBDUFEuIENhbGxpbmcgdGhpcyBtZXRob2QgdGhlcmVmb3JlIG9ubHlcbiAgICogbWFrZXMgc2Vuc2Ugd2hlbiBDUFEgaXMgYWN0aXZlLiBJbiBjYXNlIHRoZSBtZXRob2QgaXMgY2FsbGVkIGluIHRoZSB3cm9uZyBjb250ZXh0LCBhbiBleGNlcHRpb24gd2lsbFxuICAgKiBiZSB0aHJvd25cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQXR0cmlidXRlfSBBdHRyaWJ1dGVcbiAgICogQHJldHVybnMge251bWJlcn0gQXR0cmlidXRlIGNvZGVcbiAgICovXG4gIHByb3RlY3RlZCBnZXRBdHRyaWJ1dGVDb2RlKGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSk6IG51bWJlciB7XG4gICAgY29uc3QgY29kZSA9IGF0dHJpYnV0ZS5hdHRyQ29kZTtcbiAgICBpZiAoY29kZSkge1xuICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYXR0cmlidXRlIGNvZGUgZm9yOiAnICsgYXR0cmlidXRlLm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYXR0cmlidXRlIHR5cGUgYWxsb3dzIGFkZGl0aW9uYWwgdmFsdWVzXG4gICAqIEBwYXJhbSBhdHRyaWJ1dGUgQXR0cmlidXRlXG4gICAqIEByZXR1cm5zIHRydWUgaWYgYXR0cmlidXRlIHR5cGUgYWxsb3dzIHRvIGVudGVyIGFkZGl0aW9uYWwgdmFsdWVzXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNXaXRoQWRkaXRpb25hbFZhbHVlcyhhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGUpOiBib29sZWFuIHtcbiAgICBjb25zdCB1aVR5cGUgPSBhdHRyaWJ1dGUudWlUeXBlO1xuICAgIHJldHVybiAoXG4gICAgICB1aVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT05fQURESVRJT05BTF9JTlBVVCB8fFxuICAgICAgdWlUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOX0FERElUSU9OQUxfSU5QVVRcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzUmVxdWlyZWRFcnJvck1zZyhhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKGF0dHJpYnV0ZS5yZXF1aXJlZCAmJiBhdHRyaWJ1dGUuaW5jb21wbGV0ZSkgfHwgZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNVc2VySW5wdXQoYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGF0dHJpYnV0ZS51aVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuU1RSSU5HIHx8XG4gICAgICBhdHRyaWJ1dGUudWlUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLk5VTUVSSUNcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzRHJvcERvd24oYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGF0dHJpYnV0ZS51aVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV04gfHxcbiAgICAgIGF0dHJpYnV0ZS51aVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV05fUFJPRFVDVFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U2VsZWN0ZWRWYWx1ZShcbiAgICBhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGVcbiAgKTogQ29uZmlndXJhdG9yLlZhbHVlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gYXR0cmlidXRlLnZhbHVlcz8uZmluZCgodmFsdWUpID0+IHZhbHVlLnNlbGVjdGVkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc05vVmFsdWVTZWxlY3RlZChhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gdGhpcy5nZXRTZWxlY3RlZFZhbHVlKGF0dHJpYnV0ZSk7XG4gICAgaWYgKHNlbGVjdGVkVmFsdWUpIHtcbiAgICAgIHJldHVybiBzZWxlY3RlZFZhbHVlLnZhbHVlQ29kZSA9PT0gQ29uZmlndXJhdG9yLlJldHJhY3RWYWx1ZUNvZGU7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=