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
import {
  ICON_TYPE,
  MessagingComponent,
  MessagingConfigs,
} from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { createEmptyQuote } from '../../../core/testing/quote-test-utils';
import { QuoteUIConfig } from '../../config';
import { QuoteDetailsCommentComponent } from './quote-details-comment.component';

const QUOTE_CODE = 'q123';

@Component({
  selector: 'cx-messaging',
  template: '',
  providers: [
    { provide: MessagingComponent, useClass: MockCxMessagingComponent },
  ],
})
class MockCxMessagingComponent {
  @Input() messageEvents$: Observable<Array<MessageEvent>>;
  @Input() messagingConfigs?: MessagingConfigs;
  resetForm(): void {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('QuoteDetailsCommentComponent', () => {
  let fixture: ComponentFixture<QuoteDetailsCommentComponent>;
  let component: QuoteDetailsCommentComponent;
  let mockedQuoteFacade: QuoteFacade;
  let mockedEventService: EventService;
  let quoteUiConfig: QuoteUIConfig;

  let quote: Quote;

  beforeEach(
    waitForAsync(() => {
      initTestData();
      initMocks();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          QuoteDetailsCommentComponent,
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
          {
            provide: QuoteUIConfig,
            useValue: quoteUiConfig,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteDetailsCommentComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    spyOn(component.commentsComponent, 'resetForm');
  });

  function initTestData() {
    quote = createEmptyQuote();
    quote.code = QUOTE_CODE;
    quoteUiConfig = {
      quote: { maxCharsForComments: 5000 },
    };
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

  it('should hide the comments area when clicking the toggle', () => {
    clickCommentsToggle(fixture);
    expect(fixture.debugElement.query(By.css('cx-messaging'))).toBeNull();
  });

  it('should show the comments area when clicking the toggle', () => {
    component.showComments = false;
    clickCommentsToggle(fixture);
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
    quote.comments = [];
    quote.comments.push({});
    quote.comments.push({});
    component.messageEvents$
      .subscribe((messageEvent) => {
        expect(messageEvent.length).toBe(2);
      })
      .unsubscribe();
  });

  function clickCommentsToggle(
    fixture: ComponentFixture<QuoteDetailsCommentComponent>
  ) {
    fixture.debugElement
      .query(By.css('.quote-comment-toggle'))
      .nativeElement.click();
    fixture.detectChanges();
  }
  describe('messagingConfigs', () => {
    it('should be provided', () => {
      expect(component.messagingConfigs).toBeDefined();
    });
    it('should set chars limit to default 1000 when not provided via config', () => {
      quoteUiConfig.quote = undefined;
      // re-create component so changed config is evaluated
      fixture = TestBed.createComponent(QuoteDetailsCommentComponent);
      expect(fixture.componentInstance.messagingConfigs.charactersLimit).toBe(
        1000
      );
    });
    it('should set chars limit from config', () => {
      expect(component.messagingConfigs.charactersLimit).toBe(5000);
    });
    it('should define a date format', () => {
      expect(component.messagingConfigs.dateFormat).toBe(
        'MMMM d, yyyy h:mm aa'
      );
    });
    it('should display add section for editable quotes', () => {
      quote.isEditable = true;
      (component.messagingConfigs.displayAddMessageSection ?? of(false))
        .subscribe((showAddSection) => {
          expect(showAddSection).toBe(true);
        })
        .unsubscribe();
    });
    it('should hide display add section for not editable quotes', () => {
      quote.isEditable = false;
      (component.messagingConfigs.displayAddMessageSection ?? of(true))
        .subscribe((showAddSection) => {
          expect(showAddSection).toBe(false);
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
      expect(mapCommentToMessageEvent(comment).createdAt).toContain(
        'Mon Oct 03 2022 17:33:45'
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
    it('should reset message input text', () => {
      component.onSend({ message: 'test comment' }, QUOTE_CODE);
      expect(component.commentsComponent.resetForm).toHaveBeenCalled();
      expect(component.messagingConfigs.newMessagePlaceHolder).toBeUndefined();
    });
    it('should handle errors', () => {
      asSpy(mockedQuoteFacade.addQuoteComment).and.returnValue(
        throwError(new Error('test error'))
      );
      component.onSend({ message: 'test comment' }, QUOTE_CODE);
      expect(component.commentsComponent.resetForm).toHaveBeenCalled();
      expect(component.messagingConfigs.newMessagePlaceHolder).toEqual(
        'quote.comments.invalidComment'
      );
    });
  });

  describe('prepareMessageEvents', () => {
    it('should be able to handle undefined comments in model', () => {
      const eventsObs = component['prepareMessageEvents']();
      expect(eventsObs).toBeObservable(cold('(a|)', { a: [] }));
    });
  });
});
