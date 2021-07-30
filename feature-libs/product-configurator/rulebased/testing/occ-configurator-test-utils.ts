/**
 * Occ Configurator component test utils service provides helper functions for the component tests.
 */
import { OccConfigurator } from '../occ/variant/variant-configurator-occ.models';

export class OccConfiguratorTestUtils {
  static createValueSupplements(
    valueKey: string,
    formattedValuePrice: string,
    valuePrice: number
  ): OccConfigurator.ValueSupplements {
    const occValue: OccConfigurator.ValueSupplements = {
      attributeValueKey: valueKey,
      priceValue: {
        currencyIso: '',
        formattedValue: formattedValuePrice,
        value: valuePrice,
      },
      obsoletePriceValue: {
        currencyIso: '',
        formattedValue: formattedValuePrice,
        value: valuePrice,
      },
    };
    return occValue;
  }

  static createListOfValueSupplements(
    attributeNr: number,
    amountOfValues: number
  ): OccConfigurator.ValueSupplements[] {
    const occValues: OccConfigurator.ValueSupplements[] = [];
    for (let index = 0; index < amountOfValues; index++) {
      const number = index + 1;
      const valueKey = 'value_' + attributeNr + '_' + number;
      const valuePrice = 100 * number;
      const formattedValuePrice = valuePrice.toString() + ' €';
      const occValue = this.createValueSupplements(
        valueKey,
        formattedValuePrice,
        valuePrice
      );
      occValues.push(occValue);
    }
    return occValues;
  }

  static createSupplements(
    attributeNr: number,
    attributeKey: string,
    amountOfValues: number
  ): OccConfigurator.Supplements {
    const priceSupplements = this.createListOfValueSupplements(
      attributeNr,
      amountOfValues
    );
    return {
      csticUiKey: attributeKey,
      selectedValues: [],
      priceSupplements: priceSupplements,
    };
  }

  static createListOfSupplements(
    isMultiLevel: boolean,
    amountOfGroups: number,
    amountOfSubgroups: number,
    amountOfSupplements: number,
    amountOfValues: number
  ): OccConfigurator.Supplements[] {
    const occSupplements: OccConfigurator.Supplements[] = [];
    for (let i = 0; i < amountOfGroups; i++) {
      const groupNr = i + 1;
      let uiKey = 'group' + groupNr + '@';
      if (isMultiLevel) {
        for (let k = 0; k < amountOfSubgroups; k++) {
          const subgroupNr = k + 1;
          uiKey += 'subGroup' + subgroupNr + '@';
        }
      }
      for (let j = 0; j < amountOfSupplements; j++) {
        const attributeNr = j + 1;
        const csticUiKey = uiKey + 'attribute_' + groupNr + '_' + attributeNr;
        const occSupplement = this.createSupplements(
          attributeNr,
          csticUiKey,
          amountOfValues
        );
        occSupplements.push(occSupplement);
      }
    }
    return occSupplements;
  }

  static createOccConfiguratorPrices(
    isMultiLevel: boolean,
    amountOfGroups: number,
    amountOfSubgroups: number,
    amountOfSupplements: number,
    amountOfValues: number
  ): OccConfigurator.Prices {
    const supplements = this.createListOfSupplements(
      isMultiLevel,
      amountOfGroups,
      amountOfSubgroups,
      amountOfSupplements,
      amountOfValues
    );
    return {
      configId: 'configId',
      attributes: supplements,
      priceSummary: {
        basePrice: { currencyIso: 'USD', value: 10 },
      },
    };
  }
}
