import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantPriceSummaryNormalizer
  implements Converter<OccConfigurator.Prices, Configurator.Configuration> {
  constructor() {}

  convert(
    source: OccConfigurator.Prices,
    target?: Configurator.Configuration
  ): Configurator.Configuration {
    target = {
      configId: source.configId,
      priceSummary: source.priceSummary,
    };

    return target;
  }
}
