import { inject, TestBed } from '@angular/core/testing';
import { Params } from '@angular/router';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  Comment,
  CommerceQuotesListReloadQueryEvent,
  Quote,
  QuoteAction,
  QuoteList,
  QuoteMetadata,
} from '@spartacus/commerce-quotes/root';
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
import { CommerceQuotesConnector } from '../connectors';
import { CommerceQuotesService } from './commerce-quotes.service';
import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = '1234';
const mockAction = QuoteAction.EDIT;
const mockPagination: PaginationModel = {
  currentPage: 0,
  pageSize: 5,
  sort: 'byCode',
};
const mockQuote: Quote = {
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

class MockCommerceQuotesConnector implements Partial<CommerceQuotesConnector> {
  getQuotes = createSpy().and.returnValue(of(mockQuoteList));
  getQuote = createSpy().and.returnValue(of(mockQuote));
  createQuote = createSpy().and.returnValue(of(mockQuote));
  editQuote = createSpy().and.returnValue(of(EMPTY));
  addComment = createSpy().and.returnValue(of(EMPTY));
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

describe('CommerceQuotesService', () => {
  let service: CommerceQuotesService;
  let connector: CommerceQuotesConnector;
  let eventService: EventService;
  let config: ViewConfig;
  let multiCartFacade: MultiCartFacade;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommerceQuotesService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: EventService, useClass: MockEventService },
        { provide: ViewConfig, useClass: MockViewConfig },
        {
          provide: CommerceQuotesConnector,
          useClass: MockCommerceQuotesConnector,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
      ],
    });

    service = TestBed.inject(CommerceQuotesService);
    connector = TestBed.inject(CommerceQuotesConnector);
    eventService = TestBed.inject(EventService);
    config = TestBed.inject(ViewConfig);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    routingService = TestBed.inject(RoutingService);
  });

  it('should inject CommerceQuotesService', inject(
    [CommerceQuotesService],
    (commerceQuotesService: CommerceQuotesService) => {
      expect(commerceQuotesService).toBeTruthy();
    }
  ));

  it('should return quotes after calling commerceQuotesConnector.getQuotes', () => {
    service
      .getQuotesState()
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

  it('should return quotes after calling commerceQuotesConnector.getQuotes with default CMS page size if not set', () => {
    //given
    config.view = undefined;

    //then
    service
      .getQuotesState()
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

  it('should set current page and dispatch CommerceQuotesListReloadQueryEvent', () => {
    //given
    const currentPage = 10;

    //when
    service.setCurrentPage(currentPage);

    //then
    service
      .getQuotesState()
      .pipe(take(1))
      .subscribe(() => {
        expect(connector.getQuotes).toHaveBeenCalledWith(mockUserId, {
          ...mockPagination,
          currentPage,
        });
      });
    expect(eventService.dispatch).toHaveBeenCalledWith(
      {},
      CommerceQuotesListReloadQueryEvent
    );
  });

  it('should set sort and dispatch CommerceQuotesListReloadQueryEvent', () => {
    //given
    const sort = 'byDate';

    //when
    service.setSort(sort);

    //then
    service
      .getQuotesState()
      .pipe(take(1))
      .subscribe(() => {
        expect(connector.getQuotes).toHaveBeenCalledWith(mockUserId, {
          ...mockPagination,
          sort,
        });
      });
    expect(eventService.dispatch).toHaveBeenCalledWith(
      {},
      CommerceQuotesListReloadQueryEvent
    );
  });

  it('should return quote details after calling commerceQuotesConnector.getQuote', () => {
    service
      .getQuoteDetails()
      .pipe(take(1))
      .subscribe((details) => {
        expect(connector.getQuote).toHaveBeenCalledWith(
          mockUserId,
          mockParams.quoteId
        );
        expect(details.data).toEqual(mockQuote);
      });
  });

  it('should call createQuote command', () => {
    service
      .createQuote(mockMetadata, mockComment)
      .pipe(take(1))
      .subscribe((quote) => {
        expect(connector.createQuote).toHaveBeenCalled();
        expect(quote.code).toEqual(mockQuote.code);
        expect(connector.editQuote).toHaveBeenCalled();
        expect(connector.addComment).toHaveBeenCalled();
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

  it('should call performQuoteAcion command', (done) => {
    service.performQuoteAction(mockQuote.code, mockAction).subscribe(() => {
      expect(connector.performQuoteAction).toHaveBeenCalledWith(
        mockUserId,
        mockQuote.code,
        mockAction
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
