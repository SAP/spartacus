import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantAddToCartSerializer
  implements
    Converter<
      Configurator.AddToCartParameters,
      OccConfigurator.AddToCartParameters
    >
{
  constructor() {}

  convert(
    source: Configurator.AddToCartParameters,
    target?: OccConfigurator.AddToCartParameters
  ): OccConfigurator.AddToCartParameters {
    const resultTarget: OccConfigurator.AddToCartParameters = {
      ...target,
      userId: source.userId,
      cartId: source.cartId,
      product: { code: source.productCode },
      quantity: source.quantity,
      configId: source.configId,
    };

    return resultTarget;
  }
}
