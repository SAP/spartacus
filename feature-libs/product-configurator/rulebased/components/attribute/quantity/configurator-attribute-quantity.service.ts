import { Configurator } from '../../../core/model/configurator.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorAttributeQuantityService {
  readOnlyQuantity(value): boolean {
    return !value || value === '0';
  }

  withQuantity(
    dataType: Configurator.DataType,
    uiType: Configurator.UiType
  ): boolean {
    switch (uiType) {
      case Configurator.UiType.DROPDOWN:
      case Configurator.UiType.RADIOBUTTON:
      case Configurator.UiType.RADIOBUTTON_PRODUCT:
        return dataType ===
          Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL
          ? true
          : false;

      case Configurator.UiType.CHECKBOXLIST_PRODUCT:
      case Configurator.UiType.DROPDOWN_PRODUCT:
        return dataType === Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL
          ? true
          : false;

      default:
        return false;
    }
  }
}
