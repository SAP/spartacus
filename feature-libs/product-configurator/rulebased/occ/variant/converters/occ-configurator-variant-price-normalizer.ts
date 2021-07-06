import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantPriceNormalizer
  implements Converter<OccConfigurator.Prices, Configurator.Configuration> {
  convert(
    source: OccConfigurator.Prices,
    target?: Configurator.Configuration
  ): Configurator.Configuration {
    const resultTarget: Configurator.Configuration = {
      ...target,
      priceSummary: source?.priceSummary,
      priceSupplements: [],
    };

    source?.attributes?.forEach((attr) => {
      this.convertAttributeSupplements(attr, resultTarget.priceSupplements);
    });

    return resultTarget;
  }

  convertAttributeSupplements(
    source: OccConfigurator.Supplements,
    priceSupplements: Configurator.AttributeSupplement[]
  ) {
    let attributeSupplement: Configurator.AttributeSupplement = {
      attributeUiKey: source?.csticUiKey,
      valueSupplements: [],
    };

    source?.priceSupplements?.forEach((value) => {
      this.convertValueSupplement(value, attributeSupplement?.valueSupplements);
    });
    priceSupplements.push(attributeSupplement);
  }

  convertValueSupplement(
    source: OccConfigurator.ValueSupplements,
    valueSupplements: Configurator.ValueSupplement[]
  ) {
    let valueSupplement: Configurator.ValueSupplement = {
      attributeValueKey: source?.attributeValueKey,
      priceValue: source?.priceValue,
      obsoletePriceValue: source?.obsoletePriceValue,
    };
    valueSupplements.push(valueSupplement);
  }
}
