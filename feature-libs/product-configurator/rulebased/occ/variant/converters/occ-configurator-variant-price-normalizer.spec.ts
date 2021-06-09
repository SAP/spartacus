import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { OccConfiguratorVariantPriceNormalizer } from './occ-configurator-variant-price-normalizer';

class MockConverterService {
  convert() {}
}

const CONFIG_ID = 'configId1234';

const prices: OccConfigurator.Prices = {
  configId: CONFIG_ID,
  pricingError: false,
  showDeltaPrices: false,
  priceSummary: {
    basePrice: {
      formattedValue: '22.000 €',
    },
    selectedOptions: {
      formattedValue: '900 €',
    },
    currentTotal: {
      formattedValue: '22.900 €',
    },
  },
};

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

  /**
  it('should convert a price to a configuration', () => {
    const result = classUnderTest.convert(prices);
    expect(result).toEqual(prices.priceSummary);
  });
   */
});
