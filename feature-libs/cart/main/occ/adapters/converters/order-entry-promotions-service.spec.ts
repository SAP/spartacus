import { TestBed } from '@angular/core/testing';
import { PromotionResult } from '@spartacus/cart/main/root';
import { OrderEntryPromotionsService } from './order-entry-promotions-normalizer';

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

describe('OrderEntryPromotionsService', () => {
  let service: OrderEntryPromotionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderEntryPromotionsService],
    });

    service = TestBed.inject(OrderEntryPromotionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert cart entries', () => {
    const entry = { entryNumber: 0 };

    const result = service.getProductPromotion(
      entry,
      mockAppliedProductPromotions
    );
    expect(result.length).toEqual(1);
    expect(result[0].promotion.code).toBe('product_percentage_discount');
  });
});
