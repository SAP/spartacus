import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { createEmptyQuote } from '../../../core/testing/quote-test-utils';
import { CommonQuoteTestUtilsService as TestUtil } from '../../testing/common-quote-test-utils.service';
import { QuoteSummaryPricesComponent } from './quote-summary-prices.component';

const quote: Quote = {
  ...createEmptyQuote(),
};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(quote);

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }
}

describe('QuoteSummaryPricesComponent', () => {
  let fixture: ComponentFixture<QuoteSummaryPricesComponent>;
  let htmlElem: HTMLElement;
  let component: QuoteSummaryPricesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuoteSummaryPricesComponent],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteSummaryPricesComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    withPrices();
    fixture.detectChanges();
  });

  function withPrices() {
    quote.totalPrice = { value: 1000, formattedValue: '$1,000.00' };
    quote.orderDiscounts = { value: 5.99, formattedValue: '$5.99' };
    quote.productDiscounts = { value: 50, formattedValue: '$50.00' };
    quote.quoteDiscounts = { value: 100, formattedValue: '$100.00' };
  }

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display all prices and discounts when present', () => {
    TestUtil.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.cx-price-row',
      5
    );
    TestUtil.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.cx-price-savings',
      3
    );

    TestUtil.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-price-row',
      '.subtotal  $1,000.00',
      0
    );
    TestUtil.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-price-row',
      '.productDiscount  $50.00',
      1
    );
    TestUtil.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-price-row',
      '.orderDiscount  $5.99',
      2
    );
    TestUtil.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-price-row',
      '.quoteDiscount  $100.00',
      3
    );
    TestUtil.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-price-row',
      '.total  $1,000.00',
      4
    );
  });

  it('should display only totals when discounts are zero', () => {
    quote.orderDiscounts = {};
    quote.productDiscounts = undefined;
    quote.quoteDiscounts = { value: 0, formattedValue: '$0.00' };
    fixture.detectChanges();

    TestUtil.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.cx-price-row',
      2
    );
    TestUtil.expectElementNotPresent(expect, htmlElem, '.cx-price-savings');

    TestUtil.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-price-row',
      '.subtotal  $1,000.00',
      0
    );

    TestUtil.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-price-row',
      '.total  $1,000.00',
      1
    );
  });

  describe('hasNonZeroPriceValue', () => {
    it('should return true if price value is present', () => {
      expect(component.hasNonZeroPriceValue({ value: 99.99 })).toBe(true);
    });

    it('should return false if price is not present', () => {
      expect(component.hasNonZeroPriceValue(undefined)).toBe(false);
    });

    it('should return false if price value is not present', () => {
      expect(component.hasNonZeroPriceValue({})).toBe(false);
    });

    it('should return false if price value is zero', () => {
      expect(component.hasNonZeroPriceValue({ value: 0.0 })).toBe(false);
    });
  });
});
