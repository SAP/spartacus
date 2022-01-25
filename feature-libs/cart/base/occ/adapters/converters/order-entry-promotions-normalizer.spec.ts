import { TestBed } from '@angular/core/testing';
import { PromotionResult } from '@spartacus/cart/base/root';
import { ConverterService } from '@spartacus/core';
import { OrderEntryPromotionsNormalizer } from './order-entry-promotions-normalizer';

const mockAppliedProductPromotions: PromotionResult[] = [
  {
    consumedEntries: [
      {
        orderEntryNumber: 0,
      },
    ],
    description: '10% off on products EOS450D + 18-55 IS Kit',
    promotion: {
      code: 'product_percentage_discount',
    },
  },
];

class MockConverterService {
  convert() {}
}

describe('OrderEntryPromotionsNormalizer', () => {
  let normalizer: OrderEntryPromotionsNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderEntryPromotionsNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    normalizer = TestBed.inject(OrderEntryPromotionsNormalizer);
  });

  it('should be created', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should convert promotion results for each entry', () => {
    const entry = { entryNumber: 0 };

    const result = normalizer.convert({
      item: entry,
      promotions: mockAppliedProductPromotions,
    });
    expect(result.length).toEqual(1);
    expect(result[0].promotion.code).toBe('product_percentage_discount');
  });
});
