import { Injectable } from '@angular/core';
import { ConfiguratorTextfield } from '../../../../../model/configurator-textfield.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfiguratorTextfield } from '../occ-configurator-textfield.models';

export const CONFIGURATOR_TYPE_TEXTFIELD = 'TEXTFIELD';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorTextfieldAddToCartSerializer
  implements
    Converter<
      ConfiguratorTextfield.AddToCartParameters,
      OccConfiguratorTextfield.AddToCartParameters
    > {
  constructor() {}

  convert(
    source: ConfiguratorTextfield.AddToCartParameters,
    target?: OccConfiguratorTextfield.AddToCartParameters
  ): OccConfiguratorTextfield.AddToCartParameters {
    target = {
      userId: source.userId,
      cartId: source.cartId,
      product: { code: source.productCode },
      quantity: source.quantity,
      configurationInfos: [],
    };

    source.configuration.configurationInfos.forEach(info =>
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
