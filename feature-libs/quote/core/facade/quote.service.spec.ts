import { inject, TestBed } from '@angular/core/testing';
import { Params } from '@angular/router';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  Comment,
  Quote,
  QuoteActionType,
  QuoteDetailsReloadQueryEvent,
  QuoteList,
  QuoteMetadata,
  QuotesStateParams,
} from '@spartacus/quote/root';
import {
  EventService,
  GlobalMessageService,
  OCC_USER_ID_CURRENT,
  PaginationModel,
  QueryState,
  RouterState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { ViewConfig } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { QuoteConnector } from '../connectors';
import { QuoteService } from './quote.service';
import { createEmptyQuote } from '../testing/quote-test-utils';
import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = '1234';
const mockAction = { type: QuoteActionType.EDIT, isPrimary: true };
const mockCurrentPage = 0;
const mockSort = 'byCode';
const mockPagination: PaginationModel = {
  currentPage: mockCurrentPage,
  pageSize: 5,
  sort: mockSort,
};
const mockQuote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [mockAction],
  cartId: mockCartId,
  code: '333333',
};
const mockQuoteList: QuoteList = {
  pagination: mockPagination,
  sorts: [{ code: 'byDate' }],
  quotes: [mockQuote],
};
const mockParams = { ['quoteId']: '1' };
const mockRouterState$ = new BehaviorSubject({
  navigationId: 1,
  state: { params: mockParams as Params },
});
const mockMetadata: QuoteMetadata = {
  name: 'test',
  description: 'test desc',
};
const mockComment: Comment = {
  text: 'test comment',
};
const mockQuotesStateParams: QuotesStateParams = {
  sort$: of(mockSort),
  currentPage$: of(mockCurrentPage),
};

class MockRoutingService implements Partial<RoutingService> {
  getRouterState() {
    return mockRouterState$.asObservable() as Observable<RouterState>;
  }
  go = createSpy();
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(of());
  dispatch = createSpy();
}

class MockViewConfig implements ViewConfig {
  view = { defaultPageSize: mockPagination.pageSize };
}

class MockCommerceQuotesConnector implements Partial<QuoteConnector> {
  getQuotes = createSpy().and.returnValue(of(mockQuoteList));
  getQuote = createSpy().and.returnValue(of(mockQuote));
  createQuote = createSpy().and.returnValue(of(mockQuote));
  editQuote = createSpy().and.returnValue(of(EMPTY));
  addComment = createSpy().and.returnValue(of(EMPTY));
  addCartEntryComment = createSpy().and.returnValue(of(EMPTY));
  performQuoteAction = createSpy().and.returnValue(of(EMPTY));
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
  reloadActiveCart = createSpy().and.stub();
  takeActiveCartId = createSpy().and.returnValue(of(mockCartId));
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  loadCart = createSpy();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  remove() {}
  add() {}
}

describe('QuoteService', () => {
  let service: QuoteService;
  let connector: QuoteConnector;
  let eventService: EventService;
  let config: ViewConfig;
  let multiCartFacade: MultiCartFacade;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: EventService, useClass: MockEventService },
        { provide: ViewConfig, useClass: MockViewConfig },
        {
          provide: QuoteConnector,
          useClass: MockCommerceQuotesConnector,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
      ],
    });

    service = TestBed.inject(QuoteService);
    connector = TestBed.inject(QuoteConnector);
    eventService = TestBed.inject(EventService);
    config = TestBed.inject(ViewConfig);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    routingService = TestBed.inject(RoutingService);
  });

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
        expect(connector.getQuotes).toHaveBeenCalledWith(
          mockUserId,
          mockPagination
        );
        expect(state).toEqual(<QueryState<QuoteList | undefined>>{
          loading: false,
          error: false,
          data: mockQuoteList,
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
        expect(connector.getQuotes).toHaveBeenCalledWith(mockUserId, {
          ...mockPagination,
          pageSize: undefined,
        });
        expect(state).toEqual(<QueryState<QuoteList | undefined>>{
          loading: false,
          error: false,
          data: mockQuoteList,
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
          mockUserId,
          mockParams.quoteId
        );
        expect(details.data).toEqual(mockQuote);
        expect(details.loading).toBe(false);
      });
  });

  it('should return quote details after calling quoteConnector.getQuote', () => {
    service
      .getQuoteDetails()
      .pipe(take(1))
      .subscribe((details) => {
        expect(connector.getQuote).toHaveBeenCalledWith(
          mockUserId,
          mockParams.quoteId
        );
        expect(details).toEqual(mockQuote);
      });
  });

  it('should call createQuote command', () => {
    service
      .createQuote(mockMetadata)
      .pipe(take(1))
      .subscribe((quote) => {
        expect(connector.createQuote).toHaveBeenCalled();
        expect(quote.code).toEqual(mockQuote.code);
        expect(connector.editQuote).toHaveBeenCalled();
        expect(multiCartFacade.loadCart).toHaveBeenCalled();
        expect(eventService.dispatch).toHaveBeenCalled();
      });
  });

  it('should call editQuote command', () => {
    service
      .editQuote(mockQuote.code, mockMetadata)
      .pipe(take(1))
      .subscribe(() => {
        expect(connector.editQuote).toHaveBeenCalledWith(
          mockUserId,
          mockQuote.code,
          mockMetadata
        );
      });
  });

  it('should call addQuoteComment command', () => {
    service
      .addQuoteComment(mockQuote.code, mockComment)
      .pipe(take(1))
      .subscribe(() => {
        expect(connector.addComment).toHaveBeenCalledWith(
          mockUserId,
          mockQuote.code,
          mockComment
        );
      });
  });

  it('should call addQuoteComment command when called with empty string of an entry number', () => {
    service
      .addQuoteComment(mockQuote.code, mockComment, '')
      .pipe(take(1))
      .subscribe(() => {
        expect(connector.addComment).toHaveBeenCalledWith(
          mockUserId,
          mockQuote.code,
          mockComment
        );
      });
  });

  it('should call addCartEntryComment command when an entry number is provided', () => {
    service
      .addQuoteComment(mockQuote.code, mockComment, '0')
      .pipe(take(1))
      .subscribe(() => {
        expect(connector.addCartEntryComment).toHaveBeenCalledWith(
          mockUserId,
          mockQuote.code,
          '0',
          mockComment
        );
      });
  });

  it('should call performQuoteAction command', (done) => {
    service
      .performQuoteAction(mockQuote.code, mockAction.type)
      .subscribe(() => {
        expect(connector.performQuoteAction).toHaveBeenCalledWith(
          mockUserId,
          mockQuote.code,
          mockAction.type
        );
        done();
      });
  });

  it('should call requote command and return new quote', () => {
    service
      .requote(mockQuote.code)
      .pipe(take(1))
      .subscribe((quote) => {
        expect(connector.createQuote).toHaveBeenCalledWith(mockUserId, {
          quoteCode: mockQuote.code,
        });
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'quoteDetails',
          params: { quoteId: quote.code },
        });
        expect(quote.code).toEqual(mockQuote.code);
      });
  });
});
