import { TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  PaginationModel,
  QueryState,
  TranslationService,
} from '@spartacus/core';
import {
  Quote,
  QuoteActionType,
  QuoteFacade,
  QuoteList,
} from '@spartacus/quote/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { QuoteListComponentService } from './quote-list-component.service';
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
  let classUnderTest: QuoteListComponentService;
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

    classUnderTest = TestBed.inject(QuoteListComponentService);
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should get translated sort labels', (done) => {
    //given
    const labels: { [key: string]: string } = {
      byDate: 'sorting.date',
      byCode: 'quote.list.quoteId',
      byName: 'quote.list.name',
      byState: 'quote.list.status',
    };

    //then
    classUnderTest.sortLabels$.subscribe((result) => {
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
    classUnderTest.quotesState$.pipe(take(1)).subscribe(() => {
      // expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(classUnderTest.sortOptions).toEqual(mockSorts);
    });
    done();
  });

  it('should change sort value when setSort', () => {
    //given
    const sort = 'byDate';

    //when
    classUnderTest.setSorting(sort);

    //then
    classUnderTest['sort'].subscribe((result) => {
      expect(result).toEqual(sort);
    });
  });

  it('should change sort value when setSort', () => {
    //given
    const currentPage = 5;

    //when
    classUnderTest.setPage(currentPage);

    //then
    classUnderTest['currentPage'].subscribe((result) => {
      expect(result).toEqual(currentPage);
    });
  });
});
