import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantUpdateCartEntrySerializer
  implements
    Converter<
      Configurator.UpdateConfigurationForCartEntryParameters,
      OccConfigurator.UpdateConfigurationForCartEntryParameters
    > {
  constructor() {}

  convert(
    source: Configurator.UpdateConfigurationForCartEntryParameters,
    target?: OccConfigurator.UpdateConfigurationForCartEntryParameters
  ): OccConfigurator.UpdateConfigurationForCartEntryParameters {
    target = {
      userId: source.userId,
      cartId: source.cartId,
      product: { code: source.configuration.productCode },
      entryNumber: source.cartEntryNumber,
      configId: source.configuration.configId,
      configurationInfos: [{ configuratorType: 'CPQCONFIGURATOR' }],
    };

    return target;
  }
}
