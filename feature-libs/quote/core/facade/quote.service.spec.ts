import { inject, TestBed } from '@angular/core/testing';
import { Params } from '@angular/router';
import { vi } from 'vitest';
import {
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  AuthService,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_CURRENT,
  PaginationModel,
  QueryState,
  RouterState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import {
  Quote,
  QuoteActionType,
  QuoteComment,
  QuoteDiscount,
  QuoteDiscountType,
  QuoteList,
  QuoteMetadata,
  QuotesStateParams,
} from '@spartacus/quote/root';
import { ViewConfig } from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  firstValueFrom,
  of,
  throwError,
} from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { QuoteConnector } from '../connectors';
import { QuoteDetailsReloadQueryEvent } from '../event/quote.events';
import { CartUtilsService } from '../services/cart-utils.service';
import { QuoteCartService } from '../services/quote-cart.service';
import { QuoteStorefrontUtilsService } from '../services/quote-storefront-utils.service';
import { createEmptyQuote, QUOTE_CODE } from '../testing/quote-test-utils';
import { QuoteService } from './quote.service';

const userId = OCC_USER_ID_CURRENT;
const cartId = '1234';
const quoteAction = { type: QuoteActionType.EDIT, isPrimary: true };
const currentPageIndex = 0;
const sortCode = 'byCode';
const pagination: PaginationModel = {
  currentPage: currentPageIndex,
  pageSize: 5,
  sort: sortCode,
};
const quote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [quoteAction],
  cartId: cartId,
  code: '333333',
};
const vendorQuote: Quote = {
  ...quote,
  sapAttachments: [
    {
      id: quote.code,
    },
  ],
};
const mockQuoteAttachment = (): File => {
  const blob = new Blob([''], { type: 'application/pdf' });
  return blob as File;
};
const quoteWithoutCartId: Quote = {
  ...quote,
  cartId: undefined,
};
let cart: Cart = {};

const quoteList: QuoteList = {
  pagination: pagination,
  sorts: [{ code: 'byDate' }],
  quotes: [quote],
};
const routeParams = { ['quoteId']: '1' };
const mockRouterState$ = new BehaviorSubject({
  navigationId: 1,
  state: { params: routeParams as Params },
});
const quoteMetaData: QuoteMetadata = {
  name: 'test',
  description: 'test desc',
};
const quoteComment: QuoteComment = {
  text: 'test comment',
};
const mockQuotesStateParams: QuotesStateParams = {
  sort$: of(sortCode),
  currentPage$: of(currentPageIndex),
};

class MockRoutingService implements Partial<RoutingService> {
  getRouterState() {
    return mockRouterState$.asObservable() as Observable<RouterState>;
  }
  go = vi.fn();
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = vi.fn().mockReturnValue(of(userId));
}

class MockEventService implements Partial<EventService> {
  get = vi.fn().mockReturnValue(of());
  dispatch = vi.fn();
}

let isLoggedIn: boolean;
class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn() {
    return of(isLoggedIn);
  }
}

let isQuoteCartActive: any;
let quoteId: any;
class MockQuoteCartService {
  setQuoteCartActive = vi.fn();
  setQuoteId = vi.fn();
  setCheckoutAllowed = vi.fn();
  isQuoteCartActive() {
    return of(isQuoteCartActive);
  }
  getQuoteId() {
    return of(quoteId);
  }
}
class MockViewConfig implements ViewConfig {
  view = { defaultPageSize: pagination.pageSize };
}

class MockQuoteConnector implements Partial<QuoteConnector> {
  getQuotes = vi.fn().mockReturnValue(of(quoteList));
  getQuote = vi.fn().mockReturnValue(of(quote));
  createQuote = vi.fn().mockReturnValue(of(quote));
  editQuote = vi.fn().mockReturnValue(of(EMPTY));
  addComment = vi.fn().mockReturnValue(of(EMPTY));
  addQuoteEntryComment = vi.fn().mockReturnValue(of(EMPTY));
  performQuoteAction = vi.fn().mockReturnValue(of(EMPTY));
  addDiscount = vi.fn().mockReturnValue(of(EMPTY));
  downloadAttachment = vi.fn().mockReturnValue(of(mockQuoteAttachment()));
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  loadCart = vi.fn();
  createCart = vi.fn().mockReturnValue(of({}));
}

