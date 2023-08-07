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
import { EditCard, EditEvent } from '../edit/quote-details-edit.component';

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

  //editQuote = createSpy().and.callThrough();
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

@Component({
  selector: 'cx-quote-details-edit',
  template: '',
})
class MockQuoteDetailsEditComponent {
  @Input() content: EditCard | null;
}

describe('QuoteDetailsOverviewComponent', () => {
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
        MockQuoteDetailsEditComponent,
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

  describe('defineQuoteMetaData', () => {
    it('should define an empty quote meta data object', () => {
      const editEvent: EditEvent = {
        editMode: false,
      };
      const metaData = component['defineQuoteMetaData'](editEvent);
      expect(Object.keys(metaData).length).toBe(0);
    });

    it('should define a quote meta data object', () => {
      const editEvent: EditEvent = {
        editMode: false,
        name: 'name',
        description: 'description',
        expirationTime: new Date('2023-02-02T13:05:12+0000'),
      };
      const metaData = component['defineQuoteMetaData'](editEvent);

      expect(Object.keys(metaData).length).toBe(3);
      expect(metaData.name).toBe(editEvent.name);
      expect(metaData.description).toBe(editEvent.description);
      expect(metaData.expirationTime).toBe(editEvent.expirationTime);
    });
  });

  describe('handle actions', () => {
    it('should handle cancel action', () => {
      component.cancel(false);
      expect(component.editMode).toBe(false);
    });

    // TODO
    xit('should handle edit action', () => {
      const editEvent: EditEvent = {
        editMode: false,
        name: 'new name',
        description: 'New Description',
      };
      component.edit(mockQuote, editEvent);
      expect(component.editMode).toBe(editEvent.editMode);
    });
  });

  it('should set edit mode to the opposite', () => {
    expect(component.editMode).toBe(false);
    component.setEditMode();
    expect(component.editMode).toBe(true);
  });

  describe('card content', () => {
    it('should retrieves the card content that represents the quote information with empty name and description', () => {
      mockQuote.name = undefined;
      mockQuote.description = undefined;
      fixture.detectChanges();

      const expected = {
        title: 'quote.details.information',
        paragraphs: [
          {
            title: 'quote.details.name',
            text: ['-'],
          },
          {
            title: 'quote.details.description',
            text: ['-'],
          },
        ],
      };

      component
        .getQuoteInformation(mockQuote.name, mockQuote.description)
        .subscribe((result) => {
          expect(result).toEqual(expected);
        });
    });

    it('should retrieves the edit card content that represents the edit quote information with its name and description', () => {
      const name = 'name';
      const description = 'description';

      const expected = {
        title: 'quote.details.information',
        paragraphs: [
          {
            title: 'quote.details.name',
            text: name,
          },
          {
            title: 'quote.details.description',
            text: description,
            isTextArea: true,
            charactersLimit: 255,
          },
        ],
      };

      component
        .getEditQuoteInformation(name, description)
        .subscribe((result) => {
          expect(result).toEqual(expected);
        });
    });

    it('should retrieves the card content that represents an empty estimated and date information', () => {
      mockQuote.creationTime = undefined;
      fixture.detectChanges();

      const expected = {
        title: 'quote.details.estimateAndDate',
        paragraphs: [
          {
            title: 'quote.details.estimatedTotal',
            text: [mockQuote.totalPrice.formattedValue],
          },
          {
            title: 'quote.details.created',
            text: ['-'],
          },
        ],
      };

      component
        .getEstimatedAndDate(mockQuote, mockQuote.creationTime)
        .subscribe((result) => {
          expect(result).toEqual(expected);
        });
    });

    it('should retrieves the card content that represents an empty update information', () => {
      mockQuote.updatedTime = undefined;
      mockQuote.expirationTime = undefined;
      fixture.detectChanges();

      const expected = {
        title: 'quote.details.update',
        paragraphs: [
          {
            title: 'quote.details.lastUpdated',
            text: ['-'],
          },
          {
            title: 'quote.details.expiryDate',
            text: ['-'],
          },
        ],
      };

      component
        .getUpdate(mockQuote.updatedTime, mockQuote.expirationTime)
        .subscribe((result) => {
          expect(result).toEqual(expected);
        });
    });
  });

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
