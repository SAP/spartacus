import { TestBed } from '@angular/core/testing';
import { QuoteItemsComponentService } from './quote-items.component.service';

describe('QuoteItemsComponentService', () => {
  let classUnderTest: QuoteItemsComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteItemsComponentService],
    });
    classUnderTest = TestBed.inject(QuoteItemsComponentService);
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
