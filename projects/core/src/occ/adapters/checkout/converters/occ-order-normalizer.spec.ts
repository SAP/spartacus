import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService, Product, PRODUCT_NORMALIZER } from '@spartacus/core';
import { OccOrderNormalizer } from './occ-order-normalizer';

describe('OccOrderNormalizer', () => {
  let service: OccOrderNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OccOrderNormalizer, useClass: OccOrderNormalizer },
      ],
    });
    service = TestBed.get(OccOrderNormalizer as Type<OccOrderNormalizer>);
    converter = TestBed.get(ConverterService as Type<ConverterService>);
    spyOn(converter, 'convert').and.callFake(
      product =>
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
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });

  it('should convert order unconsignedEntries', () => {
    const product = { code: 'test3' };
    const order = {
      unconsignedEntries: [{ product }],
    };
    const result = service.convert(order);
    expect(result.unconsignedEntries[0].product.code).toEqual('test3converted');
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });
});
