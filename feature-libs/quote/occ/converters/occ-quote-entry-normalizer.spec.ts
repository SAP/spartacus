import { TestBed } from '@angular/core/testing';
import { ConverterService, PRODUCT_NORMALIZER } from '@spartacus/core';
import { QuoteState } from '@spartacus/quote/root';
import { OccQuoteEntryNormalizer } from './occ-quote-entry-normalizer';

const product = { code: 'testproductcode 1' };
const price = { value: 123 };
const quote = {
  allowedActions: [],
  code: 'testquote',
  state: QuoteState.BUYER_DRAFT,
  comments: [],
  description: 'test description',
  entries: [{ product }],
  name: 'test name',
  totalPrice: price,
};

class MockConverterService {
  convert() {}
}

describe('OccQuoteEntryNormalizer', () => {
  let occQuoteEntryNormalizer: OccQuoteEntryNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccQuoteEntryNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    occQuoteEntryNormalizer = TestBed.inject(OccQuoteEntryNormalizer);
    converter = TestBed.inject(ConverterService);
    spyOn(converter, 'convert').and.callThrough();
  });

  it('should be created', () => {
    expect(occQuoteEntryNormalizer).toBeTruthy();
  });

  it('should convert quote entries', () => {
    const result = occQuoteEntryNormalizer.convert(quote);
    expect(result.code).toBe(quote.code);
    expect(result.entries?.length).toBe(1);
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });
});
