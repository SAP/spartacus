import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ORDER_ENTRY_PROMOTIONS_NORMALIZER,
  PromotionResult,
} from '@spartacus/cart/base/root';
import { ConverterService, PRODUCT_NORMALIZER } from '@spartacus/core';
import { OccReplenishmentOrderNormalizer } from './occ-replenishment-order-normalizer';

class MockConverterService {
  convert() {}
}

const mockPromotions: PromotionResult[] = [
  {
    promotion: {
      code: 'product_percentage_discount',
    },
  },
];

describe('OccReplenishmentOrderNormalizer', () => {
  let normalizer: OccReplenishmentOrderNormalizer;
  let converter: ConverterService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          OccReplenishmentOrderNormalizer,
          {
            provide: ConverterService,
            useClass: MockConverterService,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    normalizer = TestBed.inject(OccReplenishmentOrderNormalizer);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'convert').and.callThrough();
  });

  it('should create', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should convert order entries', () => {
    const product = { code: 'test1' };
    const order = {
      entries: [{ product }],
      appliedProductPromotions: mockPromotions,
    };
    normalizer.convert(order);
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
    expect(converter.convert).toHaveBeenCalledWith(
      { item: order.entries[0], promotions: mockPromotions },
      ORDER_ENTRY_PROMOTIONS_NORMALIZER
    );
  });
});
