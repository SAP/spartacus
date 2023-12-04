import { TestBed } from '@angular/core/testing';
import {
  AbstractOrderType,
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { Price, UserIdService } from '@spartacus/core';
import {
  Quote,
  QuoteActionType,
  QuoteFacade,
  QuoteState,
} from '@spartacus/quote/root';
import { cold } from 'jasmine-marbles';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { QuoteItemsComponentService } from './quote-items.component.service';

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

const cartAttachedToQuote: Cart = { code: cartId, entries: [] };
const activeCartAttachedToQuote: Cart = { code: cartId, entries: [{}] };

const mockQuoteDetails$ = new BehaviorSubject<Quote>(quote);
const mockCartAttachedToQuote$ = new BehaviorSubject<Cart>(cartAttachedToQuote);
const mockActiveCartAttachedToQuote$ = new BehaviorSubject<Cart>(
  activeCartAttachedToQuote
);

class MockQuoteFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }
}

let stableActiveCart$: Observable<boolean>;
let stableSavedCart$: Observable<boolean>;

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return mockActiveCartAttachedToQuote$.asObservable();
  }
  isStable(): Observable<boolean> {
    return stableActiveCart$;
  }
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  loadCart(): void {}

  getCart(): Observable<Cart> {
    return mockCartAttachedToQuote$.asObservable();
  }
  isStable(): Observable<boolean> {
    return stableSavedCart$;
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(): Observable<string> {
    return of('user');
  }
}

describe('QuoteItemsComponentService', () => {
  let classUnderTest: QuoteItemsComponentService;
  let multiCartFacade: MultiCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteItemsComponentService,
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
      ],
    });
    classUnderTest = TestBed.inject(QuoteItemsComponentService);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    stableActiveCart$ = of(true);
    stableSavedCart$ = of(true);
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });

  it('should expand the quote entries by default', () => {
    classUnderTest
      .getQuoteEntriesExpanded()
      .subscribe((value) => expect(value).toBe(true))
      .unsubscribe();
  });

  it('should collapse the quote entries', () => {
    classUnderTest.setQuoteEntriesExpanded(false);
    classUnderTest
      .getQuoteEntriesExpanded()
      .subscribe((value) => expect(value).toBe(false))
      .unsubscribe();
  });

  it('should expand the quote entries', () => {
    classUnderTest.setQuoteEntriesExpanded(true);
    classUnderTest
      .getQuoteEntriesExpanded()
      .subscribe((value) => expect(value).toBe(true))
      .unsubscribe();
  });

  describe('retrieveQuoteEntries', () => {
    describe('in case quote is linked to a cart and read-only', () => {
      it('should provide quoteItemsData$ observable based on quote cart', () => {
        mockQuoteDetails$.next(quote);
        expect(classUnderTest.retrieveQuoteEntries()).toBeObservable(
          cold('a', {
            a: {
              readOnly: true,
              entries: cartAttachedToQuote.entries,
              abstractOrderId: cartId,
              abstractOrderType: AbstractOrderType.SAVED_CART,
            },
          })
        );
      });

      it('should load saved cart', () => {
        spyOn(multiCartFacade, 'loadCart');
        mockQuoteDetails$.next(quote);
        classUnderTest.retrieveQuoteEntries().subscribe().unsubscribe();
        expect(multiCartFacade.loadCart).toHaveBeenCalled();
      });
    });

    describe('in case quote is not linked to a cart', () => {
      it('should provide quoteItemsData$ observable based on quote', () => {
        mockQuoteDetails$.next(quoteWoCartId);
        expect(classUnderTest.retrieveQuoteEntries()).toBeObservable(
          cold('a', {
            a: {
              readOnly: true,
              entries: quote.entries,
              abstractOrderId: quote.code,
              abstractOrderType: AbstractOrderType.QUOTE,
            },
          })
        );
      });

      it('should not load an additional cart', () => {
        spyOn(multiCartFacade, 'loadCart');
        mockQuoteDetails$.next(quoteWoCartId);
        classUnderTest.retrieveQuoteEntries().subscribe().unsubscribe();
        expect(multiCartFacade.loadCart).toHaveBeenCalledTimes(0);
      });
    });

    describe('in case quote is editable', () => {
      it('should provide quoteItemsData$ observable based on active cart', () => {
        mockQuoteDetails$.next(quoteEditable);
        expect(classUnderTest.retrieveQuoteEntries()).toBeObservable(
          cold('a', {
            a: {
              readOnly: false,
              entries: activeCartAttachedToQuote.entries,
              abstractOrderId: cartId,
              abstractOrderType: AbstractOrderType.CART,
            },
          })
        );
      });

      it('should not load an additional cart', () => {
        spyOn(multiCartFacade, 'loadCart');
        mockQuoteDetails$.next(quoteEditable);
        classUnderTest.retrieveQuoteEntries().subscribe().unsubscribe();
        expect(multiCartFacade.loadCart).toHaveBeenCalledTimes(0);
      });
    });

    it('should load saved cart if quote is attached to cart and not editable', () => {
      spyOn(multiCartFacade, 'loadCart');
      mockQuoteDetails$.next(quote);
      classUnderTest.retrieveQuoteEntries().subscribe().unsubscribe();
      expect(multiCartFacade.loadCart).toHaveBeenCalled();
    });
  });

  describe('prepareActiveCart', () => {
    it('should emit only if active cart is stable', () => {
      stableActiveCart$ = from([false, false, true]);
      mockQuoteDetails$.next(quoteEditable);
      expect(classUnderTest['prepareActiveCart']()).toBeObservable(
        cold('a', {
          a: [
            activeCartAttachedToQuote,
            { readOnly: false },
            AbstractOrderType.CART,
          ],
        })
      );
    });
  });

  describe('prepareSavedCart', () => {
    it('should emit only if saved cart is stable', () => {
      stableSavedCart$ = from([false, false, true]);
      mockQuoteDetails$.next(quote);
      expect(classUnderTest['prepareSavedCart'](cartId)).toBeObservable(
        cold('a', {
          a: [
            cartAttachedToQuote,
            { readOnly: true },
            AbstractOrderType.SAVED_CART,
          ],
        })
      );
    });
  });
});
