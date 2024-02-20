import { DOCUMENT } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { OrderEntry } from '@spartacus/cart/base/root';
import { EventService, I18nTestingModule } from '@spartacus/core';
import { QuoteDetailsReloadQueryEvent } from '@spartacus/quote/core';
import { QuoteComment, Quote, QuoteFacade } from '@spartacus/quote/root';
import {
  ICON_TYPE,
  MessagingComponent,
  MessagingConfigs,
} from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { NEVER, Observable, of, throwError } from 'rxjs';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { QuoteUIConfig } from '../config';
import { QuoteItemsComponentService } from '../items';
import { CommonQuoteTestUtilsService } from '../testing/common-quote-test-utils.service';
import { QuoteCommentsComponent } from './quote-comments.component';

const QUOTE_CODE = 'q123';
const ALL_PRODUCTS_ID = '';

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

describe('QuoteCommentsComponent', () => {
  let fixture: ComponentFixture<QuoteCommentsComponent>;
  let htmlElem: HTMLElement;
  let component: QuoteCommentsComponent;
  let quoteFacade: QuoteFacade;
  let eventService: EventService;
  let quoteUIConfig: QuoteUIConfig;
  let quoteItemsComponentService: QuoteItemsComponentService;
  let mockQuoteItemsComponentService: QuoteItemsComponentService;

  let quote: Quote;

  beforeEach(
    waitForAsync(() => {
      initTestData();
      initMocks();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          QuoteCommentsComponent,
          MockCxMessagingComponent,
          MockCxIconComponent,
        ],
        providers: [
          {
            provide: QuoteFacade,
            useValue: quoteFacade,
          },
          {
            provide: EventService,
            useValue: eventService,
          },
          {
            provide: QuoteUIConfig,
            useValue: quoteUIConfig,
          },
          {
            provide: QuoteItemsComponentService,
            useValue: mockQuoteItemsComponentService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCommentsComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
    spyOn(component.commentsComponent, 'resetForm');

    mockQuoteItemsComponentService = jasmine.createSpyObj(
      'QuoteItemsComponentService',
      ['setQuoteEntriesExpanded', 'getQuoteEntriesExpanded']
    );
    asSpy(
      mockQuoteItemsComponentService.getQuoteEntriesExpanded
    ).and.returnValue(of(true));
    quoteItemsComponentService = TestBed.inject(QuoteItemsComponentService);
  });

  function initTestData() {
    quote = createEmptyQuote();
    quote.code = QUOTE_CODE;
    quoteUIConfig = {
      quote: { maxCharsForComments: 5000 },
    };
  }

  function initMocks() {
    quoteFacade = jasmine.createSpyObj('QuoteFacade', [
      'getQuoteDetails',
      'addQuoteComment',
    ]);
    asSpy(quoteFacade.getQuoteDetails).and.returnValue(of(quote));
    asSpy(quoteFacade.addQuoteComment).and.returnValue(of({}));

    eventService = jasmine.createSpyObj('EventService', ['dispatch']);
  }

  function asSpy(f: any) {
    return <jasmine.Spy>f;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Ghost animation', () => {
    it('should render view for ghost animation', () => {
      component.quoteDetails$ = NEVER;
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-comment'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-input-title'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-input'
      );
    });
  });

  it('should render the messaging section by default', () => {
    CommonQuoteTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-messaging'
    );
  });

  describe('clickToggle', () => {
    it('should collapse the comments area when clicking the toggle', () => {
      CommonQuoteTestUtilsService.clickToggle(htmlElem, false);
      fixture.detectChanges();
      CommonQuoteTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-messaging'
      );
    });

    it('should toggle the comments on enter', () => {
      CommonQuoteTestUtilsService.clickToggle(htmlElem, true);
      fixture.detectChanges();
      CommonQuoteTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-messaging'
      );
    });

    it('should expand the comments area when clicking the toggle', () => {
      component.expandComments = false;
      CommonQuoteTestUtilsService.clickToggle(htmlElem, false);
      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-messaging'
      );
    });
  });

  describe('messageEvents$ pipe', () => {
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

    it('should merge header and item quote comments and sort the resulting message events by date', () => {
      quote.comments = [];
      quote.entries = [];
      quote.comments.push({
        text: 'header #1',
        creationDate: new Date('2022-10-01 10:00'),
      });
      quote.comments.push({
        text: 'header #4',
        creationDate: new Date('2022-10-04 10:00'),
      });
      quote.entries.push({
        entryNumber: 0,
        comments: [
          { text: 'item 0 #3', creationDate: new Date('2022-10-02 09:30') },
        ],
      });
      quote.entries.push({
        entryNumber: 1,
        comments: [
          { text: 'item 1 #2', creationDate: new Date('2022-10-01 10:30') },
        ],
      });
      component.messageEvents$
        .subscribe((messageEvent) => {
          expect(messageEvent.length).toBe(4);
          expect(messageEvent[0].text).toEqual('header #1');
          expect(messageEvent[1].text).toEqual('item 1 #2');
          expect(messageEvent[2].text).toEqual('item 0 #3');
          expect(messageEvent[3].text).toEqual('header #4');
        })
        .unsubscribe();
    });
  });

  describe('messagingConfigs', () => {
    it('should be provided', () => {
      expect(component.messagingConfigs).toBeDefined();
    });
    it('should set chars limit to default 1000 when not provided via config', () => {
      quoteUIConfig.quote = undefined;
      // re-create component so changed config is evaluated
      fixture = TestBed.createComponent(QuoteCommentsComponent);
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
    it("should only provide 'All Products' item if quote has no entries", () => {
      (component.messagingConfigs.itemList$ ?? of([]))
        .subscribe((itemList) => {
          expect(itemList.length).toBe(1);
          expect(itemList[0]).toEqual({
            id: ALL_PRODUCTS_ID,
            name: 'quote.comments.allProducts',
          });
        })
        .unsubscribe();
    });
    it("should provide 'All Products' item as well as one item per valid quote entry", () => {
      quote.entries = [
        { entryNumber: 0, product: { code: 'p1', name: 'Product 1' } }, // valid
        { entryNumber: 1, product: { code: 'p2' } }, // valid, if product name is missing, code is used instead
        { entryNumber: 2 }, // valid, if neither product code nor name are there use entry number
      ];
      (component.messagingConfigs.itemList$ ?? of([]))
        .subscribe((itemList) => {
          expect(itemList.length).toBe(4);
          expect(itemList[1]).toEqual({
            id: '0',
            name: 'Product 1',
          });
          expect(itemList[2]).toEqual({
            id: '1',
            name: 'p2',
          });
          expect(itemList[3]).toEqual({
            id: '2',
            name: '2',
          });
        })
        .unsubscribe();
    });
    it('should provide ALL_PRODUCTS_ID as default item', () => {
      expect(component.messagingConfigs.defaultItemId).toEqual(ALL_PRODUCTS_ID);
    });
    it('should request send button to be secondary', () => {
      expect(component.messagingConfigs.sendBtnIsNotPrimary).toBe(true);
    });
  });

  describe('mapCommentToMessageEvent', () => {
    const comment = {
      text: 'comment text',
      creationDate: new Date('2022-10-03T17:33:45'),
      fromCustomer: false,
      author: { uid: 'cust_1', name: 'John Doe' },
    };

    function mapCommentToMessageEvent(
      comment: QuoteComment,
      entry?: OrderEntry
    ) {
      return component['mapCommentToMessageEvent'](comment, entry);
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
    it('should extract item data from entry', () => {
      expect(
        mapCommentToMessageEvent(comment, {
          entryNumber: 0,
          product: { name: 'Product Name' },
        }).item
      ).toEqual({ id: '0', name: 'Product Name' });
    });
    it("shouldn't map anything to item if no entry is provided", () => {
      expect(mapCommentToMessageEvent(comment).item).toBeUndefined();
    });
    it('should throw an error if there is an entry but without entry number', () => {
      expect(() => mapCommentToMessageEvent(comment, {})).toThrowError();
    });
  });

  describe('onSend', () => {
    it('should add a header quote comment with the given text', () => {
      component.onSend(
        { message: 'test comment', itemId: ALL_PRODUCTS_ID },
        QUOTE_CODE
      );
      expect(quoteFacade.addQuoteComment).toHaveBeenCalledWith(
        QUOTE_CODE,
        {
          text: 'test comment',
        },
        ALL_PRODUCTS_ID
      );
    });
    it('should add a item quote comment with the given text', () => {
      component.onSend({ message: 'test comment', itemId: '3' }, QUOTE_CODE);
      expect(quoteFacade.addQuoteComment).toHaveBeenCalledWith(
        QUOTE_CODE,
        {
          text: 'test comment',
        },
        '3'
      );
    });
    it('should refresh the quote to display the just added comment', () => {
      component.onSend(
        { message: 'test comment', itemId: ALL_PRODUCTS_ID },
        QUOTE_CODE
      );
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        QuoteDetailsReloadQueryEvent
      );
    });
    it('should reset message input text', () => {
      component.onSend(
        { message: 'test comment', itemId: ALL_PRODUCTS_ID },
        QUOTE_CODE
      );
      expect(component.commentsComponent.resetForm).toHaveBeenCalled();
      expect(component.messagingConfigs.newMessagePlaceHolder).toBeUndefined();
    });
    it('should handle errors', () => {
      asSpy(quoteFacade.addQuoteComment).and.returnValue(
        throwError(new Error('test error'))
      );
      component.onSend(
        { message: 'test comment', itemId: ALL_PRODUCTS_ID },
        QUOTE_CODE
      );
      expect(component.commentsComponent.resetForm).toHaveBeenCalled();
      expect(component.messagingConfigs.newMessagePlaceHolder).toEqual(
        'quote.comments.invalidComment'
      );
    });
  });

  describe('onItemClicked', () => {
    let aTagProduct1: { textContent: string; scrollIntoView: Function };
    let aTagProduct2: { textContent: string; scrollIntoView: Function };

    beforeEach(() => {
      aTagProduct1 = createElementMock('Product 1');
      aTagProduct2 = createElementMock('Product 2');
      const mockedATags = [aTagProduct1, aTagProduct2];
      const document = TestBed.inject(DOCUMENT);
      spyOn(document, 'getElementsByTagName').and.returnValue(<any>mockedATags);
      quoteItemsComponentService = TestBed.inject(QuoteItemsComponentService);
    });

    function createElementMock(textContent: string) {
      const elem = { textContent: textContent, scrollIntoView: function () {} };
      spyOn(elem, 'scrollIntoView');
      return elem;
    }

    it('should expand cart and call scrollIntoView on the corresponding cart item in the document', fakeAsync(() => {
      component.onItemClicked({ item: { id: 'P2', name: 'Product 2' } });
      expect(
        quoteItemsComponentService.setQuoteEntriesExpanded
      ).toHaveBeenCalledWith(true);
      tick(); //because of delay(0)
      expect(aTagProduct1.scrollIntoView).not.toHaveBeenCalled();
      expect(aTagProduct2.scrollIntoView).toHaveBeenCalledWith({
        block: 'center',
      });
    }));

    it('should only expand the cart but not scroll if the target item is not found in the document', fakeAsync(() => {
      component.onItemClicked({ item: { id: 'P3', name: 'Product 3' } });
      expect(
        quoteItemsComponentService.setQuoteEntriesExpanded
      ).toHaveBeenCalledWith(true);
      tick(); //because of delay(0)
      expect(aTagProduct1.scrollIntoView).not.toHaveBeenCalled();
      expect(aTagProduct2.scrollIntoView).not.toHaveBeenCalled();
    }));
  });

  describe('prepareMessageEvents', () => {
    it('should be able to handle undefined comments in model', () => {
      const eventsObs = component['prepareMessageEvents']();
      expect(eventsObs).toBeObservable(cold('(a|)', { a: [] }));
    });
  });

  describe('showComments', () => {
    it('should return false for read-only quote without any comments', () => {
      quote.isEditable = false;
      expect(component.showComments(quote)).toBe(false);
    });
    it('should return true for editable-quote', () => {
      quote.isEditable = true;
      expect(component.showComments(quote)).toBe(true);
    });
    it('should return true for read-only quote with header comments', () => {
      quote.isEditable = false;
      quote.comments = [{ text: 'text' }];
      expect(component.showComments(quote)).toBe(true);
    });
    it('should return true for read-only quote with item comments', () => {
      quote.isEditable = false;
      quote.entries = [{ entryNumber: 1, comments: [{ text: 'text' }] }];
      expect(component.showComments(quote)).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it("should contain 'div' HTML element with 'role' attribute that indicates the role for this element", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'div',
          '',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'role',
        'region'
      );
    });

    it("should contain 'div' HTML element with 'aria-label' attribute that indicates the text for this element", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'div',
          '',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'aria-label',
        'quote.comments.regionTitle'
      );
    });
  });
});
