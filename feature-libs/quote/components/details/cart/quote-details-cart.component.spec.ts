import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  Quote,
  QuoteDetailsReloadQueryEvent,
  QuoteFacade,
} from '@spartacus/quote/root';
import { QuoteDetailsCartComponent } from './quote-details-cart.component';
import { DebugElement, Directive, Input } from '@angular/core';
import {
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
} from '@spartacus/cart/base/root';
import { EventService, I18nTestingModule } from '@spartacus/core';
import { IconTestingModule, OutletDirective } from '@spartacus/storefront';
import { EMPTY, Observable, Subject, of } from 'rxjs';
import {
  QUOTE_CODE,
  createEmptyQuote,
} from '../../../core/testing/quote-test-utils';
import { CommonQuoteTestUtilsService } from '../../testing/common-quote-test-utils.service';

@Directive({
  selector: '[cxOutlet]',
})
class MockOutletDirective implements Partial<OutletDirective> {
  @Input() cxOutlet: string;
  @Input() cxOutletContext: string;
}

class MockQuoteFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return of(createEmptyQuote());
  }
}

describe('QuoteDetailsCartComponent', () => {
  let mockedEventService: EventService;
  let fixture: ComponentFixture<QuoteDetailsCartComponent>;
  let htmlElem: HTMLElement;
  let debugElement: DebugElement;
  let component: QuoteDetailsCartComponent;

  beforeEach(
    waitForAsync(() => {
      initMocks();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, IconTestingModule],
        declarations: [QuoteDetailsCartComponent, MockOutletDirective],
        providers: [
          {
            provide: QuoteFacade,
            useClass: MockQuoteFacade,
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
    fixture = TestBed.createComponent(QuoteDetailsCartComponent);
    htmlElem = fixture.nativeElement;
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function initMocks() {
    mockedEventService = jasmine.createSpyObj('eventService', [
      'get',
      'dispatch',
    ]);
    asSpy(mockedEventService.get).and.returnValue(EMPTY);
  }

  function asSpy(f: any) {
    return <jasmine.Spy>f;
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display CARET_UP per default', () => {
    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'cx-icon',
      'CARET_UP'
    );
  });

  it('should toggle caret when clicked', () => {
    const caret = CommonQuoteTestUtilsService.getNativeElement(
      debugElement,
      '.cx-toggle'
    );
    caret.click();
    fixture.detectChanges();
    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'cx-icon',
      'CARET_DOWN'
    );
  });

  it('should provide quote details observable', (done) => {
    component.quoteDetails$.subscribe((quoteDetails) => {
      expect(quoteDetails.code).toBe(QUOTE_CODE);
      done();
    });
  });

  it('should dispatch quote reload event when cart changes', () => {
    asSpy(mockedEventService.get).and.returnValue(
      of(new CartUpdateEntrySuccessEvent(), new CartRemoveEntrySuccessEvent())
    );
    component.ngOnInit();
    expect(mockedEventService.dispatch).toHaveBeenCalledTimes(2);
    expect(mockedEventService.dispatch).toHaveBeenCalledWith(
      {},
      QuoteDetailsReloadQueryEvent
    );
  });

  it('should close subscriptions on destroy', () => {
    asSpy(mockedEventService.get).and.returnValue(new Subject());
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component['subscription'].closed).toBe(true);
  });
});
