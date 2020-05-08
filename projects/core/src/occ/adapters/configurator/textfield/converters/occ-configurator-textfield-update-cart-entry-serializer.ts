import { Injectable } from '@angular/core';
import { ConfiguratorTextfield } from '../../../../../model/configurator-textfield.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfiguratorTextfield } from '../occ-configurator-textfield.models';

export const CONFIGURATOR_TYPE_TEXTFIELD = 'TEXTFIELD';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorTextfieldUpdateCartEntrySerializer
  implements
    Converter<
      ConfiguratorTextfield.UpdateCartEntryParameters,
      OccConfiguratorTextfield.UpdateCartEntryParameters
    > {
  constructor() {}

  convert(
    source: ConfiguratorTextfield.UpdateCartEntryParameters,
    target?: OccConfiguratorTextfield.UpdateCartEntryParameters
  ): OccConfiguratorTextfield.UpdateCartEntryParameters {
    target = {
      userId: source.userId,
      cartId: source.cartId,
      cartEntryNumber: source.cartEntryNumber,
      configurationInfos: [],
    };

    source.configuration.configurationInfos.forEach((info) =>
      this.convertInfo(info, target.configurationInfos)
    );

    return target;
  }

  convertInfo(
    source: ConfiguratorTextfield.ConfigurationInfo,
    occConfigurationInfos: OccConfiguratorTextfield.ConfigurationInfo[]
  ) {
    const occInfo: OccConfiguratorTextfield.ConfigurationInfo = {
      configurationLabel: source.configurationLabel,
      configurationValue: source.configurationValue,
      status: source.status,
      configuratorType: CONFIGURATOR_TYPE_TEXTFIELD,
    };
    occConfigurationInfos.push(occInfo);
  }
}
