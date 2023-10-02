import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  PaginationModel,
  QueryState,
  SortModel,
} from '@spartacus/core';
import {
  Quote,
  QuoteActionType,
  QuoteList,
  QuoteState,
} from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, NEVER, of } from 'rxjs';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { CommonQuoteTestUtilsService } from '../testing/common-quote-test-utils.service';
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
  ...createEmptyQuote(),
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

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
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
  let htmlElem: HTMLElement;
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
        MockCxIconComponent,
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
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    componentService = TestBed.inject(QuoteListComponentService);
  });

  it('should call service if sort changed', () => {
    const sortCode = 'byDate';
    component.changeSortCode(sortCode);

    expect(componentService.setSort).toHaveBeenCalledWith(sortCode);
  });

  it('should call service if page changed', () => {
    const page = 5;
    component.changePage(page);

    expect(componentService.setCurrentPage).toHaveBeenCalledWith(page);
  });

  it('should display table and sorting if quote list is not empty', () => {
    mockQuoteListState$.next(mockQuoteListState);
    fixture.detectChanges();

    CommonQuoteTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-sorting'
    );

    CommonQuoteTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '#quote-list'
    );
  });

  it('should display "empty list" header if quote list is empty', () => {
    mockQuoteListState$.next({
      ...mockQuoteListState,
      data: { ...mockQuoteList, quotes: [] },
    });
    fixture.detectChanges();

    CommonQuoteTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-empty'
    );
    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-empty',
      'quote.list.empty'
    );
  });

  it('should display pagination if pages total is more than 1', () => {
    mockQuoteListState$.next({
      ...mockQuoteListState,
      data: {
        ...mockQuoteList,
        pagination: { ...mockPagination, totalPages: 2 },
      },
    });
    fixture.detectChanges();

    CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      'cx-pagination',
      1
    );
  });
  describe('getQuoteStateClass', () => {
    it('should find proper style class for quote state', () => {
      expect(
        component.getQuoteStateClass(QuoteState.SELLERAPPROVER_DRAFT)
      ).toBe('quote-draft');
    });
    it('should find proper style class for quote state in case quote state does not contain underscore', () => {
      expect(component.getQuoteStateClass(QuoteState.EXPIRED)).toBe(
        'quote-expired'
      );
    });
  });

  describe('Rendering using getQuoteStateClass', () => {
    it("should apply corresponding class for 'CREATED' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.CREATED }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-created',
        'quote.states.CREATED'
      );
    });

    it("should apply corresponding class for 'SELLERAPPROVER_DRAFT' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLERAPPROVER_DRAFT }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-draft',
        'quote.states.SELLERAPPROVER_DRAFT'
      );
    });

    it("should apply a class for 'BUYER_DRAFT' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_DRAFT }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-draft',
        'quote.states.BUYER_DRAFT'
      );
    });

    it("should apply a class for 'SELLER_DRAFT' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLER_DRAFT }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-draft',
        'quote.states.SELLER_DRAFT'
      );
    });

    it("should apply a class for 'BUYER_SUBMITTED' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_SUBMITTED }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-submitted',
        'quote.states.BUYER_SUBMITTED'
      );
    });

    it("should apply a class for 'SELLER_SUBMITTED' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLER_SUBMITTED }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-submitted',
        'quote.states.SELLER_SUBMITTED'
      );
    });

    it("should apply a class for 'BUYER_ACCEPTED' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_ACCEPTED }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-accepted',
        'quote.states.BUYER_ACCEPTED'
      );
    });

    it("should apply a class for 'BUYER_APPROVED' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_APPROVED }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-approved',
        'quote.states.BUYER_APPROVED'
      );
    });

    it("should apply a class for 'SELLERAPPROVER_APPROVED' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLERAPPROVER_APPROVED }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-approved',
        'quote.states.SELLERAPPROVER_APPROVED'
      );
    });

    it("should apply a class for 'BUYER_REJECTED' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_REJECTED }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-rejected',
        'quote.states.BUYER_REJECTED'
      );
    });

    it("should apply a class for 'SELLERAPPROVER_REJECTED' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLERAPPROVER_REJECTED }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-rejected',
        'quote.states.SELLERAPPROVER_REJECTED'
      );
    });

    it("should apply a class for 'BUYER_OFFER' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_OFFER }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-offer',
        'quote.states.BUYER_OFFER'
      );
    });

    it("should apply a class for 'BUYER_ORDERED' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_ORDERED }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-ordered',
        'quote.states.BUYER_ORDERED'
      );
    });

    it("should apply a class for 'SELLER_REQUEST' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLER_REQUEST }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-request',
        'quote.states.SELLER_REQUEST'
      );
    });

    it("should apply a class for 'SELLERAPPROVER_PENDING' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLERAPPROVER_PENDING }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-pending',
        'quote.states.SELLERAPPROVER_PENDING'
      );
    });

    it("should apply a class for 'CANCELLED' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.CANCELLED }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-cancelled',
        'quote.states.CANCELLED'
      );
    });

    it("should apply a class for 'EXPIRED' quote status", () => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.EXPIRED }],
        },
      });
      fixture.detectChanges();

      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'tbody tr:first-child .cx-status  span.quote-expired',
        'quote.states.EXPIRED'
      );
    });
  });

  describe('Ghost animation', () => {
    beforeEach(() => {
      componentService = TestBed.inject(QuoteListComponentService);
      componentService.quotesState$ = NEVER;
      fixture = TestBed.createComponent(QuoteListComponent);
      component = fixture.componentInstance;
      htmlElem = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('should render view for ghost animation', () => {
      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-sort-top'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-title'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-select'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-table'
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-row',
        8
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-name',
        8
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-id',
        8
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-status',
        8
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-updated-date',
        8
      );

      CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-ghost-nav-caret',
        8
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-sort-bottom'
      );

      CommonQuoteTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-ghost-pagination'
      );
    });
  });
});
