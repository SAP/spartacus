import { TestBed } from '@angular/core/testing';

import { QuoteCartService } from './quote-cart.service';
import { QUOTE_CODE } from '../../core/testing/quote-test-utils';

describe('QuoteCartService', () => {
  let quoteCartService: QuoteCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteCartService],
    });

    quoteCartService = TestBed.inject(QuoteCartService);
  });

  it('should create service', () => {
    expect(quoteCartService).toBeDefined();
  });

  describe('setQuoteId', () => {
    it('should trigger emission of new quote id', (done) => {
      quoteCartService.setQuoteId(QUOTE_CODE);
      quoteCartService.getQuoteId().subscribe((quoteId) => {
        expect(quoteId).toBe(QUOTE_CODE);
        done();
      });
    });
  });

  describe('setQuoteCartActive', () => {
    it('should trigger emission of new state', (done) => {
      quoteCartService.setQuoteCartActive(true);
      quoteCartService.getQuoteCartActive().subscribe((isActive) => {
        expect(isActive).toBe(true);
        done();
      });
    });
  });
});
