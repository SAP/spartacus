import { TestBed } from '@angular/core/testing';
import { PromotionResult } from '../../../../model/cart.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import { ConverterService } from '../../../../util/converter.service';
import { OccCartNormalizer } from './occ-cart-normalizer';
import { OrderEntryPromotionsService } from './order-entry-promotions-service';

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
class MockOrderEntryPromotionsService {
  getProductPromotion() {
    return mockPromotions;
  }
}

describe('OccCartNormalizer', () => {
  let occCartNormalizer: OccCartNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCartNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
        {
          provide: OrderEntryPromotionsService,
          useClass: MockOrderEntryPromotionsService,
        },
      ],
    });

    occCartNormalizer = TestBed.inject(OccCartNormalizer);
    converter = TestBed.inject(ConverterService);
    spyOn(converter, 'convert').and.callFake(((product) => ({
      ...product,
      code: product.code + 'converted',
    })) as any);
  });

  it('should be created', () => {
    expect(occCartNormalizer).toBeTruthy();
  });

  it('should convert cart entries', () => {
    const product = { code: 'test1' };
    const cart = {
      entries: [{ product }],
    };
    const result = occCartNormalizer.convert(cart);
    expect(result.entries[0].product.code).toBe('test1converted');
    expect(result.entries[0].promotions).toEqual(mockPromotions);
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
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
