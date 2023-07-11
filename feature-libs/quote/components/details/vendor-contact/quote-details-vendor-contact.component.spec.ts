import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EventService, I18nTestingModule } from '@spartacus/core';
import {
  Comment,
  Quote,
  QuoteDetailsReloadQueryEvent,
  QuoteFacade,
} from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { of } from 'rxjs/internal/observable/of';
import { createEmptyQuote } from './../../../core/testing/quote-test-utils';
import { QuoteDetailsVendorContactComponent } from './quote-details-vendor-contact.component';

const QUOTE_CODE = 'q123';

@Component({
  selector: 'cx-messaging',
  template: '',
})
class MockCxMessagingComponent {}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('QuoteDetailsVendorContactComponent', () => {
  let fixture: ComponentFixture<QuoteDetailsVendorContactComponent>;
  let component: QuoteDetailsVendorContactComponent;
  let mockedQuoteFacade: QuoteFacade;
  let mockedEventService: EventService;

  let quote: Quote;

  beforeEach(
    waitForAsync(() => {
      initTestData();
      initMocks();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          QuoteDetailsVendorContactComponent,
          MockCxMessagingComponent,
          MockCxIconComponent,
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
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteDetailsVendorContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function initTestData() {
    quote = createEmptyQuote();
    quote.code = QUOTE_CODE;
  }

  function initMocks() {
    mockedQuoteFacade = jasmine.createSpyObj('quoteFacade', [
      'getQuoteDetails',
      'addQuoteComment',
    ]);
    asSpy(mockedQuoteFacade.getQuoteDetails).and.returnValue(of(quote));
    asSpy(mockedQuoteFacade.addQuoteComment).and.returnValue(of({}));

    mockedEventService = jasmine.createSpyObj('eventService', ['dispatch']);
  }

  function asSpy(f: any) {
    return <jasmine.Spy>f;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the messaging section by default', () => {
    expect(fixture.debugElement.query(By.css('cx-messaging'))).not.toBeNull();
  });

  it('should hide the vendor contact area when clicking the toggle', () => {
    clickVendorContactToggle(fixture);
    expect(fixture.debugElement.query(By.css('cx-messaging'))).toBeNull();
  });

  it('should show the vendor contact area when clicking the toggle', () => {
    component.showVendorContact = false;
    clickVendorContactToggle(fixture);
    expect(fixture.debugElement.query(By.css('cx-messaging'))).not.toBeNull();
  });

  it('should pipe empty quote comments to empty message events', () => {
    component.messageEvents$
      .subscribe((messageEvent) => {
        expect(messageEvent.length).toBe(0);
      })
      .unsubscribe();
  });

  it('should pipe quote comments to message events', () => {
    quote.comments.push({});
    quote.comments.push({});
    component.messageEvents$
      .subscribe((messageEvent) => {
        expect(messageEvent.length).toBe(2);
      })
      .unsubscribe();
  });

  function clickVendorContactToggle(
    fixture: ComponentFixture<QuoteDetailsVendorContactComponent>
  ) {
    fixture.debugElement
      .query(By.css('.vendor-contact-toggle'))
      .nativeElement.click();
    fixture.detectChanges();
  }
  describe('messagingConfigs', () => {
    it('should be provided', () => {
      expect(component.messagingConfigs).toBeDefined();
    });
    it('should set 1.000 chars limit', () => {
      expect(component.messagingConfigs.charactersLimit).toBe(1000);
    });
    it('should define a date format', () => {
      expect(component.messagingConfigs.dateFormat).toBe(
        'MMMM d, yyyy h:mm aa'
      );
    });
    it('should display add section', () => {
      (component.messagingConfigs.displayAddMessageSection ?? of(false))
        .subscribe((showAddSection) => {
          expect(showAddSection).toBe(true);
        })
        .unsubscribe();
    });
  });

  describe('mapCommentToMessageEvent', () => {
    const comment = {
      text: 'comment text',
      creationDate: new Date('2022-10-03T17:33:45'),
      fromCustomer: false,
      author: { uid: 'cust_1', name: 'John Doe' },
    };

    function mapCommentToMessageEvent(comment: Comment) {
      return component['mapCommentToMessageEvent'](comment);
    }

    it('should map comment text', () => {
      expect(mapCommentToMessageEvent(comment).text).toEqual('comment text');
    });
    it('should map creation date', () => {
      expect(mapCommentToMessageEvent(comment).createdAt).toEqual(
        'Mon Oct 03 2022 17:33:45 GMT+0200 (Central European Summer Time)'
      );
    });
    it('should map author', () => {
      expect(mapCommentToMessageEvent(comment).author).toEqual('John Doe');
    });
    it('should map fromCustomer to not rightAligned', () => {
      comment.fromCustomer = true;
      expect(mapCommentToMessageEvent(comment).rightAlign).toEqual(false);
    });
    it('should map not fromCustomer to rightAligned', () => {
      comment.fromCustomer = false;
      expect(mapCommentToMessageEvent(comment).rightAlign).toEqual(true);
    });
    it("shouldn't map anything to code", () => {
      expect(mapCommentToMessageEvent(comment).code).toBeUndefined();
    });
    it("shouldn't map anything to attachments", () => {
      expect(mapCommentToMessageEvent(comment).attachments).toBeUndefined();
    });
  });

  describe('onSend', () => {
    it('should add a quote comment with the given text', () => {
      component.onSend({ message: 'test comment' }, QUOTE_CODE);
      expect(mockedQuoteFacade.addQuoteComment).toHaveBeenCalledWith(
        QUOTE_CODE,
        {
          text: 'test comment',
        }
      );
    });
    it('should refresh the quote to display the just added comment', () => {
      component.onSend({ message: 'test comment' }, QUOTE_CODE);
      expect(mockedEventService.dispatch).toHaveBeenCalledWith(
        {},
        QuoteDetailsReloadQueryEvent
      );
    });
  });
});
