import { TestBed } from '@angular/core/testing';
import { ConverterService, Product, PRODUCT_NORMALIZER } from '@spartacus/core';
import { PromotionResult } from '../../../../model/cart.model';
import { OrderEntryPromotionsService } from '../../cart/converters/order-entry-promotions-service';
import { OccOrderNormalizer } from './occ-order-normalizer';

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

describe('OccOrderNormalizer', () => {
  let service: OccOrderNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OccOrderNormalizer, useClass: OccOrderNormalizer },
        {
          provide: OrderEntryPromotionsService,
          useClass: MockOrderEntryPromotionsService,
        },
      ],
    });
    service = TestBed.inject(OccOrderNormalizer);
    converter = TestBed.inject(ConverterService);
    spyOn(converter, 'convert').and.callFake(
      (product) =>
        ({
          ...product,
          code: (product as Product).code + 'converted',
        } as any)
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should copy order properties if target is not provided', () => {
    const order = service.convert({ code: 'orderCode' });
    expect(order).toEqual({ code: 'orderCode' });
  });

  it('should not copy order properties if target is provided', () => {
    const order = service.convert({ code: 'orderCode' }, {});
    expect(order).toEqual({});
  });

  it('should convert order entries', () => {
    const product = { code: 'test1' };
    const order = {
      entries: [{ product }],
    };
    const result = service.convert(order);
    expect(result.entries[0].product.code).toBe('test1converted');
    expect(result.entries[0].promotions).toEqual(mockPromotions);
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });

  it('should convert order consignments', () => {
    const product = { code: 'test2' };
    const order = {
      consignments: [{ entries: [{ orderEntry: { product } }] }],
    };
    const result = service.convert(order);
    expect(result.consignments[0].entries[0].orderEntry.product.code).toEqual(
      'test2converted'
    );
    expect(result.consignments[0].entries[0].orderEntry.promotions).toEqual(
      mockPromotions
    );
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });

  it('should convert order unconsignedEntries', () => {
    const product = { code: 'test3' };
    const order = {
      unconsignedEntries: [{ product }],
    };
    const result = service.convert(order);
    expect(result.unconsignedEntries[0].product.code).toEqual('test3converted');
    expect(result.unconsignedEntries[0].promotions).toEqual(mockPromotions);
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });
});
