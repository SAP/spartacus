import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantPriceNormalizer
  implements Converter<OccConfigurator.Prices, Configurator.Configuration>
{
  convert(
    source: OccConfigurator.Prices,
    target?: Configurator.Configuration
  ): Configurator.Configuration {
    const priceSupplements: Configurator.AttributeSupplement[] = [];
    source.attributes?.forEach((attr) => {
      this.convertAttributeSupplements(attr, priceSupplements);
    });
    const resultTarget: Configurator.Configuration = {
      ...target,
      configId: source.configId,
      groups: [],
      flatGroups: [],
      owner: ConfiguratorModelUtils.createInitialOwner(),
      interactionState: {},
      priceSummary: source?.priceSummary,
      priceSupplements: priceSupplements,
    };

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
