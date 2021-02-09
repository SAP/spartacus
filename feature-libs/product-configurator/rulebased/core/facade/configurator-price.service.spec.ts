import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  Configurator,
  ConfiguratorPriceService,
} from '@spartacus/product-configurator/rulebased';

const createTestValue = (
  price: number,
  total: number,
  selected = true
): Configurator.Value => ({
  selected,
  valuePrice: {
    currencyIso: '$',
    formattedValue: price ? '$' + price : '',
    value: price,
  },
  valuePriceTotal: {
    currencyIso: '$',
    formattedValue: price ? '$' + price : '',
    value: total,
  },
});

describe('ConfiguratorPriceService', () => {
  let classUnderTest: ConfiguratorPriceService;

  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorPriceService as Type<ConfiguratorPriceService>
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('selected value price', () => {
    describe('should return number', () => {
      it('on selected value only', () => {
        const attribute: Configurator.Attribute = {
          name: 'testAttribute',
          values: [createTestValue(100, 100)],
        };

        const valuePrice = classUnderTest.getSelectedValuePrice(attribute);
        expect(valuePrice.value).toEqual(100);
      });

      it('on selected value', () => {
        const attribute: Configurator.Attribute = {
          name: 'testAttribute',
          values: [createTestValue(200, 100), createTestValue(100, 100, false)],
        };

        const valuePrice = classUnderTest.getSelectedValuePrice(attribute);
        expect(valuePrice.value).toEqual(200);
      });
    });

    describe('should not return price', () => {
      it('without values property', () => {
        const attribute: Configurator.Attribute = {
          name: 'testAttribute',
        };

        const valuePrice = classUnderTest.getSelectedValuePrice(attribute);
        expect(valuePrice).toBeUndefined();
      });

      it('without values', () => {
        const attribute: Configurator.Attribute = {
          name: 'testAttribute',
          values: [],
        };

        const valuePrice = classUnderTest.getSelectedValuePrice(attribute);
        expect(valuePrice).toBeUndefined();
      });

      it('without price property', () => {
        const attribute: Configurator.Attribute = {
          name: 'testAttribute',
          values: [createTestValue(undefined, undefined)],
        };

        const valuePrice = classUnderTest.getSelectedValuePrice(attribute);
        expect(valuePrice.value).toBeUndefined();
      });
    });
  });

  describe('product price info', () => {
    it("should return 'false' because no relevant data are set", () => {
      const attribute: Configurator.Attribute = {
        name: 'testAttribute',
        quantity: undefined,
        attributePriceTotal: undefined,
        values: [createTestValue(undefined, undefined)],
      };

      expect(classUnderTest.isPriceDataDefined(attribute)).toBeFalse();
    });

    it("should return 'false' because only value price is defined", () => {
      const attribute: Configurator.Attribute = {
        name: 'testAttribute',
        quantity: undefined,
        attributePriceTotal: undefined,
        values: [createTestValue(100, 100)],
      };

      expect(classUnderTest.isPriceDataDefined(attribute)).toBeFalse();
    });

    it("should return 'false' because only value price and attribute total price are defined", () => {
      const attribute: Configurator.Attribute = {
        name: 'testAttribute',
        quantity: undefined,
        attributePriceTotal: {
          currencyIso: '$',
          formattedValue: '$100',
          value: 100,
        },
        values: [createTestValue(100, 100)],
      };

      expect(classUnderTest.isPriceDataDefined(attribute)).toBeFalse();
    });

    it("should return 'true' because all necessary data are set", () => {
      const attribute: Configurator.Attribute = {
        name: 'testAttribute',
        quantity: 5,
        attributePriceTotal: {
          currencyIso: '$',
          formattedValue: '$100',
          value: 500,
        },
        values: [createTestValue(100, 100)],
      };

      expect(classUnderTest.isPriceDataDefined(attribute)).toBeTrue();
    });
  });
});
