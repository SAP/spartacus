import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product/configurators/common';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantUpdateCartEntrySerializer
  implements
    Converter<
      Configurator.UpdateConfigurationForCartEntryParameters,
      OccConfigurator.UpdateConfigurationForCartEntryParameters
    > {
  convert(
    source: Configurator.UpdateConfigurationForCartEntryParameters,
    target?: OccConfigurator.UpdateConfigurationForCartEntryParameters
  ): OccConfigurator.UpdateConfigurationForCartEntryParameters {
    const resultTarget: OccConfigurator.UpdateConfigurationForCartEntryParameters = {
      ...target,
      userId: source.userId,
      cartId: source.cartId,
      product: { code: source.configuration.productCode },
      entryNumber: source.cartEntryNumber,
      configId: source.configuration.configId,
      configurationInfos: [{ configuratorType: 'CPQCONFIGURATOR' }],
    };

    return resultTarget;
  }
}
