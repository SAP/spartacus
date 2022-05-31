import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  PaginationModel,
  QueryState,
  SortModel,
  TranslationService,
} from '@spartacus/core';
import { CommerceQuotesFacade } from 'feature-libs/commerce-quotes/root/facade/commerce-quotes.facade';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Quote, QuoteList } from '@spartacus/commerce-quotes/root';
import { CommerceQuotesListComponent } from './commerce-quotes-list.component';
import createSpy = jasmine.createSpy;

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

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination: PaginationModel;
  @Output() viewPageEvent = new EventEmitter();
}

@Component({
  template: '',
  selector: 'cx-sorting',
})
class MockSortingComponent {
  @Input() sortOptions: SortModel[];
  @Input() sortLabels: { [key: string]: string }[];
  @Input() selectedOption: string;
  @Input() placeholder: string;
  @Output() sortListEvent = new EventEmitter();
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockCommerceQuotesFacade implements Partial<CommerceQuotesFacade> {
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

describe('CommerceQuotesListComponent', () => {
  let fixture: ComponentFixture<CommerceQuotesListComponent>;
  let component: CommerceQuotesListComponent;

  let translationService: TranslationService;
  let facade: CommerceQuotesFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        CommerceQuotesListComponent,
        MockUrlPipe,
        MockPaginationComponent,
        MockSortingComponent,
      ],
      providers: [
        {
          provide: CommerceQuotesFacade,
          useClass: MockCommerceQuotesFacade,
        },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceQuotesListComponent);
    component = fixture.componentInstance;

    translationService = TestBed.inject(TranslationService);
    facade = TestBed.inject(CommerceQuotesFacade);
  });

  it('should read quote list', (done) => {
    component.quotesState$.pipe(take(1)).subscribe((state) => {
      expect(state.data).toEqual(mockQuoteList);
      expect(component.sortType).toEqual(mockPagination.sort);
    });
    done();
  });

  it('should get translated sort labels', (done) => {
    //given
    const labels: { [key: string]: string } = {
      byDate: 'sorting.date',
      byCode: 'sorting.quoteId',
      byName: 'sorting.name',
      byState: 'sorting.status',
    };
    const translateSpy: jasmine.Spy = spyOn(
      translationService,
      'translate'
    ).and.callThrough();

    //then
    component.getSortLabels().subscribe((result) => {
      expect(result).toEqual(labels);
      expect(translateSpy).toHaveBeenCalledTimes(4);
      Object.keys(labels).forEach((key, index) => {
        expect(translateSpy.calls.argsFor(index)).toEqual([labels[key]]);
      });
    });
    done();
  });

  it('should call facade if sort changed', () => {
    //given
    const sortCode = 'byDate';

    //when
    component.changeSortCode(sortCode);

    //then
    expect(facade.setSort).toHaveBeenCalledWith(sortCode);
  });

  it('should call facade if page changed', () => {
    //given
    const page = 5;

    //when
    component.changePage(page);

    //then
    expect(facade.setCurrentPage).toHaveBeenCalledWith(page);
  });

  //TODO: remove after fix in OCC
  it('should console warning if sorts are received from API', (done) => {
    //given
    mockQuoteListState$.next(mockListWithSorts);
    const warnSpy = spyOn(console, 'warn');

    //then
    component.quotesState$.pipe(take(1)).subscribe(() => {
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(component.sorts).toEqual(mockSorts);
    });
    done();
  });

  it('should displaty table and sorting if quote list is not empty', () => {
    //given
    mockQuoteListState$.next(mockQuoteListState);

    //when
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('#header'));
    const sorting = fixture.debugElement.query(By.css('cx-sorting'));
    const table = fixture.debugElement.query(By.css('#commerce-quotes-list'));

    //then
    expect(header.nativeElement.textContent).toEqual(
      'commerceQuotesList.header'
    );
    expect(sorting.nativeElement).not.toBeNull();
    expect(table.nativeElement).not.toBeNull();
  });

  it('should display "empty list" header if quote list is empty', () => {
    //given
    mockQuoteListState$.next({
      ...mockQuoteListState,
      data: { ...mockQuoteList, quotes: [] },
    });

    //when
    fixture.detectChanges();
    const header = fixture.debugElement.query(
      By.css('.cx-commerce-quotes-list-empty')
    );

    //then
    expect(header.nativeElement.textContent.trim()).toEqual(
      'commerceQuotesList.empty'
    );
  });

  it('should display pagination if pages total is more than 1', () => {
    //given
    mockQuoteListState$.next({
      ...mockQuoteListState,
      data: {
        ...mockQuoteList,
        pagination: { ...mockPagination, totalPages: 2 },
      },
    });

    //when
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('cx-pagination'));

    //then
    expect(elements.length).toEqual(2);
  });
});
