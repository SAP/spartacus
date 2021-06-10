import { TestBed } from '@angular/core/testing';
import { ConverterService, PRODUCT_NORMALIZER } from '@spartacus/core';
import { ORDER_ENTRY_PROMOTIONS_NORMALIZER } from '../../../../cart/connectors/cart/converters';
import { Product } from '../../../../model/product.model';
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
    service = TestBed.inject(OccOrderNormalizer);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'convert').and.callFake(function (arg: any) {
      if (arg.code) {
        return {
          ...arg,
          code: (arg as Product).code + 'converted',
        } as any;
      } else {
        return [
          { entryNumber: 0, promotions: [{ description: 'tested Promotion' }] },
        ] as any;
      }
    });
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
      entries: [{ entryNumber: 0, product }],
    };

    const result = service.convert(order);
    expect(result.entries[0].product.code).toBe('test1converted');
    expect(result.entries[0].promotions[0].description).toBe(
      'tested Promotion'
    );
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
    expect(converter.convert).toHaveBeenCalledWith(
      result,
      ORDER_ENTRY_PROMOTIONS_NORMALIZER
    );
  });

  it('should convert order consignments', () => {
    const product = { code: 'test2' };
    const order = {
      entries: [{ entryNumber: 0, product }],
      consignments: [
        { entries: [{ orderEntry: { entryNumber: 0, product } }] },
      ],
    };

    const result = service.convert(order);
    expect(result.consignments[0].entries[0].orderEntry.product.code).toEqual(
      'test2converted'
    );
    expect(
      result.consignments[0].entries[0].orderEntry.promotions[0].description
    ).toBe('tested Promotion');
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
    expect(converter.convert).toHaveBeenCalledWith(
      result,
      ORDER_ENTRY_PROMOTIONS_NORMALIZER
    );
  });

  it('should convert order unconsignedEntries', () => {
    const product = { code: 'test3' };
    const order = {
      entries: [{ entryNumber: 0, product }],
      unconsignedEntries: [{ entryNumber: 0, product }],
    };

    const result = service.convert(order);
    expect(result.unconsignedEntries[0].product.code).toEqual('test3converted');
    expect(result.unconsignedEntries[0].promotions[0].description).toBe(
      'tested Promotion'
    );
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
    expect(converter.convert).toHaveBeenCalledWith(
      result,
      ORDER_ENTRY_PROMOTIONS_NORMALIZER
    );
  });
});
