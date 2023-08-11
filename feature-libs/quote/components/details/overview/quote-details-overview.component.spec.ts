import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Quote,
  QuoteActionType,
  QuoteFacade,
  QuoteMetadata,
  QuoteState,
} from '@spartacus/quote/root';
import {
  EventService,
  I18nTestingModule,
  TranslationService,
} from '@spartacus/core';
import { CardModule, ICON_TYPE } from '@spartacus/storefront';

import { Observable, of } from 'rxjs';
import { QuoteDetailsOverviewComponent } from './quote-details-overview.component';
import { EditCard, EditEvent } from '../edit/quote-details-edit.component';
import { CommonQuoteTestUtilsService } from '../../testing/common-quote-test-utils.service';

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
  state: QuoteState.BUYER_DRAFT,
  name: 'Name',
  totalPrice: { value: 20, formattedValue: totalPriceFormattedValue },
};

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

class MockTranslationService implements Partial<TranslationService> {
  translate(key: string): Observable<string> {
    return of(key);
  }
}

describe('QuoteDetailsOverviewComponent', () => {
  let fixture: ComponentFixture<QuoteDetailsOverviewComponent>;
  let component: QuoteDetailsOverviewComponent;
  let htmlElem: HTMLElement;
  let mockedQuoteFacade: QuoteFacade;
  let mockedEventService: EventService;

  beforeEach(
    waitForAsync(() => {
      initMocks();
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
            useValue: mockedQuoteFacade,
          },
          {
            provide: EventService,
            useValue: mockedEventService,
          },
          { provide: TranslationService, useClass: MockTranslationService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteDetailsOverviewComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  function initMocks() {
    mockedQuoteFacade = jasmine.createSpyObj('quoteFacade', [
      'getQuoteDetails',
      'editQuote',
    ]);
    asSpy(mockedQuoteFacade.getQuoteDetails).and.returnValue(of(mockQuote));
    asSpy(mockedQuoteFacade.editQuote).and.returnValue(of({}));

    mockedEventService = jasmine.createSpyObj('eventService', ['dispatch']);
  }

  function asSpy(f: any) {
    return <jasmine.Spy>f;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering', () => {
    it('should render basic component framework accordingly', () => {
      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-header-container'
      );

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-header',
        'quote.commons.id: ' + mockQuote.code
      );

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-status',
        'quote.commons.status: quote.states.' + mockQuote.state
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-container'
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-summary-card',
        3
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        'cx-card',
        3
      );
    });

    it('should render component with deactivated edit mode', () => {
      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-content cx-card'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-edit-step'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'button.cx-action-link'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-icon'
      );
    });

    it('should render component with activated edit mode', () => {
      component.toggleEditMode();
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-content cx-quote-details-edit'
      );

      CommonQuoteTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-edit-step'
      );
    });
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

  describe('isQuoteInformationEditable', () => {
    let quote: Quote;
    beforeEach(() => {
      quote = structuredClone(mockQuote);
      quote.state = QuoteState.SELLERAPPROVER_APPROVED;
    });

    it('should return "false" if the quote information is not editable', () => {
      quote.isEditable = false;
      expect(component.isQuoteInformationEditable(quote)).toBe(false);
    });

    it('should return "false" if the quote information is not editable for "SELLER_DRAFT"', () => {
      quote.state = QuoteState.SELLER_DRAFT;
      expect(component.isQuoteInformationEditable(quote)).toBe(false);
    });

    it('should return "true" if the quote information is editable for "BUYER_DRAFT"', () => {
      quote.state = QuoteState.BUYER_DRAFT;
      expect(component.isQuoteInformationEditable(quote)).toBe(true);
    });

    it('should return "true" if the quote information is editable for "BUYER_OFFER"', () => {
      quote.state = QuoteState.BUYER_OFFER;
      expect(component.isQuoteInformationEditable(quote)).toBe(true);
    });
  });

  describe('handle actions', () => {
    it('should handle cancel action', () => {
      component.cancel(false);
      expect(component.editMode).toBe(false);
    });

    it('should handle edit action', () => {
      const editEvent: EditEvent = {
        editMode: false,
        name: 'new name',
        description: 'New Description',
      };

      const quoteMetaData: QuoteMetadata = {
        name: editEvent.name,
        description: editEvent.description,
      };

      component.edit(mockQuote, editEvent);
      expect(component.editMode).toBe(editEvent.editMode);
      expect(mockedQuoteFacade.editQuote).toHaveBeenCalledWith(
        mockQuote.code,
        quoteMetaData
      );
    });
  });

  it('should set edit mode to the opposite', () => {
    expect(component.editMode).toBe(false);
    component.toggleEditMode();
    expect(component.editMode).toBe(true);
  });

  describe('card content', () => {
    it('should retrieve the card content that represents the quote information with empty name and description', () => {
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

    it('should retrieve the edit card content that represents the edit quote information with its name and description', () => {
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

    it('should the card content that represents an empty estimated and date information', () => {
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

    it('should retrieve the card content that represents an empty update information', () => {
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
