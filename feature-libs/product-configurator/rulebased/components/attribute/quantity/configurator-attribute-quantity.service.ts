import { Injectable } from '@angular/core';
import { Configurator } from '../../../core/model/configurator.model';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorAttributeQuantityService {
  /**
   * Checks if the interaction with the quantity control needs
   * to be disabled
   * @param value Selected value
   * @returns Quantity actions disabled?
   */
  disableQuantityActions(value: any): boolean {
    return !value || value === '0';
  }

  /**
   * Checks if an attribute needs to be equipped with the option to select
   * a quantity
   * @param dataType Attribute data type
   * @param uiType Attribute ui type, refers to how an attribute must be rendered
   * @returns Render a quantity component?
   */
  withQuantity(
    dataType: Configurator.DataType | undefined,
    uiType: Configurator.UiType | undefined
  ): boolean {
    switch (uiType) {
      case Configurator.UiType.DROPDOWN_PRODUCT:
      case Configurator.UiType.DROPDOWN:
      case Configurator.UiType.RADIOBUTTON_PRODUCT:
      case Configurator.UiType.RADIOBUTTON:
        return dataType ===
          Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL
          ? true
          : false;

      case Configurator.UiType.CHECKBOXLIST:
      case Configurator.UiType.CHECKBOXLIST_PRODUCT:
        return dataType === Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL
          ? true
          : false;

      default:
        return false;
    }
  }
}
