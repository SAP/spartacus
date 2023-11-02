import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  EventService,
  I18nTestingModule,
  Price,
  UserIdService,
} from '@spartacus/core';
import {
  Quote,
  QuoteActionType,
  QuoteFacade,
  QuoteState,
} from '@spartacus/quote/root';
import { IconTestingModule, OutletDirective } from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { BehaviorSubject, EMPTY, NEVER, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  QUOTE_CODE,
  createEmptyQuote,
} from '../../core/testing/quote-test-utils';
import { CommonQuoteTestUtilsService } from '../testing/common-quote-test-utils.service';
import { QuoteItemsComponent } from './quote-items.component';
import { QuoteItemsComponentService } from './quote-items.component.service';

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

const quoteEditable: Quote = {
  ...quote,
  isEditable: true,
};

const quoteWoCartId: Quote = {
  ...quote,
  cartId: undefined,
};

const cart: Cart = {};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(quote);
const mockCart$ = new BehaviorSubject<Cart>(cart);
let cartObsHasFired = false;
let quoteObsHasFired = false;
let savedCartObsHasFired = false;

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

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  getCart(): Observable<Cart> {
    return mockCart$
      .asObservable()
      .pipe(tap(() => (savedCartObsHasFired = true)));
  }
  loadCart(): void {}
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(): Observable<string> {
    return of('user');
  }
}

describe('QuoteItemsComponent', () => {
  let fixture: ComponentFixture<QuoteItemsComponent>;
  let htmlElem: HTMLElement;
  let component: QuoteItemsComponent;
  let eventService: EventService;
  let quoteItemsComponentService: QuoteItemsComponentService;

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
            provide: MultiCartFacade,
            useClass: MockMultiCartFacade,
          },
          {
            provide: UserIdService,
            useClass: MockUserIdService,
          },
          {
            provide: EventService,
            useValue: eventService,
          },
          {
            provide: QuoteItemsComponentService,
            useValue: quoteItemsComponentService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    mockQuoteDetails$.next(quote);
    fixture = TestBed.createComponent(QuoteItemsComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    component.showCart$ = of(true);
    initEmitCounters();
    fixture.detectChanges();
  });

  function initMocks() {
    eventService = jasmine.createSpyObj('EventService', ['get', 'dispatch']);
    quoteItemsComponentService = jasmine.createSpyObj(
      'QuoteItemsComponentService',
      ['setQuoteEntriesExpanded', 'getQuoteEntriesExpanded']
    );
    asSpy(eventService.get).and.returnValue(EMPTY);
    asSpy(quoteItemsComponentService.getQuoteEntriesExpanded).and.returnValue(
      true
    );
  }

  function asSpy(f: any) {
    return <jasmine.Spy>f;
  }

  function initEmitCounters() {
    cartObsHasFired = false;
    quoteObsHasFired = false;
    savedCartObsHasFired = false;
  }

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should provide quoteCartReadOnly$ observable if quote is linked to a cart', () => {
      expect(component.quoteCartReadOnly$).toBeObservable(
        cold('a', {
          a: cart,
        })
      );
    });

    it('should not provide quoteCartReadOnly$ observable if quote is not linked to a cart', () => {
      mockQuoteDetails$.next(quoteWoCartId);
      fixture = TestBed.createComponent(QuoteItemsComponent);
      component = fixture.componentInstance;
      expect(component.quoteCartReadOnly$).toBeObservable(cold(''));
    });
  });

  describe('Rendering', () => {
    it('should request saved quote cart for item list outlet in case quote is not editable and linked to cart', () => {
      expect(cartObsHasFired).toBe(false);
      expect(savedCartObsHasFired).toBe(true);
    });

    it('should request active cart for the item list outlet in case quote is editable', () => {
      initEmitCounters();
      mockQuoteDetails$.next(quoteEditable);
      fixture.detectChanges();

      expect(cartObsHasFired).toBe(true);
      expect(savedCartObsHasFired).toBe(false);
    });

    it('should neither request a saved or active cart for the item list outlet in case quote has no attached quote cart, because then items are used from quote', () => {
      initEmitCounters();
      mockQuoteDetails$.next(quoteWoCartId);
      fixture.detectChanges();

      expect(quoteObsHasFired).toBe(true);
      expect(cartObsHasFired).toBe(false);
      expect(savedCartObsHasFired).toBe(false);
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
        quoteItemsComponentService.setQuoteEntriesExpanded
      ).toHaveBeenCalledWith(false);
    });

    it('should call quoteItemsComponentService correctly if argument is false', () => {
      component.onToggleShowOrHideCart(false);
      expect(
        quoteItemsComponentService.setQuoteEntriesExpanded
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
    expect(
      quoteItemsComponentService.setQuoteEntriesExpanded
    ).toHaveBeenCalledWith(false);
  });

  it('should toggle quote entries on click', () => {
    component.showCart$ = of(false);
    fixture.detectChanges();
    CommonQuoteTestUtilsService.clickToggle(htmlElem, false);
    fixture.detectChanges();
    expect(
      quoteItemsComponentService.setQuoteEntriesExpanded
    ).toHaveBeenCalledWith(true);
  });

  it('should provide quote details observable', (done) => {
    component.quoteDetails$.subscribe((quoteDetails) => {
      expect(quoteDetails.code).toBe(QUOTE_CODE);
      done();
    });
  });
});
