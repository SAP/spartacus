import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { QuoteHeaderOrderSummaryComponent } from '@spartacus/quote/components';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { createEmptyQuote } from '../../../core/testing/quote-test-utils';
import { BehaviorSubject, NEVER, Observable } from 'rxjs';
import { CommonQuoteTestUtilsService } from '../../testing/common-quote-test-utils.service';

@Component({
  selector: 'cx-quote-header-price',
  template: '',
})
class MockQuoteHeaderPriceComponent {}

@Component({
  selector: 'cx-quote-actions-by-role',
  template: '',
})
class MockQuoteActionsByRoleComponent {}

@Component({
  selector: 'cx-quote-header-seller-edit',
  template: '',
})
class MockQuoteHeaderSellerEditComponent {}

const quote: Quote = {
  ...createEmptyQuote(),
};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(quote);

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }
}

describe('QuoteOrderSummaryComponent', () => {
  let fixture: ComponentFixture<QuoteHeaderOrderSummaryComponent>;
  let component: QuoteHeaderOrderSummaryComponent;
  let htmlElem: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        QuoteHeaderOrderSummaryComponent,
        MockQuoteHeaderPriceComponent,
        MockQuoteActionsByRoleComponent,
        MockQuoteHeaderSellerEditComponent,
      ],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteHeaderOrderSummaryComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
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

    it('should render view for ghost animation', () => {
      component.quoteDetails$ = NEVER;
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-actions'
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-button',
        3
      );
    });
  });
});
