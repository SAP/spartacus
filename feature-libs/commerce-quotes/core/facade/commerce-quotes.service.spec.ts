import { inject, TestBed } from '@angular/core/testing';
import { Params } from '@angular/router';
import {
  CommerceQuotesListReloadQueryEvent,
  Quote,
  QuoteList,
} from '@spartacus/commerce-quotes/root';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  PaginationModel,
  QueryState,
  RouterState,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { ViewConfig } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommerceQuotesConnector } from '../connectors';
import { CommerceQuotesService } from './commerce-quotes.service';
import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = '1234';
const mockPagination: PaginationModel = {
  currentPage: 0,
  pageSize: 5,
  sort: 'byCode',
};
const mockQuote: Quote = {
  allowedActions: ['EDIT'],
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

class MockRoutingService implements Partial<RoutingService> {
  getRouterState() {
    return mockRouterState$.asObservable() as Observable<RouterState>;
  }
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
}

describe('CommerceQuotesService', () => {
  let service: CommerceQuotesService;
  let connector: CommerceQuotesConnector;
  let eventService: EventService;
  let config: ViewConfig;

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
      ],
    });

    service = TestBed.inject(CommerceQuotesService);
    connector = TestBed.inject(CommerceQuotesConnector);
    eventService = TestBed.inject(EventService);
    config = TestBed.inject(ViewConfig);
  });

  it('should inject CommerceQuotesService', inject(
    [CommerceQuotesService],
    (commerceQuotesService: CommerceQuotesService) => {
      expect(commerceQuotesService).toBeTruthy();
    }
  ));

  it('should return quotes after calling commerceQuotesConnector.getQuotes', (done) => {
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
        done();
      });
  });

  it('should return quotes after calling commerceQuotesConnector.getQuotes with default CMS page size if not set', (done) => {
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
        done();
      });
  });

  it('should set current page and dispatch CommerceQuotesListReloadQueryEvent', (done) => {
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
    done();
  });

  it('should set sort and dispatch CommerceQuotesListReloadQueryEvent', (done) => {
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
    done();
  });

  it('should return quote details after calling commerceQuotesConnector.getQuote', (done) => {
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
    done();
  });
});
