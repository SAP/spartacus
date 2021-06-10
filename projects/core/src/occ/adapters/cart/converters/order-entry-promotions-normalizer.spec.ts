import { TestBed } from '@angular/core/testing';
import { PromotionResult } from '../../../../model/cart.model';
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

describe('OrderEntryPromotionsNormalizer', () => {
  let orderEntryPromotionsNormalizer: OrderEntryPromotionsNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderEntryPromotionsNormalizer],
    });

    orderEntryPromotionsNormalizer = TestBed.inject(
      OrderEntryPromotionsNormalizer
    );
  });

  it('should be created', () => {
    expect(orderEntryPromotionsNormalizer).toBeTruthy();
  });

  it('should convert cart entries', () => {
    const source = {
      entries: [{ entryNumber: 0 }],
      appliedProductPromotions: mockAppliedProductPromotions,
    };

    const result = orderEntryPromotionsNormalizer.convert(source);
    expect(result[0].promotions.length).toEqual(1);
    expect(result[0].promotions[0].promotion.code).toBe(
      'product_percentage_discount'
    );
  });
});
