import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantPriceSummaryNormalizer
  implements Converter<OccConfigurator.Prices, Configurator.PriceSummary> {
  constructor() {}

  convert(
    source: OccConfigurator.Prices,
    target?: Configurator.PriceSummary
  ): Configurator.PriceSummary {
    target = source.priceSummary;

    return target;
  }
}
