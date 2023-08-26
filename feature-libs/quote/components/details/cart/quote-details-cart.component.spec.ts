import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  Quote,
  QuoteActionType,
  QuoteDetailsReloadQueryEvent,
  QuoteFacade,
  QuoteState,
} from '@spartacus/quote/root';
import { QuoteDetailsCartComponent } from './quote-details-cart.component';
import { Directive, Input } from '@angular/core';
import {
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
} from '@spartacus/cart/base/root';
import { EventService, I18nTestingModule, Price } from '@spartacus/core';
import { IconTestingModule, OutletDirective } from '@spartacus/storefront';
import { EMPTY, Observable, Subject, of, BehaviorSubject } from 'rxjs';
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

const cartId = '1234';
const threshold = 20;
const totalPrice: Price = { value: threshold + 1 };

const quote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [
    { type: QuoteActionType.EDIT, isPrimary: false },
    { type: QuoteActionType.REQUOTE, isPrimary: true },
  ],
  state: QuoteState.BUYER_DRAFT,
  cartId: cartId,
  threshold: threshold,
  totalPrice: totalPrice,
};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(quote);

class MockQuoteFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }
}

describe('QuoteDetailsCartComponent', () => {
  let mockedEventService: EventService;
  let fixture: ComponentFixture<QuoteDetailsCartComponent>;
  let htmlElem: HTMLElement;
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
    component = fixture.componentInstance;
    component.showCart$ = of(true);
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

  describe('Ghost animation', () => {
    it('should render view for ghost animation', () => {
      component.quoteDetails$ = of(null);
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-table-header'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-title'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-table'
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-row',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-image-container',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-image',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-container',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-info-container',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-info',
        20
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-qty',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-total',
        5
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-action',
        5
      );
    });
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
    component.showCart$ = of(false);
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
