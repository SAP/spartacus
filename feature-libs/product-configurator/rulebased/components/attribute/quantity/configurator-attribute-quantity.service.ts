import { Injectable } from '@angular/core';
import { Configurator } from '../../../core/model/configurator.model';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorAttributeQuantityService {
  /**
   * Checks if the interaction with the quantity control needs
   * to be disabled
   * @param {any} value Selected value
   * @returns {boolean} Quantity actions disabled?
   */
  disableQuantityActions(value: any): boolean {
    return !value || value === '0';
  }

  /**
   * Checks if the interaction with the quantity control needs for multiselection components
   * to be disabled
   * @param {Configurator.Attribute} attribute Configurator Attribute
   * @returns {boolean} Quantity actions disabled?
   */
  disableQuantityActionsMultiSelection(
    attribute: Configurator.Attribute
  ): boolean {
    return (
      attribute.dataType ===
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL &&
      (!attribute.values ||
        !attribute.values.find((value) => value.selected) ||
        attribute.quantity === 0)
    );
  }

  /**
   * Checks if it is supposed to render a quantity control on attribute level
   *
   * @param {Configurator.Attribute} attribute Configurator Attribute
   * @return {boolean} - Display quantity picker on attribute level?
   */
  withQuantityOnAttributeLevel(attribute: Configurator.Attribute): boolean {
    return (
      attribute.dataType ===
      Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL
    );
  }

  /**
   * Checks if an attribute needs to be equipped with the option to select
   * a quantity
   * @param {Configurator.DataType} dataType Attribute data type
   * @param {Configurator.UiType} uiType Attribute ui type, refers to how an attribute must be rendered
   * @returns  {boolean} Render a quantity component?
   */
  withQuantity(
    dataType: Configurator.DataType,
    uiType: Configurator.UiType
  ): boolean {
    switch (uiType) {
      case Configurator.UiType.DROPDOWN_PRODUCT:
      case Configurator.UiType.DROPDOWN:
      case Configurator.UiType.RADIOBUTTON_PRODUCT:
      case Configurator.UiType.RADIOBUTTON:
        return (
          dataType === Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL
        );

      case Configurator.UiType.CHECKBOXLIST:
      case Configurator.UiType.CHECKBOXLIST_PRODUCT:
        return (
          dataType === Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL
        );

      default:
        return false;
    }
  }

  /**
   * Checks if the zero quantity is allowed
   *
   * @param {Configurator.Attribute} attribute Configurator Attribute
   * @return {boolean} - true when zero quantity is allowed
   */
  allowZeroValueQuantity(attribute: Configurator.Attribute): boolean {
    const selectedValues = attribute.values
      ? attribute.values.filter((value) => value.selected).length
      : 0;
    if (attribute.required && selectedValues < 2) {
      return false;
    }
    return true;
  }
}
