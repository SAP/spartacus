import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { OccCpqConfigurator } from '../cpq-configurator-occ.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorCpqUpdateCartEntrySerializer
  implements
    Converter<
      Configurator.UpdateConfigurationForCartEntryParameters,
      OccCpqConfigurator.UpdateConfigurationForCartEntryParameters
    >
{
  convert(
    source: Configurator.UpdateConfigurationForCartEntryParameters,
    target?: OccCpqConfigurator.UpdateConfigurationForCartEntryParameters
  ): OccCpqConfigurator.UpdateConfigurationForCartEntryParameters {
    const resultTarget: OccCpqConfigurator.UpdateConfigurationForCartEntryParameters =
      {
        ...target,
        userId: source.userId,
        cartId: source.cartId,
        entryNumber: source.cartEntryNumber,
        configId: source.configuration.configId,
      };

    return resultTarget;
  }
}
