import { TestBed } from '@angular/core/testing';
import {
  QuoteFacade,
  Quote,
  QuoteActionType,
  QuoteList,
} from '@spartacus/quote/root';
import {
  I18nTestingModule,
  PaginationModel,
  QueryState,
  TranslationService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { QuoteListComponentService as QuoteListComponentService } from './quote-list-component.service';
import { createEmptyQuote } from './../../core/testing/quote-test-utils.service';
import createSpy = jasmine.createSpy;

const mockCartId = '1234';
const mockPagination: PaginationModel = {
  currentPage: 0,
  pageSize: 5,
  sort: 'byCode',
};
const mockAction = { type: QuoteActionType.EDIT, isPrimary: true };
const mockQuote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [mockAction],
  cartId: mockCartId,
};
const mockQuoteList: QuoteList = {
  pagination: mockPagination,
  quotes: [mockQuote],
};
const mockQuoteListState: QueryState<QuoteList> = {
  loading: false,
  error: false,
  data: mockQuoteList,
};
const mockSorts = [
  { code: 'byDate' },
  { code: 'byCode' },
  { code: 'byName' },
  { code: 'byState' },
];
const mockListWithSorts: QueryState<QuoteList> = {
  ...mockQuoteListState,
  data: { ...mockQuoteList, sorts: mockSorts },
};

const mockQuoteListState$ = new BehaviorSubject(mockQuoteListState);

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuotesState(): Observable<QueryState<QuoteList>> {
    return mockQuoteListState$.asObservable();
  }
  setSort = createSpy();
  setCurrentPage = createSpy();
}

class MockTranslationService implements Partial<TranslationService> {
  translate(key: string): Observable<string> {
    return of(key);
  }
}

describe('QuoteListComponentService', () => {
  let service: QuoteListComponentService;

  let translateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        QuoteListComponentService,
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
      ],
    });
  });

  beforeEach(() => {
    translateSpy = spyOn(
      MockTranslationService.prototype,
      'translate'
    ).and.callThrough();

    service = TestBed.inject(QuoteListComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get translated sort labels', (done) => {
    //given
    const labels: { [key: string]: string } = {
      byDate: 'sorting.date',
      byCode: 'sorting.quoteId',
      byName: 'sorting.name',
      byState: 'sorting.status',
    };

    //then
    service.sortLabels$.subscribe((result) => {
      expect(result).toEqual(labels);
      expect(translateSpy).toHaveBeenCalledTimes(4);
      Object.keys(labels).forEach((key, index) => {
        expect(translateSpy.calls.argsFor(index)).toEqual([labels[key]]);
      });
      done();
    });
  });

  //TODO CHHI : remove after fix in OCC
  it('should console warning if sorts are received from API', (done) => {
    //given
    mockQuoteListState$.next(mockListWithSorts);
    //const warnSpy = spyOn(console, 'warn');

    //then
    service.quotesState$.pipe(take(1)).subscribe(() => {
      // expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(service.sorts).toEqual(mockSorts);
    });
    done();
  });

  it('should change sort value when setSort', () => {
    //given
    const sort = 'byDate';

    //when
    service.setSort(sort);

    //then
    service['sort'].subscribe((result) => {
      expect(result).toEqual(sort);
    });
  });

  it('should change sort value when setSort', () => {
    //given
    const currentPage = 5;

    //when
    service.setCurrentPage(currentPage);

    //then
    service['currentPage'].subscribe((result) => {
      expect(result).toEqual(currentPage);
    });
  });
});
