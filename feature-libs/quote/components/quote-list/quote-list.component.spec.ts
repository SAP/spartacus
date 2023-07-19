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
import {
  QuoteListComponent,
  ResponsiblePersonPrefix,
} from './quote-list.component';
import createSpy = jasmine.createSpy;
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { ICON_TYPE } from '@spartacus/storefront';

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
    const header = fixture.debugElement.query(By.css('.cx-empty'));

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

  describe('isResponsible', () => {
    it("should return 'true' in case state contains 'BUYER'", () => {
      expect(
        component['isResponsible'](
          ResponsiblePersonPrefix.BUYER,
          QuoteState.BUYER_ACCEPTED
        )
      ).toBe(true);
    });

    it("should return 'true' in case state contains 'SELLER'", () => {
      expect(
        component['isResponsible'](
          ResponsiblePersonPrefix.SELLER,
          QuoteState.SELLER_DRAFT
        )
      ).toBe(true);
    });

    it("should return 'true' in case state contains 'SELLERAPPROVER'", () => {
      expect(
        component['isResponsible'](
          ResponsiblePersonPrefix.SELLERAPPROVER,
          QuoteState.SELLERAPPROVER_APPROVED
        )
      ).toBe(true);
    });
  });

  describe('getBuyerQuoteStatus', () => {
    it('should return an empty string in case state is not a buyer one', () => {
      expect(component['getBuyerQuoteStatus'](QuoteState.SELLER_DRAFT)).toBe(
        ''
      );
    });
  });

  describe('getSellerQuoteStatus', () => {
    it('should return an empty string in case state is not a seller one', () => {
      expect(component['getSellerQuoteStatus'](QuoteState.BUYER_DRAFT)).toBe(
        ''
      );
    });
  });

  describe('getSellerApproverQuoteStatus', () => {
    it('should return an empty string in case state is not a seller approver one', () => {
      expect(
        component['getSellerApproverQuoteStatus'](QuoteState.BUYER_DRAFT)
      ).toBe('');
    });
  });

  describe('getGeneralQuoteStatus', () => {
    it('should return an empty string in case state is not a general one', () => {
      expect(component['getGeneralQuoteStatus'](QuoteState.BUYER_DRAFT)).toBe(
        ''
      );
    });
  });

  describe('getQuoteStateClass', () => {
    it("should apply a class for 'BUYER_DRAFT' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_DRAFT }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-draft');
    });

    it("should apply a class for 'SELLER_DRAFT' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLER_DRAFT }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-draft');
    });

    it("should apply a class for 'BUYER_SUBMITTED' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_SUBMITTED }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-submitted');
    });

    it("should apply a class for 'SELLER_SUBMITTED' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLER_SUBMITTED }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-submitted');
    });

    it("should apply a class for 'BUYER_ACCEPTED' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_ACCEPTED }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-accepted');
    });

    it("should apply a class for 'BUYER_APPROVED' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_APPROVED }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-approved');
    });

    it("should apply a class for 'SELLERAPPROVER_APPROVED' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLERAPPROVER_APPROVED }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-approved');
    });

    it("should apply a class for 'BUYER_REJECTED' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_REJECTED }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-rejected');
    });

    it("should apply a class for 'SELLERAPPROVER_REJECTED' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLERAPPROVER_REJECTED }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-rejected');
    });

    it("should apply a class for 'BUYER_OFFER' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_OFFER }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-offer');
    });

    it("should apply a class for 'BUYER_ORDERED' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.BUYER_ORDERED }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-ordered');
    });

    it("should apply a class for 'SELLER_REQUEST' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLER_REQUEST }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-request');
    });

    it("should apply a class for 'SELLERAPPROVER_PENDING' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.SELLERAPPROVER_PENDING }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-pending');
    });

    it("should apply a class for 'CANCELLED' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.CANCELLED }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-cancelled');
    });

    it("should apply a class for 'EXPIRED' quote status", () => {
      //given
      mockQuoteListState$.next({
        ...mockQuoteListState,
        data: {
          ...mockQuoteList,
          quotes: [{ ...mockQuote, state: QuoteState.EXPIRED }],
        },
      });
      //when
      fixture.detectChanges();
      //then
      const quoteStateLinks = fixture.debugElement.queryAll(
        By.css('.cx-status a')
      );

      expect(quoteStateLinks[0].attributes.class).toContain('quote-expired');
    });
  });
});
