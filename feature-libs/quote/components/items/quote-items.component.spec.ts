import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { EventService, I18nTestingModule, Price } from '@spartacus/core';
import {
  Quote,
  QuoteActionType,
  QuoteFacade,
  QuoteState,
} from '@spartacus/quote/root';
import { IconTestingModule, OutletDirective } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, NEVER, Observable, of } from 'rxjs';
import {
  createEmptyQuote,
  QUOTE_CODE,
} from '../../core/testing/quote-test-utils';
import { CommonQuoteTestUtilsService } from '../testing/common-quote-test-utils.service';
import { QuoteItemsComponent } from './quote-items.component';
import { QuoteItemsComponentService } from './quote-items.component.service';
import { tap } from 'rxjs/operators';

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
  isEditable: false,
  entries: [{ entryNumber: 1 }],
};

const cart: Cart = {};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(quote);
const mockCart$ = new BehaviorSubject<Cart>(cart);
let cartObsHasFired = false;
let quoteObsHasFired = false;

class MockQuoteFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$
      .asObservable()
      .pipe(tap(() => (quoteObsHasFired = true)));
  }
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return mockCart$.asObservable().pipe(tap(() => (cartObsHasFired = true)));
  }
}

describe('QuoteItemsComponent', () => {
  let mockedEventService: EventService;
  let mockQuoteItemsService: QuoteItemsComponentService;
  let fixture: ComponentFixture<QuoteItemsComponent>;
  let htmlElem: HTMLElement;
  let component: QuoteItemsComponent;

  beforeEach(
    waitForAsync(() => {
      initMocks();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, IconTestingModule],
        declarations: [QuoteItemsComponent, MockOutletDirective],
        providers: [
          {
            provide: QuoteFacade,
            useClass: MockQuoteFacade,
          },
          {
            provide: ActiveCartFacade,
            useClass: MockActiveCartFacade,
          },
          {
            provide: EventService,
            useValue: mockedEventService,
          },
          {
            provide: QuoteItemsComponentService,
            useValue: mockQuoteItemsService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteItemsComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    component.showCart$ = of(true);
    initEmitCounters();
    fixture.detectChanges();
  });

  function initMocks() {
    mockedEventService = jasmine.createSpyObj('EventService', [
      'get',
      'dispatch',
    ]);
    mockQuoteItemsService = jasmine.createSpyObj('QuoteItemsComponentService', [
      'setQuoteEntriesExpanded',
      'getQuoteEntriesExpanded',
    ]);
    asSpy(mockedEventService.get).and.returnValue(EMPTY);
    asSpy(mockQuoteItemsService.getQuoteEntriesExpanded).and.returnValue(true);
  }

  function asSpy(f: any) {
    return <jasmine.Spy>f;
  }

  function initEmitCounters() {
    cartObsHasFired = false;
    quoteObsHasFired = false;
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should request quote for the item list outlet in case quote is read-only', () => {
      expect(quoteObsHasFired).toBe(true);
      expect(cartObsHasFired).toBe(false);
    });

    it('should request cart for the item list outlet in case quote is editable', () => {
      quote.isEditable = true;
      initEmitCounters();
      fixture.detectChanges();

      expect(quoteObsHasFired).toBe(false);
      expect(cartObsHasFired).toBe(true);
    });
  });

  describe('Ghost animation', () => {
    it('should render view for ghost animation', () => {
      component.quoteDetails$ = NEVER;
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

  describe('onToggleShowOrHideCart', () => {
    it('should call quoteItemsComponentService correctly if argument is true', () => {
      component.onToggleShowOrHideCart(true);
      expect(
        mockQuoteItemsService.setQuoteEntriesExpanded
      ).toHaveBeenCalledWith(false);
    });

    it('should call quoteItemsComponentService correctly if argument is false', () => {
      component.onToggleShowOrHideCart(false);
      expect(
        mockQuoteItemsService.setQuoteEntriesExpanded
      ).toHaveBeenCalledWith(true);
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

  it('should display CARET_DOWN when collapsed', () => {
    component.showCart$ = of(false);
    fixture.detectChanges();
    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'cx-icon',
      'CARET_DOWN'
    );
  });

  it('should toggle quote entries on enter', () => {
    CommonQuoteTestUtilsService.clickToggle(htmlElem, true);
    fixture.detectChanges();
    expect(mockQuoteItemsService.setQuoteEntriesExpanded).toHaveBeenCalledWith(
      false
    );
  });

  it('should toggle quote entries on click', () => {
    component.showCart$ = of(false);
    fixture.detectChanges();
    CommonQuoteTestUtilsService.clickToggle(htmlElem, false);
    fixture.detectChanges();
    expect(mockQuoteItemsService.setQuoteEntriesExpanded).toHaveBeenCalledWith(
      true
    );
  });

  it('should provide quote details observable', (done) => {
    component.quoteDetails$.subscribe((quoteDetails) => {
      expect(quoteDetails.code).toBe(QUOTE_CODE);
      done();
    });
  });
});
