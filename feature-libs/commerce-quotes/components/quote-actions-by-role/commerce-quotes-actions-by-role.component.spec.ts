import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  QuoteFacade,
  Quote,
  QuoteActionType,
  QuoteState,
} from '@spartacus/commerce-quotes/root';
import {
  I18nTestingModule,
  QueryState,
  TranslationService,
} from '@spartacus/core';

import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommerceQuotesActionsByRoleComponent } from './commerce-quotes-actions-by-role.component';
import createSpy = jasmine.createSpy;
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { ElementRef, ViewContainerRef } from '@angular/core';

const mockCartId = '1234';
const mockCode = '3333';

const mockQuote: Quote = {
  allowedActions: [
    { type: QuoteActionType.EDIT, isPrimary: false },
    { type: QuoteActionType.REQUOTE, isPrimary: true },
  ],
  state: QuoteState.BUYER_DRAFT,
  cartId: mockCartId,
  code: mockCode,
};
const mockQuoteDetailsState: QueryState<Quote> = {
  loading: false,
  error: false,
  data: mockQuote,
};

const mockQuoteDetailsState$ = new BehaviorSubject<QueryState<Quote>>(
  mockQuoteDetailsState
);

const dialogClose$ = new BehaviorSubject<any | undefined>(undefined);
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(reason: any): void {
    dialogClose$.next(reason);
  }
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef,
    _data?: any
  ) {
    return of();
  }
  get dialogClose() {
    return dialogClose$.asObservable();
  }
}

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<QueryState<Quote>> {
    return mockQuoteDetailsState$.asObservable();
  }
  performQuoteAction(
    _quoteCode: string,
    _quoteAction: QuoteActionType
  ): Observable<unknown> {
    return EMPTY;
  }
  requote = createSpy();
}

class MockTranslationService implements Partial<TranslationService> {
  translate(key: string): Observable<string> {
    return of(key);
  }
}

describe('CommerceQuotesActionsByRoleComponent', () => {
  let fixture: ComponentFixture<CommerceQuotesActionsByRoleComponent>;
  let component: CommerceQuotesActionsByRoleComponent;
  let launchDialogService: LaunchDialogService;
  let facade: QuoteFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CommerceQuotesActionsByRoleComponent],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceQuotesActionsByRoleComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    facade = TestBed.inject(QuoteFacade);
    mockQuoteDetailsState$.next(mockQuoteDetailsState);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
    expect(facade).toBeDefined();
  });

  it('should read quote details state', (done) => {
    component.quoteDetailsState$.pipe(take(1)).subscribe((state) => {
      expect(state).toEqual(mockQuoteDetailsState);
      done();
    });
  });

  // it('should read quote details and return original data if state or allower actions are not present', (done) => {
  //   const mockQuoteDetailseWithoutState: Quote = {
  //     code: mockCode,
  //     cartId: mockCartId,
  //     allowedActions: [QuoteActionType.EDIT, QuoteActionType.REQUOTE],
  //   };
  //   const expected: QueryState<Quote> = {
  //     error: false,
  //     loading: false,
  //     data: mockQuoteDetailseWithoutState,
  //   };
  //   mockQuoteDetailsState$.next(expected);

  //   component.quoteDetailsState$.pipe(take(1)).subscribe((state) => {
  //     expect(state).toEqual(expected);
  //     done();
  //   });
  // });

  // it('should return list if commerce quotes config or actions order is not present', () => {
  //   Object.defineProperty(configService, 'config', {
  //     value: {
  //       commerceQuotes: null,
  //     },
  //   });
  //   expect(
  //     component['getOrderedList'](
  //       QuoteState.BUYER_DRAFT,
  //       mockQuote.allowedActions as QuoteActionType[]
  //     )
  //   ).toEqual(mockQuote.allowedActions);

  //   Object.defineProperty(configService, 'config', {
  //     value: {
  //       commerceQuotes: { actionsOrderByState: null },
  //     },
  //   });
  //   expect(
  //     component['getOrderedList'](
  //       QuoteState.BUYER_DRAFT,
  //       mockQuote.allowedActions as QuoteActionType[]
  //     )
  //   ).toEqual(mockQuote.allowedActions);
  // });

  // it('should return empty array if commerce quotes config is not set', () => {
  //   Object.defineProperty(configService, 'config', {
  //     value: {
  //       commerceQuotes: null,
  //     },
  //   });
  //   fixture = TestBed.createComponent(CommerceQuotesActionsByRoleComponent);
  //   component = fixture.componentInstance;

  //   expect(component.primaryActions).toEqual([]);
  // });

  it('should open confirmation dialog when action is SUBMIT', () => {
    spyOn(launchDialogService, 'openDialog');
    const newMockQuoteWithSubmitAction: QueryState<Quote> = {
      error: false,
      loading: false,
      data: {
        ...mockQuote,
        allowedActions: [
          { type: QuoteActionType.SUBMIT, isPrimary: true },
          { type: QuoteActionType.CANCEL, isPrimary: false },
        ],
      },
    };
    mockQuoteDetailsState$.next(newMockQuoteWithSubmitAction);
    fixture.detectChanges();
    component.onClick(
      QuoteActionType.SUBMIT,
      newMockQuoteWithSubmitAction.data?.code ?? ''
    );
    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.REQUEST_CONFIRMATION,
      component.element,
      component['viewContainerRef'],
      { quoteCode: newMockQuoteWithSubmitAction.data?.code }
    );
  });

  it('should perform quote action when action is SUBMIT and confirm dialogClose reason is yes', () => {
    spyOn(facade, 'performQuoteAction').and.callThrough();
    const newMockQuoteWithSubmitAction: QueryState<Quote> = {
      error: false,
      loading: false,
      data: {
        ...mockQuote,
        allowedActions: [
          { type: QuoteActionType.SUBMIT, isPrimary: true },
          { type: QuoteActionType.CANCEL, isPrimary: false },
        ],
      },
    };
    mockQuoteDetailsState$.next(newMockQuoteWithSubmitAction);
    fixture.detectChanges();

    component.onClick(
      QuoteActionType.SUBMIT,
      newMockQuoteWithSubmitAction.data?.code ?? ''
    );
    launchDialogService.closeDialog('yes');
    expect(facade.performQuoteAction).toHaveBeenCalledWith(
      newMockQuoteWithSubmitAction.data?.code,
      QuoteActionType.SUBMIT
    );
  });

  it('should generate buttons with actions and trigger proper method (requote if allowed action is REQUOTE)', () => {
    spyOn(facade, 'performQuoteAction').and.callThrough();
    fixture.detectChanges();
    const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));

    expect(actionButtons).toBeDefined();
    actionButtons.filter((button, index) => {
      expect(button.nativeElement.textContent.trim()).toEqual(
        `quote.actions.${mockQuote.allowedActions[index].type}`
      );
      button.nativeElement.click();
    });
    expect(facade.performQuoteAction).toHaveBeenCalledWith(
      mockQuote.code,
      QuoteActionType.EDIT
    );
    expect(facade.requote).toHaveBeenCalledWith(mockQuote.code);
  });
});
