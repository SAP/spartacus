import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ConfigurationInfo } from '@spartacus/product-configurator/common';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import { OccConfiguratorTextfield } from '../occ-configurator-textfield.models';

export const CONFIGURATOR_TYPE_TEXTFIELD = 'TEXTFIELD';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorTextfieldAddToCartSerializer
  implements
    Converter<
      ConfiguratorTextfield.AddToCartParameters,
      OccConfiguratorTextfield.AddToCartParameters
    >
{
  constructor() {}
  /**
   * Converts addToCart parameters into the OCC format
   * @param source Add to cart parameters in generic format
   * @param target Add to cart parameters in OCC format. Optional, can be used in case converters should be chained
   * @returns Add to cart parameters in OCC format
   */
  convert(
    source: ConfiguratorTextfield.AddToCartParameters,
    target?: OccConfiguratorTextfield.AddToCartParameters
  ): OccConfiguratorTextfield.AddToCartParameters {
    const configurationInfos: ConfigurationInfo[] = [];
    source.configuration?.configurationInfos.forEach((info) =>
      this.convertInfo(info, configurationInfos)
    );

    const resultTarget: OccConfiguratorTextfield.AddToCartParameters = {
      ...target,
      userId: source.userId,
      cartId: source.cartId,
      product: { code: source.productCode },
      quantity: source.quantity,
      configurationInfos: configurationInfos,
    };

    return resultTarget;
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
