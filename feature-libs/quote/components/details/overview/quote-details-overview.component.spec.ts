import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  QuoteFacade,
  Quote,
  QuoteActionType,
  QuoteState,
} from '@spartacus/quote/root';
import { I18nTestingModule, TranslationService } from '@spartacus/core';
import { CardModule, ICON_TYPE } from '@spartacus/storefront';

import { Observable, of } from 'rxjs';
import { QuoteDetailsOverviewComponent } from './quote-details-overview.component';
import createSpy = jasmine.createSpy;

const totalPriceFormattedValue = '$20';

const mockCartId = '1234';
const mockAction = { type: QuoteActionType.CREATE, isPrimary: true };
const mockQuote: Quote = {
  allowedActions: [mockAction],
  isEditable: true,
  comments: [],
  cartId: mockCartId,
  code: '00001233',
  creationTime: new Date('2022-06-07T11:45:42+0000'),
  description: 'Quote Description',
  expirationTime: new Date('2022-07-07T23:59:59+0000'),
  updatedTime: new Date('2022-06-09T13:31:36+0000'),
  previousEstimatedTotal: {
    currencyIso: 'USD',
    formattedValue: '$1.00',
    value: 1,
  },
  state: QuoteState.BUYER_ORDERED,
  name: 'Name',
  totalPrice: { value: 20, formattedValue: totalPriceFormattedValue },
};

export class MockQuoteFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return of(mockQuote);
  }
  setSort = createSpy();
  setCurrentPage = createSpy();
}

class MockTranslationService implements Partial<TranslationService> {
  translate(key: string): Observable<string> {
    return of(key);
  }
}

@Component({
  selector: 'cx-quote-action-links',
  template: '',
})
export class MockQuoteActionLinksComponent {}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

xdescribe('QuoteDetailsOverviewComponent', () => {
  let fixture: ComponentFixture<QuoteDetailsOverviewComponent>;
  let component: QuoteDetailsOverviewComponent;
  //let htmlElem: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CardModule, RouterTestingModule],
      declarations: [
        QuoteDetailsOverviewComponent,
        MockCxIconComponent,
        MockQuoteActionLinksComponent,
      ],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockQuoteFacade,
        },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteDetailsOverviewComponent);
    //htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display overview if it is available', () => {
    //when
    fixture.detectChanges();

    //then
    const quoteOverviewElement = fixture.debugElement.query(
      By.css('.cx-quote-overview')
    );
    expect(quoteOverviewElement.nativeElement.innerHTML).toBeDefined();
  });

  it('should display titles and content in card if details are available', () => {
    //when
    fixture.detectChanges();

    //then
    const cards = fixture.debugElement.queryAll(By.css('cx-card'));
    const cardTitles = fixture.debugElement.queryAll(By.css('.cx-card-title'));
    const cardContainers = fixture.debugElement.queryAll(
      By.css('.cx-card-container')
    );
    expect(cards.length).toEqual(3);
    expect(cardTitles.length).toEqual(3);
    expect(cardContainers.length).toEqual(3);
  });

  /**
   //TODO
  it('should return object with title and text if value is defined when getCardContent', () => {
    //given
    const value = 'test';
    const titleKey = 'key';
    const expected = { title: 'key', text: [value] };

    //then
    component.getCardContent(value, titleKey).subscribe((result) => {
      expect(result).toEqual(expected);
    });
  });

  it('should return object with title and placeholder if value is not defined defined when getCardContent', () => {
    //given
    const value = null;
    const titleKey = 'key';
    const expected = { title: 'key', text: ['-'] };

    //then
    component.getCardContent(value, titleKey).subscribe((result) => {
      expect(result).toEqual(expected);
    });
  });
   */

  describe('getTotalPrice', () => {
    it('should return the total price formatted value in case it is available', () => {
      expect(component['getTotalPrice'](mockQuote)).toBe(
        totalPriceFormattedValue
      );
    });

    it('should return null in case no formatted value is available', () => {
      const quoteWOPrices: Quote = {
        ...mockQuote,
        totalPrice: {},
      };
      expect(component['getTotalPrice'](quoteWOPrices)).toBe(null);
    });
  });

  describe('getTotalPriceDescription', () => {
    it('should name total price as estimated as long as final status not reached', () => {
      expect(component['getTotalPriceDescription'](mockQuote)).toBe(
        'quote.details.estimatedTotal'
      );
    });

    it('should name total price as total as in case final status reached, i.e. checkout action is available', () => {
      const quoteInOfferState: Quote = {
        ...mockQuote,
        allowedActions: [{ type: QuoteActionType.CHECKOUT, isPrimary: true }],
      };
      expect(component['getTotalPriceDescription'](quoteInOfferState)).toBe(
        'quote.details.total'
      );
    });

    it('should be able to deal with undefined actions', () => {
      const quoteWoActions: Quote = { ...mockQuote, allowedActions: undefined };
      expect(component['getTotalPriceDescription'](quoteWoActions)).toBe(
        'quote.details.estimatedTotal'
      );
    });
  });
});
