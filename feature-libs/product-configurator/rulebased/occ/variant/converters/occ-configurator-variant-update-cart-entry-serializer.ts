import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ConfiguratorType } from '@spartacus/product-configurator/common';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantUpdateCartEntrySerializer
  implements
    Converter<
      Configurator.UpdateConfigurationForCartEntryParameters,
      OccConfigurator.UpdateConfigurationForCartEntryParameters
    >
{
  convert(
    source: Configurator.UpdateConfigurationForCartEntryParameters,
    target?: OccConfigurator.UpdateConfigurationForCartEntryParameters
  ): OccConfigurator.UpdateConfigurationForCartEntryParameters {
    const resultTarget: OccConfigurator.UpdateConfigurationForCartEntryParameters =
      {
        ...target,
        userId: source.userId,
        cartId: source.cartId,
        product: { code: source.configuration.productCode },
        entryNumber: source.cartEntryNumber,
        configId: source.configuration.configId,
        configurationInfos: [{ configuratorType: ConfiguratorType.VARIANT }],
      };

    return resultTarget;
  }
}
