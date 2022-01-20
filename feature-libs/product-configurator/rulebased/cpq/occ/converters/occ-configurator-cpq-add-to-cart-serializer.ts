import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { OccCpqConfigurator } from '../cpq-configurator-occ.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorCpqAddToCartSerializer
  implements
    Converter<
      Configurator.AddToCartParameters,
      OccCpqConfigurator.AddToCartParameters
    >
{
  convert(
    source: Configurator.AddToCartParameters,
    target?: OccCpqConfigurator.AddToCartParameters
  ): OccCpqConfigurator.AddToCartParameters {
    const resultTarget: OccCpqConfigurator.AddToCartParameters = {
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
