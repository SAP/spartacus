import { TestBed } from '@angular/core/testing';
import { ConverterService, Product, PRODUCT_NORMALIZER } from '@spartacus/core';
import { OccReturnRequestNormalizer } from './occ-return-request-normalizer';

describe('OccReturnRequestNormalizer', () => {
  let normalizer: OccReturnRequestNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccReturnRequestNormalizer],
    });
    normalizer = TestBed.inject(OccReturnRequestNormalizer);
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
    expect(normalizer).toBeTruthy();
  });

  it('should copy return request properties if target is not provided', () => {
    const returnRequest = normalizer.convert({ rma: 'test' });
    expect(returnRequest).toEqual({ rma: 'test' });
  });

  it('should not copy orreturn requestder properties if target is provided', () => {
    const returnRequest = normalizer.convert({ rma: 'test' }, {});
    expect(returnRequest).toEqual({});
  });

  it('should convert order entries of returnRequest', () => {
    const product = { code: 'test1' };
    const returnRequest = {
      returnEntries: [{ orderEntry: { product } }],
    };
    const result = normalizer.convert(returnRequest);
    expect(result.returnEntries[0].orderEntry.product.code).toBe(
      'test1converted'
    );
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });
});
