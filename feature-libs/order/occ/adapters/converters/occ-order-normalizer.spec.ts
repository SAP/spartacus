import { TestBed } from '@angular/core/testing';
import {
  ORDER_ENTRY_PROMOTIONS_NORMALIZER,
  PromotionResult,
} from '@spartacus/cart/base/root';
import { ConverterService, PRODUCT_NORMALIZER } from '@spartacus/core';
import { OccOrderNormalizer } from './occ-order-normalizer';

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

describe('OccOrderNormalizer', () => {
  let service: OccOrderNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOrderNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });
    service = TestBed.inject(OccOrderNormalizer);
    converter = TestBed.inject(ConverterService);
    spyOn(converter, 'convert').and.callThrough();
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
      appliedProductPromotions: mockPromotions,
    };
    service.convert(order);
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
    expect(converter.convert).toHaveBeenCalledWith(
      { item: order.entries[0], promotions: mockPromotions },
      ORDER_ENTRY_PROMOTIONS_NORMALIZER
    );
  });

  it('should convert order consignments', () => {
    const product = { code: 'test2' };
    const order = {
      consignments: [{ entries: [{ orderEntry: { product } }] }],
      appliedProductPromotions: mockPromotions,
    };
    service.convert(order);
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
    expect(converter.convert).toHaveBeenCalledWith(
      {
        item: order.consignments[0].entries[0].orderEntry,
        promotions: mockPromotions,
      },
      ORDER_ENTRY_PROMOTIONS_NORMALIZER
    );
  });

  it('should convert order unconsignedEntries', () => {
    const product = { code: 'test3' };
    const order = {
      unconsignedEntries: [{ product }],
      appliedProductPromotions: mockPromotions,
    };
    service.convert(order);
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
    expect(converter.convert).toHaveBeenCalledWith(
      { item: order.unconsignedEntries[0], promotions: mockPromotions },
      ORDER_ENTRY_PROMOTIONS_NORMALIZER
    );
  });
});
