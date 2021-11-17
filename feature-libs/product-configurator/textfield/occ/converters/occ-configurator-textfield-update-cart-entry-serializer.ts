import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ConfigurationInfo } from '@spartacus/product-configurator/common';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import { OccConfiguratorTextfield } from '../occ-configurator-textfield.models';

export const CONFIGURATOR_TYPE_TEXTFIELD = 'TEXTFIELD';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorTextfieldUpdateCartEntrySerializer
  implements
    Converter<
      ConfiguratorTextfield.UpdateCartEntryParameters,
      OccConfiguratorTextfield.UpdateCartEntryParameters
    >
{
  constructor() {}

  /**
   * Converts the attributes for the updateCartEntry request into OCC format. Most attributes are just copied,
   * except for the backend configurator type that needs to be set to 'TEXTFIELD'
   * @param source Attributes for updating a cart entries' configuration in generic format
   * @returns ttributes for updating a cart entries' configuration in OCC format
   */
  convert(
    source: ConfiguratorTextfield.UpdateCartEntryParameters
  ): OccConfiguratorTextfield.UpdateCartEntryParameters {
    const configurationInfos: ConfigurationInfo[] = [];
    source.configuration?.configurationInfos.forEach((info) =>
      this.convertInfo(info, configurationInfos)
    );

    const target: OccConfiguratorTextfield.UpdateCartEntryParameters = {
      userId: source.userId,
      cartId: source.cartId,
      cartEntryNumber: source.cartEntryNumber,
      configurationInfos: configurationInfos,
    };

    return target;
  }

  protected convertInfo(
    source: ConfiguratorTextfield.ConfigurationInfo,
    occConfigurationInfos: OccConfiguratorTextfield.ConfigurationInfo[]
  ): void {
    const occInfo: OccConfiguratorTextfield.ConfigurationInfo = {
      configurationLabel: source.configurationLabel,
      configurationValue: source.configurationValue,
      status: source.status,
      configuratorType: CONFIGURATOR_TYPE_TEXTFIELD,
    };
    occConfigurationInfos.push(occInfo);
  }
}