class MockCartUtilsService implements Partial<CartUtilsService> {
  handleCartAndGoToQuoteList = vi.fn();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  remove = vi.fn().mockImplementation(() => {});
  add = vi.fn().mockImplementation(() => {});
}

class MockSavedCartFacade implements Partial<SavedCartFacade> {
  editSavedCart = vi.fn();
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
  reloadActiveCart = vi.fn().mockImplementation(() => {});
  takeActiveCartId = vi.fn().mockReturnValue(of(cartId));
  getActive = vi.fn().mockImplementation(() => of(cart));
}

describe('QuoteService', () => {
  let classUnderTest: QuoteService;
  let quoteConnector: QuoteConnector;
  let eventService: EventService;
  let viewConfig: ViewConfig;
  let multiCartFacade: MultiCartFacade;
  let activeCartFacade: ActiveCartFacade;
  let routingService: RoutingService;
  let quoteCartService: QuoteCartService;
  let cartUtilsService: CartUtilsService;
  let globalMessageService: GlobalMessageService;
  let quoteStorefrontUtilsService: QuoteStorefrontUtilsService;
  let savedCartFacade: SavedCartFacade;

  beforeEach(() => {
    let mockedQuoteStorefrontUtilsService = {
      getElement: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        QuoteService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: EventService, useClass: MockEventService },
        { provide: ViewConfig, useClass: MockViewConfig },
        {
          provide: QuoteConnector,
          useClass: MockQuoteConnector,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: QuoteCartService, useClass: MockQuoteCartService },
        { provide: CartUtilsService, useClass: MockCartUtilsService },
        {
          provide: QuoteStorefrontUtilsService,
          useValue: mockedQuoteStorefrontUtilsService,
        },
        { provide: SavedCartFacade, useClass: MockSavedCartFacade },
      ],
    });

    classUnderTest = TestBed.inject(QuoteService);
    quoteConnector = TestBed.inject(QuoteConnector);
    eventService = TestBed.inject(EventService);
    viewConfig = TestBed.inject(ViewConfig);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    routingService = TestBed.inject(RoutingService);
    quoteCartService = TestBed.inject(QuoteCartService);
    cartUtilsService = TestBed.inject(CartUtilsService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    quoteStorefrontUtilsService = TestBed.inject(QuoteStorefrontUtilsService);
    savedCartFacade = TestBed.inject(SavedCartFacade);

    isQuoteCartActive = false;
    isLoggedIn = true;
    quoteId = '';
  });

  function checkQuoteCartFacadeCalls() {
    expect(multiCartFacade.loadCart).toHaveBeenCalledWith({
      cartId: cartId,
      userId: userId,
      extraData: { active: true },
    });
    expect(activeCartFacade.getActive).toHaveBeenCalled();
  }

  async function checkNoActionPerforming(
    quoteActionResult: Observable<unknown>
  ) {
    const isPerforming = await firstValueFrom(
      quoteActionResult.pipe(
        switchMap(() => classUnderTest['isActionPerforming$'])
      )
    );
    expect(isPerforming).toBe(false);
  }

  beforeEach(() => {
    cart = { code: cartId };
  });

  it('should inject CommerceQuotesService', inject(
    [QuoteService],
    (quoteService: QuoteService) => {
      expect(quoteService).toBeTruthy();
    }
  ));

  it('should return quotes after calling quoteConnector.getQuotes', () => {
    classUnderTest
      .getQuotesState(mockQuotesStateParams)
      .pipe(take(1))
      .subscribe((state) => {
        expect(quoteConnector.getQuotes).toHaveBeenCalledWith(
          userId,
          pagination
        );
        expect(state).toEqual(<QueryState<QuoteList | undefined>>{
          loading: false,
          error: false,
          data: quoteList,
        });
      });
  });

  it('should return quotes after calling quoteConnector.getQuotes with default CMS page size if not set', () => {
    //given
    viewConfig.view = undefined;

    //then
    classUnderTest
      .getQuotesState(mockQuotesStateParams)
      .pipe(take(1))
      .subscribe((state) => {
        expect(quoteConnector.getQuotes).toHaveBeenCalledWith(userId, {
          ...pagination,
          pageSize: undefined,
        });
        expect(state).toEqual(<QueryState<QuoteList | undefined>>{
          loading: false,
          error: false,
          data: quoteList,
        });
      });
  });

  it('should signal that quote details need to be re-read when performing search', () => {
    classUnderTest
      .getQuotesState(mockQuotesStateParams)
      .pipe(take(1))
      .subscribe(() => {
        expect(eventService.dispatch).toHaveBeenCalledWith(
          {},
          QuoteDetailsReloadQueryEvent
        );
      });
  });

  describe('getQuotesState - reactive request triggering', () => {
    it('should fire exactly one HTTP request on initial page load', async () => {
      const currentPage$ = new BehaviorSubject<number>(0);
      const sort$ = new BehaviorSubject<string>('byCode');

      const state = await firstValueFrom(
        classUnderTest.getQuotesState({ currentPage$, sort$ })
      );
      expect(quoteConnector.getQuotes).toHaveBeenCalledTimes(1);
      expect(quoteConnector.getQuotes).toHaveBeenCalledWith(userId, {
        currentPage: 0,
        sort: 'byCode',
        pageSize: pagination.pageSize,
      });
      expect(state.data).toEqual(quoteList);
    });

    it('should trigger a new request when currentPage changes', async () => {
      const currentPage$ = new BehaviorSubject<number>(0);
      const sort$ = new BehaviorSubject<string>('byCode');

      const quotesState$ = classUnderTest.getQuotesState({
        currentPage$,
        sort$,
      });

      // Keep subscription open to stay reactive
      const emissions: any[] = [];
      const sub = quotesState$.subscribe((s) => emissions.push(s));

      // Wait for initial emission
      await firstValueFrom(quotesState$);
      // Reset call count after the initial request
      (quoteConnector.getQuotes as any).mockClear();

      // Change the current page — triggers new request
      currentPage$.next(1);

      // Allow async work to settle
      await new Promise((r) => setTimeout(r, 0));
      sub.unsubscribe();

      expect(quoteConnector.getQuotes).toHaveBeenCalledTimes(1);
      expect(quoteConnector.getQuotes).toHaveBeenCalledWith(userId, {
        currentPage: 1,
        sort: 'byCode',
        pageSize: pagination.pageSize,
      });
      const lastEmission = emissions[emissions.length - 1];
      expect(lastEmission.data).toEqual(quoteList);
    });

    it('should trigger a new request when sort changes', async () => {
      const currentPage$ = new BehaviorSubject<number>(0);
      const sort$ = new BehaviorSubject<string>('byCode');

      const quotesState$ = classUnderTest.getQuotesState({
        currentPage$,
        sort$,
      });

      // Keep subscription open to stay reactive
      const emissions: any[] = [];
      const sub = quotesState$.subscribe((s) => emissions.push(s));

      // Wait for initial emission
      await firstValueFrom(quotesState$);
      // Reset call count after the initial request
      (quoteConnector.getQuotes as any).mockClear();

      // Change the sort — triggers new request
      sort$.next('byDate');

      // Allow async work to settle
      await new Promise((r) => setTimeout(r, 0));
      sub.unsubscribe();

      expect(quoteConnector.getQuotes).toHaveBeenCalledTimes(1);
      expect(quoteConnector.getQuotes).toHaveBeenCalledWith(userId, {
        currentPage: 0,
        sort: 'byDate',
        pageSize: pagination.pageSize,
      });
      const lastEmission = emissions[emissions.length - 1];
      expect(lastEmission.data).toEqual(quoteList);
    });
  });

  it('should return quote details query state after calling quoteConnector.getQuote', () => {
    classUnderTest
      .getQuoteDetailsQueryState()
      .pipe(take(1))
      .subscribe((details) => {
        expect(quoteConnector.getQuote).toHaveBeenCalledWith(
          userId,
          routeParams.quoteId
        );
        expect(details.data).toEqual(quote);
        expect(details.loading).toBe(false);
      });
  });

  describe('getQuoteDetails', () => {
    it('should return quote details after calling quoteConnector.getQuote', () => {
      classUnderTest
        .getQuoteDetails()
        .pipe(take(1))
        .subscribe((details) => {
          expect(quoteConnector.getQuote).toHaveBeenCalledWith(
            userId,
            routeParams.quoteId
          );
          expect(details).toEqual(quote);
        });
    });

    it('should not invoke connector if user is not logged in', () => {
      isLoggedIn = false;
      expect(classUnderTest.getQuoteDetails()).toBeObservable(cold(''));
      expect(quoteConnector.getQuote).toHaveBeenCalledTimes(0);
    });

    it('should wait until active cart has been loaded', async () => {
      isQuoteCartActive = true;
      quoteId = quote.code;
      const details = await firstValueFrom(classUnderTest.getQuoteDetails());
      expect(activeCartFacade.getActive).toHaveBeenCalled();
      expect(details).toEqual(quote);
    });

    it('should call connector once if isStable emits twice', () => {
      isQuoteCartActive = true;
      quoteId = quote.code;
      classUnderTest
        .getQuoteDetails()
        .pipe()
        .subscribe(() => {
          expect(quoteConnector.getQuote).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('addDiscount', () => {
    const discount: QuoteDiscount = {
      discountRate: 1,
      discountType: QuoteDiscountType.ABSOLUTE,
    };
    it('should call respective connector method ', () => {
      classUnderTest.addDiscount(QUOTE_CODE, discount);

      expect(quoteConnector.addDiscount).toHaveBeenCalledWith(
        userId,
        QUOTE_CODE,
        discount
      );
    });
  });

  it('should call createQuote command', () => {
    classUnderTest
      .createQuote(quoteMetaData)
      .pipe(take(1))
      .subscribe((quote) => {
        expect(quoteConnector.createQuote).toHaveBeenCalled();
        expect(quote.code).toEqual(quote.code);
        expect(quoteConnector.editQuote).toHaveBeenCalled();
        expect(multiCartFacade.loadCart).toHaveBeenCalled();
        expect(eventService.dispatch).toHaveBeenCalled();
      });
  });

  it('should call editQuote command', () => {
    classUnderTest.editQuote(quote.code, quoteMetaData);

    expect(quoteConnector.editQuote).toHaveBeenCalledWith(
      userId,
      quote.code,
      quoteMetaData
    );
  });

  it('should call addQuoteComment command', () => {
    classUnderTest
      .addQuoteComment(quote.code, quoteComment)
      .pipe(take(1))
      .subscribe(() => {
        expect(quoteConnector.addComment).toHaveBeenCalledWith(
          userId,
          quote.code,
          quoteComment
        );
      });
  });

  describe('setFocusForCreateOrEditAction', () => {
    it('should call getElement method of QuoteStorefrontUtilsService if action type is CREATE for setting focus', () => {
      classUnderTest['setFocusForCreateOrEditAction'](QuoteActionType.CREATE);
      expect(quoteStorefrontUtilsService.getElement).toHaveBeenCalledWith(
        'cx-storefront'
      );
    });

    it('should call getElement method of QuoteStorefrontUtilsService if action type is EDIT for setting focus', () => {
      classUnderTest['setFocusForCreateOrEditAction'](QuoteActionType.EDIT);
      expect(quoteStorefrontUtilsService.getElement).toHaveBeenCalledWith(
        'cx-storefront'
      );
    });

    it('should not call getElement method of QuoteStorefrontUtilsService if action type is not EDIT or CREATE', () => {
      classUnderTest['setFocusForCreateOrEditAction'](QuoteActionType.CANCEL);
      expect(quoteStorefrontUtilsService.getElement).not.toHaveBeenCalledWith(
        'cx-storefront'
      );
    });
  });

  describe('performQuoteAction', () => {
    it('should call respective connector method', async () => {
      await firstValueFrom(
        classUnderTest.performQuoteAction(quote, quoteAction.type)
      );
      expect(quoteConnector.performQuoteAction).toHaveBeenCalledWith(
        userId,
        quote.code,
        quoteAction.type
      );
    });

    it('should raise re-load event', async () => {
      await firstValueFrom(
        classUnderTest.performQuoteAction(quote, quoteAction.type)
      );
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        QuoteDetailsReloadQueryEvent
      );
    });

    it('should raise re-load event, even if action fails', async () => {
      quoteConnector.performQuoteAction = vi
        .fn()
        .mockReturnValue(throwError({}));
      await firstValueFrom(
        classUnderTest.performQuoteAction(quote, quoteAction.type)
      ).catch(() => {});
      expect(eventService.dispatch).toHaveBeenCalledWith(
        {},
        QuoteDetailsReloadQueryEvent
      );
    });

    describe('on submit', () => {
      it('should create new cart and navigate to quote list, but not reload', async () => {
        await firstValueFrom(
          classUnderTest.performQuoteAction(quote, QuoteActionType.SUBMIT)
        );
        expect(cartUtilsService.handleCartAndGoToQuoteList).toHaveBeenCalled();
        expect(eventService.dispatch).not.toHaveBeenCalledWith(
          {},
          QuoteDetailsReloadQueryEvent
        );
      });

      it('should set loading state to false when action is completed', async () => {
        await checkNoActionPerforming(
          classUnderTest.performQuoteAction(quote, QuoteActionType.SUBMIT)
        );
      });
    });

    describe('on cancel', () => {
      it('should create new cart and navigate to quote list', async () => {
        await firstValueFrom(
          classUnderTest.performQuoteAction(quote, QuoteActionType.CANCEL)
        );
        expect(cartUtilsService.handleCartAndGoToQuoteList).toHaveBeenCalled();
      });

      it('should set loading state to false when action is completed', async () => {
        await checkNoActionPerforming(
          classUnderTest.performQuoteAction(quote, QuoteActionType.CANCEL)
        );
      });
    });

    describe('on edit', () => {
      it('should load quote cart', async () => {
        await firstValueFrom(
          classUnderTest.performQuoteAction(quote, QuoteActionType.EDIT)
        );
        checkQuoteCartFacadeCalls();
      });

      it('should trigger a quote refresh', async () => {
        await firstValueFrom(
          classUnderTest.performQuoteAction(quote, QuoteActionType.EDIT)
        );
        expect(eventService.dispatch).toHaveBeenCalledWith(
          {},
          QuoteDetailsReloadQueryEvent
        );
      });

      it('should trigger quote re-read in case quote does not carry a cart id', async () => {
        await firstValueFrom(
          classUnderTest.performQuoteAction(
            quoteWithoutCartId,
            QuoteActionType.EDIT
          )
        );
        expect(quoteConnector.getQuote).toHaveBeenCalledWith(
          userId,
          quote.code
        );
      });

      it('should set loading state to false when action is completed', async () => {
        await checkNoActionPerforming(
          classUnderTest.performQuoteAction(quote, QuoteActionType.EDIT)
        );
      });
    });

    describe('on checkout', () => {
      it('should load cart on checkout and signal that checkout is allowed', async () => {
        await firstValueFrom(
          classUnderTest.performQuoteAction(quote, QuoteActionType.CHECKOUT)
        );
        checkQuoteCartFacadeCalls();
        expect(quoteCartService.setCheckoutAllowed).toHaveBeenCalledWith(true);
      });

      it('should navigate to checkout', async () => {
        await firstValueFrom(
          classUnderTest.performQuoteAction(quote, QuoteActionType.CHECKOUT)
        );
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'checkout',
        });
      });

      it('should set loading state to false when action is completed', async () => {
        await checkNoActionPerforming(
          classUnderTest.performQuoteAction(quote, QuoteActionType.CHECKOUT)
        );
      });
    });

    describe('on reject', () => {
      it('should set loading state to false when action is completed', async () => {
        await checkNoActionPerforming(
          classUnderTest.performQuoteAction(quote, QuoteActionType.REJECT)
        );
      });
      it('trigger navigation to quotes list', async () => {
        await firstValueFrom(
          classUnderTest.performQuoteAction(quote, QuoteActionType.REJECT)
        );
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'quotes',
        });
      });
    });

    describe('on approve', () => {
      it('should set loading state to false when action is completed', async () => {
        await checkNoActionPerforming(
          classUnderTest.performQuoteAction(quote, QuoteActionType.APPROVE)
        );
      });
      it('trigger navigation to quotes list', async () => {
        await firstValueFrom(
          classUnderTest.performQuoteAction(quote, QuoteActionType.APPROVE)
        );
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'quotes',
        });
      });
    });
  });

  it('should call addQuoteComment command when called with empty string of an entry number', () => {
    classUnderTest
      .addQuoteComment(quote.code, quoteComment, '')
      .pipe(take(1))
      .subscribe(() => {
        expect(quoteConnector.addComment).toHaveBeenCalledWith(
          userId,
          quote.code,
          quoteComment
        );
      });
  });

  it('should call addQuoteEntryComment command when an entry number is provided', () => {
    classUnderTest
      .addQuoteComment(quote.code, quoteComment, '0')
      .pipe(take(1))
      .subscribe(() => {
        expect(quoteConnector.addQuoteEntryComment).toHaveBeenCalledWith(
          userId,
          quote.code,
          '0',
          quoteComment
        );
      });
  });
  describe('requote', () => {
    it('should call requote command and return new quote', () => {
      classUnderTest
        .requote(quote.code)
        .pipe(take(1))
        .subscribe((reQuoted) => {
          expect(quoteConnector.createQuote).toHaveBeenCalledWith(userId, {
            quoteCode: quote.code,
          });
          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'quoteDetails',
            params: { quoteId: quote.code },
          });
          expect(reQuoted.code).toEqual(quote.code);
        });
    });

    it('should load quote cart', async () => {
      await firstValueFrom(classUnderTest.requote(quote.code));
      checkQuoteCartFacadeCalls();
    });

    it('should set loading state to false when action is completed', async () => {
      await checkNoActionPerforming(classUnderTest.requote(quote.code));
    });
  });

  describe('handleError', () => {
    it('should ignore unknown errors', () => {
      let completed = false;
      classUnderTest['handleError']({
        message: 'some error',
        details: [],
      }).subscribe({
        complete: () => {
          completed = true;
        },
        error: (error) => {
          expect(error).toEqual({ message: 'some error', details: [] });
        },
      });
      expect(completed).toBe(false);
    });

    it('should handle CommerceQuoteExpirationTimeError', () => {
      let errored = false;
      classUnderTest['handleError']({
        details: [{ type: 'CommerceQuoteExpirationTimeError' }],
      }).subscribe({
        error: () => {
          errored = true;
        },
      });
      expect(errored).toBe(false);
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'quote.httpHandlers.expired' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('saveActiveCart', () => {
    it('should create saved cart if entries exist and it is not a quote cart', async () => {
      cart.entries = [{ product: { code: 'PRODUCT_CODE' } }];
      classUnderTest['saveActiveCart']();
      await firstValueFrom(TestBed.inject(ActiveCartFacade).getActive());
      expect(savedCartFacade.editSavedCart).toHaveBeenCalled();
      expect(savedCartFacade.editSavedCart).toHaveBeenCalledWith({
        cartId: cart.code,
        saveCartName: '',
        saveCartDescription: '',
      });
    });

    it('should not create saved cart if entries exist and it is a quote cart', () => {
      cart.entries = [{ product: { code: 'PRODUCT_CODE' } }];
      cart.quoteCode = 'ABC';
      classUnderTest['saveActiveCart']();
      expect(savedCartFacade.editSavedCart).not.toHaveBeenCalled();
    });

    it('should not create saved cart if no entries exist', () => {
      cart.entries = [];
      classUnderTest['saveActiveCart']();
      expect(savedCartFacade.editSavedCart).not.toHaveBeenCalled();
    });
  });

  it('should download proposal document after calling quoteConnector.downloadAttachment', async () => {
    const vendorQuoteCode = vendorQuote.code;
    const vendorQuoteAttachmentId = vendorQuote.sapAttachments[0].id;
    const response = await firstValueFrom(
      classUnderTest.downloadAttachment(
        vendorQuoteCode,
        vendorQuoteAttachmentId
      )
    );
    expect(quoteConnector.downloadAttachment).toHaveBeenCalledWith(
      userId,
      vendorQuoteCode,
      vendorQuoteAttachmentId
    );
    expect(response).toEqual(mockQuoteAttachment());
  });
});
