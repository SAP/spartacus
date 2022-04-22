import { TestBed } from '@angular/core/testing';
import {
  ORDER_ENTRY_PROMOTIONS_NORMALIZER,
  PromotionResult,
} from '@spartacus/cart/base/root';
import { ConverterService, PRODUCT_NORMALIZER } from '@spartacus/core';
import { OccCartNormalizer } from './occ-cart-normalizer';

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

describe('OccCartNormalizer', () => {
  let occCartNormalizer: OccCartNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCartNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    occCartNormalizer = TestBed.inject(OccCartNormalizer);
    converter = TestBed.inject(ConverterService);
    spyOn(converter, 'convert').and.callThrough();
  });

  it('should be created', () => {
    expect(occCartNormalizer).toBeTruthy();
  });

  it('should convert cart entries', () => {
    const product = { code: 'test1' };
    const cart = {
      entries: [{ product }],
      appliedProductPromotions: mockPromotions,
    };
    occCartNormalizer.convert(cart);
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
    expect(converter.convert).toHaveBeenCalledWith(
      { item: cart.entries[0], promotions: mockPromotions },
      ORDER_ENTRY_PROMOTIONS_NORMALIZER
    );
  });

  it('should not contain duplicated pomotions', () => {
    const cart = {
      guid: '17',
      appliedOrderPromotions: [
        {
          consumedEntries: [],
          description: 'Buy over $200.00 get $20.00 discount on cart',
          promotion: {
            code: 'order_threshold_fixed_discount_main',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description: 'Buy over $200.00 get $20.00 discount on cart',
          promotion: {
            code: 'order_threshold_fixed_discount_main',
            promotionType: 'Rule Based Promotion',
          },
        },
      ],
    };
    const result = occCartNormalizer.convert(cart);
    expect(result.appliedOrderPromotions.length).toEqual(1);
    expect(result.appliedOrderPromotions).toEqual([
      {
        consumedEntries: [],
        description: 'Buy over $200.00 get $20.00 discount on cart',
        promotion: {
          code: 'order_threshold_fixed_discount_main',
          promotionType: 'Rule Based Promotion',
        },
      },
    ]);
  });
});
