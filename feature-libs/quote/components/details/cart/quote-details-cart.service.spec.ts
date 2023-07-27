import { TestBed } from '@angular/core/testing';
import { QuoteDetailsCartService } from './quote-details-cart.service';

describe('QuoteDetailsCartService', () => {
  let classUnderTest: QuoteDetailsCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteDetailsCartService],
    });
    classUnderTest = TestBed.inject(QuoteDetailsCartService);
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });

  it('should expand the quote entries by default', () => {
    classUnderTest
      .getQuoteEntriesExpanded()
      .subscribe((value) => expect(value).toBe(true))
      .unsubscribe();
  });

  it('should collapse the quote entries', () => {
    classUnderTest.setQuoteEntriesExpanded(false);
    classUnderTest
      .getQuoteEntriesExpanded()
      .subscribe((value) => expect(value).toBe(false))
      .unsubscribe();
  });

  it('should expand the quote entries', () => {
    classUnderTest.setQuoteEntriesExpanded(true);
    classUnderTest
      .getQuoteEntriesExpanded()
      .subscribe((value) => expect(value).toBe(true))
      .unsubscribe();
  });
});
