import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { BehaviorSubject, NEVER, Observable } from 'rxjs';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { CommonQuoteTestUtilsService } from '../testing/common-quote-test-utils.service';
import { QuoteSummaryActionsComponent } from './actions/quote-summary-actions.component';
import { QuoteSummaryPricesComponent } from './prices/quote-summary-prices.component';
import { QuoteSummaryComponent } from './quote-summary.component';
import { QuoteSummarySellerEditComponent } from './seller-edit/quote-summary-seller-edit.component';

@Component({
  selector: 'cx-quote-summary-prices',
  template: '',
})
class MockQuoteSummaryPricesComponent {}

@Component({
  selector: 'cx-quote-summary-actions',
  template: '',
})
class MockQuoteSummaryActionsComponent {}

@Component({
  selector: 'cx-quote-summary-seller-edit',
  template: '',
})
class MockQuoteSummarySellerEditComponent {}

const quote: Quote = {
  ...createEmptyQuote(),
};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(quote);

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }
}

describe('QuoteSummaryComponent', () => {
  let fixture: ComponentFixture<QuoteSummaryComponent>;
  let component: QuoteSummaryComponent;
  let htmlElem: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuoteSummaryComponent],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
      ],
    })
      .overrideComponent(QuoteSummaryComponent, {
        remove: {
          imports: [
            TranslatePipe,
            QuoteSummaryPricesComponent,
            QuoteSummaryActionsComponent,
            QuoteSummarySellerEditComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockQuoteSummaryPricesComponent,
            MockQuoteSummaryActionsComponent,
            MockQuoteSummarySellerEditComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteSummaryComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  describe('Ghost animation', () => {
    it('should display ghost elements for prices', () => {
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

    it('should display ghost elements for quote actions', () => {
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
