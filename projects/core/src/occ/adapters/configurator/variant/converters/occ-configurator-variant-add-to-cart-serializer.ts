import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantAddToCartSerializer
  implements
    Converter<
      Configurator.AddToCartParameters,
      OccConfigurator.AddToCartParameters
    > {
  constructor() {}

  convert(
    source: Configurator.AddToCartParameters,
    target?: OccConfigurator.AddToCartParameters
  ): OccConfigurator.AddToCartParameters {
    target = {
      userId: source.userId,
      cartId: source.cartId,
      product: { code: source.productCode },
      quantity: source.quantity,
      configId: source.configId,
    };

    return target;
  }
}
