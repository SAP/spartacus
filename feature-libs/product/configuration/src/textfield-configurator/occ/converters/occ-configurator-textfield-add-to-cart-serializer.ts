import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
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
  /**
   * Converts addToCart parameters into the OCC format
   * @param source Add to cart parameters in generic format
   * @returns Add to cart parameters in OCC format
   */
  convert(
    source: ConfiguratorTextfield.AddToCartParameters
  ): OccConfiguratorTextfield.AddToCartParameters {
    const result = {
      userId: source.userId,
      cartId: source.cartId,
      product: { code: source.productCode },
      quantity: source.quantity,
      configurationInfos: [],
    };

    source.configuration.configurationInfos.forEach((info) =>
      this.convertInfo(info, result.configurationInfos)
    );

    return result;
  }

  protected convertInfo(
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
