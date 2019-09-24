import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable()
export class UiTypeFinderVariantService {
  constructor() {}

  public findUiTypeForOccConfiguratorVariantType(
    type: OccConfigurator.UiType
  ): Configurator.UiType {
    let uiType: Configurator.UiType;
    switch (type) {
      case OccConfigurator.UiType.RADIO_BUTTON: {
        uiType = Configurator.UiType.RADIOBUTTON;
        break;
      }
      default: {
        uiType = Configurator.UiType.NOT_IMPLEMENTED;
      }
    }
    return uiType;
  }
}
