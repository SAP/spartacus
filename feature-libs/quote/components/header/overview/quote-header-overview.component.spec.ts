import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  EventService,
  I18nTestingModule,
  TranslationService,
} from '@spartacus/core';
import {
  Quote,
  QuoteActionType,
  QuoteFacade,
  QuoteMetadata,
  QuoteState,
} from '@spartacus/quote/root';
import { CardModule, ICON_TYPE } from '@spartacus/storefront';

import { BehaviorSubject, NEVER, Observable, of } from 'rxjs';
import { CommonQuoteTestUtilsService } from '../../testing/common-quote-test-utils.service';
import {
  EditCard,
  SaveEvent,
} from '../buyer-edit/quote-header-buyer-edit.component';
import { QuoteHeaderOverviewComponent } from './quote-header-overview.component';
import { QuoteUIConfig } from '../../config';

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
  selector: 'cx-quote-actions-link',
  template: '',
})
export class MockQuoteActionsLinkComponent {}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-quote-header-buyer-edit',
  template: '',
})
class MockQuoteHeaderBuyerEditComponent {
  @Input() content: EditCard | null;
}

class MockTranslationService implements Partial<TranslationService> {
  translate(key: string): Observable<string> {
    return of(key);
  }
}

const mockQuoteDetails$ = new BehaviorSubject<Quote>(mockQuote);

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }

  editQuote(): Observable<unknown> {
    return of({});
  }
}

describe('QuoteHeaderOverviewComponent', () => {
  let fixture: ComponentFixture<QuoteHeaderOverviewComponent>;
  let component: QuoteHeaderOverviewComponent;
  let htmlElem: HTMLElement;
  let mockedQuoteFacade: QuoteFacade;
  let mockedEventService: EventService;
  let quoteUiConfig: QuoteUIConfig;

  beforeEach(
    waitForAsync(() => {
      initMocks();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, CardModule, RouterTestingModule],
        declarations: [
          QuoteHeaderOverviewComponent,
          MockCxIconComponent,
          MockQuoteActionsLinkComponent,
          MockQuoteHeaderBuyerEditComponent,
        ],
        providers: [
          {
            provide: QuoteFacade,
            useClass: MockCommerceQuotesFacade,
          },
          {
            provide: EventService,
            useValue: mockedEventService,
          },
          { provide: TranslationService, useClass: MockTranslationService },
          {
            provide: QuoteUIConfig,
            useValue: quoteUiConfig,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteHeaderOverviewComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;

    fixture.detectChanges();

    mockedQuoteFacade = TestBed.inject(QuoteFacade as Type<QuoteFacade>);
    spyOn(mockedQuoteFacade, 'editQuote').and.callThrough();
  });

  function initMocks() {
    mockedEventService = jasmine.createSpyObj('eventService', ['dispatch']);

    quoteUiConfig = {
      quote: { truncateCardTileContentAfterNumChars: 30 },
    };
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
        'cx-card'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'button.cx-edit-btn'
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
        'cx-quote-header-buyer-edit'
      );

      CommonQuoteTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-edit-step'
      );
    });
  });

  describe('Ghost animation', () => {
    it('should render view for ghost animation', () => {
      component.quoteDetails$ = NEVER;
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-heading'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-column'
      );
      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-header'
      );
      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-status'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-cards'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-row'
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-card',
        3
      );
    });
  });

  describe('defineQuoteMetaData', () => {
    it('should define an empty quote meta data object', () => {
      const editEvent: SaveEvent = {};
      const metaData = component['defineQuoteMetaData'](editEvent);
      expect(Object.keys(metaData).length).toBe(0);
    });

    it('should define a quote meta data object', () => {
      const editEvent: SaveEvent = {
        name: 'name',
        description: 'description',
      };
      const metaData = component['defineQuoteMetaData'](editEvent);

      expect(Object.keys(metaData).length).toBe(2);
      expect(metaData.name).toBe(editEvent.name);
      expect(metaData.description).toBe(editEvent.description);
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
      component.cancel();
      expect(component.editMode).toBe(false);
    });

    it('should handle edit action', () => {
      const editEvent: SaveEvent = {
        name: 'new name',
        description: 'New Description',
      };

      const quoteMetaData: QuoteMetadata = {
        name: editEvent.name,
        description: editEvent.description,
      };

      component.save(mockQuote, editEvent);
      expect(component.editMode).toBe(false);
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
        .getQuoteInformation(undefined, undefined)
        .subscribe((result) => {
          expect(result).toEqual(expected);
        });
    });

    it('should retrieve the edit card content that represents the edit quote information with its name and description', () => {
      const name = 'Updated name';
      const description = 'Updated description';

      const expected = {
        name: 'Updated name',
        description: 'Updated description',
        charactersLimit: 255,
      };

      const result = component.getEditQuoteInformation(name, description);
      expect(result).toEqual(expected);
    });

    it('should the card content that represents an empty estimated and date information', () => {
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
        .getEstimatedAndDate(mockQuote, undefined)
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
            title: 'quote.details.expirationTime',
            text: ['-'],
          },
        ],
      };

      component.getUpdate(undefined, undefined).subscribe((result) => {
        expect(result).toEqual(expected);
      });
    });
  });

  describe('getCharactersLimitForCardTile', () => {
    it('should set card tile characters limit to 100 when not provided via config', () => {
      quoteUiConfig.quote = undefined;

      // re-create component so changed config is evaluated
      fixture = TestBed.createComponent(QuoteHeaderOverviewComponent);
      expect(fixture.componentInstance.getCharactersLimitForCardTile()).toBe(
        100
      );
    });

    it('should set card tile characters limit to 30 provided via config', () => {
      expect(component.getCharactersLimitForCardTile()).toBe(30);
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

    it('should be able to deal with empty actions', () => {
      const quoteWoActions: Quote = { ...mockQuote, allowedActions: [] };
      expect(component['getTotalPriceDescription'](quoteWoActions)).toBe(
        'quote.details.estimatedTotal'
      );
    });
  });
});
