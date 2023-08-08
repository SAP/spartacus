import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  QuoteFacade,
  Quote,
  QuoteActionType,
  QuoteState,
} from '@spartacus/quote/root';
import {
  GlobalMessageService,
  I18nTestingModule,
  Price,
  TranslationService,
} from '@spartacus/core';

import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { QuoteActionsByRoleComponent } from './quote-actions-by-role.component';
import createSpy = jasmine.createSpy;
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { ElementRef, ViewContainerRef } from '@angular/core';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';

const mockCartId = '1234';
const mockCode = '3333';
const threshold = 20;
const totalPrice: Price = { value: threshold + 1 };

const mockQuote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [
    { type: QuoteActionType.EDIT, isPrimary: false },
    { type: QuoteActionType.REQUOTE, isPrimary: true },
  ],
  state: QuoteState.BUYER_DRAFT,
  cartId: mockCartId,
  code: mockCode,
  threshold: threshold,
  totalPrice: totalPrice,
};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(mockQuote);

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
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
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

class MockGlobalMessageService {
  add(): void {}
}

describe('QuoteActionsByRoleComponent', () => {
  let fixture: ComponentFixture<QuoteActionsByRoleComponent>;
  let component: QuoteActionsByRoleComponent;
  let launchDialogService: LaunchDialogService;
  let facade: QuoteFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuoteActionsByRoleComponent],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteActionsByRoleComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    facade = TestBed.inject(QuoteFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    mockQuoteDetails$.next(mockQuote);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
    expect(facade).toBeDefined();
  });

  it('should read quote details state', (done) => {
    component.quoteDetails$.pipe(take(1)).subscribe((state) => {
      expect(state).toEqual(mockQuote);
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
  //   fixture = TestBed.createComponent(QuoteActionsByRoleComponent);
  //   component = fixture.componentInstance;

  //   expect(component.primaryActions).toEqual([]);
  // });

  it('should open confirmation dialog when action is SUBMIT', () => {
    spyOn(launchDialogService, 'openDialog');
    const newMockQuoteWithSubmitAction: Quote = {
      ...mockQuote,
      allowedActions: [
        { type: QuoteActionType.SUBMIT, isPrimary: true },
        { type: QuoteActionType.CANCEL, isPrimary: false },
      ],
    };
    mockQuoteDetails$.next(newMockQuoteWithSubmitAction);
    fixture.detectChanges();
    component.onClick(QuoteActionType.SUBMIT, newMockQuoteWithSubmitAction);
    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.ACTION_CONFIRMATION,
      component.element,
      component['viewContainerRef'],
      { quoteCode: newMockQuoteWithSubmitAction.code }
    );
  });

  describe('Threshold check', () => {
    const allowedActionsSubmit = [
      { type: QuoteActionType.SUBMIT, isPrimary: true },
    ];
    const quoteFailingThreshold: Quote = {
      ...mockQuote,
      totalPrice: { value: threshold - 1 },
      allowedActions: allowedActionsSubmit,
    };
    const submittableQuote: Quote = {
      ...mockQuote,
      allowedActions: allowedActionsSubmit,
    };
    const cancellableQuote: Quote = {
      ...quoteFailingThreshold,
      allowedActions: [{ type: QuoteActionType.CANCEL, isPrimary: true }],
    };

    it('should let submit button enabled if threshold is met', () => {
      mockQuoteDetails$.next(submittableQuote);
      fixture.detectChanges();
      const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));
      expect(actionButtons).toBeDefined();
      expect(actionButtons[0].nativeElement.disabled).toBe(false);
    });

    it('should let submit button enabled if threshold is not specified', () => {
      mockQuote.threshold = undefined;
      mockQuoteDetails$.next(submittableQuote);
      fixture.detectChanges();
      const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));
      expect(actionButtons).toBeDefined();
      expect(actionButtons[0].nativeElement.disabled).toBe(false);
    });

    it('should disable submit button if threshold is not met and raise message', () => {
      spyOn(globalMessageService, 'add').and.callThrough();
      mockQuoteDetails$.next(quoteFailingThreshold);
      fixture.detectChanges();

      const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));
      expect(actionButtons).toBeDefined();
      expect(actionButtons[0].nativeElement.disabled).toBe(true);
      expect(globalMessageService.add).toHaveBeenCalled();
    });

    it('should disable submit button if total price value is not provided', () => {
      quoteFailingThreshold.totalPrice.value = undefined;

      mockQuoteDetails$.next(quoteFailingThreshold);
      fixture.detectChanges();

      const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));
      expect(actionButtons).toBeDefined();
      expect(actionButtons[0].nativeElement.disabled).toBe(true);
    });

    it('should not touch buttons other than submit', () => {
      mockQuoteDetails$.next(cancellableQuote);
      fixture.detectChanges();

      const actionButtons = fixture.debugElement.queryAll(By.css('.btn'));
      expect(actionButtons).toBeDefined();
      expect(actionButtons[0].nativeElement.disabled).toBe(false);
    });

    it('should not raise message in case threshold not met and submit action not present', () => {
      spyOn(globalMessageService, 'add').and.callThrough();
      mockQuoteDetails$.next(cancellableQuote);
      fixture.detectChanges();

      expect(globalMessageService.add).toHaveBeenCalledTimes(0);
    });
  });

  it('should perform quote action when action is SUBMIT and confirm dialogClose reason is yes', () => {
    spyOn(facade, 'performQuoteAction').and.callThrough();
    const newMockQuoteWithSubmitAction: Quote = {
      ...mockQuote,
      allowedActions: [
        { type: QuoteActionType.SUBMIT, isPrimary: true },
        { type: QuoteActionType.CANCEL, isPrimary: false },
      ],
    };
    mockQuoteDetails$.next(newMockQuoteWithSubmitAction);
    fixture.detectChanges();

    component.onClick(QuoteActionType.SUBMIT, newMockQuoteWithSubmitAction);
    launchDialogService.closeDialog('yes');
    expect(facade.performQuoteAction).toHaveBeenCalledWith(
      newMockQuoteWithSubmitAction.code,
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
