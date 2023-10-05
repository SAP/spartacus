import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  Price
} from '@spartacus/core';
import {
  Quote,
  QuoteActionType,
  QuoteFacade,
  QuoteState,
} from '@spartacus/quote/root';
import {
  OutletDirective
} from '@spartacus/storefront';
import { BehaviorSubject, NEVER, Observable } from 'rxjs';
import { createEmptyQuote } from '../../../core/testing/quote-test-utils';
import { CommonQuoteTestUtilsService } from '../../testing/common-quote-test-utils.service';
import { QuoteHeaderPriceComponent } from './quote-header-price.component';

const cartId = '1234';
const quoteCode = '3333';
const threshold = 20;
const totalPrice: Price = { value: threshold + 1 };

const quote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [
    { type: QuoteActionType.EDIT, isPrimary: false },
    { type: QuoteActionType.REQUOTE, isPrimary: true },
  ],
  state: QuoteState.BUYER_DRAFT,
  cartId: cartId,
  code: quoteCode,
  threshold: threshold,
  totalPrice: totalPrice,
};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(quote);

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }
}

@Directive({
  selector: '[cxOutlet]',
})
class MockOutletDirective implements Partial<OutletDirective> {
  @Input() cxOutlet: string;
  @Input() cxOutletContext: string;
}

describe('QuoteHeaderPriceComponent', () => {
  let fixture: ComponentFixture<QuoteHeaderPriceComponent>;
  let htmlElem: HTMLElement;
  let component: QuoteHeaderPriceComponent;
  let facade: QuoteFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuoteHeaderPriceComponent, MockOutletDirective],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteHeaderPriceComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    facade = TestBed.inject(QuoteFacade);
    mockQuoteDetails$.next(quote);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
    expect(facade).toBeDefined();
  });

  describe('Ghost animation', () => {
    it('should render view for ghost animation', () => {
      component.quoteDetails$ = NEVER;
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-summary-heading'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-title'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-summary-partials'
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-row',
        4
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-summary-label',
        4
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-summary-amount',
        4
      );
    });
  });
});
