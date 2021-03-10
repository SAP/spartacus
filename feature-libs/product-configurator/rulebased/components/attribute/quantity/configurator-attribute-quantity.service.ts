import { Injectable } from '@angular/core';
import { Configurator } from '../../../core/model/configurator.model';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorAttributeQuantityService {
  disableQuantityActions(value): boolean {
    return !value || value === '0';
  }

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
