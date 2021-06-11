import { TestBed, waitForAsync } from '@angular/core/testing';
import { PromotionResult } from '../../../../model/cart.model';
import { Product } from '../../../../model/product.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import { ConverterService } from '../../../../util/converter.service';
import { OrderEntryPromotionsService } from '../../cart/converters/order-entry-promotions-service';
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
class MockOrderEntryPromotionsService {
  getProductPromotion() {
    return mockPromotions;
  }
}

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
          {
            provide: OrderEntryPromotionsService,
            useClass: MockOrderEntryPromotionsService,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    normalizer = TestBed.inject(OccReplenishmentOrderNormalizer);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'convert').and.callFake(
      (product) =>
        ({
          ...product,
          code: (product as Product).code + 'converted',
        } as any)
    );
  });

  it('should create', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should convert order entries', () => {
    const product = { code: 'test1' };
    const order = {
      entries: [{ product }],
    };
    const result = normalizer.convert(order);
    expect(result.entries[0].product.code).toBe('test1converted');
    expect(result.entries[0].promotions).toEqual(mockPromotions);
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });
});
