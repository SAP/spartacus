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
  Quote,
  QuoteActionType,
  QuoteList,
  QuoteState,
} from '@spartacus/quote/root';
import {
  I18nTestingModule,
  PaginationModel,
  QueryState,
  SortModel,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { QuoteListComponentService } from './quote-list-component.service';
import { QuoteListComponent } from './quote-list.component';
import createSpy = jasmine.createSpy;

const mockCartId = '1234';
const mockPagination: PaginationModel = {
  currentPage: 0,
  pageSize: 5,
  sort: 'byCode',
};
const mockAction = { type: QuoteActionType.EDIT, isPrimary: true };
const mockQuote: Quote = {
  allowedActions: [mockAction],
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

class MockCommerceQuotesListComponentService
  implements Partial<QuoteListComponentService>
{
  sorts?: SortModel[] | undefined = mockSorts;
  sortLabels$ = of({
    byDate: 'sorting.date',
    byCode: 'sorting.quoteId',
    byName: 'sorting.name',
    byState: 'sorting.status',
  });
  quotesState$ = mockQuoteListState$.asObservable();
  sort = new BehaviorSubject('byCode');
  currentPage = new BehaviorSubject(0);
  setSort = createSpy();
  setCurrentPage = createSpy();
}

describe('QuoteListComponent', () => {
  let fixture: ComponentFixture<QuoteListComponent>;
  let component: QuoteListComponent;
  let componentService: QuoteListComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        QuoteListComponent,
        MockUrlPipe,
        MockPaginationComponent,
        MockSortingComponent,
      ],
      providers: [
        {
          provide: QuoteListComponentService,
          useClass: MockCommerceQuotesListComponentService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListComponent);
    component = fixture.componentInstance;

    componentService = TestBed.inject(QuoteListComponentService);
  });

  it('should call service if sort changed', () => {
    //given
    const sortCode = 'byDate';

    //when
    component.changeSortCode(sortCode);

    //then
    expect(componentService.setSort).toHaveBeenCalledWith(sortCode);
  });

  it('should call service if page changed', () => {
    //given
    const page = 5;

    //when
    component.changePage(page);

    //then
    expect(componentService.setCurrentPage).toHaveBeenCalledWith(page);
  });

  it('should display table and sorting if quote list is not empty', () => {
    //given
    mockQuoteListState$.next(mockQuoteListState);

    //when
    fixture.detectChanges();
    const sorting = fixture.debugElement.query(By.css('cx-sorting'));
    const table = fixture.debugElement.query(By.css('#quote-list'));

    //then
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
    const header = fixture.debugElement.query(By.css('.cx-quote-list-empty'));

    //then
    expect(header.nativeElement.textContent.trim()).toEqual('quote.list.empty');
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
    expect(elements.length).toEqual(1);
  });

  describe('getQuoteStateClass', () => {
    it('should apply the quote class depending on the given quote state', () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [
            { ...mockQuote, state: QuoteState.BUYER_DRAFT },
            { ...mockQuote, cartId: '1235', state: QuoteState.BUYER_REJECTED },
            { ...mockQuote, cartId: '1235', state: QuoteState.CANCELLED },
            { ...mockQuote, cartId: '1235', state: QuoteState.BUYER_SUBMITTED },
          ],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-quote-list-quote-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-draft');
      expect(quoteStateLinks[1].attributes.class).toContain('quote-rejected');
      expect(quoteStateLinks[2].attributes.class).toContain('quote-cancelled');
      expect(quoteStateLinks[3].attributes.class).toContain('quote-submitted');
    });
  });
});
