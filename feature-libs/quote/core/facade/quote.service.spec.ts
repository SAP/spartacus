import { inject, TestBed } from '@angular/core/testing';
import { Params } from '@angular/router';
import {
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  Comment,
  Quote,
  QuoteActionType,
  QuoteCartService,
  QuoteDiscount,
  QuoteDiscountType,
  QuoteList,
  QuoteMetadata,
  QuotesStateParams,
} from '@spartacus/quote/root';
import {
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
import { ViewConfig } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { QuoteConnector } from '../connectors';
import { QuoteService } from './quote.service';
import { createEmptyQuote, QUOTE_CODE } from '../testing/quote-test-utils';
import createSpy = jasmine.createSpy;
import { CartUtilsService } from '../services/cart-utils.service';
import { QuoteDetailsReloadQueryEvent } from '../event/quote.events';

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
const quoteWithoutCartId: Quote = {
  ...quote,
  cartId: undefined,
};
const cart: Cart = {
  code: cartId,
};

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
const quoteComment: Comment = {
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
  go = createSpy();
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(userId));
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(of());
  dispatch = createSpy();
}

let isQuoteCartActive: any;
let quoteId: any;
class MockQuoteCartService {
  setQuoteCartActive = createSpy();
  setQuoteId = createSpy();
  setCheckoutAllowed = createSpy();
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
  getQuotes = createSpy().and.returnValue(of(quoteList));
  getQuote = createSpy().and.returnValue(of(quote));
  createQuote = createSpy().and.returnValue(of(quote));
  editQuote = createSpy().and.returnValue(of(EMPTY));
  addComment = createSpy().and.returnValue(of(EMPTY));
  addQuoteEntryComment = createSpy().and.returnValue(of(EMPTY));
  performQuoteAction = createSpy().and.returnValue(of(EMPTY));
  addDiscount = createSpy().and.returnValue(of(EMPTY));
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
  reloadActiveCart = createSpy().and.stub();
  takeActiveCartId = createSpy().and.returnValue(of(cartId));
  getActive = createSpy().and.returnValue(of(cart));
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  loadCart = createSpy();
  createCart = createSpy().and.returnValue(of({}));
}

class MockCartUtilsService implements Partial<CartUtilsService> {
  createNewCartAndGoToQuoteList = createSpy();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  remove = createSpy().and.stub();
  add = createSpy().and.stub();
}

