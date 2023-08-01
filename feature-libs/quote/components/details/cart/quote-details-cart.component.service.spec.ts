import { TestBed } from '@angular/core/testing';
import { QuoteDetailsCartComponentService } from './quote-details-cart.component.service';

describe('QuoteDetailsCartComponentService', () => {
  let classUnderTest: QuoteDetailsCartComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteDetailsCartComponentService],
    });
    classUnderTest = TestBed.inject(QuoteDetailsCartComponentService);
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
