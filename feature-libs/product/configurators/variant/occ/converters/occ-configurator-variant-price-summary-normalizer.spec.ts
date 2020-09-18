import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService } from '@spartacus/core';
import { OccConfigurator } from '../occ-configurator.models';
import { OccConfiguratorVariantPriceSummaryNormalizer } from './occ-configurator-variant-price-summary-normalizer';

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

describe('OccConfiguratorVariantPriceSummaryNormalizer', () => {
  let occConfiguratorVariantPriceSummaryNormalizer: OccConfiguratorVariantPriceSummaryNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccConfiguratorVariantPriceSummaryNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    occConfiguratorVariantPriceSummaryNormalizer = TestBed.inject(
      OccConfiguratorVariantPriceSummaryNormalizer as Type<
        OccConfiguratorVariantPriceSummaryNormalizer
      >
    );
  });

  it('should be created', () => {
    expect(occConfiguratorVariantPriceSummaryNormalizer).toBeTruthy();
  });

  it('should convert a price to a configuration', () => {
    const result = occConfiguratorVariantPriceSummaryNormalizer.convert(prices);
    expect(result).toEqual(prices.priceSummary);
  });
});
