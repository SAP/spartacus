import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product/configurators/common';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantPriceSummaryNormalizer
  implements Converter<OccConfigurator.Prices, Configurator.PriceSummary> {
  constructor() {}

  convert(
    source: OccConfigurator.Prices,
    target?: Configurator.PriceSummary
  ): Configurator.PriceSummary {
    const resultTarget: Configurator.PriceSummary = {
      ...target,
      ...source.priceSummary,
    };

    return resultTarget;
  }
}
