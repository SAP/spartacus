import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
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
import { BehaviorSubject, Observable, firstValueFrom, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { QuoteListComponentService } from './quote-list-component.service';

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
  setSort = vi.fn();
  setCurrentPage = vi.fn();
}

class MockTranslationService implements Partial<TranslationService> {
  translate(key: string): Observable<string> {
    return of(key);
  }
}

describe('QuoteListComponentService', () => {
  let classUnderTest: QuoteListComponentService;
  let translateSpy: ReturnType<typeof vi.spyOn>;

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
    translateSpy = vi.spyOn(
      MockTranslationService.prototype,
      'translate'
    );

    classUnderTest = TestBed.inject(QuoteListComponentService);
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should get translated sort labels', async () => {
    //given
    const labels: { [key: string]: string } = {
      byDate: 'sorting.date',
      byCode: 'quote.list.quoteId',
      byName: 'quote.list.name',
      byState: 'quote.list.status',
    };

    //then
    const result = await firstValueFrom(classUnderTest.sortLabels$);
    expect(result).toEqual(labels);
    expect(translateSpy).toHaveBeenCalledTimes(4);
    Object.keys(labels).forEach((key, index) => {
      expect(translateSpy.mock.calls[index]).toEqual([labels[key]]);
    });
  });

  //TODO CHHI : remove after fix in OCC
  it('should console warning if sorts are received from API', async () => {
    //given
    mockQuoteListState$.next(mockListWithSorts);
    //const warnSpy = vi.spyOn(console, 'warn');

    //then
    await firstValueFrom(classUnderTest.quotesState$);
    // expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(classUnderTest.sortOptions).toEqual(mockSorts);
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
