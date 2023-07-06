import { TestBed } from '@angular/core/testing';
import { ConverterService, PRODUCT_NORMALIZER } from '@spartacus/core';
import { OccQuoteNormalizer } from './occ-quote-normalizer';

class MockConverterService {
  convert() {}
}

describe('OccQuoteNormalizer', () => {
  let occQuoteNormalizer: OccQuoteNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccQuoteNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    occQuoteNormalizer = TestBed.inject(OccQuoteNormalizer);
    converter = TestBed.inject(ConverterService);
    spyOn(converter, 'convert').and.callThrough();
  });

  it('should be created', () => {
    expect(occQuoteNormalizer).toBeTruthy();
  });

  it('should convert quote entries', () => {
    const product = { code: 'testproductcode 1' };
    const price = { value: 123 };
    const quote = {
      allowedActions: [],
      code: 'testquote',
      comments: [],
      description: 'test description',
      entries: [{ product }],
      name: 'test name',
      totalPrice: price,
    };

    const result = occQuoteNormalizer.convert(quote);
    expect(result.code).toBe(quote.code);
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });
});
