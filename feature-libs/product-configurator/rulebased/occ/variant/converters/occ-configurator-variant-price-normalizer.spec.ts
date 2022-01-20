import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService } from '@spartacus/core';
import { OccConfiguratorTestUtils } from '../../../testing/occ-configurator-test-utils';
import { OccConfiguratorVariantPriceNormalizer } from './occ-configurator-variant-price-normalizer';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from '@spartacus/product-configurator/rulebased';

class MockConverterService {
  convert() {}
}

describe('OccConfiguratorVariantPriceNormalizer', () => {
  let classUnderTest: OccConfiguratorVariantPriceNormalizer;

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

  describe('convertValueSupplement', () => {
    it('should return a list with one value supplements', () => {
      const source = OccConfiguratorTestUtils.createValueSupplements(
        'value_01',
        '100.00 €',
        100
      );
      const result: Configurator.ValueSupplement[] = [];
      classUnderTest.convertValueSupplement(source, result);
      expect(result?.length).toBe(1);
      expect(result[0].attributeValueKey).toEqual(source.attributeValueKey);
      expect(result[0].priceValue.formattedValue).toEqual(
        source.priceValue.formattedValue
      );
      expect(result[0].priceValue.value).toEqual(source.priceValue.value);
      expect(result[0].obsoletePriceValue.formattedValue).toEqual(
        source.obsoletePriceValue.formattedValue
      );
      expect(result[0].obsoletePriceValue.value).toEqual(
        source.obsoletePriceValue.value
      );
    });
  });

  describe('convertAttributeSupplements', () => {
    it('should return a list with one attribute supplements', () => {
      const source: OccConfigurator.Supplements =
        OccConfiguratorTestUtils.createSupplements(1, 'attribute', 3);
      const result: Configurator.AttributeSupplement[] = [];
      classUnderTest.convertAttributeSupplements(source, result);
      expect(result?.length).toBe(1);
      expect(result[0].attributeUiKey).toEqual(source.csticUiKey);
      expect(result[0].valueSupplements.length).toEqual(
        source.priceSupplements.length
      );
      expect(result[0].valueSupplements[1].attributeValueKey).toEqual(
        source.priceSupplements[1].attributeValueKey
      );
      expect(result[0].valueSupplements[1].priceValue.formattedValue).toEqual(
        source.priceSupplements[1].priceValue.formattedValue
      );
      expect(result[0].valueSupplements[1].priceValue.value).toEqual(
        source.priceSupplements[1].priceValue.value
      );
    });
  });

  describe('convert', () => {
    it('should return a configuration with empty list of price supplements', () => {
      const source: OccConfigurator.Prices = {
        configId: 'configId',
      };
      const result: Configurator.Configuration = classUnderTest.convert(source);
      expect(result.priceSupplements.length).toBe(0);
    });

    it('should return a configuration with a list of price supplements', () => {
      const source: OccConfigurator.Prices =
        OccConfiguratorTestUtils.createOccConfiguratorPrices(false, 1, 0, 3, 3);
      const result: Configurator.Configuration = classUnderTest.convert(source);
      expect(result.priceSupplements.length).toBe(3);
      expect(result.priceSupplements[0].attributeUiKey).toBe(
        'group1@attribute_1_1'
      );
      expect(result.priceSupplements[0].valueSupplements.length).toBe(3);
      expect(
        result.priceSupplements[0].valueSupplements[0].attributeValueKey
      ).toBe('value_1_1');
      expect(
        result.priceSupplements[0].valueSupplements[1].attributeValueKey
      ).toBe('value_1_2');
      expect(
        result.priceSupplements[0].valueSupplements[2].attributeValueKey
      ).toBe('value_1_3');

      expect(result.priceSupplements[1].attributeUiKey).toBe(
        'group1@attribute_1_2'
      );
      expect(result.priceSupplements[1].valueSupplements.length).toBe(3);
      expect(
        result.priceSupplements[1].valueSupplements[0].attributeValueKey
      ).toBe('value_2_1');
      expect(
        result.priceSupplements[1].valueSupplements[1].attributeValueKey
      ).toBe('value_2_2');
      expect(
        result.priceSupplements[1].valueSupplements[2].attributeValueKey
      ).toBe('value_2_3');

      expect(result.priceSupplements[2].attributeUiKey).toBe(
        'group1@attribute_1_3'
      );
      expect(result.priceSupplements[2].valueSupplements.length).toBe(3);
      expect(
        result.priceSupplements[2].valueSupplements[0].attributeValueKey
      ).toBe('value_3_1');
      expect(
        result.priceSupplements[2].valueSupplements[1].attributeValueKey
      ).toBe('value_3_2');
      expect(
        result.priceSupplements[2].valueSupplements[2].attributeValueKey
      ).toBe('value_3_3');
    });
  });
});
