import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, QueryState } from '@spartacus/core';
import { Comment, Quote, QuoteFacade } from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { createEmptyQuote } from './../../../core/testing/quote-test-utils';
import { QuoteDetailsVendorContactComponent } from './quote-details-vendor-contact.component';

let quote: Quote;

class MockQuoteFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<QueryState<Quote>> {
    return of({ data: quote, loading: false, error: false });
  }
}

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

  beforeEach(
    waitForAsync(() => {
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
            useClass: MockQuoteFacade,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    initTestData();
    fixture = TestBed.createComponent(QuoteDetailsVendorContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function initTestData() {
    quote = createEmptyQuote();
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
    it('should set 255 chars limit', () => {
      expect(component.messagingConfigs.charactersLimit).toBe(255);
    });
    it('should define a date format', () => {
      expect(component.messagingConfigs.dateFormat).toBe('MMMM d, yyyy h:mm aa');
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
});
