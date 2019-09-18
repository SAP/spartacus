import { Injectable } from '@angular/core';
import { UiType } from '../../../../../model/configurator.model';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable()
export class UiTypeFinderVariantService {
  constructor() {}

  public findUiTypeForOccConfiguratorVariantType(
    type: OccConfigurator.UiType
  ): UiType {
    let uiType: UiType;
    switch (type) {
      case OccConfigurator.UiType.RADIO_BUTTON: {
        uiType = UiType.RADIOBUTTON;
        break;
      }
      default: {
        uiType = UiType.NOT_IMPLEMENTED;
      }
    }
    return uiType;
  }
}
