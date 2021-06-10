import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { OccConfiguratorVariantPriceNormalizer } from './occ-configurator-variant-price-normalizer';
import { Configurator } from '@spartacus/product-configurator/rulebased';

class MockConverterService {
  convert() {}
}

describe('OccConfiguratorVariantPriceNormalizer', () => {
  let classUnderTest: OccConfiguratorVariantPriceNormalizer;

  function createValueSupplements(
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

  function createValueSupplementsList(
    attributeNr: number,
    amountOfValues: number
  ): OccConfigurator.ValueSupplements[] {
    const occValues: OccConfigurator.ValueSupplements[] = [];
    for (let index = 0; index < amountOfValues; index++) {
      const number = index + 1;
      const valueKey = 'value_' + attributeNr + '_' + number;
      const valuePrice = 100 * number;
      const formattedValuePrice = valuePrice.toString() + ' €';
      const occValue = createValueSupplements(
        valueKey,
        formattedValuePrice,
        valuePrice
      );
      occValues.push(occValue);
    }
    return occValues;
  }

  function createSupplement(
    attributeNr: number,
    attributeKey: string,
    amountOfValues: number
  ): OccConfigurator.Supplements {
    return {
      csticUiKey: attributeKey,
      selectedValues: [],
      priceSupplements: createValueSupplementsList(attributeNr, amountOfValues),
    };
  }

  function createSupplementsList(
    isMultiLevel: boolean,
    amountOfSupplements: number,
    amountOfValues: number
  ): OccConfigurator.Supplements[] {
    const occSupplements: OccConfigurator.Supplements[] = [];
    let uiKey = 'group@';
    if (isMultiLevel) {
      uiKey += 'subGroup@';
    }
    for (let index = 0; index < amountOfSupplements; index++) {
      const attributeNr = index + 1;
      const csticUiKey = uiKey + 'attribute_' + attributeNr;
      const occSupplement = createSupplement(
        attributeNr,
        csticUiKey,
        amountOfValues
      );
      occSupplements.push(occSupplement);
    }
    return occSupplements;
  }

  function createOccConfiguratorPrices(
    amountOfSupplements: number,
    amountOfValues: number
  ): OccConfigurator.Prices {
    return {
      attributes: createSupplementsList(
        false,
        amountOfSupplements,
        amountOfValues
      ),
      priceSummary: undefined,
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccConfiguratorVariantPriceNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    classUnderTest = TestBed.inject(
      OccConfiguratorVariantPriceNormalizer as Type<OccConfiguratorVariantPriceNormalizer>
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('convertValue', () => {
    it('should return empty values list', () => {
      const occValues: OccConfigurator.ValueSupplements[] = [];
      const result = classUnderTest.convertValue(occValues);
      expect(result.length).toBe(0);
    });

    it('should return a values list with one value in it', () => {
      const occValues = createValueSupplementsList(1, 1);
      const result = classUnderTest.convertValue(occValues);
      expect(result.length).toBe(1);
      expect(result[0].valueCode).toBe('value_1');
      expect(result[0].valuePrice).toEqual(occValues[0].priceValue);
    });
  });

  describe('convertAttribute', () => {
    it('should return an attribute with an attribute name but with empty list of values', () => {
      const attributeName = 'attribute_1';
      const values: Configurator.Value[] = [];
      const attribute = classUnderTest.convertAttribute(attributeName, values);
      expect(attribute).toBeDefined();
      expect(attribute.name).toBe(attributeName);
      expect(attribute.values.length).toBe(0);
    });

    it('should return an attribute with an attribute name but a list of values', () => {
      const attributeName = 'attribute_1';
      const occValues = createValueSupplementsList(1, 5);
      const values = classUnderTest.convertValue(occValues);
      const attribute = classUnderTest.convertAttribute(attributeName, values);
      expect(attribute).toBeDefined();
      expect(attribute.name).toBe(attributeName);
      expect(attribute.values.length).toBe(occValues.length);
    });
  });

  describe('convert', () => {
    it('should return a converted configuration', () => {
      const source: OccConfigurator.Prices = createOccConfiguratorPrices(3, 3);
      const result: Configurator.Configuration = classUnderTest.convert(source);
      expect(result).toBeDefined();
    });
  });
});
