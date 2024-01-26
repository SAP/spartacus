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
  LanguageService,
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
import { BreakpointService, ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, NEVER, Observable, of } from 'rxjs';
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
  updatedTime: new Date('2017-01-11T10:14:39+0000'),
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
  sortOptions?: SortModel[] | undefined = mockSorts;
  sortLabels$ = of({
    byDate: 'sorting.date',
    byCode: 'quote.list.quoteId',
    byName: 'quote.list.name',
    byState: 'quote.list.status',
  });
  quotesState$ = mockQuoteListState$.asObservable();
  sort = new BehaviorSubject('byCode');
  currentPage = new BehaviorSubject(0);
  setSorting = createSpy();
  setPage = createSpy();
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

class MockBreakpointService {
  isDown() {}

  isUp() {}
}

describe('QuoteListComponent', () => {
  let fixture: ComponentFixture<QuoteListComponent>;
  let htmlElem: HTMLElement;
  let component: QuoteListComponent;
  let quoteListComponentService: QuoteListComponentService;

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
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: BreakpointService,
          useClass: MockBreakpointService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    quoteListComponentService = TestBed.inject(QuoteListComponentService);
  });

  it('should call service if sort changed', () => {
    const sortCode = 'byDate';
    component.changeSorting(sortCode);

    expect(quoteListComponentService.setSorting).toHaveBeenCalledWith(sortCode);
  });

  it('should call service if page changed', () => {
    const page = 5;
    component.changePage(page);

    expect(quoteListComponentService.setPage).toHaveBeenCalledWith(page);
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
      2
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
      quoteListComponentService = TestBed.inject(QuoteListComponentService);
      quoteListComponentService.quotesState$ = NEVER;
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

  describe('isPaginationEnabled', () => {
    it('should not render pagination', () => {
      expect(component['isPaginationEnabled'](mockPagination)).toBe(false);
    });

    it('should  render pagination', () => {
      mockPagination.totalPages = 3;
      expect(component['isPaginationEnabled'](mockPagination)).toBe(true);
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          pagination: { ...mockPagination, totalPages: 2 },
        },
      });
      fixture.detectChanges();
    });

    it("should contain 'div' HTML element with 'role' attribute that indicates the role for this element", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'div',
          '',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'role',
        'region'
      );
    });

    it("should contain 'div' HTML element with 'aria-label' attribute that indicates the text for this element", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'div',
          '',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'aria-label',
        'quote.list.regionTitle'
      );
    });

    it("should contain 'table' HTML element with 'aria-describedby' attribute that indicates the element on which the attribute is set", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'table',
          '',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'aria-describedby',
        'quote-list-desc'
      );
    });

    it('should contain a explanatory text that is seen only for a screen reader and defines a table caption', () => {
      CommonQuoteTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'caption.cx-visually-hidden',
        'quote.list.title'
      );
    });

    it("should contain 'thead' HTML element with 'role' attribute that indicates a group of rows within a tabular structure", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'thead',
          '',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'role',
        'rowgroup'
      );
    });

    it("should contain 'tbody' HTML element with 'role' attribute that indicates a group of rows within a tabular structure", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'tbody',
          '',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'role',
        'rowgroup'
      );
    });

    it("should contain 'th' HTML element with 'role' attribute that indicates the role for this element", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'th',
          '',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'role',
        'columnheader'
      );
    });

    it("should contain 'th' HTML element with 'aria-sort' attribute that indicates if there is no defined sort applied to the column", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'th',
          '',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'aria-sort',
        'none'
      );
    });

    it("should contain 'tr' HTML element with 'role' attribute that indicates the role for this element", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'tr',
          '',
          1
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'role',
        'row'
      );
    });

    it("should contain 'cx-icon' element with 'aria-label' attribute that labels an interactive element", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'cx-icon'
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'aria-label',
        'quote.list.clickableRow'
      );
    });

    it("should contain 'td' HTML element with 'role' attribute that indicates the role for this element", () => {
      const element =
        CommonQuoteTestUtilsService.getElementByClassNameOrTreeOrder(
          htmlElem,
          'td',
          'cx-name',
          0
        );

      CommonQuoteTestUtilsService.expectElementContainsA11y(
        expect,
        element,
        'role',
        'cell'
      );
    });
  });
});