describe('QuoteService', () => {
  let service: QuoteService;
  let connector: QuoteConnector;
  let eventService: EventService;
  let config: ViewConfig;
  let multiCartFacade: MultiCartFacade;
  let activeCartFacade: ActiveCartFacade;
  let routingService: RoutingService;
  let quoteCartService: QuoteCartService;
  let cartUtilsService: CartUtilsService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteService,
        { provide: UserIdService, useClass: MockUserIdService },
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
      ],
    });

    service = TestBed.inject(QuoteService);
    connector = TestBed.inject(QuoteConnector);
    eventService = TestBed.inject(EventService);
    config = TestBed.inject(ViewConfig);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    routingService = TestBed.inject(RoutingService);
    quoteCartService = TestBed.inject(QuoteCartService);
    cartUtilsService = TestBed.inject(CartUtilsService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    isQuoteCartActive = false;
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

  function checkNoActionPerforming(
    quoteActionResult: Observable<unknown>,
    done: any
  ) {
    quoteActionResult
      .pipe(switchMap(() => service['isActionPerforming$']))
      .subscribe((isPerforming) => {
        expect(isPerforming).toBe(false);
        done();
      });
  }

  it('should inject CommerceQuotesService', inject(
    [QuoteService],
    (quoteService: QuoteService) => {
      expect(quoteService).toBeTruthy();
    }
  ));

  it('should return quotes after calling quoteConnector.getQuotes', () => {
    service
      .getQuotesState(mockQuotesStateParams)
      .pipe(take(1))
      .subscribe((state) => {
        expect(connector.getQuotes).toHaveBeenCalledWith(userId, pagination);
        expect(state).toEqual(<QueryState<QuoteList | undefined>>{
          loading: false,
          error: false,
          data: quoteList,
        });
      });
  });

  it('should return quotes after calling quoteConnector.getQuotes with default CMS page size if not set', () => {
    //given
    config.view = undefined;

    //then
    service
      .getQuotesState(mockQuotesStateParams)
      .pipe(take(1))
      .subscribe((state) => {
        expect(connector.getQuotes).toHaveBeenCalledWith(userId, {
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
    service
      .getQuotesState(mockQuotesStateParams)
      .pipe(take(1))
      .subscribe(() => {
        expect(eventService.dispatch).toHaveBeenCalledWith(
          {},
          QuoteDetailsReloadQueryEvent
        );
      });
  });

  it('should return quote details query state after calling quoteConnector.getQuote', () => {
    service
      .getQuoteDetailsQueryState()
      .pipe(take(1))
      .subscribe((details) => {
        expect(connector.getQuote).toHaveBeenCalledWith(
          userId,
          routeParams.quoteId
        );
        expect(details.data).toEqual(quote);
        expect(details.loading).toBe(false);
      });
  });

  describe('getQuoteDetails', () => {
    it('should return quote details after calling quoteConnector.getQuote', () => {
      service
        .getQuoteDetails()
        .pipe(take(1))
        .subscribe((details) => {
          expect(connector.getQuote).toHaveBeenCalledWith(
            userId,
            routeParams.quoteId
          );
          expect(details).toEqual(quote);
        });
    });

    it('should wait until active cart has been loaded', (done) => {
      isQuoteCartActive = true;
      quoteId = quote.code;
      service
        .getQuoteDetails()
        .pipe(take(1))
        .subscribe((details) => {
          expect(activeCartFacade.getActive).toHaveBeenCalled();
          expect(details).toEqual(quote);
          done();
        });
    });

    it('should call connector once if isStable emits twice', () => {
      isQuoteCartActive = true;
      quoteId = quote.code;
      service
        .getQuoteDetails()
        .pipe()
        .subscribe(() => {
          expect(connector.getQuote).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('addDiscount', () => {
    const discount: QuoteDiscount = {
      discountRate: 1,
      discountType: QuoteDiscountType.ABSOLUTE,
    };
    it('should call respective connector method ', () => {
      service
        .addDiscount(QUOTE_CODE, discount)
        .pipe(take(1))
        .subscribe(() => {
          expect(connector.addDiscount).toHaveBeenCalledWith(
            userId,
            QUOTE_CODE,
            discount
          );
        });
    });
  });

  it('should call createQuote command', () => {
    service
      .createQuote(quoteMetaData)
      .pipe(take(1))
      .subscribe((quote) => {
        expect(connector.createQuote).toHaveBeenCalled();
        expect(quote.code).toEqual(quote.code);
        expect(connector.editQuote).toHaveBeenCalled();
        expect(multiCartFacade.loadCart).toHaveBeenCalled();
        expect(eventService.dispatch).toHaveBeenCalled();
      });
  });

  it('should call editQuote command', () => {
    service
      .editQuote(quote.code, quoteMetaData)
      .pipe(take(1))
      .subscribe(() => {
        expect(connector.editQuote).toHaveBeenCalledWith(
          userId,
          quote.code,
          quoteMetaData
        );
      });
  });

  it('should call addQuoteComment command', () => {
    service
      .addQuoteComment(quote.code, quoteComment)
      .pipe(take(1))
      .subscribe(() => {
        expect(connector.addComment).toHaveBeenCalledWith(
          userId,
          quote.code,
          quoteComment
        );
      });
  });

  describe('performQuoteAction', () => {
    it('should call respective connector method', (done) => {
      service.performQuoteAction(quote, quoteAction.type).subscribe(() => {
        expect(connector.performQuoteAction).toHaveBeenCalledWith(
          userId,
          quote.code,
          quoteAction.type
        );
        done();
      });
    });

    it('should raise re-load event', (done) => {
      service.performQuoteAction(quote, quoteAction.type).subscribe(() => {
        expect(eventService.dispatch).toHaveBeenCalledWith(
          {},
          QuoteDetailsReloadQueryEvent
        );
        done();
      });
    });

    it('should raise re-load event, even if action fails', (done) => {
      connector.performQuoteAction = createSpy().and.returnValue(
        throwError({})
      );
      service.performQuoteAction(quote, quoteAction.type).subscribe({
        error: () => {
          expect(eventService.dispatch).toHaveBeenCalledWith(
            {},
            QuoteDetailsReloadQueryEvent
          );
          done();
        },
      });
    });

    describe('on submit', () => {
      it('should create new cart and navigate to quote list, but not reload', (done) => {
        service
          .performQuoteAction(quote, QuoteActionType.SUBMIT)
          .subscribe(() => {
            expect(
              cartUtilsService.createNewCartAndGoToQuoteList
            ).toHaveBeenCalled();
            expect(eventService.dispatch).not.toHaveBeenCalledWith(
              {},
              QuoteDetailsReloadQueryEvent
            );
            done();
          });
      });

      it('should set loading state to false when action is completed', (done) => {
        checkNoActionPerforming(
          service.performQuoteAction(quote, QuoteActionType.SUBMIT),
          done
        );
      });
    });

    describe('on cancel', () => {
      it('should create new cart and navigate to quote list', (done) => {
        service
          .performQuoteAction(quote, QuoteActionType.CANCEL)
          .subscribe(() => {
            expect(
              cartUtilsService.createNewCartAndGoToQuoteList
            ).toHaveBeenCalled();
            done();
          });
      });

      it('should set loading state to false when action is completed', (done) => {
        checkNoActionPerforming(
          service.performQuoteAction(quote, QuoteActionType.CANCEL),
          done
        );
      });
    });

    describe('on edit', () => {
      it('should load quote cart', (done) => {
        service
          .performQuoteAction(quote, QuoteActionType.EDIT)
          .subscribe(() => {
            checkQuoteCartFacadeCalls();
            done();
          });
      });

      it('should trigger a quote refresh', (done) => {
        service
          .performQuoteAction(quote, QuoteActionType.EDIT)
          .subscribe(() => {
            expect(eventService.dispatch).toHaveBeenCalledWith(
              {},
              QuoteDetailsReloadQueryEvent
            );
            done();
          });
      });

      it('should trigger quote re-read in case quote does not carry a cart id', (done) => {
        service
          .performQuoteAction(quoteWithoutCartId, QuoteActionType.EDIT)
          .subscribe(() => {
            expect(connector.getQuote).toHaveBeenCalledWith(userId, quote.code);
            done();
          });
      });

      it('should set loading state to false when action is completed', (done) => {
        checkNoActionPerforming(
          service.performQuoteAction(quote, QuoteActionType.EDIT),
          done
        );
      });
    });

    describe('on checkout', () => {
      it('should load cart on checkout and signal that checkout is allowed', (done) => {
        service
          .performQuoteAction(quote, QuoteActionType.CHECKOUT)
          .subscribe(() => {
            checkQuoteCartFacadeCalls();
            expect(quoteCartService.setCheckoutAllowed).toHaveBeenCalledWith(
              true
            );
            done();
          });
      });

      it('should navigate to checkout', (done) => {
        service
          .performQuoteAction(quote, QuoteActionType.CHECKOUT)
          .subscribe(() => {
            expect(routingService.go).toHaveBeenCalledWith({
              cxRoute: 'checkout',
            });
            done();
          });
      });

      it('should set loading state to false when action is completed', (done) => {
        checkNoActionPerforming(
          service.performQuoteAction(quote, QuoteActionType.CHECKOUT),
          done
        );
      });
    });

    describe('on reject', () => {
      it('should set loading state to false when action is completed', (done) => {
        checkNoActionPerforming(
          service.performQuoteAction(quote, QuoteActionType.REJECT),
          done
        );
      });
    });
  });

  it('should call addQuoteComment command when called with empty string of an entry number', () => {
    service
      .addQuoteComment(quote.code, quoteComment, '')
      .pipe(take(1))
      .subscribe(() => {
        expect(connector.addComment).toHaveBeenCalledWith(
          userId,
          quote.code,
          quoteComment
        );
      });
  });

  it('should call addQuoteEntryComment command when an entry number is provided', () => {
    service
      .addQuoteComment(quote.code, quoteComment, '0')
      .pipe(take(1))
      .subscribe(() => {
        expect(connector.addQuoteEntryComment).toHaveBeenCalledWith(
          userId,
          quote.code,
          '0',
          quoteComment
        );
      });
  });
  describe('requote', () => {
    it('should call requote command and return new quote', () => {
      service
        .requote(quote.code)
        .pipe(take(1))
        .subscribe((reQuoted) => {
          expect(connector.createQuote).toHaveBeenCalledWith(userId, {
            quoteCode: quote.code,
          });
          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'quoteDetails',
            params: { quoteId: quote.code },
          });
          expect(reQuoted.code).toEqual(quote.code);
        });
    });

    it('should load quote cart', (done) => {
      service
        .requote(quote.code)
        .pipe(take(1))
        .subscribe(() => {
          checkQuoteCartFacadeCalls();
          done();
        });
    });

    it('should set loading state to false when action is completed', (done) => {
      checkNoActionPerforming(service.requote(quote.code), done);
    });
  });

  describe('handleError', () => {
    it('should ignore unknown errors', () => {
      service['handleError']({ message: 'some error', details: [] }).subscribe({
        complete: () => fail('should signal error'),
        error: (error) => {
          expect(error).toEqual({ message: 'some error', details: [] });
        },
      });
    });

    it('should handle CommerceQuoteExpirationTimeError', () => {
      service['handleError']({
        details: [{ type: 'CommerceQuoteExpirationTimeError' }],
      }).subscribe({
        error: () => {
          fail('should NOT signal error');
        },
      });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'quote.httpHandlers.expired' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
